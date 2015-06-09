/**
 * Created by creditease on 2015/6/8.
 */
var assetsObj = {
    "sprites": {
        "http://i.imgur.com/e50rhHP.png": {
            tile: 104,
            tileh: 114,
            map: {
                walker_start: [0, 0],
                walker_middle: [7, 0],
                walker_end: [7, 1]
            }
        }
    }
};


window.onload = function() {
    Crafty.init(400, 400);
    Crafty.load(assetsObj, go);
};

function go() {
    var walker = Crafty.e('2D, Canvas, walker_start, SpriteAnimation')
        .attr({x:10,y:10,w:52,h:57})
        .reel("walking", 1000, [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]
        ])
        .animate("walking", -1);
    walker.animationSpeed = 10;
}