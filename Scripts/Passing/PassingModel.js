const PassingModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;
    this.fieldModel = this.controller.fieldModel;
    this.initMovies = 12;
    this.initRequiredLevelScore = 10;

    this.levelGoal = { 

      1: {
        movies: this.initMovies,
        requiredLevelScore: this.initRequiredLevelScore,
        colorIndex: 0,
      },

      2: {
        movies: this.initMovies,
        requiredLevelScore: 11,
        colorIndex: 1,
      },

      3: {
        movies: this.initMovies,
        requiredLevelScore: 12,
        colorIndex: 2,
      },

      4: {
        movies: this.initMovies,
        requiredLevelScore: 13,
        colorIndex: 3,
      },

      5: {
        movies: this.initMovies,
        requiredLevelScore: 14,
        colorIndex: 4,
      },

      6: {
        movies: this.initMovies,
        requiredLevelScore: 16,
        colorIndex: 5,
      },

    };

    this.collectChipsColorIndex;
  },

  init() {
    this.setLevel(0);
    this.maxLevel = Object.keys(this.levelGoal).length;
  },

  setLevel(level) {
    this.level = level;
    if(!level) return;
    this.collectChipsColorIndex = this.levelGoal[this.level].colorIndex;
    this.collectChipsColor = this.fieldModel.spriteColors[this.collectChipsColorIndex];
    this.levelMovies = this.levelGoal[this.level].movies;
    this.requiredLevelScore = this.levelGoal[level].requiredLevelScore;
    this.levelScore = 0;
    this.view.displayMovies(this.levelMovies);
    this.view.displayLevelScore(this.levelScore, this.requiredLevelScore);
    this.view.displayLevel(this.level, this.collectChipsColor);
  },

  changeMovies(n) {
    this.levelMovies += n;
    if (this.levelScore < this.requiredLevelScore && this.levelMovies < 1) {
      this.controller.state.gameOver = true;
    }
    this.view.displayMovies(this.levelMovies);
  },

  gainScore(num, pos) {
    pos.x += this.fieldModel.cellSize / 2;
    pos.y += this.fieldModel.cellSize / 2;
    this.levelScore += num;
    this.view.displayLevelScore(this.levelScore, this.requiredLevelScore);
    this.view.createScoreAnim(num, pos);

    if (this.levelScore < this.requiredLevelScore && this.levelMovies < 1) {
      this.controller.state.gameOver = true;
    }
    if (this.level === this.maxLevel && this.levelScore >= this.requiredLevelScore) {
      this.controller.state.winMenu = true;
      return;
    }
    if (this.levelScore >= this.requiredLevelScore) {
      this.controller.state.nextLevel = true;
    }
  },

  increaseLevel() {
    this.level++;
    this.setLevel(this.level);
  },

});

module.exports = PassingModel;
