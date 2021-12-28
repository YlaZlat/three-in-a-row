const FieldModel = require("FieldModel");
const FieldActions = require("FieldActions");
const FieldView = require("FieldView");
const BackGround = require("BackGround");

const PassingModel = require("PassingModel");
const PassingView = require("PassingView");

const MainMenuView = require("MainMenuView");
const MainMenuModel = require("MainMenuModel");

const GameOverMenuView = require("GameOverMenuView");
const GameOverMenuModel = require("GameOverMenuModel");

const NextLevelMenuView = require("NextLevelMenuView");
const NextLevelMenuModel = require("NextLevelMenuModel");

const WinMenuView = require("WinMenuView");
const WinMenuModel = require("WinMenuModel");

const GameStates = require("GameStates");

cc.Class({
  extends: cc.Component,

  properties: {

    fieldView: {
      default: null,
      type: FieldView,
    },

    backGround: {
      default: null,
      type: BackGround,
    },

    passingView: {
      default: null,
      type: PassingView,
    },

    mainMenuView: {
      default: null,
      type: MainMenuView,
    },

    gameOverMenuView: {
      default: null,
      type: GameOverMenuView,
    },

    nextLevelMenuView: {
      default: null,
      type: NextLevelMenuView,
    },

    winMenuView: {
      default: null,
      type: WinMenuView,
    },

    hammerBuster: {
      default: null,
      type: cc. Node,
    },

  },

  onLoad() {
    this.cursorEvents = {
      down: cc.Node.EventType.MOUSE_DOWN,
      up: cc.Node.EventType.MOUSE_UP,
      move: cc.Node.EventType.MOUSE_MOVE,
      click: "click", // в докумнтации по кокос не обнаружила в явном виде енум для click...

      //не используются на мобильных устройствах
      enter: cc.Node.EventType.MOUSE_ENTER,
      leave: cc.Node.EventType.MOUSE_LEAVE,
    };

    if (cc.sys.isMobile) {
      this.cursorEvents.down = cc.Node.EventType.TOUCH_START;
      this.cursorEvents.up = cc.Node.EventType.TOUCH_END;
      this.cursorEvents.move = cc.Node.EventType.TOUCH_MOVE;
      this.activateSwipeHandler = this.activateTouchSwipeHandler; 
      this.disActivateSwipeHandler = this.disActivateTouchSwipeHandler;
    }

    // состояния игры
    this.state = new GameStates();

    this.fieldModel = new FieldModel(this, this.fieldView);
    this.fieldActions = new FieldActions(this, this.fieldView);
    this.passingModel = new PassingModel(this, this.passingView);
    this.mainMenuModel = new MainMenuModel(this, this.mainMenuView);
    this.nextLevelMenuModel = new NextLevelMenuModel(this, this.nextLevelMenuView);
    this.gameOverMenuModel = new GameOverMenuModel(this, this.gameOverMenuView);
    this.winMenuModel = new WinMenuModel(this, this.winMenuView);
    
    this.fieldModel.init();
    this.fieldActions.init();
    this.backGround.init();
    this.passingModel.init();
    this.mainMenuModel.init();
    this.gameOverMenuModel.init();
    this.nextLevelMenuModel.init();
  },

  start() {
    this.onMainMenu();
  },

  onGame() {
    this.state.reset();
    this.state.game = true;
    this.onGameEvent();
  },

  offGame() {
    this.state.game = false;
    this.offGameEvent();
  },

  onMenu(menu){ 
    this.state.reset();
    menu.state = true; 
    menu.enable();
  },

  onMainMenu(){
    this.onMenu(this.mainMenuModel);
  },

  onNextLevelMenu(){
    this.onMenu(this.nextLevelMenuModel);
  },

  onWinMenu(){
    this.onMenu(this.winMenuModel);
  },

  onGameOverMenu(){
    this.onMenu(this.gameOverMenuModel);
  },

  onGameEvent() {
    this.state.game = true;
    this.fieldView.node.on(this.cursorEvents.down, this.gameOnMouseDown, this);
  },

  offGameEvent() {
    this.fieldView.node.off(this.cursorEvents.down, this.gameOnMouseDown, this);
  },

  gameOnMouseDown(event) {
    if (event.target === event.currentTarget) return;
    event.stopPropagation();
    let target = event.target;
    this.offGameEvent();
    this.onGameEvantHandler(target);
  },

  onGameEvantHandler(target) {
    this.fieldActions.sprite1 = target;
    this.activateSwipeHandler(target);
    this.actevateDublClickHandler(target);
    target.on(this.cursorEvents.up, this.activateAlternatePressingHandler, this);
    this.fieldView.node.on(this.cursorEvents.up, this.offGameEvantHandlerAndReturnGameEvent, this);
    this.fieldView.node.on(this.cursorEvents.leave, this.offGameEvantHandlerAndReturnGameEvent, this);
  },

  offGameEvantHandler() {
    this.fieldView.node.off(this.cursorEvents.up, this.offGameEvantHandlerAndReturnGameEvent, this);
    this.fieldView.node.off(this.cursorEvents.leave, this.offGameEvantHandlerAndReturnGameEvent, this);
    this.disActivateSwipeHandler();
    this.disActivateAlternatePressingHandler();
    this.disActevateDublClickHandler();
  },

  offGameEvantHandlerAndReturnGameEvent() {
    this.offGameEvantHandler();
    this.onGameEvent();
    this.fieldActions.sprite1 = null;
  },

  activateSwipeHandler(target) {
    const sprites = this.fieldModel.getNeighborSprites(target);
    sprites.forEach((sprite) => sprite.on(this.cursorEvents.move, this.onGameAction, this));
  },

  disActivateSwipeHandler() {
    const target = this.fieldActions.sprite1;
    if (!target) return;
    const sprites = this.fieldModel.getNeighborSprites(target);
    sprites.forEach((sprite) => {
      sprite.off(this.cursorEvents.move, this.onGameAction, this);
    });
  },

  activateTouchSwipeHandler(target) {
    this.fieldView.node.on(this.cursorEvents.move, this.fieldOnTouchMove, this);
  },

  disActivateTouchSwipeHandler() {
    this.fieldView.node.off(this.cursorEvents.move, this.fieldOnTouchMove, this);
  },

  actevateDublClickHandler(target) {
    target.on(this.cursorEvents.down, this.gameOnDublClick, this);
    setTimeout(() => target.off(this.cursorEvents.down, this.gameOnDublClick, this), 300);
  },

  disActevateDublClickHandler() {
    const target = this.fieldActions.sprite1;
    if (!target) return;
    target.off(this.cursorEvents.down, this.gameOnDublClick, this);
  },

  gameOnDublClick(event) {
    let target = event.target;
    this.offGameEvantHandler();
    this.fieldActions.onDublClick(target);
  },

  // включить слушатели для обработки поочередного выделения рядомстоящих элементов
  activateAlternatePressingHandler(event) {
    event.stopPropagation();
    const target = event.target;
    target.off(this.cursorEvents.up, this.activateAlternatePressingHandler, this);
    this.disActivateSwipeHandler();
    const neighborsSprites = this.fieldModel.getNeighborSprites(target);
    neighborsSprites.forEach((sprite) => {
      sprite.on(this.cursorEvents.down, this.onGameAction, this);
    });
    setTimeout(() => {
      this.offGameEvantHandler();
      this.onGame();
    }, 1000);
  },

  disActivateAlternatePressingHandler() {
    const target = this.fieldActions.sprite1;
    if (!target) return;
    target.off(this.cursorEvents.up, this.activateAlternatePressingHandler, this);
    const sprites = this.fieldModel.getNeighborSprites(target);
    sprites.forEach((sprite) => {
      sprite.off(sprite.off(this.cursorEvents.down, this.onGameAction, this));
    });
  },

  onGameAction(event) {
    this.offGameEvantHandler();
    let target = event.target;
    this.fieldActions.sprite2 = target;
    this.fieldActions.onSwipe();
  },

  fieldOnTouchMove(event) {
    let target = event.target;
    const sprites = this.fieldModel.getNeighborSprites(target);
    const touchPosition = this.fieldView.node.convertToNodeSpaceAR(event.getLocation());
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i].getBoundingBox().contains(touchPosition)) {
        this.disActivateSwipeHandler(target);
        this.fieldActions.sprite2 = sprites[i];
        this.fieldActions.onSwipe();
        return;
      }
    }
  },

  onFinishRebuild() {
    if (this.state.gameOver) {
      this.onGameOverMenu();
      return;
    }
    if (this.state.nextLevel) {
      this.onNextLevelMenu();
      return;
    }
    if (this.state.winMenu) {
      this.onWinMenu();
      return;
    }
    this.onGameEvent();
  },

  updateGame() {
    this.state.reset();
    this.hammerBuster.getComponent("HammerBusterController").init();
    this.passingModel.setLevel(0);
    this.fieldActions.despawnSprites(this.fieldModel.getFieldSprites());
    this.fieldActions.init();
  },

  restart() {
    this.updateGame();
    this.onNextLevelMenu();
  },

  exit() {
    this.updateGame();
    this.onMainMenu();
  }

});
