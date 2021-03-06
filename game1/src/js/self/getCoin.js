/**
 * Created by creditease on 2015/6/8.
 */

Crafty.init(800, 600);
Crafty.load(["bg.jpg", "s.png", "m.png", "z.png", "hp.png"],	//load img
    function () {
        Crafty("Loading").each(function () {
            this.y = -250;
        });
        Crafty.background('url(bg.jpg)');

        //Snake
        Crafty.e("Snake, 2D, DOM, Image, Multiway")
            .image('s.png')
            .attr({x: 345, y: 494, w: 107, h: 106})
            .multiway(8, {LEFT_ARROW: 180, RIGHT_ARROW: 0});

        //Bullion
        function Bullion() {
            Crafty.e("2D, DOM, Image, Collision")
                .image('m.png')
                .attr({x: 370, y: -53, w: 54, h: 53, dY: Crafty.math.randomInt(2, 8)})
                .bind('EnterFrame', function () {
                    if (this.y > 600) {
                        this.y = -53;
                        this.x = Crafty.math.randomNumber(1, 700)
                    }
                    this.y += this.dY;
                })
                .onHit('Snake', function () {
                    this.y = 10;
                    this.x = Crafty.math.randomNumber(10, 790);
                    Crafty("LeftPoints").each(function () {
                        this.text(++this.points + " Gold")
                    });
                    Crafty("BigPoints").each(function () {
                        this.points2 = this.points2 + 1;
                        this.text("Your Catch " + this.points2 + " Gold!!!<br> F5 Restart")
                    });
                })
        }

        function BullionNum(num) {
            for (var i = 0; i < num; i++) {
                Bullion();
            }
        }

        BullionNum(8);	//set Bullion Number


        //Bomb
        Crafty.e("2D, DOM, Image, Collision")
            .image('z.png')
            .attr({x: 370, y: -53, w: 54, h: 66, dY: Crafty.math.randomInt(2, 10)})
            .bind('EnterFrame', function () {
                if (this.y > 600) {
                    this.y = -53;
                    this.x = Crafty.math.randomNumber(1, 700)
                }
                this.y += this.dY;
            })
            .onHit('Snake', function () {
                Gover();
            });

        //Score boards
        Crafty.e("LeftPoints, DOM, 2D, Text")
            .attr({x: 20, y: 20, w: 100, h: 20, points: 0})
            .textFont({family: 'Verdana'})
            .textColor('#FFE983')
            .text("0 Gold");

        //Clock boards
        Crafty.e("Clock, DOM, 2D, Text")
            .attr({x: 760, y: 20, w: 20, h: 20})
            .textFont({family: 'Verdana'})
            .textColor('#FFE983')
            .text('60');
        function nums(f) {
            Crafty("Clock").each(function () {
                this.text(f);
            });
        }

        function _nums(f) {
            return function () {
                nums(f);
            }
        }

        function Clocks(num) {
            for (var i = num; i >= 0; i--) {
                var tims = (num - i) * 1000;
                setTimeout(_nums(i), tims);
            }
        }

        Clocks(30);	//set clock show
        setTimeout(Gover, 30100);	//set clock

        //Game Over
        Crafty.e("BigPointsBG, 2D, DOM, Image, Collision")
            .image('hp.png')
            .attr({x: 270, y: -250, w: 279, h: 86});
        Crafty.e("BigPoints, DOM, 2D, Text")
            .attr({x: 300, y: -250, w: 200, h: 50, points2: 0})
            .css({
                'font-size': '16px',
                'color': '#FFE983',
                'fontFamily': 'Verdana',
                'textAlign': 'center',
                'padding': '10px',
                'lineHeight': '25px',
                'borderRadius': '10px'
            })
            .text("Your Catch 0 Gold!!!<br> F5 Restart");
        function Gover() {
            Crafty("BigPointsBG").each(function () {
                this.y = 40;
            });
            Crafty("BigPoints").each(function () {
                this.y = 50;
            });
            setTimeout('Crafty.stop()', 100);
        }
    },
    function () {	//loading
        Crafty.e("Loading, DOM, 2D, Text")
            .attr({x: 300, y: 250, w: 200, h: 50})
            .css({
                'font-size': '16px',
                'color': '#000000',
                'fontFamily': 'Verdana',
                'textAlign': 'center',
                'padding': '10px',
                'lineHeight': '25px',
                'borderRadius': '10px'
            })
            .text("Loading...");
    }
);