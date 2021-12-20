cc.Class({
    extends: cc.Component,

    properties: {

        restartButton: {
            default: null,
            type: cc.Button
        },


        exitBotton: {
            default: null,
            type: cc.Button
        },
        
    },

    enable(){
        this.node.active = true;
    },

    disable(){
        this.node.active = false; 
    },
    
});
