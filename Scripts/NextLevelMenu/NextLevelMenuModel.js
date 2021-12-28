const NextLevelMenuModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;
    this.state = this.controller.state.nextLevel;
    this.passingModel = this.controller.passingModel;
  },

  init() {
    this.disable();
  },

  enable() {
    this.passingModel.increaseLevel();
    let level = this.passingModel.level;
    let goalColor = this.passingModel.collectChipsColor;
    let requiredLevelScore = this.passingModel.requiredLevelScore;
    let levelMovies = this.passingModel.levelMovies;
    this.view.enable();
    this.onEvent();
    this.view.displaylevelInformation(level, requiredLevelScore, goalColor, levelMovies);
  },

  disable() {
    this.view.disable();
  },

  onEvent() {
    this.view.playButton.node.on(this.controller.cursorEvents.click, this.onButtonPlay, this);
  }, 

  onButtonPlay() {
    this.disable();
    this.controller.onGame();
  },

});

module.exports = NextLevelMenuModel;
