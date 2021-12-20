// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const cellRect = this.node.getComponent(cc.Graphics);
        cellRect.rect(0, this.node.height, this.node.width, this.node.height);
        blackRect.fillColor = cc.Color.BLACK;
        blackRect.fill(); 
    },

    start () {

    },

    // update (dt) {},
});
