const GameStates = cc.Class({

  ctor: function () {
    this.game = false;
    this.mainMenu = false;
    this.nextLevel = false;
    this.winMenu = false;
    this.gameOver = false;
  },

  reset() {
    for (const state in this) {
      if (typeof this[state] === "boolean") this[state] = false;
    }
  },

});

module.exports = GameStates;
