window.__require=function e(t,i,n){function o(l,r){if(!i[l]){if(!t[l]){var c=l.split("/");if(c=c[c.length-1],!t[c]){var a="function"==typeof __require&&__require;if(!r&&a)return a(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+l+"'")}l=c}var u=i[l]={exports:{}};t[l][0].call(u.exports,function(e){return o(t[l][1][e]||e)},u,u.exports,e,t,i,n)}return i[l].exports}for(var s="function"==typeof __require&&__require,l=0;l<n.length;l++)o(n[l]);return o}({BackGround:[function(e,t,i){"use strict";cc._RF.push(t,"c6ebeOUU3VP0K2eh+qPhdxS","BackGround"),cc.Class({extends:cc.Component,properties:{},init:function(){this.createBackGround()},createBackGround:function(){var e=this.node.getComponent(cc.Graphics);this.backGroundColor=e.fillColor,cc.log(this.backGroundColor),e.rect(-this.node.width/2,-this.node.height/2,this.node.width,this.node.height),e.fill()},start:function(){}}),cc._RF.pop()},{}],BusterProtoController:[function(e,t,i){"use strict";cc._RF.push(t,"0c4a8KHdwBIkqX2CNiRbl8S","BusterProtoController");var n=e("GameController"),o=e("BusterProtoModel"),s=e("BusterProtoViev"),l=cc.Class({extends:cc.Component,properties:{canvas:{default:null,type:cc.Node},game:{default:null,type:n},viev:{default:null,type:s}},onLoad:function(){this.mousedown=this.game.mousedown,this.mouseup=this.game.mouseup,this.mousemove=this.game.mousemove,this.mouseleave=this.game.mouseleave,this.passingModel=this.game.passingModel,this.fieldModel=this.game.fieldModel,this.model=new o(this,this.viev),this.model.init(),this.onBusterEvent()},offStandartGameEvents:function(){this.game.offGame()},onStandartGameEvents:function(){this.game.onGame()},onBusterEvent:function(){this.node.on(this.mousedown,this.onBusterMouseDown,this),this.node.on("click",this.onBusterClick,this)},offBusterEvent:function(){this.node.off(this.mousedown,this.onBusterMouseDown,this),this.node.off("click",this.onBusterClick,this)},onBusterClick:function(){this.game.state.game&&this.model.getBuster()},onBusterMouseDown:function(){if(this.game.state.game)return this.model.num<1?(this.model.setNumWarningColor(),this.node.on(this.mouseup,this.onBusterMouseUp,this),void this.node.on(this.mouseleave,this.onBusterMouseUp,this)):void 0},onBusterMouseUp:function(){this.model.setNumNormalColor(),this.node.off(this.mouseup,this.onBusterMouseUp,this),this.node.off(this.mouseleave,this.onBusterMouseUp,this)}});t.exports=l,cc._RF.pop()},{BusterProtoModel:"BusterProtoModel",BusterProtoViev:"BusterProtoViev",GameController:"GameController"}],BusterProtoModel:[function(e,t,i){"use strict";cc._RF.push(t,"40159aY/pBJP6VA81Qx1res","BusterProtoModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.controller=e,this.passingModel=this.controller.passingModel,this.fieldModel=this.controller.fieldModel,this.initNum=3},init:function(){this.num=this.initNum,this.viev.displayNum(this.num),this.viev.setNumLabelNormalColor(),this.viev.enable()},setNumNormalColor:function(){this.viev.setNumLabelNormalColor()},setNumWarningColor:function(){this.viev.setNumLabelWarningColor()},getBuster:function(){cc.log("\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u0435 \u043c\u0435\u0442\u043e\u0434!"),this.num}});t.exports=n,cc._RF.pop()},{}],BusterProtoViev:[function(e,t,i){"use strict";cc._RF.push(t,"2de9fGMi0NHTYL/jd1EtIOX","BusterProtoViev");var n=cc.Class({extends:cc.Component,properties:{numLabel:{default:null,type:cc.Label},numLabelNormalColor:cc.Color.WHITE,numLabelWarningColor:cc.Color.RED},enable:function(){this.node.active=!0},setNumLabelNormalColor:function(){this.numLabel.node.color=this.numLabelNormalColor},setNumLabelWarningColor:function(){this.numLabel.node.color=this.numLabelWarningColor},displayNum:function(e){this.numLabel.string=e+""}});t.exports=n,cc._RF.pop()},{}],FieldModel:[function(e,t,i){"use strict";cc._RF.push(t,"ed045Z9+T1DF6++dDqqP8w4","FieldModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.viev.model=this,this.controller=e,this.fieldMatrix=[[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1],[0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1]],this.cellSize=62,this.spriteColors;var i=this.viev.getInitRenderFieldParameters();this.setInitRenderFieldParameters(i),this.fieldCells=[],this.fallingSpeed=0,this.fallingAccel=10,this.spriteCollectSpeed=.2,this.minGroup=3,this.currentMaxFallHaight=0,this.maxFallTime=0,this.sprite1=null,this.sprite2=null,this.spriteStates=["normal","vertStack","horStack","rainbowBall"]},init:function(){this.passingModel=this.controller.passingModel,this.createField(),this.viev.createChipsPool(this.fieldCells.length);var e=this.fillFieldWithSprites();this.pourOut(e),this.collect\u0421hips=this.collect\u0421hips.bind(this)},setInitRenderFieldParameters:function(e){this.spriteColors=e.spriteColors},getRondomColor:function(){return Math.floor(Math.random()*this.spriteColors.length)},setSpriteColor:function(e,t){return e.colorIndex=t,this.viev.setColor(e,t),e.colorIndex},createField:function(){var e=this.fieldMatrix;this.fieldCells=[];for(var t=this.cellSize/2,i=e.length-1;i>=0;i--){for(var n=[],o=0;o<e[i].length;o++){var s={};s.size=this.cellSize,s.row=e.length-1-i,s.col=o,s.position=cc.v2(t+s.col*this.cellSize,t+s.row*this.cellSize),s.color=e[i][o],s.sprite=null,n.push(s),s.cage=this.viev.createFieldCage(s)}this.fieldCells.push(n)}},setSpriteToCell:function(e,t){this.viev.setChipToCell(e,t),e.sprite=t,t.fallHeight=0,t.cell=e},setSpriteToInitPosition:function(e,t){var i=this.cellSize*this.fieldCells.length+this.cellSize/2;this.viev.setChipToInitPosition(e,t,i),e.sprite=t,t.fallHeight=0,t.cell=e},checkMatches:function(e,t,i){if(t>1){var n=this.fieldCells[e][t-1].sprite.colorIndex,o=this.fieldCells[e][t-2].sprite.colorIndex;i===n&&i===o&&(i=(i+1)%this.spriteColors.length)}if(e>1&&this.fieldCells[e-2][t]){var s=this.fieldCells[e-1][t].sprite.colorIndex,l=this.fieldCells[e-2][t].sprite.colorIndex;i===s&&i===l&&(i=(i+1)%this.spriteColors.length)}return i},fillFieldWithSprites:function(){for(var e=this.fieldCells,t=[],i=0;i<e.length;i++)for(var n=0;n<e[i].length;n++){var o=e[i][n];if(!o.sprite){var s=this.viev.spawnNewChip(),l=this.getRondomColor();s.state="normal",l=this.checkMatches(i,n,l),this.setSpriteColor(s,l),this.setSpriteToInitPosition(o,s),t.push(s),s.on(this.controller.mousedown,function(){})}}return t.reverse()},pourOut:function(e){var t=this;return new Promise(function(i){e.forEach(function(e){var n=(e.position.y-e.cell.position.y)/t.cellSize,o=Math.sqrt(2*n/t.fallingAccel);t.viev.fallSprite(e,o,e.cell.position).then(function(){i()})})})},getFieldSprites:function(){for(var e=this.fieldCells,t=[],i=0;i<e.length;i++)for(var n=0;n<e[i].length;n++){var o=e[i][n].sprite;o&&t.push(o)}return t},getSameColorSprites:function(e){for(var t=this.fieldCells,i=[],n=0;n<t.length;n++)for(var o=0;o<t[n].length;o++){var s=t[n][o].sprite;s&&s.colorIndex===e&&i.push(s)}return i},getRowSprites:function(e){for(var t=this.fieldCells,i=[],n=0;n<t[e].length;n++){var o=t[e][n].sprite;o&&i.push(o)}return i},getColSprites:function(e){for(var t=this.fieldCells,i=[],n=0;n<t.length;n++){var o=void 0;t[n][e]&&(o=t[n][e].sprite),o&&i.push(o)}return i},getRightCell:function(e){var t=this.fieldCells,i=e.col,n=e.row;return i!==t[n].length-1&&t[n][i+1]},getLeftCell:function(e){var t=this.fieldCells,i=e.col,n=e.row;return 0!==i&&t[n][i-1]},getUpCell:function(e){var t=this.fieldCells,i=e.col,n=e.row;return n!==t.length-1&&t[n+1][i]},getLowCell:function(e){var t=this.fieldCells,i=e.col,n=e.row;return 0!==n&&t[n-1][i]},findSameColorGroup:function(e){var t=e.colorIndex,i=e.cell,n=[],o=[],s=this.getUpCell.bind(this),l=this.getLowCell.bind(this),r=this.getLeftCell.bind(this),c=this.getRightCell.bind(this),a=this.minGroup-1;function u(e,i){var a=e(i);if(a){var h=a.sprite;h&&h.colorIndex===t&&(e!==s&&e!==l||n.push(h),e!==c&&e!==r||o.push(h),u(e,a))}}if(u(s,i),u(l,i),u(c,i),u(r,i),n.length<a&&o.length<a)return!1;var h={target:e,group:[],color:t,direction:"direction"};if(n.length>=a&&o.length>=a){var d=n.concat(o);return h.group=d,h.length=d.length+1,h.direction="dual",h}return n.length>=a?(h.group=n,h.direction="vertical",h.length=n.length+1,h):o.length>=a?(h.group=o,h.direction="horizontal",h.length=o.length+1,h):void 0},"collect\u0421hips":function(e,t){var i=this;return new Promise(function(n){var o=t.getPosition(),s=0;e[0].colorIndex===i.passingModel.collectChipsColorIndex&&i.passingModel.gainScore(e.length+1,t.getPosition()),e.forEach(function(e){var t=e.getPosition().x,n=e.getPosition().y,l=Math.abs(o.x-t),r=Math.abs(o.y-n),c=(l||r)/i.cellSize*i.spriteCollectSpeed;c>s&&(s=c),i.viev.moveSprite(e,c,o)}),setTimeout(function(){n(e)},1e3*(s+.3))})},despawnSprites:function(e){for(var t=0;t<e.length;t++){var i=this.getSpriteCell(e[t]);i.sprite=null,this.viev.despawnChip(i,e[t])}},replaceSprites:function(e,t){var i=this;return new Promise(function(n,o){i.viev.replaceSprites(e,t).then(function(){n()});var s=i.getSpriteCell(e),l=i.getSpriteCell(t);s.sprite=t,t.cell=s,l.sprite=e,e.cell=l})},getSpriteCell:function(e){var t=this.fieldCells,i=e.cell;if(i){var n=i.col;return t[i.row][n]}},onSwipe:function(){var e=this;this.replaceSprites(this.sprite1,this.sprite2).then(function(){return Promise.all([e.checkReplace(e.sprite1),e.checkReplace(e.sprite2)])}).then(function(t){return t[0]||t[1]?(e.passingModel.changeMovies(-1),e.rebuildField()):e.replaceSprites(e.sprite1,e.sprite2)}).then(function(){return e.sprite1,e.sprite2=null,e.handleMatchesAfterRebuild()}).then(function(){e.controller.onFinishRebuild()})},normalGroupAction:function(e){var t=this,i=e.target,n=e.group;return this.collect\u0421hips(n,i).then(function(n){return e.length<4&&t.despawnSprites([].concat(n,[i])),4===e.length&&(t.despawnSprites(n),"vertical"===e.direction&&t.changeSpriteState(i,"vertStack"),"horizontal"===e.direction&&t.changeSpriteState(i,"horStack")),e.length>4&&(t.despawnSprites(n),t.changeSpriteState(i,"rainbowBall")),n})},horizontalStackGroupAction:function(e){var t=this,i=e.target,n=i.cell.row,o=this.getRowSprites(n);return"horizontal"!==e.direction&&(o=o.concat(e.group)),this.collect\u0421hips(o,i).then(function(e){return t.despawnSprites(e),e})},verticalStackGroupAction:function(e){var t=this,i=e.target,n=i.cell.col,o=this.getColSprites(n);return"vertical"!==e.direction&&(o=o.concat(e.group)),this.collect\u0421hips(o,i).then(function(e){return t.despawnSprites(e),e})},rainbowBallGroupAction:function(e){var t=this,i=this.sprite2.colorIndex,n=this.getSameColorSprites(i);return this.collect\u0421hips(n,e).then(function(i){return t.despawnSprites([].concat(i,[e])),i})},checkReplace:function(e){var t=this;return new Promise(function(i){if("rainbowBall"===e.state)return e!==t.sprite1?i(!1):t.rainbowBallGroupAction(e).then(function(e){i(e)});var n=t.findSameColorGroup(e);if(!n)return i(!1);n.group.forEach(function(t,i){"vertStack"!==t.state&&"horStack"!==t.state||(n.group.splice(i,1,e),e=t,n.target=t)}),"normal"===e.state&&t.normalGroupAction(n).then(function(e){i(e)}),"vertStack"===e.state&&t.verticalStackGroupAction(n).then(function(e){i(e)}),"horStack"===e.state&&t.horizontalStackGroupAction(n).then(function(e){i(e)})})},rebuildField:function(){var e=this;return new Promise(function(t){e.checkFieldForEmptyCells(),e.dumping(),setTimeout(function(){e.currentMaxFallHaight=0,e.maxFallTime=0;var i=e.fillFieldWithSprites();e.pourOut(i).then(function(){t()})},1e3*e.maxFallTime)})},checkFieldForEmptyCells:function(){var e=this.fieldCells;function t(e){for(var t=!1,i=1;i<e.length;i++)for(var n=0;n<e[i].length;n++){var o=e[i][n],s=e[i-1][n];o.sprite&&(s.sprite||(t=!0,s.sprite=o.sprite,o.sprite=null,s.sprite.fallHeight++,s.sprite.cell=s,s.sprite.fallHeight>this.currentMaxFallHaight&&(this.currentMaxFallHaight=s.sprite.fallHeight)))}return t}for(t=t.bind(this);t(e);)t(e)},dumping:function(){var e=this.fieldCells;this.maxFallTime=Math.sqrt(2*this.currentMaxFallHaight/this.fallingAccel);for(var t=0;t<e.length;t++)for(var i=0;i<e[t].length;i++){var n=e[t][i].sprite,o=e[t][i];if(n&&n.fallHeight){var s=Math.sqrt(2*n.fallHeight/this.fallingAccel);n.fallHeight=0,this.viev.fallSprite(n,s,o.position)}}},findMatchesInField:function(){var e=this,t=[],i=this.fieldCells;this.maxFallTime=Math.sqrt(2*this.currentMaxFallHaight/this.fallingAccel);for(var n=0;n<i.length;n++)for(var o=0;o<i[n].length;o++){var s=i[n][o].sprite;if(s){var l=this.findSameColorGroup(s).group;l&&(l.push(s),l.forEach(function(t){return e.getSpriteCell(t).sprite=null}),t.push(l))}}return!(t.length<1)&&t},handleMatchesAfterRebuild:function(){var e=this;return new Promise(function(t){var i=e.findMatchesInField();if(!i)return t();var n=[];i.forEach(function(t){n.push(e.collect\u0421hips(t,t[1]).then(function(t){e.despawnSprites(t)}))}),Promise.all(n).then(function(){return e.rebuildField()}).then(function(){return t(),e.handleMatchesAfterRebuild()})})},changeSpriteState:function(e,t){e.state=t,"rainbowBall"===t&&(this.sprite.colorIndex=null,this.viev.setSpriteRainbowBallTexture(e)),"vertStack"===t&&this.viev.setSpriteHorizontalStackTexture(e),"horStack"===t&&this.viev.setSpriteVetricalStackTexture(e)}});t.exports=n,cc._RF.pop()},{}],FieldViev:[function(e,t,i){"use strict";cc._RF.push(t,"c46dc+4CAJFwIYTjqZ1jvow","FieldViev");e("BackGround");cc.Class({extends:cc.Component,properties:{cellPrefab:{default:null,type:cc.Prefab},chipPrefab:{default:null,type:cc.Prefab},RainbowTexture:{default:null,type:cc.SpriteFrame},normalTexture:{default:null,type:cc.SpriteFrame},stackTexture:{default:null,type:cc.SpriteFrame},chipColors:{default:[],type:cc.Color},cageColors:{default:[],type:cc.Color}},init:function(){},createChipsPool:function(e){this.chipsPool=new cc.NodePool;for(var t=0;t<e;++t){var i=cc.instantiate(this.chipPrefab);this.chipsPool.put(i)}},getInitRenderFieldParameters:function(){return{spriteColors:this.chipColors}},spawnNewChip:function(){return this.chipsPool.size()>0?this.chipsPool.get():cc.instantiate(this.chipPrefab)},despawnChip:function(e,t){t.size=.9*e.size,t.getComponent(cc.Sprite).spriteFrame==!this.normalTexture&&this.setSpriteNormalTexture(t),this.chipsPool.put(t)},setColor:function(e,t){return e.color=this.chipColors[t],t},setChipToCell:function(e,t){t.setPosition(e.position),t.size=.9*e.size,t.zIndex=1},setChipToInitPosition:function(e,t,i){this.node.addChild(t),t.setPosition(e.position.x,i),t.width=.9*e.size,t.height=.9*e.size,t.zIndex=1},createFieldCage:function(e){var t=cc.instantiate(this.cellPrefab);return t.color=this.cageColors[e.color],t.setPosition(e.position),t.width=e.size,t.height=e.size,this.node.addChild(t),t},replaceSprites:function(e,t){return new Promise(function(i){var n=e.getPosition(),o=t.getPosition(),s=cc.tween;s(e).call(function(){e.zIndex=2}).parallel(s().to(.3,{position:o}),s().by(.15,{scale:.2}).by(.15,{scale:-.2})).call(function(){e.zIndex=1}).start(),s(t).parallel(s().to(.3,{position:n}),s().by(.15,{scale:-.2}).by(.15,{scale:.2})).call(function(){return i()}).start()})},moveSprite:function(e,t,i){return new Promise(function(n){var o=cc.tween;o(e).parallel(o().to(t,{position:i},{easing:"sineIn"}),o().by(t/2,{scale:.1}).by(t/2,{scale:-.1})).call(function(){return n()}).start()})},fallSprite:function(e,t,i){return new Promise(function(n){cc.tween(e).to(t,{position:i},{easing:"sineIn"}).call(function(){return n()}).start()})},start:function(){},setSpriteNormalTexture:function(e){e.getComponent(cc.Sprite).spriteFrame=this.normalTexture},setSpriteRainbowBallTexture:function(e){e.getComponent(cc.Sprite).spriteFrame=this.RainbowTexture,e.color=cc.Color.WHITE},setSpriteHorizontalStackTexture:function(e){e.width=1.25*e.width,e.getComponent(cc.Sprite).spriteFrame=this.stackTexture,e.rotation=270},setSpriteVetricalStackTexture:function(e){e.width=1.25*e.width,e.getComponent(cc.Sprite).spriteFrame=this.stackTexture}}),cc._RF.pop()},{BackGround:"BackGround"}],GameController:[function(e,t,i){"use strict";cc._RF.push(t,"63e87BG2M1HLbUi5gxu7PIc","GameController");var n=e("FieldModel"),o=e("FieldViev"),s=e("BackGround"),l=e("PassingModel"),r=e("PassingViev"),c=e("MainMenuViev"),a=e("MainMenuModel"),u=e("GameOverMenuViev"),h=e("GameOverMenuModel"),d=e("NextLevelMenuViev"),v=e("NextLevelMenuModel"),p=e("WinMenuViev"),f=e("WinMenuModel");cc.Class({extends:cc.Component,properties:{fieldViev:{default:null,type:o},backGround:{default:null,type:s},passingViev:{default:null,type:r},mainMenuViev:{default:null,type:c},gameOverMenuViev:{default:null,type:u},nextLevelMenuViev:{default:null,type:d},winMenuViev:{default:null,type:p},hammerBuster:{default:null,type:cc.Node}},onLoad:function(){this.state={game:!1,mainMenu:!0,nextLevel:!1,winMenu:!1,gameOver:!1},Object.defineProperty(this.state,"resetState",{value:function(){for(var e in this)this[e]=!1},enumerable:!1}),this.mousedown="mousedown",this.mouseup="mouseup",this.mousemove="mousemove",this.mouseleave="mouseleave",this.mouseenter="mouseenter",cc.sys.platform===cc.sys.MOBILE_BROWSER&&(this.mousedown="touchstart",this.mouseup="touchend",this.mousemove="touchmove",this.mouseleave="touchcancel",this.mouseenter="touchstart"),this.fieldModel=new n(this,this.fieldViev),this.passingModel=new l(this,this.passingViev),this.mainMenuModel=new a(this,this.mainMenuViev),this.nextLevelMenuModel=new v(this,this.nextLevelMenuViev),this.gameOverMenuModel=new h(this,this.gameOverMenuViev),this.winMenuModel=new f(this,this.winMenuViev),this.fieldModel.init(),this.backGround.init(),this.passingModel.init(),this.mainMenuModel.init(),this.gameOverMenuModel.init(),this.nextLevelMenuModel.init()},start:function(){this.onMainMenu(),this.gameOverMenuModel.disable(),this.nextLevelMenuModel.disable()},onGame:function(){this.state.resetState(),this.state.game=!0,this.onGameEvent()},offGame:function(){this.state.game=!1,this.offGameEvent()},onMainMenu:function(){this.offGame(),this.state.mainMenu=!0,this.mainMenuModel.enable(),this.onMainMenuEvent()},onNextLevel:function(){this.offGame(),this.state.nextLevel=!0,this.passingModel.increaseLevel(),this.nextLevelMenuModel.enable(),this.onNextLevelMenuEvent()},onGameOver:function(){this.offGame(),this.state.gameOver=!0,this.gameOverMenuModel.enable(),this.onGameOverMenuEvent()},onWinMenu:function(){this.offGame(),this.state.winMenu=!0,this.winMenuModel.enable(),this.onWinMenuEvent()},onGameEvent:function(){this.fieldViev.node.on(this.mousedown,this.gameOnMouseDown,this)},offGameEvent:function(){this.fieldViev.node.off(this.mousedown,this.gameOnMouseDown,this)},onMainMenuEvent:function(){this.mainMenuViev.playButton.node.on("click",this.mainMenuOnButtonClick,this)},onNextLevelMenuEvent:function(){this.nextLevelMenuViev.playButton.node.on("click",this.nextLevelMenuOnButtonClick,this)},onGameOverMenuEvent:function(){this.gameOverMenuViev.restartButton.node.on("click",this.onRestartButton,this),this.gameOverMenuViev.addMoviesBotton.node.on("click",this.gameOverplayElseButtonClick,this),this.gameOverMenuViev.exitBotton.node.on("click",this.onExitBotton,this)},onWinMenuEvent:function(){this.winMenuViev.restartButton.node.on("click",this.onRestartButton,this),this.winMenuViev.exitBotton.node.on("click",this.onExitBotton,this)},gameOnMouseDown:function(e){if(e.target!==e.currentTarget){e.stopPropagation(),this.offGameEvent();var t=e.target;t.on(this.mouseup,this.onMouseup,this),t.on(this.mouseleave,this.onMouseLeave,this)}},onMouseup:function(e){var t=e.target;t.off(this.mouseup,this.onMouseup,this),t.off(this.mouseleave,this.onMouseLeave,this),this.onGameEvent()},onMouseLeave:function(e){var t=e.target;t.off(this.mouseup,this.onMouseup,this),t.off(this.mouseleave,this.onMouseLeave,this),this.fieldModel.sprite1=e.target,this.activateSpritesOnMouseEnter()},activateSpritesOnMouseEnter:function(){var e=this;this.fieldModel.getFieldSprites().forEach(function(t){t.on(e.mouseenter,e.onMouseEnter,e)})},disActivateSpritesOnMouseEnter:function(){var e=this;this.fieldModel.getFieldSprites().forEach(function(t){t.off(e.mouseenter,e.onMouseEnter,e)})},onMouseEnter:function(e){this.disActivateSpritesOnMouseEnter();var t=e.target;this.fieldModel.sprite2=t,this.fieldModel.onSwipe()},onFinishRebuild:function(){this.state.gameOver?this.onGameOver():this.state.nextLevel?this.onNextLevel():this.state.winMenu?this.onWinMenu():this.onGameEvent()},mainMenuOnButtonClick:function(){this.mainMenuModel.disable(),this.passingModel.setLevel(1),this.onGame()},nextLevelMenuOnButtonClick:function(){this.nextLevelMenuModel.disable(),this.onGame()},onRestartButton:function(){this.restartGame()},restartGame:function(){this.hammerBuster.getComponent("HammerBusterController").init(),this.gameOverMenuModel.disable(),this.passingModel.setLevel(1),this.fieldModel.despawnSprites(this.fieldModel.getFieldSprites()),this.fieldModel.init(),this.onGame()},gameOverplayElseButtonClick:function(){this.gameOverMenuModel.disable(),this.passingModel.changeMovies(5),this.onGame()},onExitBotton:function(){this.gameOverMenuModel.disable(),this.nextLevelMenuModel.disable(),this.winMenuModel.disable(),this.restartGame(),this.onMainMenu()}}),cc._RF.pop()},{BackGround:"BackGround",FieldModel:"FieldModel",FieldViev:"FieldViev",GameOverMenuModel:"GameOverMenuModel",GameOverMenuViev:"GameOverMenuViev",MainMenuModel:"MainMenuModel",MainMenuViev:"MainMenuViev",NextLevelMenuModel:"NextLevelMenuModel",NextLevelMenuViev:"NextLevelMenuViev",PassingModel:"PassingModel",PassingViev:"PassingViev",WinMenuModel:"WinMenuModel",WinMenuViev:"WinMenuViev"}],GameOverMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"e44b6iYDnVMHrsF/9jKXeIe","GameOverMenuModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.controller=e},init:function(){this.disable()},enable:function(){this.viev.enable()},disable:function(){this.viev.disable()}});t.exports=n,cc._RF.pop()},{}],GameOverMenuViev:[function(e,t,i){"use strict";cc._RF.push(t,"23bf5Jy9edPk7ybnYnLmZHx","GameOverMenuViev"),cc.Class({extends:cc.Component,properties:{restartButton:{default:null,type:cc.Button},addMoviesBotton:{default:null,type:cc.Button},exitBotton:{default:null,type:cc.Button}},enable:function(){this.node.active=!0},disable:function(){this.node.active=!1}}),cc._RF.pop()},{}],HammerBusterController:[function(e,t,i){"use strict";cc._RF.push(t,"1ade8+G6ENBrasI6Gqf7u+P","HammerBusterController");var n=e("BusterProtoController"),o=e("HammerBusterModel"),s=e("HammerBusterViev");cc.Class({extends:n,properties:{viev:{default:null,type:s,override:!0}},onLoad:function(){this._super(),this.model=new o(this,this.viev),this.model.init(),this.hummer=null,this.fieldNode=this.viev.fieldNode},init:function(){cc.log("Hummer init"),this.model.init()},onBusterClick:function(){this.game.state.game&&this.model.getHummer()&&(this.offStandartGameEvents(),this.canvas.on(this.mousemove,this.onMouseMove,this),this.fieldNode.on(this.mousedown,this.onFieldMouseDown,this))},onMouseMove:function(e){var t=this.node.convertToNodeSpaceAR(e.getLocation());this.model.hummer.setPosition(t)},onFieldMouseDown:function(e){var t=this;if(e.target!==e.currentTarget){this.canvas.off(this.mousemove,this.onMouseMove,this),this.fieldNode.off(this.mousedown,this.onFieldMouseDown,this),e.stopPropagation();var i=e.target;this.model.onFieldHummerDown(i).then(function(){t.onStandartGameEvents()})}}}),cc._RF.pop()},{BusterProtoController:"BusterProtoController",HammerBusterModel:"HammerBusterModel",HammerBusterViev:"HammerBusterViev"}],HammerBusterModel:[function(e,t,i){"use strict";cc._RF.push(t,"69800FjvldIIaMnExUO1O9+","HammerBusterModel");var n=e("BusterProtoModel"),o=cc.Class({extends:n,ctor:function(e,t){this.viev=t,this.controller=e,this.passingModel=this.controller.passingModel,this.fieldModel=this.controller.fieldModel,this.hammer,this.num=3},getHummer:function(){if(!(this.num<1))return this.num--,this.viev.displayNum(this.num),this.hummer=this.viev.spawnHummer(),this.hummer},despawnHummer:function(){this.viev.despawnHummer(this.hummer),this.hummer=null},onFieldHummerDown:function(e){var t=this;return new Promise(function(i){t.despawnHummer(),t.fieldModel.despawnSprites([e]);t.rebuildField=t.fieldModel.rebuildField.bind(t.fieldModel),setTimeout(function(){t.rebuildField().then(function(){return t.fieldModel.handleMatchesAfterRebuild()}).then(function(){i()})},500)})},getExplosionGroup:function(e){var t=this.fieldModel.findNeighborsSprites(e);return t.push(e),t},createExplosins:function(e){for(var t=0;t<e.length;t++){var i=e[t],n=i.cell.position,o=i.cell.number+1,s=i.cell.width;this.viev.createExplosin(n,o,s),this.fieldModel.getSpriteCell(i).sprite=null}}});t.exports=o,cc._RF.pop()},{BusterProtoModel:"BusterProtoModel"}],HammerBusterViev:[function(e,t,i){"use strict";cc._RF.push(t,"d5128X7MOxNI7xXle4ExLaU","HammerBusterViev");var n=e("BusterProtoViev");cc.Class({extends:n,properties:{numLabel:{default:null,type:cc.Label,override:!0},hummerLabel:{default:null,type:cc.Node},hummerPrefab:{default:null,type:cc.Prefab},fieldNode:{default:null,type:cc.Node}},onLoad:function(){this.hummerPool=new cc.NodePool;var e=cc.instantiate(this.hummerPrefab);this.hummerPool.put(e)},spawnHummer:function(){var e=this.hummerPool.get(this);return this.node.addChild(e),e.zIndex=500,e.position=this.hummerLabel.position,e},despawnHummer:function(e){this.hummerPool.put(e)}}),cc._RF.pop()},{BusterProtoViev:"BusterProtoViev"}],MainMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"ec65fHAvNFNTK6Lr7ULVpVm","MainMenuModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.controller=e,this.fieldModel=this.controller.fieldModel,this.passingModel=this.controller.passingModel},init:function(){},enable:function(){this.viev.enable(),this.setLevelInformation()},disable:function(){this.viev.disable()},setLevelInformation:function(){var e=this.passingModel.level,t=this.passingModel.collectChipsColor,i=this.passingModel.requiredLevelScore,n=this.passingModel.levelMovies;this.viev.displaylevelInformation(e,i,t,n)}});t.exports=n,cc._RF.pop()},{}],MainMenuViev:[function(e,t,i){"use strict";cc._RF.push(t,"67028o2+IJJnIxBjh4Hyxwn","MainMenuViev"),cc.Class({extends:cc.Component,properties:{levelInformation:{default:null,type:cc.Label},chipLabel:{default:null,type:cc.Node},playButton:{default:null,type:cc.Button},field:{default:null,type:cc.Node}},enable:function(){this.node.active=!0},displaylevelInformation:function(e,t,i,n){this.chipLabel.color=i,this.levelInformation.string="Level "+e+"\n Goal:  collect "+t+"\n in "+n+" movies!"},disable:function(){this.node.active=!1}}),cc._RF.pop()},{}],NextLevelMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"3e32fctO7tLYLY62pGFOXl0","NextLevelMenuModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.controller=e,this.passingModel=this.controller.passingModel},init:function(){this.disable()},enable:function(){var e=this.passingModel.level,t=this.passingModel.collectChipsColor,i=this.passingModel.requiredLevelScore,n=this.passingModel.levelMovies;this.viev.enable(),this.viev.displaylevelInformation(e,i,t,n)},disable:function(){this.viev.disable()}});t.exports=n,cc._RF.pop()},{}],NextLevelMenuViev:[function(e,t,i){"use strict";cc._RF.push(t,"e5a4aiLayFHp6T8zYXeJ+3P","NextLevelMenuViev"),cc.Class({extends:cc.Component,properties:{levelInformation:{default:null,type:cc.Label},chipLabel:{default:null,type:cc.Node},playButton:{default:null,type:cc.Button}},enable:function(){this.node.active=!0},disable:function(){this.node.active=!1},displaylevelInformation:function(e,t,i,n){this.chipLabel.color=i,this.levelInformation.string="Level "+e+"\n Goal:  collect "+t+"\n in "+n+" movies!"}}),cc._RF.pop()},{}],PassingModel:[function(e,t,i){"use strict";cc._RF.push(t,"722fasBoDlJpqGw4WW1KlB/","PassingModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.controller=e,this.fieldModel=this.controller.fieldModel,this.initLivel=1,this.initMovies=12,this.initRequiredLevelScore=10,this.increasRequiredLevelScore=1,this.levelGoal={1:{movies:3,requiredLevelScore:3,colorIndex:0},2:{movies:12,requiredLevelScore:3,colorIndex:1},3:{movies:12,requiredLevelScore:3,colorIndex:2},4:{movies:12,requiredLevelScore:3,colorIndex:3},5:{movies:12,requiredLevelScore:3,colorIndex:4},6:{movies:12,requiredLevelScore:3,colorIndex:5}},this.collectChipsColorIndex},init:function(){this.setLevel(1)},getMaxLevel:function(){var e=0;for(var t in this.levelGoal)e=t;return e},displayAll:function(){this.viev.displayMovies(this.movies),this.viev.displayLevelSore(this.levelScore,this.requiredLevelScore),this.viev.displayLevel(this.level,this.collectChipsColor)},setLevel:function(e){this.level=e,this.collectChipsColorIndex=this.levelGoal[this.level].colorIndex,this.collectChipsColor=this.fieldModel.spriteColors[this.collectChipsColorIndex],this.levelMovies=this.levelGoal[this.level].movies,this.requiredLevelScore=this.levelGoal[this.level].requiredLevelScore,this.levelScore=0,this.viev.displayMovies(this.levelMovies),this.viev.displayLevelSore(this.levelScore,this.requiredLevelScore),this.viev.displayLevel(this.level,this.collectChipsColor)},changeMovies:function(e){this.levelMovies+=e,this.levelScore<this.requiredLevelScore&&this.levelMovies<1&&(this.controller.state.gameOver=!0),this.viev.displayMovies(this.levelMovies)},gainScore:function(e,t){if(t.x+=this.fieldModel.cellSize/2,t.y+=this.fieldModel.cellSize/2,this.levelScore+=e,this.viev.displayLevelSore(this.levelScore,this.requiredLevelScore),this.viev.creareScoreAnim(e,t),this.levelScore<this.requiredLevelScore&&this.levelMovies<1&&(this.controller.state.gameOver=!0),this.level==this.getMaxLevel()&&this.levelScore>=this.requiredLevelScore)return cc.log("winMenu = true"),void(this.controller.state.winMenu=!0);this.levelScore>=this.requiredLevelScore&&(this.controller.state.nextLevel=!0)},increaseLevel:function(){this.level++,this.setLevel(this.level)},addColectedChips:function(e){this.collectChips+=e,this.gainScore(e)}});t.exports=n,cc._RF.pop()},{}],PassingViev:[function(e,t,i){"use strict";cc._RF.push(t,"60564shGtBDsaHIvYYaxq2r","PassingViev"),cc.Class({extends:cc.Component,properties:{levelScoreDisplay:{default:null,type:cc.Label},moviesDisplay:{default:null,type:cc.Label},levelLabel:{default:null,type:cc.Label},scoreFXPrefab:{default:null,type:cc.Prefab},field:{default:null,type:cc.Node},chipLabel:{default:null,type:cc.Node}},start:function(){this.node.zIndex=2,this.node.position=this.field.position,this.scorePool=new cc.NodePool},displayLevelSore:function(e,t){this.levelScoreDisplay.string="Score: \n"+e+"/"+t},displayMovies:function(e){this.moviesDisplay.string=e},displayLevel:function(e,t){this.levelLabel.string="Level: "+e,this.chipLabel.color=t},setLevelProgressPosition:function(e,t,i){this.levelProgress.x=e,this.levelProgress.y=t,this.levelProgress.zIndex=i},spawnScoreFX:function(){return this.scorePool.size()>0?this.scorePool.get():cc.instantiate(this.scoreFXPrefab)},creareScoreAnim:function(e,t){cc.log("creareScoreAnim");var i=this.spawnScoreFX();this.node.addChild(i),i.getComponent("ScoreAnim").init(this),i.zIndex=10,cc.log(i.zIndex),i.setPosition(t),i.getComponent("ScoreAnim").label.string="+"+e,i.getComponent(cc.Animation).play()},despawnScoreFX:function(e){this.scorePool.put(e)}}),cc._RF.pop()},{}],ScoreAnim:[function(e,t,i){"use strict";cc._RF.push(t,"878f1phGrNDtYPTzPbNwRJK","ScoreAnim"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label}},init:function(e){this.game=e},despawn:function(){this.game.despawnScoreFX(this.node)}}),cc._RF.pop()},{}],WinMenuModel:[function(e,t,i){"use strict";cc._RF.push(t,"e0ae8OoXzZOD403HmP9hR1D","WinMenuModel");var n=cc.Class({ctor:function(e,t){this.viev=t,this.controller=e},init:function(){this.disable()},enable:function(){this.viev.enable()},disable:function(){this.viev.disable()}});t.exports=n,cc._RF.pop()},{}],WinMenuViev:[function(e,t,i){"use strict";cc._RF.push(t,"efaefvR/CNDR7t2y3Ex57xd","WinMenuViev"),cc.Class({extends:cc.Component,properties:{restartButton:{default:null,type:cc.Button},exitBotton:{default:null,type:cc.Button}},enable:function(){this.node.active=!0},disable:function(){this.node.active=!1}}),cc._RF.pop()},{}],fieldCellGraph:[function(e,t,i){"use strict";cc._RF.push(t,"e6849zgj8lGLIg526apEdr3","fieldCellGraph"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.getComponent(cc.Graphics).rect(0,this.node.height,this.node.width,this.node.height),blackRect.fillColor=cc.Color.BLACK,blackRect.fill()},start:function(){}}),cc._RF.pop()},{}]},{},["BackGround","HammerBusterController","HammerBusterModel","HammerBusterViev","BusterProtoController","BusterProtoModel","BusterProtoViev","FieldModel","FieldViev","GameController","GameOverMenuModel","GameOverMenuViev","MainMenuModel","MainMenuViev","NextLevelMenuModel","NextLevelMenuViev","PassingModel","PassingViev","ScoreAnim","WinMenuModel","WinMenuViev","fieldCellGraph"]);