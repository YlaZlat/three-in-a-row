const BusterProtoModel = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;
        this.passingModel = this.controller.passingModel;
        this.fieldModel = this.controller.fieldModel;
        this.num;
        this.initNum  = 0;
    },

    init(){
        this.num = this.initNum;
        this.viev.displayNum(this.num);
        this.viev.setNumLabelNormalColor();
        this.viev.enable();
    },

    setNumNormalColor(){
        this.viev.setNumLabelNormalColor();
    },

    setNumWarningColor(){
        this.viev.setNumLabelWarningColor();
    },

    getBuster(){
        cc.log("Определите метод!");
        if(this.num < 1){
            return;
        }
    },

   
});

module.exports = BusterProtoModel;