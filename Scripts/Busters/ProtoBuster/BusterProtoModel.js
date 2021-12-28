const BusterProtoModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;
    this.passingModel = this.controller.passingModel;
    this.fieldModel = this.controller.fieldModel;
    this.num;
    this.initNum = 0;
  },

  init() {
    this.num = this.initNum;
    this.view.displayNum(this.num);
    this.view.setNumLabelNormalColor();
    this.view.enable();
  },

  setNumNormalColor() {
    this.view.setNumLabelNormalColor();
  },

  setNumWarningColor() {
    this.view.setNumLabelWarningColor();
  },

  getBuster() {
    cc.log("Определите метод!");
    if (this.num < 1) {
      return;
    }
  },

});

module.exports = BusterProtoModel;
