const MainMenuModel = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;
        this.fieldModel = this.controller.fieldModel;
        this.passingModel = this.controller.passingModel;
    },
init(){},

   enable () {
        this.viev.enable();
        this.setLevelInformation();
    },

    disable () {
        this.viev.disable();
    },

    setLevelInformation(){
        let level = this.passingModel.level;
        let goalColor = this.passingModel.collectChipsColor;
        let requiredLevelScore = this.passingModel.requiredLevelScore
        let levelMovies = this.passingModel.levelMovies;
        this.viev.displaylevelInformation(level, requiredLevelScore, goalColor, levelMovies);
    }
});

module.exports = MainMenuModel;