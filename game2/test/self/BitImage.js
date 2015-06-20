/**
 * Created by creditease on 2015/6/5.
 */
(function(){
    'use strict';
    var stage = new createjs.Stage("gameView");
    var gameView = new createjs.Container();
    stage.addChild(gameView);
    var bitMap = new createjs.Bitmap('image/test.png');
    bitMap.
        stage.addChild(bitMap);
    var image = new Image();
    image.src='image/test.png';
    image.onload = function(){
        stage.update();
    }
}());