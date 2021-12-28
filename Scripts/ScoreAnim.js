cc.Class({
  extends: cc.Component,

  properties: {
    label: {
      default: null,
      type: cc.Label,
    },
  },

  init(game) {
    this.game = game;
  },

  despawn() {
    this.game.despawnScoreFX(this.node);
  },

});
