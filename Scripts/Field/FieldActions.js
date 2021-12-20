
const FieldActions = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;
        
        this.fallingSpeed = 0,25; //клеток в секунду
        this.fallingAccel = 10; // ускорение падения клеток в секунду
        this.spriteCollectSpeed = 0.2;
        
        this.currentMaxFallHaight = 0;
        this.maxFallTime = 0;
// меняемые местами спрайты
        this.sprite1  = null;
        this.sprite2 = null;
        this.spriteStates = ["normal", "vertStack", "horStack", "rainbowBall"]
    },

    init(){
        this.passingModel = this.controller.passingModel;
        this.fieldModel = this.controller.fieldModel;
        let sprites = this.fieldModel.fillFieldWithSprites();
        this.pourOut(sprites);
        this.collectСhips = this.collectСhips.bind(this);
    },

    // выпадание спрайтов на поле из исходной позиции

    pourOut(sprites){
        return  new Promise((resolve) => {
            let promisArr = [];
            sprites.forEach(sprite => {
                let s = (sprite.position.y - sprite.cell.position.y) / this.fieldModel.cellSize;
                let t =  Math.sqrt(2*s/ this.fallingAccel);
                promisArr.push(this.viev.fallSprite(sprite, t, sprite.cell.position))
            })
            Promise.all(promisArr) 
            .then (()=> {
                resolve();
            })   
            
        })
    },

    collectСhips(arr, target){
        return  new Promise((resolve) => {
            let targetPos = target.getPosition();
            let maxTime = 0;
            let removeDelay = 0.3;
            arr.forEach((sprite)=> {
                let posX = sprite.getPosition().x;
                let posY = sprite.getPosition().y;
                let deltaX = Math.abs(targetPos.x - posX);
                let deltaY = Math.abs(targetPos.y - posY);
                let time = (deltaX || deltaY) / this.fieldModel.cellSize * this.spriteCollectSpeed;
                if(time > maxTime) maxTime = time;
                this.viev.moveSprite(sprite, time, targetPos);
            })
            setTimeout(()=> {
                resolve(arr)}, (maxTime + removeDelay) * 1000);
        })
    },

    gainScore(arr, target){
        if(target){
            let colorIndex = this.passingModel.collectChipsColorIndex;
            let num = this.fieldModel.countSameColorSprites(colorIndex, arr); 
            if(!arr.includes(target) && target.colorIndex === colorIndex) num++;
            if(num) this.passingModel.gainScore(num, target.getPosition());
        } 
    },    

    despawnSprites(arr, target){
        if(target) this.gainScore(arr, target);

        for (let i = 0; i< arr.length; i++){
            let cell = this.fieldModel.getSpriteCell(arr[i]);
            cell.sprite = null;
            this.viev.despawnChip(arr[i]);
        }
        return;
    },

    replaceSprites(sprite1, sprite2){
        return  new Promise((resolve) => {
            
            this.viev.replaceSprites(sprite1, sprite2)
                .then(()=> { resolve()});
            const cell1 = this.fieldModel.getSpriteCell(sprite1);
            const cell2 = this.fieldModel.getSpriteCell(sprite2);
            cell1.sprite = sprite2;
            sprite2.cell = cell1;
            cell2.sprite = sprite1;
            sprite1.cell = cell2;
        });
    },

    onSwipe(){
        this.replaceSprites(this.sprite1, this.sprite2) 
            .then(()=>  { 
                return Promise.all(
                    [this.checkReplace(this.sprite1),
                    this.checkReplace(this.sprite2) ]
                )
            })
            .then ((results) => {
                if(!results[0] && !results[1]){ // обратная перестановка спрайтов и завершение
                    return this.replaceSprites(this.sprite1, this.sprite2); 
                };
                this.passingModel.changeMovies(-1); // считаем ход
                return this.rebuildField()       //опадание спарйтов в пустое пространство и выпадение новых фишек
            })
            .then (()=> {
                this.sprite1, this.sprite2 = null; // проверка комбинаций после перестройки поля, их уничтожение и повторная перестройка
                return this.handleMatchesAfterRebuild();
            })
            .then (()=> {
                this.controller.onFinishRebuild(); // завершение
            })
    },

    onDublClick(sprite){

        if(!sprite.state || (sprite.state !== "horStack" && sprite.state !==  "vertStack")) return;
        let group;
        if (sprite.state === "horStack"){
            let row = sprite.cell.row;
            group = this.fieldModel.getRowSprites(row);
        }

        if (sprite.state === "vertStack"){
            let col = sprite.cell.col;
            group = this.fieldModel.getColSprites(col); 
        }

        this.collectСhips(group, sprite)
            .then((group) => {
                return this.despawnSprites([...group, sprite], sprite);
            })
            .then(() => {
                return this.rebuildField() 
            })
            .then (()=> {
                return this.handleMatchesAfterRebuild();
            })
            .then (()=> {
                this.controller.onFinishRebuild(); // завершение
            })

    },


    // дейтсвие обычной группы из трех спрайтов
    normalGroupAction(groupInformation){
        let target = groupInformation.target;
        let group = groupInformation.group;
        return this.collectСhips(group, target)
            .then((group) => {
                if(groupInformation.length < 4){
                    this.despawnSprites([...group, target], target);
                }

                if(groupInformation.length === 4){
                    this.despawnSprites(group, target);
                    if (groupInformation.direction === "vertical")  this.changeSpriteState(target, "vertStack"); 
                    if (groupInformation.direction === "horizontal")  this.changeSpriteState(target, "horStack");
                }

                if (groupInformation.length > 4){
                    this.despawnSprites(group, target);
                    this.changeSpriteState(target, "rainbowBall"); 
                }

                return group;
            })
    },

    horizontalCollect(sprite){
        let row = sprite.cell.row;
        let group = this.fieldModel.getRowSprites(row); 
        return this.collectСhips(group, sprite);
    },
    
    verticalCollect(sprite){
        let col = sprite.cell.col;
        let group = this.fieldModel.getColSprites(col);
        return this.collectСhips(group, sprite);
    },
    
    
    
    //действие группы, содержащей горизонтальной стек
    horizontalStackGroupAction(groupInformation){
        let target = groupInformation.target;
        let row = target.cell.row;
        let group = this.fieldModel.getRowSprites(row);
        if(groupInformation.direction !== "horizontal") {
            group = group.concat(groupInformation.group)
        }
    
        return this.collectСhips(group, target)
            .then((group) => {
                this.despawnSprites(group, target);
                return group;
            })
    },

    //действие группы, содержащей вертикальный стек
    verticalStackGroupAction(groupInformation){
        let target = groupInformation.target;
        let col = target.cell.col;
        let group = this.fieldModel.getColSprites(col);
        if(groupInformation.direction !== "vertical") {
            group = group.concat(groupInformation.group)
        }
    
        return this.collectСhips(group, target)
            .then((group) => {
                this.despawnSprites(group, target);
                return group;
            })
    },

    //действие перестановки радужного шара
    rainbowBallGroupAction(sprite){
        let colorIndex = this.sprite2.colorIndex;
        let group = this.fieldModel.getSameColorSprites(colorIndex);
        if(this.sprite2.state === "rainbowBall"){
            group = this.fieldModel.getFieldSprites();
        }
        return this.collectСhips(group, sprite)
            .then((group) => {
                this.despawnSprites([...group, sprite], sprite);
                return group;
            })
    },

