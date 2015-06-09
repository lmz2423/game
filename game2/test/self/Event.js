/**
 * Created by creditease on 2015/6/5.
 */
var stage = new createjs.Stage('gameView');
var gameView = new createjs.Container();
stage.addChild(gameView);
var Rect = new createjs.Shape();
Rect.graphics.beginFill("#ff0000");
Rect.graphics.drawRect(0,0,100,100);
gameView.addChild(Rect);
stage.update();

Rect.addEventListener('click', function(e){
    alert("X="+ e.localX);
});