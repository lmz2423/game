/**
 * Created by creditease on 2015/6/5.
 */
Crafty.init(500, 500, document.getElementById('game'));
var square = Crafty.e('2D, Canvas, Color');
square.attr({x: 10, y: 10, w: 100, h: 100}).color('red').origin("center");
square.bind('EnterFrame', function () {
    this.rotation = this.rotation + 10;
});
var helloWorldText = Crafty.e('2D, DOM, Text').attr({x:10, y:10});
helloWorldText.textFont({
    size:'20px',
    weight:'bold'
});
var xx = Crafty.e('2D, Canvas,  Color, Draggable').attr({x:10, y:10, h:30, w:30}).color('#fdaeae').dragDirection({x:1,y:0});
xx.bind("Dragging",function(e){
    console.log("something is wrong");
});
helloWorldText.text('Hello World').textColor("#bcacde");