const NextLevelMenuModel = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;
        this.passingModel = this.controller.passingModel;
    },

    init(){
        this.disable(); 
    },
    
    enable () {
        let level = this.passingModel.level;
        let goalColor = this.passingModel.collectChipsColor;
        let requiredLevelScore = this.passingModel.requiredLevelScore
        let levelMovies = this.passingModel.levelMovies;
        this.viev.enable();
        this.viev.displaylevelInformation(level, requiredLevelScore, goalColor, levelMovies);

    },

    disable () {
        this.viev.disable();
    },

});

module.exports = NextLevelMenuModel;