window.__require=function e(t,i,n){function o(l,r){if(!i[l]){if(!t[l]){var c=l.split("/");if(c=c[c.length-1],!t[c]){var a="function"==typeof __require&&__require;if(!r&&a)return a(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+l+"'")}l=c}var h=i[l]={exports:{}};t[l][0].call(h.exports,function(e){return o(t[l][1][e]||e)},h,h.exports,e,t,i,n)}return i[l].exports}for(var s="function"==typeof __require&&__require,l=0;l<n.length;l++)o(n[l]);return o}({BackGround:[function(e,t,i){"use strict";cc._RF.push(t,"c6ebeOUU3VP0K2eh+qPhdxS","BackGround"),cc.Class({extends:cc.Component,properties:{},init:function(){this.createBackGround()},createBackGround:function(){var e=this.node.getComponent(cc.Graphics);this.backGroundColor=e.fillColor,e.rect(-this.node.width/2,-this.node.height/2,this.node.width,this.node.height),e.fill()}}),cc._RF.pop()},{}],BusterProtoController:[function(e,t,i){"use strict";cc._RF.push(t,"0c4a8KHdwBIkqX2CNiRbl8S","BusterProtoController");var n=e("GameController"),o=e("BusterProtoModel"),s=e("BusterProtoView"),l=cc.Class({extends:cc.Component,properties:{canvas:{default:null,type:cc.Node},game:{default:null,type:n},view:{default:null,type:s}},onLoad:function(){this.cursorEvents={},this.cursorEvents.down=this.game.cursorEvents.down,this.cursorEvents.up=this.game.cursorEvents.up,this.cursorEvents.move=this.game.cursorEvents.move,this.cursorEvents.leave=this.game.cursorEvents.leave,this.passingModel=this.game.passingModel,this.fieldActions=this.game.fieldActions,this.fieldModel=this.game.fieldModel,this.model=new o(this,this.view),this.model.init(),this.onBusterEvent()},offStandartGameEvents:function(){this.game.offGame()},onStandartGameEvents:function(){this.game.onGame()},onBusterEvent:function(){this.node.on(this.cursorEvents.down,this.onBusterMouseDown,this),this.node.on("click",this.onBusterClick,this)},offBusterEvent:function(){this.node.off(this.cursorEvents.down,this.onBusterMouseDown,this),this.node.off("click",this.onBusterClick,this)},onBusterClick:function(){this.game.state.game&&this.model.getBuster()},onBusterMouseDown:function(){if(this.game.state.game)return this.model.num<1?(this.model.setNumWarningColor(),this.node.on(this.cursorEvents.up,this.onBusterMouseUp,this),void this.node.on(this.cursorEvents.leave,this.onBusterMouseUp,this)):void 0},onBusterMouseUp:function(){this.model.setNumNormalColor(),this.node.off(this.cursorEvents.up,this.onBusterMouseUp,this),this.node.off(this.cursorEvents.leave,this.onBusterMouseUp,this)}});t.exports=l,cc._RF.pop()},{BusterProtoModel:"BusterProtoModel",BusterProtoView:"BusterProtoView",GameController:"GameController"}],BusterProtoModel:[function(e,t,i){"use strict";cc._RF.push(t,"40159aY/pBJP6VA81Qx1res","BusterProtoModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.passingModel=this.controller.passingModel,this.fieldModel=this.controller.fieldModel,this.num,this.initNum=0},init:function(){this.num=this.initNum,this.view.displayNum(this.num),this.view.setNumLabelNormalColor(),this.view.enable()},setNumNormalColor:function(){this.view.setNumLabelNormalColor()},setNumWarningColor:function(){this.view.setNumLabelWarningColor()},getBuster:function(){cc.log("\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u0435 \u043c\u0435\u0442\u043e\u0434!"),this.num}});t.exports=n,cc._RF.pop()},{}],BusterProtoView:[function(e,t,i){"use strict";cc._RF.push(t,"2de9fGMi0NHTYL/jd1EtIOX","BusterProtoView");var n=cc.Class({extends:cc.Component,properties:{numLabel:{default:null,type:cc.Label},numLabelNormalColor:cc.Color.WHITE,numLabelWarningColor:cc.Color.RED},enable:function(){this.node.active=!0},setNumLabelNormalColor:function(){this.numLabel.node.color=this.numLabelNormalColor},setNumLabelWarningColor:function(){this.numLabel.node.color=this.numLabelWarningColor},displayNum:function(e){this.numLabel.string=String(e)}});t.exports=n,cc._RF.pop()},{}],FieldActions:[function(e,t,i){"use strict";cc._RF.push(t,"ad8deOJTcVKF4H3Zjkfg40+","FieldActions");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.fallingAccel=20,this.spriteCollectSpeed=7,this.currentMaxFallHaight=0,this.maxFallTime=0,this.sprite1=null,this.sprite2=null},init:function(){this.passingModel=this.controller.passingModel,this.fieldModel=this.controller.fieldModel,this.direction=this.fieldModel.direction,this.spriteState=this.fieldModel.spriteState;var e=this.fieldModel.fillFieldWithSprites();this.setSpritesToField(e),this.collect\u0421hips=this.collect\u0421hips.bind(this)},pourOut:function(e){var t=this;return new Promise(function(i){var n=[];e.forEach(function(e){var i=(e.position.y-e.cell.position.y)/t.fieldModel.cellSize,o=Math.sqrt(2*i/t.fallingAccel);n.push(t.view.fallSprite(e,o,e.cell.position))}),Promise.all(n).then(function(){i()})})},setSpritesToField:function(e){var t=this;e.forEach(function(e){t.view.setChipPosition(e,e.cell.position)})},"collect\u0421hips":function(e,t){var i=this;return new Promise(function(n){var o=t.getPosition(),s=0;e.forEach(function(e){var t=e.getPosition().x,n=e.getPosition().y,l=Math.abs(o.x-t),r=Math.abs(o.y-n),c=(l||r)/i.fieldModel.cellSize/i.spriteCollectSpeed;c>s&&(s=c),i.view.moveSprite(e,c,o)}),setTimeout(function(){n(e)},1e3*(s+.3))})},gainScore:function(e,t){if(t){var i=this.passingModel.collectChipsColorIndex,n=this.fieldModel.countSameColorSprites(i,e);e.includes(t)||t.colorIndex!==i||n++,n&&this.passingModel.gainScore(n,t.getPosition())}},despawnSprites:function(e,t){t&&this.gainScore(e,t);for(var i=0;i<e.length;i++){this.fieldModel.getSpriteCell(e[i]).sprite=null,this.view.despawnChip(e[i])}},replaceSprites:function(e,t){var i=this;return new Promise(function(n){i.view.replaceSprites(e,t).then(function(){n()});var o=i.fieldModel.getSpriteCell(e),s=i.fieldModel.getSpriteCell(t);o.sprite=t,t.cell=o,s.sprite=e,e.cell=s})},onSwipe:function(){var e=this;this.sprite1&&this.sprite2?this.replaceSprites(this.sprite1,this.sprite2).then(function(){return Promise.all([e.checkReplace(e.sprite1),e.checkReplace(e.sprite2)])}).then(function(t){return t[0]||t[1]?(e.passingModel.changeMovies(-1),e.rebuildFieldWhileCombinations()):e.replaceSprites(e.sprite1,e.sprite2)}).then(function(){e.controller.onFinishRebuild()}):this.controller.onFinishRebuild()},onDublClick:function(e){var t=this;if(e.state&&(e.state===this.spriteState.HORIZONTAL_STACK||e.state===this.spriteState.VERTICAL_STACK)){var i;if(e.state===this.spriteState.HORIZONTAL_STACK){var n=e.cell.row;i=this.fieldModel.getRowSprites(n)}if(e.state===this.spriteState.VERTICAL_STACK){var o=e.cell.col;i=this.fieldModel.getColSprites(o)}this.collect\u0421hips(i,e).then(function(i){return t.passingModel.changeMovies(-1),t.despawnSprites(i,e)}).then(function(){return t.rebuildFieldWhileCombinations()}).then(function(){t.controller.onFinishRebuild()})}},normalGroupAction:function(e){var t=this,i=e.target,n=e.group;return this.collect\u0421hips(n,i).then(function(n){return e.length<4||e.verticalGroup.length&&e.horizontalGroup.length?(t.despawnSprites([].concat(n,[i]),i),n):4===e.length?(t.despawnSprites(n,i),e.verticalGroup.length&&t.changeSpriteState(i,t.spriteState.VERTICAL_STACK),e.horizontalGroup.length&&t.changeSpriteState(i,t.spriteState.HORIZONTAL_STACK),n):e.length>4&&(t.despawnSprites(n,i),t.changeSpriteState(i,t.spriteState.RAINBOW_BALL),n)})},horizontalCollect:function(e){var t=e.cell.row,i=this.fieldModel.getRowSprites(t);return this.collect\u0421hips(i,e)},verticalCollect:function(e){var t=e.cell.col,i=this.fieldModel.getColSprites(t);return this.collect\u0421hips(i,e)},stackGroupAction:function(e){var t,i=this,n=e.target;if(n.state===this.spriteState.VERTICAL_STACK){var o=n.cell.col;t=this.fieldModel.getColSprites(o),e.horizontalGroup&&e.horizontalGroup.length&&(t=t.concat(e.group))}if(n.state===this.spriteState.HORIZONTAL_STACK){var s=n.cell.row;t=this.fieldModel.getRowSprites(s),e.verticalGroup&&e.verticalGroup.length&&(t=t.concat(e.group))}if(t)return this.collect\u0421hips(t,n).then(function(e){return i.despawnSprites(e,n),e})},rainbowBallGroupAction:function(e){var t=this,i=this.sprite2.colorIndex,n=this.fieldModel.getSameColorSprites(i);return this.sprite2.state===this.spriteState.RAINBOW_BALL&&(n=this.fieldModel.getFieldSprites()),this.collect\u0421hips(n,e).then(function(i){return t.despawnSprites([].concat(i,[e]),e),i})},checkReplace:function(e){var t=this;return new Promise(function(i){if(e.state===t.spriteState.RAINBOW_BALL)return e!==t.sprite1?i(!1):t.rainbowBallGroupAction(e).then(function(e){i(e)});var n=t.fieldModel.findSameColorGroup(e);if(!n)return i(!1);n.group.forEach(function(i,o){i.state!==t.spriteState.VERTICAL_STACK&&i.state!==t.spriteState.HORIZONTAL_STACK||(n.group.splice(o,1,e),n.target=i)}),e.state===t.spriteState.NORMAL&&t.normalGroupAction(n).then(function(e){i(e)}),e.state!==t.spriteState.VERTICAL_STACK&&e.state!==t.spriteState.HORIZONTAL_STACK||t.stackGroupAction(n).then(function(e){i(e)})})},rebuildField:function(){var e=this;return new Promise(function(t){e.checkFieldForEmptyCells(),e.dumping(),setTimeout(function(){e.currentMaxFallHaight=0,e.maxFallTime=0;var i=e.fieldModel.fillFieldWithSprites();e.pourOut(i).then(function(){t()})},1e3*e.maxFallTime)})},rebuildFieldWhileCombinations:function(){var e=this;return new Promise(function(t){e.rebuildField().then(function(){return e.sprite1,e.sprite2=null,e.handleMatchesAfterRebuild()}).then(function(){t()})})},checkFieldForEmptyCells:function(){var e=this.fieldModel.fieldCells;function t(e){for(var t=!1,i=1;i<e.length;i++)for(var n=0;n<e[i].length;n++){var o=e[i][n],s=e[i-1][n];o.sprite&&(s.sprite||(t=!0,s.sprite=o.sprite,o.sprite=null,s.sprite.fallHeight++,s.sprite.cell=s,s.sprite.fallHeight>this.currentMaxFallHaight&&(this.currentMaxFallHaight=s.sprite.fallHeight)))}return t}for(t=t.bind(this);t(e);)t(e)},dumping:function(){var e=this.fieldModel.fieldCells;this.maxFallTime=Math.sqrt(2*this.currentMaxFallHaight/this.fallingAccel);for(var t=0;t<e.length;t++)for(var i=0;i<e[t].length;i++){var n=e[t][i].sprite,o=e[t][i];if(n&&n.fallHeight){var s=Math.sqrt(2*n.fallHeight/this.fallingAccel);n.fallHeight=0,this.view.fallSprite(n,s,o.position)}}},handleMatchesAfterRebuild:function(){var e=this;return new Promise(function(t){var i=e.fieldModel.findMatchesInField();if(!i)return t();var n=[];i.forEach(function(t){n.push(e.collect\u0421hips(t,t[1]).then(function(t){e.despawnSprites(t,t[1])}))}),Promise.all(n).then(function(){return e.rebuildField()}).then(function(){return e.handleMatchesAfterRebuild()}).then(function(){t()})})},changeSpriteState:function(e,t){e.state=t,t===this.spriteState.RAINBOW_BALL&&(e.colorIndex=null,this.view.setSpriteRainbowBallTexture(e)),t===this.spriteState.VERTICAL_STACK&&this.view.setSpriteHorizontalStackTexture(e),t===this.spriteState.HORIZONTAL_STACK&&this.view.setSpriteVetricalStackTexture(e)}});t.exports=n,cc._RF.pop()},{}],FieldModel:[function(e,t,i){"use strict";cc._RF.push(t,"ed045Z9+T1DF6++dDqqP8w4","FieldModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.fieldMatrix=[[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1],[0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1]],this.cellSize=62,this.minGroup=3,this.spriteColors;var i=this.view.getInitRenderFieldParameters();this.setInitRenderFieldParameters(i),this.fieldCells=[],this.columnsHeight=[],this.cellSide={UP:{rowDisplaced:1,columnDisplaced:0},DOWN:{rowDisplaced:-1,columnDisplaced:0},RIGHT:{rowDisplaced:0,columnDisplaced:1},LEFT:{rowDisplaced:0,columnDisplaced:-1}},this.spriteState={NORMAL:"normal",VERTICAL_STACK:"verticalStack",HORIZONTAL_STACK:"horizontalStack",RAINBOW_BALL:"rainbowBall"}},init:function(){this.view.init(),this.passingModel=this.controller.passingModel,this.createField(),this.setColumnsHeight(),this.view.createChipsPool(this.fieldCells.length)},setInitRenderFieldParameters:function(e){this.spriteColors=e.spriteColors},createField:function(){var e=this.fieldMatrix;this.fieldCells=[];for(var t=this.cellSize/2,i=e.length-1;i>=0;i--){for(var n=[],o=0;o<e[i].length;o++){var s={};s.size=this.cellSize,s.row=e.length-1-i,s.col=o,s.position=cc.v2(t+s.col*this.cellSize,t+s.row*this.cellSize),s.color=e[i][o],s.sprite=null,n.push(s),s.cage=this.view.createFieldCage(s)}this.fieldCells.push(n)}},setColumnsHeight:function(){for(var e=[],t=0;t<this.fieldCells.length;t++)for(var i=0;i<this.fieldCells[t].length;i++)e[i]?e[i]=t+1:e.push(t+1);this.columnsHeight=e},getRondomColor:function(){return Math.floor(Math.random()*this.spriteColors.length)},setSpriteColor:function(e,t){return e.colorIndex=t,this.view.setColor(e,t),e.colorIndex},setSpriteToInitPosition:function(e,t){var i=this.cellSize*this.columnsHeight[e.col]+this.cellSize/2;this.view.setChipToInitPosition(e,t,i),e.sprite=t,t.fallHeight=0,t.cell=e},checkToSide:function(e,t,i){var n=[];function o(e,t,i){var s=this.getDisplacedCell(e,t.rowDisplaced,t.columnDisplaced);if(s){var l=s.sprite;l&&l.colorIndex===i&&(n.push(l),o(s,t,i))}}return(o=o.bind(this))(e,t,i),n},fillFieldWithSprites:function(){for(var e=this.fieldCells,t=[],i=0;i<e.length;i++)for(var n=0;n<e[i].length;n++){var o=e[i][n];if(!o.sprite){var s=this.view.spawnNewChip();this.setSpriteToInitPosition(o,s);var l=this.getRondomColor();for(s.colorIndex=l;this.findSameColorGroup(s);)l=(l+1)%this.spriteColors.length,s.colorIndex=l;s.state=this.spriteState.NORMAL,this.setSpriteColor(s,l),t.push(s),s.on(this.controller.cursorEvents.down,function(){})}}return t.reverse()},getFieldSprites:function(){for(var e=this.fieldCells,t=[],i=0;i<e.length;i++)for(var n=0;n<e[r].length;n++){var o=e[i][n].sprite;o&&t.push(o)}return t},getSameColorSprites:function(e){for(var t=this.fieldCells,i=[],n=0;n<t.length;n++)for(var o=0;o<t[n].length;o++){var s=t[n][o].sprite;s&&s.colorIndex===e&&i.push(s)}return i},countSameColorSprites:function(e,t){for(var i=0,n=0;n<t.length;n++)t[n].colorIndex===e&&i++;return i},getRowSprites:function(e){for(var t=this.fieldCells,i=[],n=0;n<t[e].length;n++){var o=t[e][n].sprite;o&&i.push(o)}return i},getColSprites:function(e){for(var t=this.fieldCells,i=[],n=0;n<t.length;n++){var o=void 0;t[n][e]&&(o=t[n][e].sprite),o&&i.push(o)}return i},getNeighborSprites:function(e){var t=[],i=e.cell,n=this.getRightCell(i);n&&n.sprite&&t.push(n.sprite);var o=this.getLeftCell(i);o&&o.sprite&&t.push(o.sprite);var s=this.getUpCell(i);s&&s.sprite&&t.push(s.sprite);var l=this.getDownCell(i);return l&&l.sprite&&t.push(l.sprite),t},getDisplacedCell:function(e,t,i){var n=this.fieldCells,o=e.col,s=e.row,l=n[s].length,r=n.length;return!(1===i&&o===l-1||-1===i&&0===o||1===t&&s===r-1||-1===t&&0===s)&&n[s+t][o+i]},getRightCell:function(e){return this.getDisplacedCell(e,0,1)},getLeftCell:function(e){return this.getDisplacedCell(e,0,-1)},getUpCell:function(e){return this.getDisplacedCell(e,1,0)},getDownCell:function(e){return this.getDisplacedCell(e,-1,0)},findSameColorGroup:function(e){var t=e.colorIndex,i=e.cell,n=[],o=[],s=this.minGroup-1;this.getDisplacedCell=this.getDisplacedCell.bind(this),this.checkToSide=this.checkToSide.bind(this);var l=this.checkToSide(i,this.cellSide.UP,t),r=this.checkToSide(i,this.cellSide.DOWN,t),c=this.checkToSide(i,this.cellSide.RIGHT,t),a=this.checkToSide(i,this.cellSide.LEFT,t);n=n.concat(l).concat(r),o=o.concat(c).concat(a),n.length<s&&(n=[]),o.length<s&&(o=[]);var h=n.concat(o);return!(n.length<s&&o.length<s)&&{target:e,verticalGroup:n,horizontalGroup:o,group:h,length:h.length+1,color:t}},getSpriteCell:function(e){var t=this.fieldCells,i=e.cell;if(i){var n=i.col;return t[i.row][n]}},findMatchesInField:function(){for(var e=this,t=[],i=this.fieldCells,n=0;n<i.length;n++)for(var o=0;o<i[n].length;o++){var s=i[n][o].sprite;if(s){var l=this.findSameColorGroup(s).group;l&&(l.push(s),l.forEach(function(t){return e.getSpriteCell(t).sprite=null}),t.push(l))}}return!(t.length<1)&&t}});t.exports=n,cc._RF.pop()},{}],FieldView:[function(e,t,i){"use strict";cc._RF.push(t,"c46dc+4CAJFwIYTjqZ1jvow","FieldView");e("BackGround");cc.Class({extends:cc.Component,properties:{cellPrefab:{default:null,type:cc.Prefab},chipPrefab:{default:null,type:cc.Prefab},RainbowTexture:{default:null,type:cc.SpriteFrame},normalTexture:{default:null,type:cc.SpriteFrame},stackTexture:{default:null,type:cc.SpriteFrame},chipColors:{default:[],type:cc.Color},cageColors:{default:[],type:cc.Color}},init:function(){this.stackTexture.widthRatio=1.25,this.normalTexture.ratioOfChipSizeToCellSize=.9},createChipsPool:function(e){this.chipsPool=new cc.NodePool;for(var t=0;t<e;++t){var i=cc.instantiate(this.chipPrefab);this.chipsPool.put(i)}},getInitRenderFieldParameters:function(){return{spriteColors:this.chipColors}},spawnNewChip:function(){var e=null;return(e=this.chipsPool.size()>0?this.chipsPool.get():cc.instantiate(this.chipPrefab)).spriteComponent=e.getComponent(cc.Sprite),e},despawnChip:function(e){e.spriteComponent.spriteFrame!==this.normalTexture&&this.setSpriteNormalTexture(e),this.chipsPool.put(e)},setColor:function(e,t){return e.color=this.chipColors[t],t},setChipPosition:function(e,t){e.setPosition(t.x,t.y)},setChipToInitPosition:function(e,t,i){this.node.addChild(t),t.setPosition(e.position.x,i),t.width=e.size*this.normalTexture.ratioOfChipSizeToCellSize,t.height=e.size*this.normalTexture.ratioOfChipSizeToCellSize,t.zIndex=1},createFieldCage:function(e){var t=cc.instantiate(this.cellPrefab);return t.color=this.cageColors[e.color],t.setPosition(e.position),t.width=e.size,t.height=e.size,this.node.addChild(t),t},replaceSprites:function(e,t){return new Promise(function(i){var n=e.getPosition(),o=t.getPosition(),s=cc.tween;s(e).call(function(){e.zIndex=2}).parallel(s().to(.25,{position:o}),s().by(.125,{scale:.15}).by(.125,{scale:-.15})).call(function(){e.zIndex=1}).start(),s(t).parallel(s().to(.25,{position:n}),s().by(.125,{scale:0}).by(.125,{scale:0})).call(function(){return i()}).start()})},moveSprite:function(e,t,i){return new Promise(function(n){var o=cc.tween;o(e).parallel(o().to(t,{position:i},{easing:"sineIn"}),o().by(t/2,{scale:.1}).by(t/2,{scale:-.1})).call(function(){return n()}).start()})},fallSprite:function(e,t,i){return new Promise(function(n){cc.tween(e).to(t,{position:i},{easing:"sineIn"}).call(function(){return n()}).start()})},setSpriteNormalTexture:function(e){e.spriteComponent.spriteFrame=this.normalTexture},setSpriteRainbowBallTexture:function(e){e.spriteComponent.spriteFrame=this.RainbowTexture,e.color=cc.Color.WHITE},setSpriteStackTexture:function(e){e.width=e.width*this.stackTexture.widthRatio,e.spriteComponent.spriteFrame=this.stackTexture},setSpriteHorizontalStackTexture:function(e){this.setSpriteStackTexture(e),e.rotation=270},setSpriteVetricalStackTexture:function(e){this.setSpriteStackTexture(e)}}),cc._RF.pop()},{BackGround:"BackGround"}],GameController:[function(e,t,i){"use strict";cc._RF.push(t,"63e87BG2M1HLbUi5gxu7PIc","GameController");var n=e("FieldModel"),o=e("FieldActions"),s=e("FieldView"),l=e("BackGround"),r=e("PassingModel"),c=e("PassingView"),a=e("MainMenuView"),h=e("MainMenuModel"),u=e("GameOverMenuView"),d=e("GameOverMenuModel"),p=e("NextLevelMenuView"),f=e("NextLevelMenuModel"),v=e("WinMenuView"),m=e("WinMenuModel"),M=e("GameStates");cc.Class({extends:cc.Component,properties:{fieldView:{default:null,type:s},backGround:{default:null,type:l},passingView:{default:null,type:c},mainMenuView:{default:null,type:a},gameOverMenuView:{default:null,type:u},nextLevelMenuView:{default:null,type:p},winMenuView:{default:null,type:v},hammerBuster:{default:null,type:cc.Node}},onLoad:function(){this.cursorEvents={down:cc.Node.EventType.MOUSE_DOWN,up:cc.Node.EventType.MOUSE_UP,move:cc.Node.EventType.MOUSE_MOVE,click:"click",enter:cc.Node.EventType.MOUSE_ENTER,leave:cc.Node.EventType.MOUSE_LEAVE},cc.sys.isMobile&&(this.cursorEvents.down=cc.Node.EventType.TOUCH_START,this.cursorEvents.up=cc.Node.EventType.TOUCH_END,this.cursorEvents.move=cc.Node.EventType.TOUCH_MOVE,this.activateSwipeHandler=this.activateTouchSwipeHandler,this.disActivateSwipeHandler=this.disActivateTouchSwipeHandler),this.state=new M,this.fieldModel=new n(this,this.fieldView),this.fieldActions=new o(this,this.fieldView),this.passingModel=new r(this,this.passingView),this.mainMenuModel=new h(this,this.mainMenuView),this.nextLevelMenuModel=new f(this,this.nextLevelMenuView),this.gameOverMenuModel=new d(this,this.gameOverMenuView),this.winMenuModel=new m(this,this.winMenuView),this.fieldModel.init(),this.fieldActions.init(),this.backGround.init(),this.passingModel.init(),this.mainMenuModel.init(),this.gameOverMenuModel.init(),this.nextLevelMenuModel.init()},start:function(){this.onMainMenu()},onGame:function(){this.state.reset(),this.state.game=!0,this.onGameEvent()},offGame:function(){this.state.game=!1,this.offGameEvent()},onMenu:function(e){this.state.reset(),e.state=!0,e.enable()},onMainMenu:function(){this.onMenu(this.mainMenuModel)},onNextLevelMenu:function(){this.onMenu(this.nextLevelMenuModel)},onWinMenu:function(){this.onMenu(this.winMenuModel)},onGameOverMenu:function(){this.onMenu(this.gameOverMenuModel)},onGameEvent:function(){this.state.game=!0,this.fieldView.node.on(this.cursorEvents.down,this.gameOnMouseDown,this)},offGameEvent:function(){this.fieldView.node.off(this.cursorEvents.down,this.gameOnMouseDown,this)},gameOnMouseDown:function(e){if(e.target!==e.currentTarget){e.stopPropagation();var t=e.target;this.offGameEvent(),this.onGameEvantHandler(t)}},onGameEvantHandler:function(e){this.fieldActions.sprite1=e,this.activateSwipeHandler(e),this.actevateDublClickHandler(e),e.on(this.cursorEvents.up,this.activateAlternatePressingHandler,this),this.fieldView.node.on(this.cursorEvents.up,this.offGameEvantHandlerAndReturnGameEvent,this),this.fieldView.node.on(this.cursorEvents.leave,this.offGameEvantHandlerAndReturnGameEvent,this)},offGameEvantHandler:function(){this.fieldView.node.off(this.cursorEvents.up,this.offGameEvantHandlerAndReturnGameEvent,this),this.fieldView.node.off(this.cursorEvents.leave,this.offGameEvantHandlerAndReturnGameEvent,this),this.disActivateSwipeHandler(),this.disActivateAlternatePressingHandler(),this.disActevateDublClickHandler()},offGameEvantHandlerAndReturnGameEvent:function(){this.offGameEvantHandler(),this.onGameEvent(),this.fieldActions.sprite1=null},activateSwipeHandler:function(e){var t=this;this.fieldModel.getNeighborSprites(e).forEach(function(e){return e.on(t.cursorEvents.move,t.onGameAction,t)})},disActivateSwipeHandler:function(){var e=this,t=this.fieldActions.sprite1;t&&this.fieldModel.getNeighborSprites(t).forEach(function(t){t.off(e.cursorEvents.move,e.onGameAction,e)})},activateTouchSwipeHandler:function(e){this.fieldView.node.on(this.cursorEvents.move,this.fieldOnTouchMove,this)},disActivateTouchSwipeHandler:function(){this.fieldView.node.off(this.cursorEvents.move,this.fieldOnTouchMove,this)},actevateDublClickHandler:function(e){var t=this;e.on(this.cursorEvents.down,this.gameOnDublClick,this),setTimeout(function(){return e.off(t.cursorEvents.down,t.gameOnDublClick,t)},300)},disActevateDublClickHandler:function(){var e=this.fieldActions.sprite1;e&&e.off(this.cursorEvents.down,this.gameOnDublClick,this)},gameOnDublClick:function(e){var t=e.target;this.offGameEvantHandler(),this.fieldActions.onDublClick(t)},activateAlternatePressingHandler:function(e){var t=this;e.stopPropagation();var i=e.target;i.off(this.cursorEvents.up,this.activateAlternatePressingHandler,this),this.disActivateSwipeHandler(),this.fieldModel.getNeighborSprites(i).forEach(function(e){e.on(t.cursorEvents.down,t.onGameAction,t)}),setTimeout(function(){t.offGameEvantHandler(),t.onGame()},1e3)},disActivateAlternatePressingHandler:function(){var e=this,t=this.fieldActions.sprite1;t&&(t.off(this.cursorEvents.up,this.activateAlternatePressingHandler,this),this.fieldModel.getNeighborSprites(t).forEach(function(t){t.off(t.off(e.cursorEvents.down,e.onGameAction,e))}))},onGameAction:function(e){this.offGameEvantHandler();var t=e.target;this.fieldActions.sprite2=t,this.fieldActions.onSwipe()},fieldOnTouchMove:function(e){for(var t=e.target,i=this.fieldModel.getNeighborSprites(t),n=this.fieldView.node.convertToNodeSpaceAR(e.getLocation()),o=0;o<i.length;o++)if(i[o].getBoundingBox().contains(n))return this.disActivateSwipeHandler(t),this.fieldActions.sprite2=i[o],void this.fieldActions.onSwipe()},onFinishRebuild:function(){this.state.gameOver?this.onGameOverMenu():this.state.nextLevel?this.onNextLevelMenu():this.state.winMenu?this.onWinMenu():this.onGameEvent()},updateGame:function(){this.state.reset(),this.hammerBuster.getComponent("HammerBusterController").init(),this.passingModel.setLevel(0),this.fieldActions.despawnSprites(this.fieldModel.getFieldSprites()),this.fieldActions.init()},restart:function(){this.updateGame(),this.onNextLevelMenu()},exit:function(){this.updateGame(),this.onMainMenu()}}),cc._RF.pop()},{BackGround:"BackGround",FieldActions:"FieldActions",FieldModel:"FieldModel",FieldView:"FieldView",GameOverMenuModel:"GameOverMenuModel",GameOverMenuView:"GameOverMenuView",GameStates:"GameStates",MainMenuModel:"MainMenuModel",MainMenuView:"MainMenuView",NextLevelMenuModel:"NextLevelMenuModel",NextLevelMenuView:"NextLevelMenuView",PassingModel:"PassingModel",PassingView:"PassingView",WinMenuModel:"WinMenuModel",WinMenuView:"WinMenuView"}],GameOverMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"e44b6iYDnVMHrsF/9jKXeIe","GameOverMenuModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.state=this.controller.state.gameOver,this.passingModel=this.controller.passingModel},init:function(){this.disable()},enable:function(){this.view.enable(),this.onEvent()},disable:function(){this.view.disable()},onEvent:function(){this.view.restartButton.node.on(this.controller.cursorEvents.click,this.onRestartButton,this),this.view.addMoviesButton.node.on(this.controller.cursorEvents.click,this.onButtoAddMoviesAndPlay,this),this.view.exitButton.node.on(this.controller.cursorEvents.click,this.onButtonExit,this)},onButtoAddMoviesAndPlay:function(){this.disable(),this.passingModel.changeMovies(5),this.controller.onGame()},onRestartButton:function(){this.disable(),this.controller.restart()},onButtonExit:function(){this.disable(),this.controller.exit()}});t.exports=n,cc._RF.pop()},{}],GameOverMenuView:[function(e,t,i){"use strict";cc._RF.push(t,"23bf5Jy9edPk7ybnYnLmZHx","GameOverMenuView"),cc.Class({extends:cc.Component,properties:{restartButton:{default:null,type:cc.Button},addMoviesButton:{default:null,type:cc.Button},exitButton:{default:null,type:cc.Button}},enable:function(){this.node.active=!0},disable:function(){this.node.active=!1}}),cc._RF.pop()},{}],GameStates:[function(e,t,i){"use strict";cc._RF.push(t,"2e13dqM1aROz5/wiy99QavG","GameStates");var n=cc.Class({ctor:function(){this.game=!1,this.mainMenu=!1,this.nextLevel=!1,this.winMenu=!1,this.gameOver=!1},reset:function(){for(var e in this)"boolean"==typeof this[e]&&(this[e]=!1)}});t.exports=n,cc._RF.pop()},{}],HammerBusterController:[function(e,t,i){"use strict";cc._RF.push(t,"1ade8+G6ENBrasI6Gqf7u+P","HammerBusterController");var n=e("BusterProtoController"),o=e("HammerBusterModel"),s=e("HammerBusterView");cc.Class({extends:n,properties:{view:{default:null,type:s,override:!0}},onLoad:function(){this._super(),this.model=new o(this,this.view),this.model.init(),this.hummer=null,this.fieldNode=this.view.fieldNode},init:function(){this.model.init()},onBusterClick:function(){this.game.state.game&&this.model.getHummer()&&(this.offStandartGameEvents(),this.canvas.on(this.cursorEvents.move,this.onMouseMove,this),this.fieldNode.on(this.cursorEvents.down,this.onFieldMouseDown,this))},onMouseMove:function(e){var t=this.node.convertToNodeSpaceAR(e.getLocation());this.model.hummer.setPosition(t)},onFieldMouseDown:function(e){var t=this;if(e.target!==e.currentTarget){this.canvas.off(this.cursorEvents.move,this.onMouseMove,this),this.fieldNode.off(this.cursorEvents.down,this.onFieldMouseDown,this),e.stopPropagation();var i=e.target;this.model.onFieldHummerDown(i).then(function(){t.game.onFinishRebuild()})}}}),cc._RF.pop()},{BusterProtoController:"BusterProtoController",HammerBusterModel:"HammerBusterModel",HammerBusterView:"HammerBusterView"}],HammerBusterModel:[function(e,t,i){"use strict";cc._RF.push(t,"69800FjvldIIaMnExUO1O9+","HammerBusterModel");var n=e("BusterProtoModel"),o=cc.Class({extends:n,ctor:function(e,t){this.view=t,this.controller=e,this.passingModel=this.controller.passingModel,this.fieldModel=this.controller.fieldModel,this.fieldActions=this.controller.fieldActions,this.hammer,this.initNum=20},getHummer:function(){if(!(this.num<1))return this.num--,this.view.displayNum(this.num),this.hummer=this.view.spawnHummer(),this.hummer},despawnHummer:function(){this.view.despawnHummer(this.hummer),this.hummer=null},onFieldHummerDown:function(e){var t=this;return new Promise(function(i){t.despawnHummer();t.rebuildFieldWhileCombinations=t.fieldActions.rebuildFieldWhileCombinations.bind(t.fieldActions),new Promise(function(i){e.state===t.fieldModel.spriteState.VERTICAL_STACK||e.state===t.fieldModel.spriteState.HORIZONTAL_STACK?t.fieldActions.stackGroupAction({target:e}).then(function(){i()}):(t.fieldActions.despawnSprites([e],e),i())}).then(function(){setTimeout(function(){t.rebuildFieldWhileCombinations().then(function(){i()})},500)})})}});t.exports=o,cc._RF.pop()},{BusterProtoModel:"BusterProtoModel"}],HammerBusterView:[function(e,t,i){"use strict";cc._RF.push(t,"d5128X7MOxNI7xXle4ExLaU","HammerBusterView");var n=e("BusterProtoView");cc.Class({extends:n,properties:{numLabel:{default:null,type:cc.Label,override:!0},hummerLabel:{default:null,type:cc.Node},hummerPrefab:{default:null,type:cc.Prefab},fieldNode:{default:null,type:cc.Node}},onLoad:function(){this.hummerPool=new cc.NodePool;var e=cc.instantiate(this.hummerPrefab);this.hummerPool.put(e)},spawnHummer:function(){var e=this.hummerPool.get(this);return this.node.addChild(e),e.zIndex=500,e.position=this.hummerLabel.position,e},despawnHummer:function(e){this.hummerPool.put(e)}}),cc._RF.pop()},{BusterProtoView:"BusterProtoView"}],MainMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"ec65fHAvNFNTK6Lr7ULVpVm","MainMenuModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.state=this.controller.state.mainMenu,this.fieldModel=this.controller.fieldModel,this.passingModel=this.controller.passingModel},init:function(){},enable:function(){this.view.enable(),this.onEvent()},disable:function(){this.view.disable()},onEvent:function(){this.view.playButton.node.on(this.controller.cursorEvents.click,this.onButtonPlay,this)},onButtonPlay:function(){this.disable(),this.controller.onNextLevelMenu()}});t.exports=n,cc._RF.pop()},{}],MainMenuView:[function(e,t,i){"use strict";cc._RF.push(t,"67028o2+IJJnIxBjh4Hyxwn","MainMenuView"),cc.Class({extends:cc.Component,properties:{levelInformation:{default:null,type:cc.Label},chipLabel:{default:null,type:cc.Node},playButton:{default:null,type:cc.Button},field:{default:null,type:cc.Node}},enable:function(){this.node.active=!0},displaylevelInformation:function(e,t,i,n){this.chipLabel.color=i,this.levelInformation.string="Level "+e+"\n Goal:  collect "+t+"\n in "+n+" movies!"},disable:function(){this.node.active=!1}}),cc._RF.pop()},{}],NextLevelMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"3e32fctO7tLYLY62pGFOXl0","NextLevelMenuModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.state=this.controller.state.nextLevel,this.passingModel=this.controller.passingModel},init:function(){this.disable()},enable:function(){this.passingModel.increaseLevel();var e=this.passingModel.level,t=this.passingModel.collectChipsColor,i=this.passingModel.requiredLevelScore,n=this.passingModel.levelMovies;this.view.enable(),this.onEvent(),this.view.displaylevelInformation(e,i,t,n)},disable:function(){this.view.disable()},onEvent:function(){this.view.playButton.node.on(this.controller.cursorEvents.click,this.onButtonPlay,this)},onButtonPlay:function(){this.disable(),this.controller.onGame()}});t.exports=n,cc._RF.pop()},{}],NextLevelMenuView:[function(e,t,i){"use strict";cc._RF.push(t,"e5a4aiLayFHp6T8zYXeJ+3P","NextLevelMenuView"),cc.Class({extends:cc.Component,properties:{levelInformation:{default:null,type:cc.Label},chipLabel:{default:null,type:cc.Node},playButton:{default:null,type:cc.Button}},enable:function(){this.node.active=!0},disable:function(){this.node.active=!1},displaylevelInformation:function(e,t,i,n){this.chipLabel.color=i,this.levelInformation.string="Level "+e+"\n Goal:  collect "+t+"\n in "+n+" movies!"}}),cc._RF.pop()},{}],PassingModel:[function(e,t,i){"use strict";cc._RF.push(t,"722fasBoDlJpqGw4WW1KlB/","PassingModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.fieldModel=this.controller.fieldModel,this.initMovies=12,this.initRequiredLevelScore=10,this.levelGoal={1:{movies:this.initMovies,requiredLevelScore:this.initRequiredLevelScore,colorIndex:0},2:{movies:this.initMovies,requiredLevelScore:11,colorIndex:1},3:{movies:this.initMovies,requiredLevelScore:12,colorIndex:2},4:{movies:this.initMovies,requiredLevelScore:13,colorIndex:3},5:{movies:this.initMovies,requiredLevelScore:14,colorIndex:4},6:{movies:this.initMovies,requiredLevelScore:16,colorIndex:5}},this.collectChipsColorIndex},init:function(){this.setLevel(0),this.maxLevel=Object.keys(this.levelGoal).length},setLevel:function(e){this.level=e,e&&(this.collectChipsColorIndex=this.levelGoal[this.level].colorIndex,this.collectChipsColor=this.fieldModel.spriteColors[this.collectChipsColorIndex],this.levelMovies=this.levelGoal[this.level].movies,this.requiredLevelScore=this.levelGoal[e].requiredLevelScore,this.levelScore=0,this.view.displayMovies(this.levelMovies),this.view.displayLevelScore(this.levelScore,this.requiredLevelScore),this.view.displayLevel(this.level,this.collectChipsColor))},changeMovies:function(e){this.levelMovies+=e,this.levelScore<this.requiredLevelScore&&this.levelMovies<1&&(this.controller.state.gameOver=!0),this.view.displayMovies(this.levelMovies)},gainScore:function(e,t){t.x+=this.fieldModel.cellSize/2,t.y+=this.fieldModel.cellSize/2,this.levelScore+=e,this.view.displayLevelScore(this.levelScore,this.requiredLevelScore),this.view.createScoreAnim(e,t),this.levelScore<this.requiredLevelScore&&this.levelMovies<1&&(this.controller.state.gameOver=!0),this.level===this.maxLevel&&this.levelScore>=this.requiredLevelScore?this.controller.state.winMenu=!0:this.levelScore>=this.requiredLevelScore&&(this.controller.state.nextLevel=!0)},increaseLevel:function(){this.level++,this.setLevel(this.level)}});t.exports=n,cc._RF.pop()},{}],PassingView:[function(e,t,i){"use strict";cc._RF.push(t,"60564shGtBDsaHIvYYaxq2r","PassingView"),cc.Class({extends:cc.Component,properties:{levelScoreDisplay:{default:null,type:cc.Label},moviesDisplay:{default:null,type:cc.Label},levelLabel:{default:null,type:cc.Label},scoreFXPrefab:{default:null,type:cc.Prefab},field:{default:null,type:cc.Node},chipLabel:{default:null,type:cc.Node}},start:function(){this.node.zIndex=2,this.node.position=this.field.position,this.scorePool=new cc.NodePool},displayLevelScore:function(e,t){this.levelScoreDisplay.string=e+"/"+t},displayMovies:function(e){this.moviesDisplay.string=e},displayLevel:function(e,t){this.levelLabel.string="Level: "+e,this.chipLabel.color=t},setLevelProgressPosition:function(e,t,i){this.levelProgress.x=e,this.levelProgress.y=t,this.levelProgress.zIndex=i},spawnScoreFX:function(){var e;return this.scorePool.size()>0?e=this.scorePool.get():((e=cc.instantiate(this.scoreFXPrefab)).ScoreAnimComponent=e.getComponent("ScoreAnim"),e)},createScoreAnim:function(e,t){var i=this.spawnScoreFX();this.node.addChild(i),i.ScoreAnimComponent.init(this),i.zIndex=10,i.setPosition(t),i.ScoreAnimComponent.label.string="+"+e,i.getComponent(cc.Animation).play()},despawnScoreFX:function(e){this.scorePool.put(e)}}),cc._RF.pop()},{}],ScoreAnim:[function(e,t,i){"use strict";cc._RF.push(t,"878f1phGrNDtYPTzPbNwRJK","ScoreAnim"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label}},init:function(e){this.game=e},despawn:function(){this.game.despawnScoreFX(this.node)}}),cc._RF.pop()},{}],WinMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"e0ae8OoXzZOD403HmP9hR1D","WinMenuModel");var n=cc.Class({ctor:function(e,t){this.view=t,this.controller=e,this.state=this.controller.state.winMenu},init:function(){this.disable()},enable:function(){this.view.enable(),this.onEvent()},disable:function(){this.view.disable()},onEvent:function(){this.view.restartButton.node.on(this.controller.cursorEvents.click,this.onRestartButton,this),this.view.exitButton.node.on(this.controller.cursorEvents.click,this.onButtonExit,this)},onRestartButton:function(){this.disable(),this.controller.restart()},onButtonExit:function(){this.disable(),this.controller.exit()}});t.exports=n,cc._RF.pop()},{}],WinMenuView:[function(e,t,i){"use strict";cc._RF.push(t,"efaefvR/CNDR7t2y3Ex57xd","WinMenuView"),cc.Class({extends:cc.Component,properties:{restartButton:{default:null,type:cc.Button},exitButton:{default:null,type:cc.Button}},enable:function(){this.node.active=!0},disable:function(){this.node.active=!1}}),cc._RF.pop()},{}],fieldCellGraph:[function(e,t,i){"use strict";cc._RF.push(t,"e6849zgj8lGLIg526apEdr3","fieldCellGraph"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.getComponent(cc.Graphics).rect(0,this.node.height,this.node.width,this.node.height),blackRect.fillColor=cc.Color.BLACK,blackRect.fill()}}),cc._RF.pop()},{}]},{},["BackGround","HammerBusterController","HammerBusterModel","HammerBusterView","BusterProtoController","BusterProtoModel","BusterProtoView","FieldActions","FieldModel","FieldView","GameController","GameOverMenuModel","GameOverMenuView","GameStates","MainMenuModel","MainMenuView","NextLevelMenuModel","NextLevelMenuView","PassingModel","PassingView","ScoreAnim","WinMenuModel","WinMenuView","fieldCellGraph"]);