// проверить новую позицию спрайта и вызвать соответсвующие действия
    checkReplace(sprite){ 
        return  new Promise((resolve) => {

            if(sprite.state === "rainbowBall") {
            if (sprite !== this.sprite1) return resolve(false);
            return  this.rainbowBallGroupAction(sprite)
                .then ((group)=> {
                    resolve(group);
                })  
            }

            let groupInformation = this.fieldModel.findSameColorGroup(sprite);
                if(!groupInformation) return resolve(false);

            groupInformation.group.forEach((member, index) => {
                if(member.state === "vertStack" || member.state === "horStack" ) {
                    groupInformation.group.splice(index, 1, sprite); 
                    sprite = member;    
                    groupInformation.target = member;
                }
            })

            if(sprite.state === "normal") {
                this.normalGroupAction(groupInformation)
                    .then ((group)=> {
                    resolve(group);
                })  
            }

            if(sprite.state === "vertStack") {
                this.verticalStackGroupAction(groupInformation)
                    .then ((group)=> {
                    resolve(group);
                }) 
            }  

            if(sprite.state === "horStack") {
                this.horizontalStackGroupAction(groupInformation)
                .then ((group)=> {
                    resolve(group);
                }) 
            }  
        })
    },

//опадание и заполнение поля после удаления спрайтов   
    rebuildField(){
        return  new Promise((resolve) => {
            this.checkFieldForEmptyCells();
            this.dumping();
            setTimeout(()=> {
                this.currentMaxFallHaight = 0;
                this.maxFallTime = 0;
                let sprites = this.fieldModel.fillFieldWithSprites();
                this.pourOut(sprites)
                    .then (() => {
                        resolve()});
            },  this.maxFallTime * 1000);
        })
    },

 // проверка пустого пространста под спрайтами и изменение свойства fallHeight 
    checkFieldForEmptyCells: function () {
        const arr = this.fieldModel.fieldCells;
        checkEmptyCells = checkEmptyCells.bind(this);
    
        function checkEmptyCells(arr) {
            let isEmptyСell = false;
            for (let r = 1; r < arr.length; r++) {
                for (let c = 0; c < arr[r].length; c++) {
                    const curCell = arr[r][c];
                    const lowCell = arr[r - 1][c];
                    if (!curCell.sprite) continue;
                    if (!lowCell.sprite) {
                        isEmptyСell = true;
                        lowCell.sprite = curCell.sprite;
                        curCell.sprite = null;
                        lowCell.sprite.fallHeight++;
                        lowCell.sprite.cell = lowCell;
                        if (lowCell.sprite.fallHeight > this.currentMaxFallHaight) this.currentMaxFallHaight = lowCell.sprite.fallHeight;
                    }
                }
            }
            return isEmptyСell;
        };
    
        while (checkEmptyCells(arr)) {
            checkEmptyCells(arr)
        };
    },

 // опадание спарйтов если задано свойтво  fallHeight  
    dumping: function () {
        const arr = this.fieldModel.fieldCells;
        this.maxFallTime = Math.sqrt(2*this.currentMaxFallHaight/ this.fallingAccel);
        for (let r = 0; r < arr.length; r++) {
            for (let c = 0; c < arr[r].length; c++) {
                const sprite = arr[r][c].sprite;
                const cell = arr[r][c];
                if (sprite && sprite.fallHeight) {
                    const fallTime = Math.sqrt(2*sprite.fallHeight/ this.fallingAccel);
                    sprite.fallHeight = 0;
                    this.viev.fallSprite(sprite, fallTime, cell.position);
                }
            }
        }
    },

