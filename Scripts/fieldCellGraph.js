cc.Class({
  extends: cc.Component,

  properties: {

  },

  onLoad() {
    const cellRect = this.node.getComponent(cc.Graphics);
    cellRect.rect(0, this.node.height, this.node.width, this.node.height);
    blackRect.fillColor = cc.Color.BLACK;
    blackRect.fill();
  },


});
