const FieldModel = cc.Class({

  ctor: function (controller, view) {
    this.view = view;
    this.controller = controller;

    this.fieldMatrix = [

      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
    ],

    this.cellSize = 62;
    this.minGroup = 3;
    this.spriteColors;
    let initRenderParameters = this.view.getInitRenderFieldParameters();
    this.setInitRenderFieldParameters(initRenderParameters);
    this.fieldCells = [];
    this.columnsHeight = [];

    this.cellSide = {  // cellSide
      UP: {rowDisplaced: 1, columnDisplaced: 0}, 
      DOWN: {rowDisplaced: -1, columnDisplaced: 0},
      RIGHT: {rowDisplaced: 0, columnDisplaced: 1},
      LEFT: {rowDisplaced: 0, columnDisplaced: -1}
    }

    this.direction = {
      VERTICAL: "vertical",
      HORIZONTAL: "horizontal",
      DUAL: "dual",
      UNKNOWN: "unknown"
    };

    this.spriteState = {
      NORMAL: "normal",
      VERTICAL_STACK: "verticalStack",
      HORIZONTAL_STACK: "horizontalStack",
      RAINBOW_BALL: "rainbowBall"
    };

  },

  init() {
    this.view.init();
    this.passingModel = this.controller.passingModel;
    this.createField();
    this.setColumnsHeight();
    this.view.createChipsPool(this.fieldCells.length);
  },

  setInitRenderFieldParameters(parameters) {
    this.spriteColors = parameters.spriteColors;
  },

  createField() {
    const matrix = this.fieldMatrix;
    this.fieldCells = [];
    let shift = this.cellSize / 2;
    for (let r = matrix.length - 1 ; r >= 0; r--) {
      let row = [];
      for (let c = 0; c < matrix[r].length; c++) {
        let cell = {};
        cell.size = this.cellSize;
        cell.row = matrix.length - 1 - r;
        cell.col = c;
        cell.position = cc.v2(shift + cell.col * this.cellSize, shift + cell.row * this.cellSize);
        cell.color = matrix[r][c];
        cell.sprite = null;
        row.push(cell);
        cell.cage = this.view.createFieldCage(cell);
      }
      this.fieldCells.push(row);
    }
  },

  setColumnsHeight() {
    let columnsHeight = [];
    for (let r = 0; r < this.fieldCells.length; r++) {
      for (let c = 0; c < this.fieldCells[r].length; c++) {
        if (columnsHeight[c])columnsHeight[c] = r + 1;
        else columnsHeight.push(r + 1);
      }
    }

    this.columnsHeight = columnsHeight;
  },

  getRondomColor() {
    const randomIndex = Math.floor(Math.random() * this.spriteColors.length);
    return randomIndex;
  },

  setSpriteColor(sprite, colorIndex) {
    sprite.colorIndex = colorIndex;
    this.view.setColor(sprite, colorIndex);
    return sprite.colorIndex;
  },

  setSpriteToInitPosition(cell, sprite) {
    const initYSpritePosition = this.cellSize * this.columnsHeight[cell.col] + this.cellSize / 2; // cell узнать высоту ей колонки
    this.view.setChipToInitPosition(cell, sprite, initYSpritePosition);
    cell.sprite = sprite;
    sprite.fallHeight = 0;
    sprite.cell = cell;
  },

  // функция для проверки готовых коминаций при заполнении поля
  checkMatches(row, column, colorIndex) {
    if (column > 1) {
      let privInRowColorIndex1 = this.fieldCells[row][column - 1].sprite.colorIndex;
      let privInRowColorIndex2 = this.fieldCells[row][column - 2].sprite.colorIndex;

      if (colorIndex === privInRowColorIndex1 && colorIndex === privInRowColorIndex2) {
        colorIndex = (colorIndex + 1) % this.spriteColors.length;
      }
    }

    if (row > 1 && this.fieldCells[row - 2][column]) {
      let privInColColorIndex1 = this.fieldCells[row - 1][column].sprite.colorIndex;
      let privInColColorIndex2 = this.fieldCells[row - 2][column].sprite.colorIndex;

      if (colorIndex === privInColColorIndex1 && colorIndex === privInColColorIndex2) {
        colorIndex = (colorIndex + 1) % this.spriteColors.length;
      }
    }

    return colorIndex;
  },

  fillFieldWithSprites() {
    const fieldCells = this.fieldCells;
    let sprites = [];
    for (let r = 0; r < fieldCells.length; r++) {
      for (let c = 0; c < fieldCells[r].length; c++) {
        const cell = fieldCells[r][c];
        if (!cell.sprite) {
          let sprite = this.view.spawnNewChip();
          let colorIndex = this.getRondomColor();
          sprite.state = this.spriteState.NORMAL; 
          colorIndex = this.checkMatches(r, c, colorIndex);
          this.setSpriteColor(sprite, colorIndex);
          this.setSpriteToInitPosition(cell, sprite);
          sprites.push(sprite);
          sprite.on(this.controller.cursorEvents.down, function () {});
        }
      }
    }
    return sprites.reverse();
  },

  // получить все спрайты поля
  getFieldSprites() {
    const arr = this.fieldCells;
    let sprites = [];
    for (let r = 0; r < arr.length; r++) {
      for (let c = 0; c < arr[r].length; c++) {
        let sprite = arr[r][c].sprite;
        if (sprite) sprites.push(sprite);
      }
    }
    return sprites;
  },
  // получить спрайты определенного цвета
  getSameColorSprites(colorIndex) {
    const arr = this.fieldCells;
    let sprites = [];

    for (let r = 0; r < arr.length; r++) {
      for (let c = 0; c < arr[r].length; c++) {
        let sprite = arr[r][c].sprite;
        if (sprite && sprite.colorIndex === colorIndex) sprites.push(sprite);
      }
    }

    return sprites;
  },

  // посчитать количество спрайтов заданного цвета в массиве
  countSameColorSprites(colorIndex, arr) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].colorIndex === colorIndex) counter++;
    }

    return counter;
  },

  // получить спрайты определенного горизонтального ряда
  getRowSprites(row) {
    const arr = this.fieldCells;
    let sprites = [];
    for (let col = 0; col < arr[row].length; col++) {
      let sprite = arr[row][col].sprite;
      if (sprite) sprites.push(sprite);
    }
    return sprites;
  },

  //получить спрайты определенного вертикального ряда
  getColSprites(column) {
    const arr = this.fieldCells;
    let sprites = [];
    for (let row = 0; row < arr.length; row++) {
      let sprite;
      if (arr[row][column]) sprite = arr[row][column].sprite;
      if (sprite) sprites.push(sprite);
    }
    return sprites;
  },

  // получить соседние от спрайты от заданного
  getNeighborSprites(sprite) {
    let neighborSprites = [];
    let cell = sprite.cell;
    let rightCell = this.getRightCell(cell);
    if (rightCell && rightCell.sprite) neighborSprites.push(rightCell.sprite);
    let leftCell = this.getLeftCell(cell);
    if (leftCell && leftCell.sprite) neighborSprites.push(leftCell.sprite);
    let upCell = this.getUpCell(cell);
    if (upCell && upCell.sprite) neighborSprites.push(upCell.sprite);
    let downCell = this.getDownCell(cell);
    if (downCell && downCell.sprite) neighborSprites.push(downCell.sprite);

    return neighborSprites;
  },

  getDisplacedCell(cell, rowOffset, columnOffset) {
    const arr = this.fieldCells;
    const { col, row } = cell;
    const rowLength = arr[row].length;
    const rowNum = arr.length;
    // проверка на наличие соседней ячейки, иначе получим ошибку при попытке получить ячейку, которой нет
    function isNeighborCell(){
      if (columnOffset === 1) {if (col === (rowLength - 1)) return false}
      if (columnOffset === -1) {if (col === 0) return false}
      if (rowOffset === 1) {if (row === (rowNum - 1)) return false}
      if (rowOffset === -1) {if (row === 0) return false}
      return true;
    };
    if(!isNeighborCell()) return false;
    return arr[row + rowOffset] [col + columnOffset];
  },

  //получить правую клетку от заданной
  getRightCell(cell) {
  return this.getDisplacedCell(cell, 0, 1);
  },

  //получить левую клетку от заданной
  getLeftCell(cell) {
     return this.getDisplacedCell(cell, 0, -1);
  },

  //получить верхнюю клетку от заданной
  getUpCell(cell) {
     return this.getDisplacedCell(cell, 1, 0);
  },

  //получить нижнюю клетку от заданной
  getDownCell(cell) {
      return this.getDisplacedCell(cell, -1, 0);
  },

  // найти образует ли спрайт комбинации 3 в ряд и вернуть объект с информацией о этих комбинациях
  findSameColorGroup(sprite) {
    const sameColor = sprite.colorIndex;
    const cell = sprite.cell;
    const verticalGroup = [];
    const horizontalGroup = [];
    let minGroup = this.minGroup - 1; // так как целевой спрайт возвращаем отдельно от группы

    function checkToSide(cell,  side) {
      let nextCell = this.getDisplacedCell(cell, side.rowDisplaced, side.columnDisplaced); 
      if (!nextCell) return;
      let nextSprite = nextCell.sprite;
      if (!nextSprite) return;
      if (nextSprite.colorIndex === sameColor) {
        if (side === this.cellSide.UP || side === this.cellSide.DOWN) verticalGroup.push(nextSprite);
        if (side === this.cellSide.RIGHT || side === this.cellSide.LEFT) horizontalGroup.push(nextSprite);
        checkToSide(nextCell, side);
      }
    }

    this.getDisplacedCell = this.getDisplacedCell.bind(this);
    checkToSide = checkToSide.bind(this);

    checkToSide(cell, this.cellSide.UP);
    checkToSide(cell, this.cellSide.DOWN);
    checkToSide(cell, this.cellSide.RIGHT);
    checkToSide(cell, this.cellSide.LEFT);

    if (verticalGroup.length < minGroup && horizontalGroup.length < minGroup) return false;

    let groupInformation = {
      target: sprite,
      group: [],
      color: sameColor,
      direction: this.direction.UNKNOWN,
    };

    if (verticalGroup.length >= minGroup && horizontalGroup.length >= minGroup) {
      const group = verticalGroup.concat(horizontalGroup);
      groupInformation.group = group;
      groupInformation.length = group.length + 1;
      groupInformation.direction = this.direction.DUAL;
      return groupInformation;
    }

    if (verticalGroup.length >= minGroup) {
      groupInformation.group = verticalGroup;
      groupInformation.direction = this.direction.VERTICAL;
      groupInformation.length = verticalGroup.length + 1;
      return groupInformation;
    }

    if (horizontalGroup.length >= minGroup) {
      groupInformation.group = horizontalGroup;
      groupInformation.direction = this.direction.HORIZONTAL;
      groupInformation.length = horizontalGroup.length + 1;
      return groupInformation;
    }
  },

  getSpriteCell(sprite) {
    const arr = this.fieldCells;
    const cell = sprite.cell;
    if (!cell) return;
    const col = cell.col;
    const row = cell.row;
    return arr[row][col];
  },

  findMatchesInField: function () {
    let matchGroups = []; // массив из найденных групп
    const arr = this.fieldCells;
    this.maxFallTime = Math.sqrt(2 * this.currentMaxFallHaight / this.fallingAccel);
    for (let r = 0; r < arr.length; r++) {
      for (let c = 0; c < arr[r].length; c++) {
        const sprite = arr[r][c].sprite;
        if (!sprite) continue;
        let group = this.findSameColorGroup(sprite).group;
        if (group) {
          group.push(sprite);
          group.forEach((sprite) => this.getSpriteCell(sprite).sprite = null);
          matchGroups.push(group);
        }
      }
    }
    if (matchGroups.length < 1) return false;
    return matchGroups;
  },

});

module.exports = FieldModel;
