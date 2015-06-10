/**
 * Created by creditease on 2015/6/5.
 */
var stage = new createjs.Stage('gameView');
var gameView = new createjs.Container();
stage.addChild(gameView);
var c = new ChildContainer();
gameView.addChild(c);
function setFrame(){
    gameView.x =  gameView.x +1;
    window.requestAnimationFrame(setFrame);
    stage.update();
}
setFrame();