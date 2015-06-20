/**
 * Created by creditease on 2015/6/12.
 */
(function (window) {
    'use strict';
    function Monster(name,imageSrc) {
        this.active("walk", name);
    }
    var spriteReBot = new createjs.SpriteSheet({
        framerate: 60,
        images: [imageSrc],
        frames: {width: 64, height: 64, regX: 32, regY: 32},
        animations: {
            "walk": [0, 9, "walk", 4],
            "idle": [10, 20, "idle", 4],
        }
    });
    Monster.prototype = new createjs.Sprite(spriteReBot, "walk");

    var p =  Monster.prototype;
    p.IDLEWAITTIME = 40;
    p.bounds = 0; //visual radial size
    p.hit = 0;

    p.active = function (walk, name) {
        this.init(walk, name);
    };

    p.init = function (walk, name) {
        this.gotoAndPlay(walk);
        this.shadow = new createjs.Shadow("#000", 3, 2, 2);
        this.name = name;
        this.direction = 1;
        this.x = 200;
        this.y = 32;
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.vX = 1;
        this.vY = 0;
        this.currentFrame = 21;
        this.isInIdleMode = false;//是否空闲状态
        this.idleWaitTicker = 0;//空闲时间计数器
    };
    p.tick = function () {
        if (!this.isInIdleMode) {
            this.x = this.x + this.vX * this.direction;
            this.y += this.vY * this.direction;
            //边界检测
            if (this.x <= 0 || this.x >= 780) {
                this.goToAndPlay('idle');
                this.idleWaitTicker = this.IDLEWAITTIME;
                this.isInIdleMode = true;
            }
        }
        //屏幕边界检测

        else {
            this.idleWaitTicker = this.idleWaitTicker - 1;

            if (this.idleWaitTicker === 0) {
                this.isInIdleMode = false;
            }
            if (this.x >= 780) {
                this.direction = -1;
                this.gotoAndPlay("walk");
            }
            if (this.x <= 0) {
                this.direction = 1;
                this.scaleX = -0.5;
                this.gotoAndPlay("walk");
            }
        }
    };

    //碰撞检测
    p.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    };

    p.hitRadius = function (tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) {
            return;
        }

        if (tX + tHit < this.x - this.hit) {
            return;
        }

        if (tY - tHit > this.y + this.hit) {
            return;
        }

        if (tY + tHit < this.y - this.hit) {
            return;
        }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    };

    window.Monster = Monster;
}(window));