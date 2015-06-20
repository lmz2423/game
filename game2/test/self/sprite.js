/**
 * Created by creditease on 2015/6/11.
 */
(function () {
    //使用PreloadJs来加载图片

    var queue = new createjs.LoadQueue(true);
    var Game = {};
    var spriteSheetS = [];
    var manifest = [
        "image/sport.png",
        "image/reset.png",
        "image/glitch_walker.png",
        "image/MonsterB.png"
    ];
    queue.loadManifest(manifest);
    queue.on("complete", handleComplete, this);
    function handleComplete() {
        startGame();
    }
    function init() {
        Game.stage = new createjs.Stage("gameView");
        createjs.Touch.enable(Game.stage);
        consistSheet();
        GoBike(spriteSheetS[0], "walk");
        Reset(spriteSheetS[1],'reset');
        //ReBot(spriteSheetS[2],'walk');
        Game.stage.addChild(Game.reset);
        Game.stage.addChild(Game.bike);
        Game.bike.gotoAndPlay(spriteSheetS[0]);
        Game.reset.gotoAndPlay(spriteSheetS[0]);

    }

    function consistSheet() {
        var spriteSport = new createjs.SpriteSheet({
            framerate: 60,
            images: [manifest[0]],
            frames: {width: 64, height: 64, regX: 16, regY: 16},
            animations: {
                "walk": [0, 9, "walk"]
            }
        });

        var spriteReset = new createjs.SpriteSheet({
            framerate: 60,
            images: [manifest[1]],
            frames: {width: 64, height: 64, regX: 32, regY: 32},
            animations: {
                "reset": [0, 9, "reset"]
            }
        });

        var spriteReBot = new createjs.SpriteSheet({
            framerate: 60,
            images: [manifest[2]],
            frames: {width: 64, height: 64, regX: 32, regY: 32},
            animations: {
                "walk": [0, 9, "walk"]
            }
        });
      //  createjs.SpriteSheetUtils.addFlippedFrames(spriteSport, true, false, false);
        spriteSheetS.push(spriteSport);
        spriteSheetS.push(spriteReset);
        spriteSheetS.push(spriteReBot);
    }

    function Reset(spriteSheet,action){
        var action = action || undefined;
        if (action) {
            var sprites = new createjs.Sprite(spriteSheet, "reset");
        }
        else {
            var sprites = new createjs.Sprite(spriteSheet);
        }
        sprites.scaleX = 1;
        sprites.scaleY = 1;
        sprites.vX = 4;
        sprites.x = 200;
        sprites.y = 32;
        sprites.shadow = new createjs.Shadow("#454", 0, 5, 4);
        sprites.currentFrame = 0;
        Game.reset = sprites;
    }
    function ReBot(spriteSheet,action){
        var action = action || undefined;
        if (action) {
            var sprites = new createjs.Sprite(spriteSheet, "walk");
        }
        else {
            var sprites = new createjs.Sprite(spriteSheet);
        }
        sprites.scaleX = 0.5;
        sprites.scaleY = 0.5;
        sprites.vX = 4;
        sprites.x = 100;
        sprites.y = 32;
        sprites.currentFrame = 0;
        Game.rebot = sprites;
    }
    function GoBike(spriteSheet, action) {
        var action = action || undefined;
        if (action) {
            var sprites = new createjs.Sprite(spriteSheet, "walk");
        }
        else {
            var sprites = new createjs.Sprite(spriteSheet);
        }
        sprites.scaleX = 0.5;
        sprites.scaleY = 0.5;
        sprites.vX = 0;
        sprites.x = 500;
        sprites.y = 32;
        sprites.currentFrame = 0;
        sprites.shadow = new createjs.Shadow("#454", 0, 5, 4);
        Game.bike = sprites;
    }
    function go(){
        Game.bike.x = Game.bike.x + Game.bike.vX;
    }

    function startGame() {
        init();
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addEventListener("tick", handleTick);
    }

    function handleTick(event) {
        Game.stage.update();
        go();
    }

    function stop() {
        config.gotoAndStop(sheet);
    }

    document.addEventListener("keydown",function(e){

        if(e.keyCode === 37){
            Game.bike.vX = -3;
            Game.bike.scaleX = 0.5;
        }
        if(e.keyCode === 39){
            //转向
            Game.bike.scaleX = -0.5;
            Game.bike.vX = 3;
        }
    });
    document.addEventListener("keyup",function(e){

        if(e.keyCode === 37){
            Game.bike.vX = 0;
        }
        if(e.keyCode === 39){
            Game.bike.vX = 0;
        }

    });
  document.getElementById('move').addEventListener('click',function(){
      Game.stage.tickOnUpdate = true;
      Game.stage.update();
      Game.bike.setBounds(16,16,32,32);
  });
    document.getElementById('pause').addEventListener('click',function(){
        Game.stage.tickOnUpdate = false;
        console.log(Game.bike.getBounds());
        console.log(Game.bike.x);
        console.log(Game.bike.y);
    });


}());