//проверка готовых комбинаций на поле и применение к ним действий с рекурсивной повторной
//перестройкой и проверкой комбинаций пока готовых комбинаций не останется
    handleMatchesAfterRebuild(){
        return  new Promise((resolve) => {   
            let matchGroups = this.fieldModel.findMatchesInField();  
            if(!matchGroups)return resolve();
            let promisArr = [];
            matchGroups.forEach((group) => {
                promisArr.push(
                   this.collectСhips(group, group[1])
                    .then ((group)=>{
                        this.despawnSprites(group, group[1]);
                    })
                )
            })

            Promise.all(promisArr)
                .then (()=> {
                    return  this.rebuildField()})
                .then (()=> {
                    resolve();
                    return  this.handleMatchesAfterRebuild()
                })  
        })
    },

// изменение состояния спрайта
    changeSpriteState(sprite, newState){
        sprite.state = newState;
        if(newState === "rainbowBall"){
            sprite.colorIndex = null;
            this.viev.setSpriteRainbowBallTexture(sprite)
        }
        if(newState === "vertStack"){
            this.viev.setSpriteHorizontalStackTexture(sprite);
        }
        if(newState === "horStack"){
            this.viev.setSpriteVetricalStackTexture(sprite);
        }
    },

});

module.exports = FieldActions;