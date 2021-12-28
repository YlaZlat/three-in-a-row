const GameOverMenuModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;
    this.state = this.controller.state.gameOver;
    this.passingModel = this.controller.passingModel;
  },

  init() {
    this.disable();
  },

  enable() {
    this.view.enable();
    this.onEvent();
  },

  disable() {
    this.view.disable();
  },

  onEvent() {
    this.view.restartButton.node.on(this.controller.cursorEvents.click, this.onRestartButton, this);
    this.view.addMoviesButton.node.on(this.controller.cursorEvents.click, this.onButtoAddMoviesAndPlay, this);
    this.view.exitButton.node.on(this.controller.cursorEvents.click, this.onButtonExit, this);
  }, 

  onButtoAddMoviesAndPlay() {
    this.disable();
    this.passingModel.changeMovies(5);
    this.controller.onGame();
  },

  onRestartButton() {
    this.disable();
    this.controller.restart();
  },

  onButtonExit() {
    this.disable();
    this.controller.exit();
  },

});

module.exports = GameOverMenuModel;
