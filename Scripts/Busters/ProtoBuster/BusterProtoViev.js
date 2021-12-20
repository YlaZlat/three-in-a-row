const BusterProtoViev = cc.Class({
    extends: cc.Component,

    properties: {

        numLabel: {
            default: null,
            type: cc.Label
        },

        numLabelNormalColor: cc.Color.WHITE,
        numLabelWarningColor: cc.Color.RED,

    },

    enable(){
        this.node.active = true;
    },

    setNumLabelNormalColor(){
        this.numLabel.node.color = this.numLabelNormalColor;
    },

    setNumLabelWarningColor(){
        this.numLabel.node.color = this.numLabelWarningColor;
    },

    displayNum(num){
        this.numLabel.string  = num + '';
    },

});

module.exports = BusterProtoViev;
