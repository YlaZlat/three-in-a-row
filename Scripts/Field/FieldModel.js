const FieldModel = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;

        this.fieldMatrix = [
            
            [1,0,1,0,1],
            [0,1,0,1,0],
            [1,0,1,0,1],
            [0,1,0,1,0],
            [1,0,1,0,1],
            [0,1,0,1,0,1,0,1,0],
            [1,0,1,0,1,0,1,0,1],
            [0,1,0,1,0,1,0,1,0],
            [1,0,1,0,1,0,1,0,1],
        ],

        this.cellSize = 62; 
        this.minGroup = 3;
        this.spriteColors;
        let initRenderParameters = this.viev.getInitRenderFieldParameters();
        this.setInitRenderFieldParameters(initRenderParameters);
        this.fieldCells = [];
    },

    init(){
        this.passingModel = this.controller.passingModel;
        this.createField();
        this.viev.createChipsPool(this.fieldCells.length);
        
    },

    setInitRenderFieldParameters(parameters) { 
        this.spriteColors = parameters.spriteColors;
    },

    createField() {
        const matrix = this.fieldMatrix;
        this.fieldCells = [];
        let shift = this.cellSize / 2;
        for (let r = matrix.length - 1 ; r >= 0; r--) {
            let row = [];
            for (let c = 0; c < matrix[r].length; c++) {
                let cell = {};
                cell.size = this.cellSize;
                cell.row =  matrix.length - 1 - r;
                cell.col = c;
                cell.position = cc.v2(shift + cell.col * this.cellSize, shift + cell.row * this.cellSize);
                cell.color = matrix[r][c];
                cell.sprite = null;
                row.push(cell);
                cell.cage = this.viev.createFieldCage(cell);
            }
            this.fieldCells.push(row);
        }
    },

    getRondomColor(){
        const randomIndex = Math.floor(Math.random()*this.spriteColors.length);
        return randomIndex;
    },

    setSpriteColor(sprite, colorIndex){
        sprite.colorIndex = colorIndex;
        this.viev.setColor(sprite, colorIndex);
        return sprite.colorIndex;
    },
    
    setSpriteToInitPosition(cell, sprite){
        const initYSpritePosition = this.cellSize * this.fieldCells.length + this.cellSize/2;
        this.viev.setChipToInitPosition(cell, sprite, initYSpritePosition);
        cell.sprite = sprite;
        sprite.fallHeight = 0;
        sprite.cell = cell;
    },
 
    // функция для проверки готовых коминаций при заполнении поля
    checkMatches(r, c, colorIndex){
        if(c > 1){
            let privInRowColorIndex1 = this.fieldCells[r][c - 1].sprite.colorIndex;
            let privInRowColorIndex2 = this.fieldCells[r][c - 2].sprite.colorIndex;
        
            if(colorIndex === privInRowColorIndex1 &&  colorIndex === privInRowColorIndex2) {
                colorIndex = (colorIndex + 1) % this.spriteColors.length;
            }
        }
        
        if(r > 1 && this.fieldCells[r - 2][c]){
            let privInColColorIndex1 = this.fieldCells[r - 1][c].sprite.colorIndex;
            let privInColColorIndex2 = this.fieldCells[r - 2][c].sprite.colorIndex;
        
        if(colorIndex === privInColColorIndex1 &&  colorIndex === privInColColorIndex2) {
            colorIndex = (colorIndex + 1) % this.spriteColors.length;
            }
        }

        return colorIndex;
    },
    
    fillFieldWithSprites() {
        const fieldCells = this.fieldCells;
        let sprites = [];
        for (let r = 0; r < fieldCells.length; r++) {
            for (let c = 0; c < fieldCells[r].length; c++) {
                const cell = fieldCells[r][c];
                if (!cell.sprite) {
                    let sprite = this.viev.spawnNewChip();
                    let colorIndex = this.getRondomColor();
                    sprite.state = "normal"; // "vertStack", "horStack" "rainbowBall"
                    colorIndex = this.checkMatches(r, c, colorIndex);
                    this.setSpriteColor(sprite, colorIndex);
                    this.setSpriteToInitPosition(cell, sprite);
                    sprites.push(sprite);
                    sprite.on(this.controller.mousedown, function () {},); 
                }
            }
        }
        return sprites.reverse();
    },

// получить все спрайты поля
getFieldSprites(){
    const arr = this.fieldCells;
    let sprites = [];
    for (let r = 0; r < arr.length; r++) {
        for (let c = 0; c < arr[r].length; c++) { 
            let sprite = arr[r][c].sprite;
            if(sprite) sprites.push(sprite);
        }
    }
    return sprites;
},
// получить спрайты определенного цвета
getSameColorSprites(colorIndex){
    const arr = this.fieldCells;
    let sprites = [];
    
    for (let r = 0; r < arr.length; r++) {
        for (let c = 0; c < arr[r].length; c++) { 
            let sprite = arr[r][c].sprite;
            if(sprite && sprite.colorIndex === colorIndex) sprites.push(sprite);
        }
    }

    return sprites;
},

// посчитать количество спрайтов заданного цвета в массиве
countSameColorSprites(colorIndex, arr){
    let counter = 0;
    for (let i = 0; i< arr.length; i++){
        if(arr[i].colorIndex === colorIndex) counter++;
    }
    
    return counter;
},


