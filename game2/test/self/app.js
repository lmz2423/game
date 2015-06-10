/**
 * Created by creditease on 2015/6/5.
 */
var stage = new createjs.Stage('gameView');
var Rect = new createjs.Shape();
stage.x = 100;
stage.y = 100;
stage.scaleX=4;
stage.scaleY=0.5;
stage.alpha=0.5;
Rect.graphics.beginFill('#ff0000');
Rect.graphics.drawRect(5, 5, 50, 50);
stage.addChild(Rect);
stage.update();
