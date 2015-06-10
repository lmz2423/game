/**
 * Created by creditease on 2015/6/9.
 */
(function () {
    'use strict';

    /**
     * stageWidth:是指舞台的宽度
     * stageHeight:是指舞台的高度
     */
    var config = {
        stageWidth: window.innerWidth,
        stageHeight: window.innerHeight,
        stage: document.getElementById("gameView")
    };

    var assetsObj = {
        "images": ["image/landscape.jpg", "image/leaf.png", "image/snake.png", "image/people.png", "image/rice.png"]
    };

    function gameInit() {
        gameConfig();
    }

    function gameConfig() {
        Crafty.init(config.stageWidth, config.stageHeight, config.stage);
        loading();
    }

    function loading() {
        Crafty.scene("Loading", function () {
            Crafty.e("2D, DOM, Text")
                .attr({w: 100, h: 20, x: 150, y: 120})
                .text("Loading...")
                .css({"text-align": "center"});
            Crafty.e("2D, DOM, ProgressBar")
                .attr({x: 150, y: 140, w: 100, h: 25, z: 100})
                .progressBar(100, false, "blue", "green")
                .bind("LOADING_PROGRESS", function (percent) {
                    this.updateBarProgress(percent);
                });
            Crafty.load(assetsObj,
                function () { // when loaded
                    //加载成功，进入游戏
                    Crafty.background('#FFFFFF url(image/landscape.jpg) no-repeat center center');
                    Crafty.scene("main"); //go to main scene
                },
                function (e) {
                    Crafty.trigger("LOADING_PROGRESS", e.percent);
                },
                function (e) {
                    // on error
                }
            );
        });
        Crafty.scene("main", function () {
            people();
            LeafNum(2);
            RedDateNum(3);
        });
        // start loading scene
        Crafty.scene("Loading");

        //游戏成功的场景
        Crafty.scene("success", function () {
        });
        //游戏失败的场景
        Crafty.scene("fail", function () {
        });
    }

    Crafty.c("Rice", {
        init: function () {
            this.addComponent("2D, DOM, Image, Collision");
        }
    });
    Crafty.c("Leaf", {
        init: function () {
            this.addComponent("2D, DOM, Image, Collision");
        }
    });
    Crafty.c("RedDate", {
        init: function () {
            this.addComponent("2D, DOM, Image, Collision");
        }
    });
    Crafty.c("Snake", {
        init: function () {
            this.addComponent("2D, DOM, Image, Collision");
        }
    });
    Crafty.c("People", {
        init: function () {
            this.addComponent("2D, DOM, Image, Draggable");
        }
    });

    // Leavf
    function Leaf() {
        Crafty
            .e("Leaf")
            .image("image/leaf.png")
            .attr({
                x: Crafty.math.randomNumber(1, config.stageWidth),
                y: -28,
                w: 25,
                h: 28,
                dY: Crafty.math.randomNumber(2, 8)
            })
            .css({"background-size":"100% auto"})
            .bind('EnterFrame', function () {
                if (this.y > config.stageHeight - 53) {
                    this.y = -28;
                    this.x = Crafty.math.randomNumber(1, config.stageWidth - 40);
                }
                this.y += this.dY;
            })
            .onHit('People', function () {
                this.y = -28;
                this.x = Crafty.math.randomNumber(20, config.stageWidth - 40);
                console.log("")
            });
    }

    function LeafNum(num) {
        for (var i = 0; i < num; i += 1) {
            Leaf();
        }
    }

    function RedDate() {
        Crafty
            .e("RedDate")
            .image("image/redDate.png")
            .attr({
                x: Crafty.math.randomNumber(1, config.stageWidth - 40),
                y: -28,
                w: 25,
                h: 28,
                dY: Crafty.math.randomNumber(2, 8)
            })
            .bind('EnterFrame', function () {
                if (this.y > config.stageHeight - 53) {
                    this.y = -28;
                    this.x = Crafty.math.randomNumber(1, config.stageWidth - 40);
                }
                this.y += this.dY;
            })
            .css({"background-size":"100% auto"})
            .onHit('People', function () {
                this.y = -28;
                this.x = Crafty.math.randomNumber(20, config.stageWidth - 30);

            });
    }

    function RedDateNum(num) {
        for (var i = 0; i < num; i += 1) {
            RedDate();
        }
    }

    function people() {
        Crafty
            .e('People')
            .image("image/people.png")
            .attr({
                x: parseInt(config.stageWidth / 2 - 23),
                y: parseInt(config.stageHeight - 50),
                w: 46,
                h: 42
            })
            .css({"background-size":"100% auto"})
            .dragDirection({x:1,y:0});
    }

    gameInit();

}());