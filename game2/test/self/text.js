/**
 * Created by creditease on 2015/6/5.
 */
var canvas = null,
    stage = null,
    rect = null,
    count = 0,
    text = "";
canvas = document.getElementById('gameView');
stage = new createjs.Stage(canvas);
text = new createjs.Text("text on the canvas...0!", "36px Arial", "#FFF");
text.x = 100;
text.y = 100;
text.rotation = 20;
stage.addChild(text);
rect = new createjs.Shape();
rect.x = text.x;
rect.y = text.y;
rect.rotation = text.rotation;
stage.addChildAt(rect, 0);


createjs.Ticker.setFPS(100);
createjs.Ticker.addEventListener('tick', handlertick);
function handlertick(e) {
    count = count + 1;
    text.text = "text on the canvas..." + count + "!";
    rect.graphics.clear().beginFill("#f00").drawRect(-10, 10, text.getMeasuredWidth() + 20, 50);
    stage.update(e)
}
