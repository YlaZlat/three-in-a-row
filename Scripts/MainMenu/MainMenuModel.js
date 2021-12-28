const MainMenuModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;
    this.state = this.controller.state.mainMenu;
    this.fieldModel = this.controller.fieldModel;
    this.passingModel = this.controller.passingModel;
  },
  init() {},

  enable() {
    this.view.enable();
    this.onEvent();
  },

  disable() {
    this.view.disable();
  },

  onEvent() {
    this.view.playButton.node.on(this.controller.cursorEvents.click, this.onButtonPlay, this);
  }, 

  onButtonPlay() {
    this.disable();
    this.controller.onNextLevelMenu();
  },
  
});

module.exports = MainMenuModel;
