const BackGround = require("BackGround");

cc.Class({
  extends: cc.Component,

  properties: {

    cellPrefab: {
      default: null,
      type: cc.Prefab,
    },

    chipPrefab: {
      default: null,
      type: cc.Prefab,
    },

    RainbowTexture: {
      default: null,
      type: cc.SpriteFrame, 
    },

    normalTexture: {
      default: null,
      type: cc.SpriteFrame, 
    },

    stackTexture: {
      default: null,
      type: cc.SpriteFrame, 
    },

    chipColors: {
      default: [],
      type: cc.Color,
    },

    cageColors: {
      default: [],
      type: cc.Color,
    },

  },

  init() {
    this.stackTexture.widthRatio = 1.25; // соотеношение ширины стэк текстуры фишки к ширине нормальной текстуры
    this.normalTexture.ratioOfChipSizeToCellSize = 0.9; // соотеношение размера фишки к размеру клетки
  },

  createChipsPool(initCount) {
    this.chipsPool = new cc.NodePool();
    for (let i = 0; i < initCount; ++i) {
      let chip = cc.instantiate(this.chipPrefab); // create node instance
      this.chipsPool.put(chip); // populate your pool with put method
    }
  },

  getInitRenderFieldParameters() {
    return ({
      spriteColors: this.chipColors,
    });
  },

  spawnNewChip: function () {
    let chip = null;
    if (this.chipsPool.size() > 0) {
      chip = this.chipsPool.get();
    } else {
      chip = cc.instantiate(this.chipPrefab);
    }
    chip.spriteComponent = chip.getComponent(cc.Sprite);
    return chip;
  },

  despawnChip: function (chip) {
    if (chip.spriteComponent.spriteFrame !== this.normalTexture) this.setSpriteNormalTexture(chip);
    this.chipsPool.put(chip);
  },

  setColor(chip, colorIndex) {
    chip.color = this.chipColors[colorIndex];
    return colorIndex;
  },

  setChipPosition(chip, pos) {
    chip.setPosition(pos.x, pos.y);
  },

  setChipToInitPosition(cell, chip, initYSpritePosition) {
    this.node.addChild(chip);
    chip.setPosition(cell.position.x, initYSpritePosition);
    chip.width = cell.size * this.normalTexture.ratioOfChipSizeToCellSize;
    chip.height = cell.size * this.normalTexture.ratioOfChipSizeToCellSize;
    chip.zIndex = 1;
  },

  createFieldCage(cell) {
    let cage = cc.instantiate(this.cellPrefab);
    cage.color = this.cageColors[cell.color];
    cage.setPosition(cell.position);
    cage.width = cell.size;
    cage.height = cell.size;
    this.node.addChild(cage);
    return cage;
  },

  replaceSprites(sprite1, sprite2) {
    return new Promise((resolve) => {
      let pos1 = sprite1.getPosition();
      let pos2 = sprite2.getPosition();
      let duration = 0.25;
      let tween = cc.tween;
      tween(sprite1)
        .call(() => {
          sprite1.zIndex = 2;
        })
        .parallel(
          tween().to(duration, { position: pos2 }),
          tween().by(duration / 2, { scale: 0.15 }).by(duration / 2, { scale: -0.15 }),
        )

        .call(() => {
          sprite1.zIndex = 1;
        })
        .start();

      tween(sprite2)
        .parallel(
          tween().to(duration, { position: pos1 }),
          tween().by(duration / 2, { scale: 0 }).by(duration / 2, { scale: 0 }),
        )

        .call(() => resolve())
        .start();
    });
  },

  moveSprite(sprite, time, pos) {
    return new Promise((resolve) => {
      let tween = cc.tween;
      tween(sprite)
        .parallel(
          tween().to(time, { position: pos }, { easing: "sineIn" }),
          tween().by(time / 2, { scale: 0.1 }).by(time / 2, { scale: -0.1 }),
        )
        .call(() => resolve())
        .start();
    });
  },

  fallSprite(sprite, fallTime, pos) {
    return new Promise((resolve) => {
      cc.tween(sprite)
        .to(fallTime, { position: pos }, { easing: "sineIn" })
        .call(() => resolve())
        .start();
    });
  },

  setSpriteNormalTexture(sprite) {
    sprite.spriteComponent.spriteFrame = this.normalTexture;
  },

  setSpriteRainbowBallTexture(sprite) {
    sprite.spriteComponent.spriteFrame = this.RainbowTexture;
    sprite.color = cc.Color.WHITE;
  },

  setSpriteStackTexture(sprite) {
    sprite.width = sprite.width * this.stackTexture.widthRatio;
    sprite.spriteComponent.spriteFrame = this.stackTexture;
  },

  setSpriteHorizontalStackTexture(sprite) {
    this.setSpriteStackTexture(sprite);
    sprite.rotation = 270;
  },

  setSpriteVetricalStackTexture(sprite) {
    this.setSpriteStackTexture(sprite);
  },

});
