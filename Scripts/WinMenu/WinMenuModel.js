const WinMenuModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;
    this.state = this.controller.state.winMenu;
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
    this.view.exitButton.node.on(this.controller.cursorEvents.click, this.onButtonExit, this);
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

module.exports = WinMenuModel;
