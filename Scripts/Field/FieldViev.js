const BackGround = require('BackGround');


cc.Class({
    extends: cc.Component,


    properties: {

        cellPrefab: {
            default: null,
            type: cc.Prefab
        },

        chipPrefab: {
            default: null,
            type: cc.Prefab
        },

        RainbowTexture: {
            default: null,
            type: cc.SpriteFrame     // type can also defined as an array to improve readability
        }, 
        
        normalTexture: {
            default: null,
            type: cc.SpriteFrame     // type can also defined as an array to improve readability
        }, 

        stackTexture: {
            default: null,
            type: cc.SpriteFrame     // type can also defined as an array to improve readability
        }, 

        chipColors: {
            default: [],
            type: cc.Color
        },  
        
        
        cageColors: {
            default: [],
            type: cc.Color
        },
       
    },

    init(){

    },

    createChipsPool(initCount){
        this.chipsPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let chip = cc.instantiate(this.chipPrefab); // create node instance
            this.chipsPool.put(chip); // populate your pool with put method
        }   
    },


    getInitRenderFieldParameters(){
        return ({
            spriteColors: this.chipColors,
        })
    },

    spawnNewChip: function() {
        let chip = null;
        if (this.chipsPool.size() > 0) {
            chip =  this.chipsPool.get(); 
        } else {
            chip = cc.instantiate(this.chipPrefab);
        }
        
       
        return chip;
    },

    despawnChip: function(chip){
        if(chip.getComponent(cc.Sprite).spriteFrame ==! this.normalTexture)this.setSpriteNormalTexture(chip);
        this.chipsPool.put(chip);
    },



    setColor(chip, colorIndex){
        chip.color = this.chipColors[colorIndex]; 
        return colorIndex;
    },


    setChipToInitPosition(cell, chip, initYSpritePosition){
        this.node.addChild(chip);
        chip.setPosition(cell.position.x, initYSpritePosition);
        chip.width = cell.size * 0.9;
        chip.height = cell.size * 0.9;
        chip.zIndex = 1;
    },

    createFieldCage(cell){
        let cage = cc.instantiate(this.cellPrefab);
        cage.color = this.cageColors[cell.color];
        cage.setPosition(cell.position);
        cage.width = cell.size;
        cage.height = cell.size;
        this.node.addChild(cage);
        return cage;
    },


    replaceSprites(sprite1, sprite2) {
        return  new Promise((resolve) => {
            let pos1 = sprite1.getPosition();
            let pos2 = sprite2.getPosition();
            let t = cc.tween;
            t(sprite1)
            .call(() => {sprite1.zIndex = 2})
            .parallel(
                t().to(0.3, { position: pos2}),
                t().by(0.15, { scale: 0.2 }).by(0.15, { scale: - 0.2 })
            )
        
            .call(() => {sprite1.zIndex = 1})
            .start()

            t(sprite2)
            .parallel(
                t().to(0.3, { position: pos1}),
                t().by(0.15, { scale: -0.2 }).by(0.15, { scale:  0.2 })
            )

        .call(() => resolve()) 
        .start()
     })
    },

    moveSprite(sprite, time, pos) {
        return  new Promise((resolve) => {
        let t = cc.tween;
        t(sprite)
        .parallel(
            t().to(time, { position: pos}, { easing: 'sineIn'}),
            t().by(time/2, { scale: 0.1 }).by(time/2, { scale: - 0.1 })
        )
        .call(() => resolve()) 
        .start()
    })
    },

    fallSprite(sprite, fallTime, pos){
        return  new Promise((resolve) => {
        cc.tween(sprite)
                .to(fallTime, {position: pos}, { easing: 'sineIn'})
                .call(() => resolve()) 
                .start()
                
        })
    },

    start () {

    },

    setSpriteNormalTexture(sprite){
        sprite.getComponent(cc.Sprite).spriteFrame = this.normalTexture; 
        }, 

   setSpriteRainbowBallTexture(sprite){
    sprite.getComponent(cc.Sprite).spriteFrame = this.RainbowTexture; 
    sprite.color = cc.Color.WHITE;

    },

    setSpriteHorizontalStackTexture(sprite){
        sprite.width = sprite.width*1.25;
        sprite.getComponent(cc.Sprite).spriteFrame = this.stackTexture; 
        sprite.rotation = 270; 
    },

    setSpriteVetricalStackTexture(sprite){
        sprite.width = sprite.width*1.25;
        sprite.getComponent(cc.Sprite).spriteFrame = this.stackTexture;
    },
   

//vertLightning
    // update (dt) {},
});
