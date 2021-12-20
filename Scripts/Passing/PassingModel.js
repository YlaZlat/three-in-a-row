const PassingModel = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;
        this.fieldModel = this.controller.fieldModel;

        this.initLivel = 1;
        this.initMovies = 12;
        this.initRequiredLevelScore = 10;

        this.increasRequiredLevelScore = 1;
        this.levelGoal= {
            1: {
                movies: 12,
                requiredLevelScore: 10,
                colorIndex: 0
            },

            2: {
                movies: 12,
                requiredLevelScore: 11,
                colorIndex: 1
            },

            3: {
                movies: 12,
                requiredLevelScore: 12,
                colorIndex: 2
            },

            4: {
                movies: 12,
                requiredLevelScore: 13,
                colorIndex: 3
            },

            5: {
                movies: 12,
                requiredLevelScore: 14,
                colorIndex: 4
            },

            6: {
                movies: 12,
                requiredLevelScore: 15,
                colorIndex: 5
            },
        }
        
        this.collectChipsColorIndex;
    },

    init(){
        this.setLevel(1);
    },

    getMaxLevel(){
        let maxLevel = 0;
        for (let level in this.levelGoal) {
            maxLevel = level;
        } 
        return maxLevel;
    },


    setLevel(level){
        this.level = level;
        this.collectChipsColorIndex = this.levelGoal[this.level].colorIndex;
        this.collectChipsColor = this.fieldModel.spriteColors[this.collectChipsColorIndex];
        this.levelMovies = this.levelGoal[this.level].movies;
        this.requiredLevelScore = this.levelGoal[level].requiredLevelScore;
        this.levelScore = 0;
        this.viev.displayMovies(this.levelMovies);
        this.viev.displayLevelSore(this.levelScore, this.requiredLevelScore);
        this.viev.displayLevel(this.level, this.collectChipsColor);
    },

    changeMovies (n) {
        this.levelMovies += n;
        if(this.levelScore < this.requiredLevelScore &&  this.levelMovies < 1) this.controller.state.gameOver = true;
        this.viev.displayMovies( this.levelMovies);
    },

    gainScore(num, pos) {
        pos.x += this.fieldModel.cellSize/2;
        pos.y += this.fieldModel.cellSize/2;
        this.levelScore += num;
        this.viev.displayLevelSore(this.levelScore, this.requiredLevelScore);
        this.viev.creareScoreAnim(num, pos);
       
        if(this.levelScore < this.requiredLevelScore &&  this.levelMovies < 1) this.controller.state.gameOver = true;
        if (this.level ==  this.getMaxLevel() && this.levelScore >= this.requiredLevelScore) {
            this.controller.state.winMenu = true;
            return;
        }
        if(this.levelScore >= this.requiredLevelScore) {
            cc.log("this.controller.state.nextLevel = true;")
            this.controller.state.nextLevel = true;}
    },

    increaseLevel(){
        this.level++;
        this.setLevel(this.level);
    },

    addColectedChips(num) {
        this.collectChips += num;
        this.gainScore(num);
    },

});

module.exports = PassingModel;