// получить спрайты определенного горизонтального ряда
getRowSprites(row){
    const arr = this.fieldCells;
    let sprites = [];
        for (let c = 0; c < arr[row].length; c++) { 
            let sprite = arr[row][c].sprite;
            if(sprite) sprites.push(sprite);
        }
    return sprites;
},

//получить спрайты определенного вертикального ряда
getColSprites(col){
    const arr = this.fieldCells;
    let sprites = [];
    for (let r = 0; r < arr.length; r++) {
            let sprite;
            if(arr[r][col]) sprite = arr[r][col].sprite;
            if(sprite) sprites.push(sprite);
    }
    return sprites;
},

// получить соседние от спрайты от заданного
getNeighborSprites(sprite){
    let neighborSprites = [];
    let cell = sprite.cell;
    let rightCell = this.getRightCell(cell);
    if(rightCell) neighborSprites.push(rightCell.sprite);
    let leftCell = this.getLeftCell(cell);
    if(leftCell) neighborSprites.push(leftCell.sprite);
    let upCell = this.getUpCell(cell);
    if(upCell) neighborSprites.push(upCell.sprite);
    let lowCell = this.getLowCell(cell);
    if(lowCell) neighborSprites.push(lowCell.sprite);

    return neighborSprites;
},
//получить правую клетку от заданной
getRightCell(cell){
    const arr = this.fieldCells;
    const col = cell.col;
    const row = cell.row;
    const rowL = arr[row].length;
    if(col === (rowL - 1)) return false;
    return arr[row][col + 1];
},

//получить левую клетку от заданной
getLeftCell(cell){
    const arr = this.fieldCells;
    const col = cell.col;
    const row = cell.row;
    if(col === 0) return false;
    return arr[row][col - 1];
},

//получить верхнюю клетку от заданной
getUpCell(cell){
    const arr = this.fieldCells;
    const col = cell.col;
    const row = cell.row;
    const rowN = arr.length;
    if(row === (rowN - 1)) return false;
    return arr[row + 1][col];
},

//получить нижнюю клетку от заданной
getLowCell(cell){
    const arr = this.fieldCells;
    const col = cell.col;
    const row = cell.row;
    if(row === 0) return false;
    return arr[row - 1][col];
},

// найти образует ли спрайт комбинации 3 в ряд и вернуть объект с информацией о этих комбинациях
findSameColorGroup(sprite){
    const sameColor = sprite.colorIndex;
    const cell = sprite.cell;
    const verticalGroup = [];
    const horizontalGroup = [];
    const up = this.getUpCell.bind(this);
    const low = this.getLowCell.bind(this);
    const left = this.getLeftCell.bind(this);
    const right = this.getRightCell.bind(this);
    let minGroup = this.minGroup - 1; // так как целевой спрайт возвращаем отдельно от группы

    function checkDirection(direction, cell){
        let nextCell = direction(cell);
        if (!nextCell) return;
        let nextSprite= nextCell.sprite;
        if(!nextSprite) return;
        if (nextSprite.colorIndex === sameColor){
            if(direction === up || direction === low) verticalGroup.push(nextSprite);
            if(direction === right || direction === left) horizontalGroup.push(nextSprite);
            checkDirection (direction, nextCell);
        }
    };

    checkDirection(up, cell);
    checkDirection(low, cell); 
    checkDirection(right, cell);
    checkDirection(left, cell);

    if (verticalGroup.length < minGroup && horizontalGroup.length < minGroup) return false;

    let groupInformation = {
        target: sprite,
        group: [],
        color: sameColor,
        direction: "direction"
    }

    if (verticalGroup.length >= minGroup && horizontalGroup.length >= minGroup) {
        const group =  verticalGroup.concat(horizontalGroup);
      groupInformation.group = group;
      groupInformation.length = group.length + 1;
      groupInformation.direction = "dual";
      return groupInformation;
    }

    if (verticalGroup.length >= minGroup){
        groupInformation.group = verticalGroup;
        groupInformation.direction = "vertical"
        groupInformation.length = verticalGroup.length + 1;
        return groupInformation;
    }

    if (horizontalGroup.length >= minGroup){
        groupInformation.group = horizontalGroup;
        groupInformation.direction = "horizontal"
        groupInformation.length = horizontalGroup.length + 1;
        return groupInformation;
    }

}, 

getSpriteCell(sprite){
    const arr = this.fieldCells;
    const cell = sprite.cell;
    if(!cell) return;
    const col = cell.col;
    const row = cell.row;
    return arr[row][col];
},


findMatchesInField: function () {
    let matchGroups = [] // массив из найденных групп
    const arr = this.fieldCells;
    this.maxFallTime = Math.sqrt(2*this.currentMaxFallHaight/ this.fallingAccel);
    for (let r = 0; r < arr.length; r++) {
        for (let c = 0; c < arr[r].length; c++) {
            const sprite = arr[r][c].sprite;
            if(!sprite) continue;
            let group = this.findSameColorGroup(sprite).group;
            if(group) {
                group.push(sprite);
                group.forEach(sprite => this.getSpriteCell(sprite).sprite = null)  
            matchGroups.push(group);
            }
        }
    }
    if(matchGroups.length < 1) return false;
    return matchGroups;
},   

});

module.exports = FieldModel;