/**
 * Created by creditease on 2015/6/5.
 */
var stage = new createjs.Stage('gameView');
var gameView = new createjs.Container();

stage.addChild(gameView);

var c = new Circle();
gameView.addChild(c);
stage.update();
