cc.Class({
  extends: cc.Component,

  properties: {

    levelScoreDisplay: {
      default: null,
      type: cc.Label,
    },

    moviesDisplay: {
      default: null,
      type: cc.Label,
    },

    levelLabel: {
      default: null,
      type: cc.Label,
    },

    scoreFXPrefab: {
      default: null,
      type: cc.Prefab,
    },

    field: {
      default: null,
      type: cc.Node,
    },

    chipLabel: {
      default: null,
      type: cc.Node,
    },

  },

  start() {
    this.node.zIndex = 2;
    this.node.position = this.field.position;
    this.scorePool = new cc.NodePool();
  },

  displayLevelScore(currentScore, requiredScore) {
    this.levelScoreDisplay.string = currentScore + "/" + requiredScore;
  },

  displayMovies(movies) {
    this.moviesDisplay.string = movies;
  },

  displayLevel(level, goalColor) {
    this.levelLabel.string = "Level: " + level;
    this.chipLabel.color = goalColor;
  },

  setLevelProgressPosition(x, y, zIndex) {
    this.levelProgress.x = x;
    this.levelProgress.y = y;
    this.levelProgress.zIndex = zIndex;
  },

  spawnScoreFX: function () {
    let fx;
    if (this.scorePool.size() > 0) {
      fx = this.scorePool.get();
      return fx;
    } else {
      fx = cc.instantiate(this.scoreFXPrefab);
      fx.ScoreAnimComponent = fx.getComponent("ScoreAnim");
      return fx;
    }
  },

  createScoreAnim(num, pos) {
    let fx = this.spawnScoreFX();
    this.node.addChild(fx);
    fx.ScoreAnimComponent.init(this);
    fx.zIndex = 10;
    fx.setPosition(pos);
    fx.ScoreAnimComponent.label.string = "+" + num;
    fx.getComponent(cc.Animation).play();
  },

  despawnScoreFX(scoreFX) {
    this.scorePool.put(scoreFX);
  },

});
