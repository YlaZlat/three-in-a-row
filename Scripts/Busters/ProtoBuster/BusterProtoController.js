const Game = require("GameController");
const Model = require("BusterProtoModel");
const View = require("BusterProtoView");

const BusterProtoController = cc.Class({
  extends: cc.Component,

  properties: {

    canvas: {
      default: null,
      type: cc.Node,
    },

    game: {
      default: null,
      type: Game,
    },

    view: {
      default: null,
      type: View,
    },

  },

  onLoad() {
    this.cursorEvents = {};
    this.cursorEvents.down = this.game.cursorEvents.down;
    this.cursorEvents.up = this.game.cursorEvents.up;
    this.cursorEvents.move = this.game.cursorEvents.move;
    this.cursorEvents.leave = this.game.cursorEvents.leave;

    this.passingModel = this.game.passingModel;
    this.fieldActions = this.game.fieldActions;
    this.fieldModel = this.game.fieldModel;
    this.model = new Model(this, this.view);
    this.model.init();
    this.onBusterEvent();
  },

  offStandartGameEvents() {
    this.game.offGame();
  },

  onStandartGameEvents() {
    this.game.onGame();
  },

  onBusterEvent() {
    this.node.on(this.cursorEvents.down, this.onBusterMouseDown, this);
    this.node.on("click", this.onBusterClick, this);
  },

  offBusterEvent() {
    this.node.off(this.cursorEvents.down, this.onBusterMouseDown, this);
    this.node.off("click", this.onBusterClick, this);
  },

  onBusterClick() {
    if (!this.game.state.game) return;
    this.model.getBuster();
  },

  onBusterMouseDown() {
    if (!this.game.state.game) return;
    if (this.model.num < 1) {
      this.model.setNumWarningColor();
      this.node.on(this.cursorEvents.up, this.onBusterMouseUp, this);
      this.node.on(this.cursorEvents.leave, this.onBusterMouseUp, this);
      return;
    }
  },

  onBusterMouseUp() {
    this.model.setNumNormalColor();
    this.node.off(this.cursorEvents.up, this.onBusterMouseUp, this);
    this.node.off(this.cursorEvents.leave, this.onBusterMouseUp, this);
  },

});

module.exports = BusterProtoController;
