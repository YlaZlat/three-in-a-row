const FieldModel = require('FieldModel');
const FieldActions = require('FieldActions');
const FieldViev = require('FieldViev');
const BackGround = require('BackGround');

const PassingModel = require('PassingModel');
const PassingViev = require('PassingViev');

const MainMenuViev = require('MainMenuViev');
const MainMenuModel = require('MainMenuModel');

const GameOverMenuViev = require('GameOverMenuViev');
const GameOverMenuModel = require('GameOverMenuModel');

const NextLevelMenuViev = require('NextLevelMenuViev');
const NextLevelMenuModel = require('NextLevelMenuModel'); 

const WinMenuViev = require('WinMenuViev');
const WinMenuModel = require('WinMenuModel');


cc.Class({
    extends: cc.Component,
   
    properties: {
       
        fieldViev: {
            default: null,
            type: FieldViev 
        }, 

        backGround: {
            default: null,
            type: BackGround
        },

        passingViev: {
            default: null,
            type: PassingViev 
        }, 

        mainMenuViev: {
            default: null,
            type: MainMenuViev 
        },

        gameOverMenuViev: {
            default: null,
            type: GameOverMenuViev 
        },

        nextLevelMenuViev: {
            default: null,
            type: NextLevelMenuViev
        },

        winMenuViev: {
            default: null,
            type: WinMenuViev
        },

        hammerBuster: {
            default: null,
            type: cc. Node
        },
        
    },  

    onLoad () {
// состояния игры
        this.state = {  game: false, 
                        mainMenu: true, 
                        nextLevel: false, 
                        winMenu: false,
                        gameOver: false,
                    };

        Object.defineProperty(this.state, 'resetState', {
            value: function(){
                for (let state in this) {
                    this[state] = false;
                }
            },
            enumerable: false,
        });
// системные события игры
        this.mousedown = 'mousedown';
        this.mouseup = 'mouseup';
        this.mousemove = 'mousemove';
        this.mouseleave = 'mouseleave';
        this.mouseenter = 'mouseenter';

        if (cc.sys.platform === cc.sys.MOBILE_BROWSER) {
             this.mousedown = 'touchstart';
             this.mouseup = 'touchend';
             this.mousemove = 'touchmove';
             this.mouseleave = 'touchcancel';
             this.mouseenter = 'touchstart';
             this.activateGameEventHandler = this.activateGameTouchHandler;
             this.disActivateGameEventHandler = this.disActivateGameTouchHandler;
        }

        this.fieldModel = new FieldModel(this, this.fieldViev);
        this.fieldActions = new FieldActions(this, this.fieldViev);
        this.passingModel = new PassingModel(this, this.passingViev);
        this.mainMenuModel = new MainMenuModel(this, this.mainMenuViev);
        this.nextLevelMenuModel = new NextLevelMenuModel (this, this.nextLevelMenuViev);
        this.gameOverMenuModel = new GameOverMenuModel(this, this.gameOverMenuViev);
        this.winMenuModel = new WinMenuModel(this, this.winMenuViev);

        this.fieldModel.init();
        this.fieldActions.init();
        this.backGround.init();
        this.passingModel.init();
        this.mainMenuModel.init();
        this.gameOverMenuModel.init();
        this.nextLevelMenuModel.init();

    },

    start(){
        this.resetGameStates();
        this.onMainMenu();
    },

    onGame(){
        this.resetGameStates();
        this.state.game = true;
        this.onGameEvent();
    },

    offGame(){
        this.state.game = false;
        this.offGameEvent();
    },

    onMainMenu(){
        this.resetGameStates();
        this.state.mainMenu = true;
        this.mainMenuModel.enable();
        this.onMainMenuEvent();
    },

    onNextLevel(){
        this.resetGameStates();
        this.state.nextLevel = true;
        this.passingModel.increaseLevel();
        this.nextLevelMenuModel.enable();
        this.onNextLevelMenuEvent();
    },

    onGameOver(){
        this.resetGameStates();
        this.state.gameOver = true;
        this.gameOverMenuModel.enable();
        this.onGameOverMenuEvent();
    },

    onWinMenu(){
        this.resetGameStates();
        this.state.winMenu = true;
        this.winMenuModel.enable();
        this.onWinMenuEvent();
    },

    onGameEvent(){
        this.state.game = true;     
        this.fieldViev.node.on(this.mousedown, this.gameOnMouseDown, this);  
    },

    offGameEvent(){
        this.fieldViev.node.off(this.mousedown, this.gameOnMouseDown, this);  
    },

    onMainMenuEvent(){
        this.mainMenuViev.playButton.node.on('click', this.onButtonPlay, this);  
    },

    onNextLevelMenuEvent(){
        this.nextLevelMenuViev.playButton.node.on('click', this.onButtonPlay, this);  
    },

    onGameOverMenuEvent(){
        this.gameOverMenuViev.restartButton.node.on('click', this.onRestartButton, this);
        this.gameOverMenuViev.addMoviesBotton.node.on('click', this.onButtoAddMoviesAndPlay, this);  
        this.gameOverMenuViev.exitBotton.node.on('click', this.onBottonExit, this);
    },

    onWinMenuEvent(){
        this.winMenuViev.restartButton.node.on('click', this.onRestartButton, this);
        this.winMenuViev.exitBotton.node.on('click', this.onBottonExit, this);
    },

    gameOnMouseDown(event){
        if(event.target === event.currentTarget) return;
        event.stopPropagation();
        this.offGameEvent();
        let target = event.target;
        this.waitDublClick(target);
        this.fieldActions.sprite1 = target;
        this.activateGameEventHandler(target);

    },

    waitDublClick(target){
        target.on(this.mousedown, this.gameOnDublClick, this); 
        setTimeout(()=> target.off(this.mousedown, this.gameOnDublClick, this), 300);
    },

    gameOnDublClick(event){
        let target = event.target;
        this.disActivateGameEventHandler(target);
        this.fieldActions.onDublClick(target);
    },

    onMouseup(event){
        this.disActivateGameEventHandler(this.fieldActions.sprite1);
        this.fieldActions.sprite1 = null;
        this.onGameEvent();
    },

    activateGameEventHandler(target){
        this.fieldViev.node.on(this.mouseup, this.onMouseup, this); 
        this.fieldViev.node.on(this.mouseleave, this.onMouseup, this);
        const sprites = this.fieldModel.getNeighborSprites(target);
        sprites.forEach((sprite)=> {
            sprite.on(this.mousemove, this.onMouseMove, this); 
            }
        )    
    },

    disActivateGameEventHandler(target){
        this.fieldViev.node.off(this.mouseup, this.onMouseup, this); 
        this.fieldViev.node.off(this.mouseleave, this.onMouseup, this);
        const sprites = this.fieldModel.getNeighborSprites(target);
        sprites.forEach((sprite)=> {
             sprite.off(this.mousemove, this.onMouseMove, this); 
             }
         )    
     },


    activateGameTouchHandler(target){
        cc.log("activateGameTouchHandler");
        this.fieldViev.node.on(this.mouseup, this.onMouseup, this); 
        this.fieldViev.node.on(this.mouseleave, this.onMouseup, this);
        this.fieldViev.node.on(this.mousemove, this.fieldOnTouchMove, this);
    },

    disActivateGameTouchHandler(target){
        cc.log("disActivateGameTouchHandler");
        this.fieldViev.node.off(this.mouseup, this.onMouseup, this); 
        this.fieldViev.node.off(this.mouseleave, this.onMouseup, this);
        this.fieldViev.node.off(this.mousemove, this.fieldOnTouchMove, this);
         
     },

     onMouseMove(event){
        this.disActivateGameEventHandler(this.fieldActions.sprite1)
        let target = event.target;
        this.fieldActions.sprite2 = target;
        this.fieldActions.onSwipe();
    },

    fieldOnTouchMove(event){
        cc.log(" fieldOnTouchMove");
        let target = event.target;
        const sprites = this.fieldModel.getNeighborSprites(target);
        var newVec2 = this.fieldViev.node.convertToNodeSpaceAR(event.getLocation());
        for(let i = 0; i< sprites.length; i++){
            if(sprites[i].getBoundingBox().contains(newVec2)){
                this.disActivateGameEventHandler(target); 
                this.fieldActions.sprite2 = sprites[i];
                this.fieldActions.onSwipe();
                return;
            }
        }
    }, 

    onFinishRebuild(){
        if(this.state.gameOver){
            this.onGameOver();
            return}
        if(this.state.nextLevel){
            this.onNextLevel();
            return}
        if(this.state.winMenu){
            this.onWinMenu();
            return}
        this.onGameEvent();
     },

    onButtonPlay(){
        this.onGame(); 
    },

    onButtoAddMoviesAndPlay(){
        this.passingModel.changeMovies(5);
        this.onGame();
    },

    onRestartButton(){
        this.restartGame();
    },

    onBottonExit(){
        this.resetGameStates();
        this.restartGame();
        this.onMainMenu();
    },

    restartGame(){
        this.hammerBuster.getComponent('HammerBusterController').init();
        this.gameOverMenuModel.disable();
        this.passingModel.setLevel(1);
        this.fieldActions.despawnSprites(this.fieldModel.getFieldSprites());
        this.fieldActions.init();
        this.onGame();
    },

    resetGameStates(){
        this.offGameEvent();
        this.mainMenuModel.disable();
        this.gameOverMenuModel.disable();
        this.nextLevelMenuModel.disable();
        this.winMenuModel.disable();
        this.state.resetState();
    },



});
