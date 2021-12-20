const WinMenuModel = cc.Class({

    ctor: function (controller, viev) {
        this.viev = viev;
        this.controller = controller;
    },

    init(){
        this.disable();
    },
    
   enable () {
        this.viev.enable();
    },

    disable () {
        this.viev.disable();
    },
    
});

module.exports = WinMenuModel;