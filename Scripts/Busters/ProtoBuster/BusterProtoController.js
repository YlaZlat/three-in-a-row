const Game = require('GameController');
const Model = require('BusterProtoModel');
const Viev = require('BusterProtoViev');

const BusterProtoController = cc.Class({
    extends: cc.Component,

    properties: {
    
        canvas: {
            default: null,
            type: cc.Node
        },

        game: {
            default: null,
            type: Game
        },
      
        viev: {
            default: null,
            type: Viev
        },

},

    onLoad () {
        this.mousedown = this.game.mousedown;
        this.mouseup = this.game.mouseup;
        this.mousemove = this.game.mousemove;
        this.mouseleave = this.game.mouseleave;

        this.passingModel = this.game.passingModel;
        this.fieldActions = this.game.fieldActions;
        this.model = new Model(this, this.viev);
        this.model.init();
        this.onBusterEvent();
        
    },
    
    offStandartGameEvents(){
        this.game.offGame();
    },

    onStandartGameEvents(){
        this.game.onGame();
    },

    onBusterEvent(){
        this.node.on(this.mousedown, this.onBusterMouseDown, this);
        this.node.on('click', this.onBusterClick, this);  
    },

    offBusterEvent(){
        this.node.off(this.mousedown, this.onBusterMouseDown, this);
        this.node.off('click', this.onBusterClick, this);  
    },

    onBusterClick(){
        if(!this.game.state.game) return; 
        this.model.getBuster();
    },

    onBusterMouseDown(){
        if(!this.game.state.game) return;
        if(this.model.num < 1){
            this.model.setNumWarningColor();
            this.node.on(this.mouseup, this.onBusterMouseUp, this);
            this.node.on(this.mouseleave, this.onBusterMouseUp, this);
            return;
        }
    },

    onBusterMouseUp(){
        this.model.setNumNormalColor()
        this.node.off(this.mouseup, this.onBusterMouseUp, this);
        this.node.off(this.mouseleave, this.onBusterMouseUp, this);
    },

    
});

module.exports = BusterProtoController;
