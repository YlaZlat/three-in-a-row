cc.Class({
  extends: cc.Component,

  properties: {
  },

  init() {
    this.createBackGround();
  },

  createBackGround() {
    const backGround = this.node.getComponent(cc.Graphics);
    this.backGroundColor = backGround.fillColor;
    backGround.rect(-this.node.width / 2, -this.node.height / 2, this.node.width, this.node.height);
    backGround.fill();
  },

});
