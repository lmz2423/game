/**
 * Created by creditease on 2015/6/15.
 * @author luomingzhong
 * @date 2015-6-15
 */
(function(window) {

    var OBB = function(centerPoint, width, height, rotation) {

        this.centerPoint = centerPoint;
        this.extents = [width / 2, height / 2];
        this.axes = [new Vector2(Math.cos(rotation), Math.sin(rotation)), new Vector2(-1 * Math.sin(rotation), Math.cos(rotation))];

        this._width = width;
        this._height = height;
        this._rotation = rotation;
    };
    OBB.prototype = {
        getProjectionRadius: function(axis) {
            return this.extents[0] * Math.abs(axis.dot(this.axes[0])) + this.extents[1] * Math.abs(axis.dot(this.axes[1]));
        }
    };

    window.OBB = OBB;
})(window);
(function(window) {
    var Vector2 = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Vector2.prototype = {
        sub: function(v) {
            return new Vector2(this.x - v.x, this.y - v.y)
        },
        dot: function(v) {
            return this.x * v.x + this.y * v.y;
        }
    };
    window.Vector2 = Vector2;
}(window));


(function() {
    'use strict';
    var gameDefaultConfig = {
        stage: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        urls: {
            placeOne: "http://www.lailaihui.com/2898?SOURCE=fathersday", //香港
            placeTwo: "http://www.lailaihui.com/1061?SOURCE=fathersday", //間港
            placeThree: "http://www.lailaihui.com/4455?SOURCE=fathersday", //长滩岛
            placeFour: "http://www.lailaihui.com/1020?SOURCE=fathersday" //吉普岛
        }
    };

    //进入游戏的场景
    var FirstScene = {
        first_cloud: null,
        first_cloudTwo: null,
        ground: null,
        sun: null,
        first_People: null,
        firstTrips: null,
        startGame: null,
        sky: null,
        container: null,
        logo: null
    };


    //游戏说明场景
    var SecondScene = {
        container: null,
        background: null,
        ground: null,
        transParent: null,
        gameTrips: null,
        startGo: null,
        countThree: null,
        countSecond: null,
        countFirst: null,
        countGo: null
    };

    window.people = {
        index: 10,
        friendsnum: 20,
        countrys: 6,
        distance: 500
    };
    var share = {
        title: null,
        link: null,
        imgUrl: 'http://m.lailaihui.com/html/201506/21/fuqin/image/share.jpg',
        desc: null,
        timestamp: '',
        nonceStr: '',
        signature: '',
        appId: ''
    };

    //游戏经行中
    var Game = {
        container: null,
        containerOne: null,
        distanceMap: null,
        distance: null,
        map: null,
        sprite: null,
        bike: null,
        left: null,
        right: null,
        writeLogo: null,
        france: null,
        china: null,
        japan: null,
        xcountry: null,
        canada: null,
        england: null
    };
    var GameResult = {
        container: null,
        backGroudRetange: null,
        backGroudResult: null,
        cityNum: null,
        distance: null,
        friensNum: null,
        gift: null,
        playGame: null,
        index: null
    };
    var indexBangBai = {
        container: null,
        background: null,
        trips: null
    }

    var gameover = false;

    //游戏结束的场景
    var GameOverScene = {};
    /**
     * Sprite组
     * */
    var treesArray = [];

    var thornArray = [];
    var barrier = [];

    /**
     * 游戏的变量
     *
     * */
    var progressLayer = document.getElementById("progressLayer");
    var progressBar = document.querySelector(".progress-bar");
    var isAlive = true,
        stage = null;
    var firstSunRadius = 0;
    var firstDegree = 0;
    var firstTripsAlpha = 0;

    var loader = undefined;
    var canvas = null;
    var w = 0;
    var h = 0;
    var isFist = false;
    var isSecond = false;
    var isGameStart = false;
    var isGaming = false;
    var isGameOver = false;
    var bikeRotation = 10;
    var bikeSprite = null;
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var warnTrip = null;
    var vX = 0;
    var vY = 1.8;
    var dv = 0.5; //速度增量
    var distance = 0;
    var friendsnum = 0;
    var countrys = 0;
    var index = 0;

    //游戏初始化
    function init() {
        //设计游戏的屏幕自适应
        var scale = 0;
        var designWidth = 640; // 设计宽度为640
        var designHeight = 1136; // 设计高度为1136
        canvas = document.getElementById("gameView");

        scale = gameDefaultConfig.stage.width / designWidth;
        w = canvas.width = designWidth;
        h = canvas.height = gameDefaultConfig.stage.height / scale;
        canvas.style.width = gameDefaultConfig.stage.width + "px";
        canvas.style.height = gameDefaultConfig.stage.height + 'px';
        stage = new createjs.Stage(canvas);
        createjs.Touch.enable(stage);

       var manifest = [
            {src: 'image/index.png', id: "index"},
            {src: 'image/fristLogo.png', id: 'logo'},
            {src: 'image/first_cloud.png', id: 'first_cloud'},
            {src: 'image/first_cloudTwo.png', id: 'first_cloudTwo'},
            {src: 'image/first_People.png', id: 'first_People'},
            {src: 'image/firstTrips.png', id: 'firstTrips'},
            {src: 'image/sun.png', id: 'sun'},
            {src: 'image/button.png', id: "startGame"},
            {src: 'image/secondGround.png', id: 'secondGround'},
            {src: 'image/secondGameStart.png', id: "secondGameStart"},
            {src: 'image/secondGameExplain.png', id: 'secondGameExplain'},
            {src: 'image/countdownThree.png', id: 'countdownThree'},
            {src: 'image/countdownTwo.png', id: 'countdownTwo'},
            {src: 'image/countdownOne.png', id: 'countdownOne'},
            {src: 'image/countdownGo.png', id: 'countdownGo'},
            //基本的背景
            {src: 'image/writeLogo.png', id: 'writeLogo'},
            {src: 'image/bike.png', id: 'bike'},
            {src: 'image/map.png', id: 'map'},
            {src: 'image/Sprite.png', id: 'sprite'},
            //方向键
            {src: 'image/left.png', id: "left"},
            {src: 'image/right.png', id: 'right'},
            //撞击的提示用语
            {src: 'image/gametreeTrips.png', id: 'gametreeTrips'},
            {src: 'image/gamerocksTrip.png', id: 'gamerocksTrip'},
            {src: 'image/gamedistance.png', id: 'gamedistance'},
            {src: 'image/distance.png', id: 'distance'},
            {src: 'image/gamebornsTrips.png', id: 'borns'},
            //国家
            {src: 'image/china.png', id: 'china'},
            {src: 'image/japan.png', id: 'japan'},
            {src: 'image/france.png', id: 'france'},
            {src: 'image/England.png', id: 'England'},
            {src: 'image/canada.png', id: 'canada'},
            {src: 'image/xcountry.png', id: 'xcountry'},
            {src: 'image/tree.png', id: 'tree'},
            {src: 'image/thorn.png', id: 'thorn'},
            //游戏结果
            {src: 'image/playagain.png', id: 'playagain'},
            {src: 'image/giftButton.png', id: 'giftButton'},
            {src: 'image/gameoverresult.png', id: 'gameoverresult'},
            //
            {src: 'image/gameEndTrip.png', id: 'gameEndTrip'},
            {src: 'image/hongkong.png', id: 'hongKong'},
            {src: 'image/puji.png', id: "jipu"},

            {src: 'image/xiangang.png', id: "xiangang"},
            {src: 'image/changtan.png', id: "changtan"}
        ];
        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", handleComplete);
        loader.addEventListener("progress", handleOverallProgress);
        loader.loadManifest(manifest, true);
    }

    //加载条
    function handleOverallProgress() {
        progressBar.style.width = loader.progress * 100 + "%";
    }

    //加载完
    function handleComplete() {
        progressLayer.style.display = "none";
        indexScene();
        createjs.Tween.get(indexBangBai.container, {
            loop: false
        }, true).wait(2000).to({
            alpha: 0
        }, 2000, createjs.Ease.easing).call(enterFirstScene);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", gameTick);
    }

    function indexScene() {
        var index = loader.getResult("index");
        indexBangBai.container = new createjs.Container();
        indexBangBai.background = new createjs.Shape();
        indexBangBai.background.graphics.beginFill("#fbe8ab").drawRect(0, 0, w, h);
        indexBangBai.trips = new createjs.Bitmap(index);
        indexBangBai.container.addChild(
            indexBangBai.background,
            indexBangBai.trips
        );
        stage.addChild(indexBangBai.container);

    }

    //第一个场景
    function enterFirstScene() {
        isFist = true;
        stage.removeAllChildren();
        createFirstGameScene();
    }

    function createFirstGameScene() {
        FirstScene.container = new createjs.Container();
        //天空
        FirstScene.sky = new createjs.Shape();
        FirstScene.sky.graphics.beginFill("#abf8fd").drawRect(0, 0, w, h);
        //地面
        FirstScene.ground = new createjs.Shape();
        FirstScene.ground.graphics.beginFill("#9fd35d").drawRect(0, 0, w, 300);
        FirstScene.ground.y = h - 300;
        //太阳
        FirstScene.sun = new createjs.Bitmap(loader.getResult("sun"));
        FirstScene.sun.cache(0, 0, 203, 188);
        FirstScene.sun.x = 0;
        FirstScene.sun.y = parseInt(h * 0.06);
        firstSunRadius = h * 0.75 - FirstScene.sun.y;
        //遮住太阳的云朵
        FirstScene.first_cloudTwo = new createjs.Bitmap(loader.getResult("first_cloudTwo"));
        FirstScene.first_cloudTwo.setTransform(Math.random() * 135, parseInt(w * 0.068) + Math.random() * 40);
        FirstScene.alpha = (Math.random() + 0.5) % 1;
        //people
        FirstScene.first_People = new createjs.Bitmap(loader.getResult('first_People'));
        FirstScene.first_People.cache(0, 0, 640, 867);
        FirstScene.first_People.y = h * 0.144;
        //山前的云朵
        FirstScene.first_cloud = new createjs.Bitmap(loader.getResult("first_cloud"));
        FirstScene.first_cloud.y = Math.random() * 30 + 120;
        FirstScene.first_cloud.x = Math.random() * 20 + 90;
        FirstScene.first_cloud.alpha = (Math.random() + 0.1) % 1;

        // 按钮
        FirstScene.startGame = new createjs.Bitmap(loader.getResult('startGame'));
        FirstScene.startGame.cache(0, 0, 376, 91);
        FirstScene.startGame.x = 150;
        FirstScene.startGame.y = h * 0.78;

        // 语言
        FirstScene.firstTrips = new createjs.Bitmap(loader.getResult("firstTrips"));
        FirstScene.firstTrips.x = 70;
        FirstScene.firstTrips.y = h * 0.2984;
        FirstScene.firstTrips.rotation = -16;
        FirstScene.firstTrips.alpha = 0;
        //Logo
        FirstScene.logo = new createjs.Bitmap(loader.getResult("logo"));
        FirstScene.logo.x = 412;
        FirstScene.logo.y = 27;

        FirstScene.container.addChild(
            FirstScene.sky,
            FirstScene.ground,
            FirstScene.sun,
            FirstScene.first_cloudTwo,
            FirstScene.first_People,
            FirstScene.first_cloud,
            FirstScene.startGame,
            FirstScene.firstTrips,
            FirstScene.logo
        );

        stage.addChild(FirstScene.container);
        //点击进入游戏
        FirstScene.startGame.on("pressup", oneTransitions);
    }

    //进入第2个画面的转场动画
    function oneTransitions() {
        enterSecondScene();
        createjs.Tween.get(FirstScene.container, {
            loop: false
        }, true).to({
            alpha: 0
        }, 2000, createjs.Ease.easing);
        createjs.Tween.get(SecondScene.container, {
            loop: false
        }, true).wait(500).to({
            alpha: 1
        }, 2000, createjs.Ease.easing).call(clearFirstScene);
    }

    //第二个场景

    function enterSecondScene() {
        createSecondGameScene(); //创建游戏场景
        isSecond = true; //进入游戏说明
    }

    //清理第一个场景
    function clearFirstScene() {
        var i = 0;
        isFist = false;
        stage.removeChild(FirstScene.container);
        for (i in FirstScene) {
            FirstScene[i] = null;
        }
    }

    //创建第二个场景
    function createSecondGameScene() {
        //ground
        SecondScene.container = new createjs.Container();
        SecondScene.container.setBounds(0, 0, w, h);
        SecondScene.container.alpha = 0;
        //地面
        SecondScene.background = new createjs.Shape();
        SecondScene.background.graphics.beginFill("#fbe8ab").drawRect(0, 0, w, h);
        SecondScene.ground = new createjs.Bitmap(loader.getResult('secondGround'));
        //遮罩层
        SecondScene.transParent = new createjs.Shape();
        SecondScene.transParent.graphics.beginFill("#00000").drawRect(0, 0, w, h);
        SecondScene.transParent.alpha = 0.6;
        //提示层
        SecondScene.gameTrips = new createjs.Bitmap(loader.getResult('secondGameExplain'));
        SecondScene.gameTrips.y = h * 0.1106;
        SecondScene.startGo = new createjs.Bitmap(loader.getResult('secondGameStart'));
        //go
        SecondScene.startGo.x = 205;
        SecondScene.startGo.y = h * 0.648;
        SecondScene.countThree = new createjs.Bitmap(loader.getResult('countdownThree'));
        SecondScene.countThree.x = 250;
        SecondScene.countThree.y = 360;
        SecondScene.countSecond = new createjs.Bitmap(loader.getResult("countdownTwo"));
        SecondScene.countSecond.x = 251;
        SecondScene.countSecond.y = 360;
        SecondScene.countFirst = new createjs.Bitmap(loader.getResult("countdownOne"));
        SecondScene.countFirst.x = 294;
        SecondScene.countFirst.y = 360;
        SecondScene.countGo = new createjs.Bitmap(loader.getResult("countdownGo"));
        SecondScene.countGo.x = 146;
        SecondScene.countGo.y = 360;
        SecondScene.container.addChild(
            SecondScene.background,
            SecondScene.ground,
            SecondScene.transParent,
            SecondScene.gameTrips,
            SecondScene.startGo
        );
        stage.addChild(SecondScene.container);
        //点击倒计时 todo
        SecondScene.startGo.on("pressup", function (e) {
            countdown();
        });
    }

    //倒计时
    function countdown() {
        SecondScene.container.removeChild(SecondScene.gameTrips, SecondScene.startGo);
        var i = 0;
        var time = setInterval(function() {
            if (i == 1) {
                SecondScene.container.addChild(SecondScene.countThree);
            }
            if (i == 2) {
                SecondScene.container.removeChild(SecondScene.countThree);
                SecondScene.container.addChild(SecondScene.countSecond);
            }
            if (i == 3) {
                SecondScene.container.removeChild(SecondScene.countSecond);
                SecondScene.container.addChild(SecondScene.countFirst);
            }
            if (i == 4) {
                SecondScene.container.removeChild(SecondScene.countFirst);
                SecondScene.container.addChild(SecondScene.countGo);
            }
            if (i == 5) {
                clearInterval(time);
                stage.removeAllChildren();
                enterGaming(); //进入游戏
            }
            i = i + 1;
        }, 800);
    }

    //游戏正式开始
    function enterGaming() {
        isSecond = false;
        createGaming();
        isGameStart = true;
    }

    //创建游戏正式开始场景
    function createGaming() {
        var treesNum = 2;
        var thornNum = 2;
        var i = 0;
        var mapImg = loader.getResult("map");
        var distanceMap = loader.getResult("distance");
        Game.container = new createjs.Container();
        Game.containerOne = new createjs.Container();
        Game.distanceMap = new createjs.Bitmap(distanceMap);
        Game.distanceMap.x = 23;
        Game.distanceMap.y = 30;
        Game.distance = new createjs.Text("0", "40px Arial", "#fffdfc");
        Game.distance.x = 199;
        Game.distance.y = 50;
        Game.containerOne.addChild(Game.distanceMap, Game.distance);
        //地面
        Game.map = new createjs.Shape();
        Game.map.graphics.beginBitmapFill(mapImg).drawRect(0, 0, w, h + mapImg.height);
        Game.map.cache(0, 0, w, h + mapImg.height);
        //whiteLogo
        Game.writeLogo = new createjs.Bitmap(loader.getResult("writeLogo"));
        Game.writeLogo.x = 240;
        Game.writeLogo.y = h - 55 - 130;

        //bike 从底部出来 用时1s 到达位置为40%;
        var bike = loader.getResult("bike");
        Game.bike = new createjs.Bitmap(bike);
        Game.bike.setBounds(0, 0, 97, 291);
        Game.bike.regX = bike.width >> 1;
        Game.bike.regY = bike.height >> 1;
        Game.bike.x = w / 3;
        Game.bike.y = h;
        // china
        var china = loader.getResult('china');
        Game.china = new createjs.Bitmap(china);
        Game.china.setBounds(0, 0, 165, 143);
        Game.china.regX = china.width >> 1;
        Game.china.regY = china.height >> 1;
        Game.china.y = h * 0.25;
        Game.china.x = (w - china.width) * Math.random();
        Game.china.name = "rock";
        Game.container.addChild(
            Game.map,
            Game.writeLogo
        );


        for (i = 0; i < treesNum; i = i + 1) {
            var tree = createTree("first");
            treesArray.unshift(tree);
            barrier.unshift(tree);
            Game.container.addChild(tree);
        }

        for (i = 0; i < thornNum; i = i + 1) {
            var thorn = createBorn("first");
            thornArray.unshift(thorn);
            barrier.unshift(thorn);
            Game.container.addChild(thorn);
        }

        Game.container.addChild(Game.bike, Game.china);
        barrier.unshift(Game.china);
        stage.addChild(Game.container);
        stage.addChild(Game.containerOne);
        createjs.Tween.get(Game.bike, {loop: false}, true).to({y: h * 0.61}, 2000, createjs.Ease.easing).call(goBike);

    }

    function goBike() {
        isGameStart = false;
        isGaming = true;
        showDirection();
        setTimeout(randomRocks, 1000);
    }

    //刚开始的树木位置
    /**
     * @param key {string} 开始的时候树木不能在中间，在左右两边 有5棵*/
    function createTree(key) {
        var treeImg = loader.getResult("tree");
        var tree = new createjs.Bitmap(treeImg);
        tree.setBounds(0, 0, treeImg.width, treeImg.height);
        tree.regX = treeImg.width >> 1;
        tree.regY = treeImg.height >> 1;
        tree.name = "tree";
        if (key === "first") {
            var randoms = parseInt(Math.random() * 100) % 2;
            if (randoms === 0) {
                tree.x = Math.random() * 65;
            }
            if (randoms === 1) {
                tree.x = 425 + Math.random() * 105
            }
            tree.y = (h - treeImg.height) * Math.random();
        }

        if (key === "random") {
            tree.x = treeImg.width / 2 + Math.random() * (w - treeImg.width);
            tree.y = -treeImg.height / 2;
        }
        return tree;
    }

    function createBorn(key) {
        var thornImg = loader.getResult("thorn");
        var thorn = new createjs.Bitmap(thornImg);
        thorn.setBounds(0, 0, thornImg.width, thornImg.height);
        thorn.regX = thornImg.width >> 1;
        thorn.regY = thornImg.height >> 1;
        thorn.name = "thorn";
        if (key === "first") {
            var randoms = parseInt(Math.random() * 100) % 2;
            if (randoms === 0) {
                thorn.x = Math.random() * 65;
            }
            if (randoms === 1) {
                thorn.x = thornImg.width / 2 + Math.random() * 498
            }
            thorn.y = -thornImg.height / 2
        }

        if (key === "random") {
            thorn.x = thornImg.width / 2 + Math.random() * (w - thornImg.width);
            thorn.y = 0 - thornImg.height;
        }
        return thorn;
    }

    function randomRocks() {
        var thron = null;
        var tree = null;
        var country = null;
        var countCountry = 0;
        var countrys = ['japan', 'france', 'England', 'canada', 'xcountry'];
        var i = 0;
        var time = setInterval(function() {
            if (!isAlive) {
                clearInterval(time);
            }
            i = i + 1;
            if (i % 4 == 0) {
                i = 0;
                vY = vY + dv;
                country = createCountry(countrys[countCountry]);
                barrier.unshift(country);
                countCountry = countCountry + 1;
                Game.container.addChild(country);
                if (countCountry === countrys.length) {
                    isAlive = false;
                    gameover = true;
                    clearInterval(time);
                    enterFourthSecne();
                    hideDirection();
                }
            }
            if (i % 3 == 0) {
                tree = createTree("random");
                barrier.unshift(tree);
                Game.container.addChild(tree);
                return;
            }
            if (i % 2 == 0) {
                thron = createBorn("random");
                barrier.unshift(thron);
                Game.container.addChild(thron);
                return;

            }

        }, 3000);
    }

    function createCountry(name) {
        var countryImg = loader.getResult(name);
        var country = new createjs.Bitmap(countryImg);
        country.setBounds(0, 0, countryImg.width, countryImg.height);
        country.regX = countryImg.width >> 1;
        country.regY = countryImg.height >> 1;
        country.name = "rock";
        country.x = countryImg.width / 2 + Math.random() * (w - countryImg.width);
        country.y = 0 - countryImg.height;
        return country;
    }

    /***/

    function GameOver() {
        stage.removeAllChildren();
        createGameOver();
        goTrive();
    }

    function enterGameResult(friendsNum, distanceNum, cityNum, index) {
        createGameResult(friendsNum, distanceNum, cityNum, index);
        GeResultEvent()
    }

    function createGameResult(friendsNum, distanceNum, cityNum, index) {
        var gameoverresult = loader.getResult("gameoverresult"),
            playagain = loader.getResult("playagain"),
            giftButton = loader.getResult("giftButton");

        GameResult.container = new createjs.Container();
        GameResult.backGroudRetange = new createjs.Shape();
        GameResult.backGroudRetange.graphics.beginFill("#00000").drawRect(0, 0, w, h);
        GameResult.backGroudRetange.alpha = 0.6;
        GameResult.backGroudResult = new createjs.Bitmap(gameoverresult);
        GameResult.gift = new createjs.Bitmap(giftButton);
        GameResult.gift.x = 46;
        GameResult.gift.y = 717;
        GameResult.playGame = new createjs.Bitmap(playagain);
        GameResult.playGame.y = 717;
        GameResult.playGame.x = 344;

        GameResult.cityNum = new createjs.Text(cityNum.toString(), "40px Arial", "#fa8700");
        GameResult.cityNum.y = 300;
        GameResult.cityNum.x = 288;

        GameResult.friensNum = new createjs.Text(friendsNum.toString(), "40px Arial", "#fa8700");
        GameResult.friensNum.x = 282;
        GameResult.friensNum.y = 361;

        GameResult.distance = new createjs.Text(distanceNum.toString(), "40px Arial", "#fa8700");
        GameResult.distance.y = 242;
        GameResult.distance.x = 355;

        GameResult.index = new createjs.Text(index.toString(), "40px Arial", "#fa8700");
        GameResult.index.x = 349;
        GameResult.index.y = 418;
        GameResult.container.addChild(
            GameResult.backGroudRetange,
            GameResult.backGroudResult,
            GameResult.gift,
            GameResult.playGame,
            GameResult.distance,
            GameResult.cityNum,
            GameResult.friensNum,
            GameResult.index
        );
        stage.addChild(GameResult.container);
    }

    function GeResultEvent() {
        GameResult.gift.on('pressup', function (e) {
            GameOver();
        });
        GameResult.playGame.on('pressup', function (e) {
            var url = location.href;
            location.href = url;
        })
    }

    function createGameOver() {
        GameOverScene.container = new createjs.Container();
        GameOverScene.background = new createjs.Shape();
        GameOverScene.background.graphics.beginFill("#2f2c20").drawRect(0, 0, w, h + 200);
        GameOverScene.backgroundTrips = new createjs.Bitmap(loader.getResult("gameEndTrip"));
        GameOverScene.placeOne = new createjs.Bitmap(loader.getResult("hongKong"));
        GameOverScene.placeOne.x = 70;
        GameOverScene.placeOne.y = 314;
        GameOverScene.placeTwo = new createjs.Bitmap(loader.getResult("xiangang"));
        GameOverScene.placeTwo.y = 314;
        GameOverScene.placeTwo.x = 343;
        GameOverScene.placeThree = new createjs.Bitmap(loader.getResult("changtan"));
        GameOverScene.placeThree.y = 580;
        GameOverScene.placeThree.x = 70;
        GameOverScene.placeFour = new createjs.Bitmap(loader.getResult("jipu"));
        GameOverScene.placeFour.y = 580;
        GameOverScene.placeFour.x = 343;
        GameOverScene.container.addChild(
            GameOverScene.background,
            GameOverScene.backgroundTrips,
            GameOverScene.placeOne,
            GameOverScene.placeTwo,
            GameOverScene.placeThree,
            GameOverScene.placeFour
        );
        stage.addChild(GameOverScene.container);
    }

    //游戏控制器，游戏控制的主要逻辑
    function gameTick(event) {
        var deltaS = event.delta / 1000;
        // 游戏只能处于一个场景 当处于第一个场景时
        if (isFist) {
            //白云运动
            FirstScene.first_cloud.x = (FirstScene.first_cloud.x - deltaS * 30);
            if (FirstScene.first_cloud.x + FirstScene.first_cloud.image.width * FirstScene.first_cloud.scaleX <= 0) {
                FirstScene.first_cloud.x = w;
            }
            FirstScene.first_cloudTwo.x = (FirstScene.first_cloudTwo.x - deltaS * 45);
            if (FirstScene.first_cloudTwo.x + FirstScene.first_cloudTwo.image.width * FirstScene.first_cloudTwo.scaleX <= 0) {
                FirstScene.first_cloudTwo.x = w;
            }
            //太阳运动
            firstDegree = deltaS / 15 + firstDegree;
            FirstScene.sun.x = Math.sin(firstDegree) * firstSunRadius;
            FirstScene.sun.y = h * 0.75 - Math.cos(firstDegree) * firstSunRadius;

            if (firstTripsAlpha < 1) {
                FirstScene.firstTrips.alpha = firstTripsAlpha;
                firstTripsAlpha = firstTripsAlpha + 0.005;
            }

        }
        if (isSecond) {

        }
        //主要逻辑
        if (isGaming) {
            var i = 0;
            var length = barrier.length;
            if (isAlive) {
                for (i = 0; i < length; i = i + 1) {
                    if (detectorOBBvsOBB(barrier[i], Game.bike)) {
                        isAlive = false;
                        isGaming = false;
                        createSprite();
                        carefulTrip(barrier[i].name, bikeSprite, Game.bike);
                        Game = null;
                        hideDirection();
                        break;
                    }
                }
                if (isAlive) {
                    for (i = 0; i < barrier.length; i = i + 1) {
                        barrier[i].y = barrier[i].y + vY;
                    }
                    Game.bike.x = Game.bike.x + vX;
                    if (Game.bike.x <= 45) {
                        Game.bike.x = 45;
                    }
                    if (Game.bike.x >= w - 45) {
                        Game.bike.x = w - 45;
                    }
                    distance = distance + 2;
                    Game.distance.text = distance.toString();
                }
            } else {}
        }
        //处于第三个场景 当处于第三个场景时，游戏结束的页面
        stage.update();
    }

    /**
     * @param Rock {object} 障碍物
     * @param Bike {object} 自行车
     * @return {boolean} 碰撞后 返回true 否则返回 false;
     * */
    function detectorOBBvsOBB(rock, bike) {
        var RockRounds = rock.getBounds();
        var BikeRounds = bike.getBounds();
        var OBB1 = new OBB(new Vector2(rock.x, rock.y), RockRounds.width, RockRounds.height, rock.rotation * Math.PI / 180);
        var OBB2 = new OBB(new Vector2(bike.x, bike.y), BikeRounds.width, BikeRounds.height, bike.rotation * Math.PI / 180);
        var nv = OBB1.centerPoint.sub(OBB2.centerPoint);
        var axisA1 = OBB1.axes[0];
        if (OBB1.getProjectionRadius(axisA1) + OBB2.getProjectionRadius(axisA1) <= Math.abs(nv.dot(axisA1))) return false;
        var axisA2 = OBB1.axes[1];
        if (OBB1.getProjectionRadius(axisA2) + OBB2.getProjectionRadius(axisA2) <= Math.abs(nv.dot(axisA2))) return false;
        var axisB1 = OBB2.axes[0];
        if (OBB1.getProjectionRadius(axisB1) + OBB2.getProjectionRadius(axisB1) <= Math.abs(nv.dot(axisB1))) return false;
        var axisB2 = OBB2.axes[1];
        if (OBB1.getProjectionRadius(axisB2) + OBB2.getProjectionRadius(axisB2) <= Math.abs(nv.dot(axisB2))) return false;
        return true;
    }

    //创建动画精灵
    function createSprite() {
        var spritesImg = loader.getResult("sprite");
        var spriteSheet = new createjs.SpriteSheet({
            images: [spritesImg],
            frames: {
                width: 211,
                height: 300,
                regX: 162,
                regY: 150
            },
            animations: {
                "stop": [0, 8, "last"],
                "last": [8]
            }
        });
        bikeSprite = new createjs.Sprite(spriteSheet, "stop");
        bikeSprite.setBounds(0, 0, 211, 150);
        bikeSprite.shadow = new createjs.Shadow("#454", 0, -5, 4);
    }

    //说出提示语，淡入淡出
    function carefulTrip(name, bikeSprite, bike) {
        var bikeBounds = bike.getBounds();
        var bikeX = bike.x;
        var bikeRotation = bike.rotation;
        var bikeY = bike.y;
        var trips = {
            x: 0,
            y: 0
        };
        Game.container.removeChild(bike);
        bikeSprite.x = bikeX; // - (bikeSpriteBounds.width - bikeBounds.width);
        bikeSprite.y = bikeY;
        bikeSprite.rotation = bikeRotation;
        Game.container.addChild(bikeSprite);
        bikeSprite.gotoAndPlay("stop");

        var scale = 0.5;
        if ((w - bikeX - bikeBounds.width) < 144) {
            trips.x = bikeX - 144;
        } else {
            trips.x = bikeX + bikeBounds.width / 2;
        }
        trips.y = bikeY;
        if (name === "rock") {
            warnTrip = new createjs.Bitmap(loader.getResult("gamerocksTrip"));
        }
        if (name === "tree") {
            warnTrip = new createjs.Bitmap(loader.getResult("gametreeTrips"));
        }
        if (name === "thorn") {
            warnTrip = new createjs.Bitmap(loader.getResult("borns"));
        }
        warnTrip.x = trips.x;
        warnTrip.y = trips.y - 150;
        warnTrip.scaleX = warnTrip.scaleY = 0.7;
        warnTrip.alpha = 0;
        Game.container.addChild(warnTrip);
        createjs.Tween.get(warnTrip, {
            loop: false
        }, true)
            .to({
                alpha: 1
            }, 1000, createjs.Ease.easing)
            .wait(2000)
            .call(enterFourthSecne);
    }

    function enterFourthSecne() {
        footPrint();
        enterGameResult(friendsnum, distance, countrys, index);
        window.people = getResults();
        requestShare();
    }

   function goTrive() {
        GameOverScene.placeOne.addEventListener('click', function () {
            document.location = gameDefaultConfig.urls.placeOne;
        });
        GameOverScene.placeTwo.addEventListener('click', function () {
            document.location = gameDefaultConfig.urls.placeTwo;
        });
        GameOverScene.placeThree.addEventListener('click', function () {
            document.location = gameDefaultConfig.urls.placeThree;
        });
        GameOverScene.placeFour.addEventListener('click', function () {
            document.location = gameDefaultConfig.urls.placeFour;
        });
    }

    function showDirection() {
        left.style.display = "block";
        right.style.display = "block";
        left.addEventListener("touchend", function(e) {
            Game.bike.rotation = Game.bike.rotation - bikeRotation;
            if (Game.bike.rotation < -90) {
                Game.bike.rotation = -90;
            }
            vX = vY * Math.sin(Game.bike.rotation / 180 * Math.PI) * 3;

        });
        right.addEventListener("touchend", function(e) {
            Game.bike.rotation = Game.bike.rotation + bikeRotation;
            if (Game.bike.rotation > 90) {
                Game.bike.rotation = 90;
            }
            vX = vY * Math.sin(Game.bike.rotation / 180 * Math.PI) * 3;
        });
    }

    function hideDirection() {
        left.style.display = "none";
        right.style.display = "none";
    }

    function footPrint() {
        var randoms = Math.random();
        if (distance >= 6000) {
            friendsnum = 7100 + parseInt(randoms) * 90;
            countrys = 60 + parseInt(randoms * 9);
            index = 80 + parseInt(randoms * 10);
            return;
        }
        if (distance >= 5200) {
            friendsnum = 6100 + parseInt(randoms) * 90;
            countrys = 50 + parseInt(randoms * 9);
            index = 60 + parseInt(randoms * 10);
            return;
        }
        if (distance >= 4400) {
            friendsnum = 5200 + parseInt(randoms) * 90;
            countrys = 40 + parseInt(randoms * 9);
            index = 60 + parseInt(randoms * 10);
            return;
        }
        if (distance >= 3600) {
            friendsnum = 3300 + parseInt(randoms) * 90;
            countrys = 31 + parseInt(randoms * 9);
            index = 50 + parseInt(randoms * 10);
            return;
        }
        if (distance >= 2400) {
            friendsnum = 2400 + parseInt(randoms) * 90;
            countrys = 20 + parseInt(randoms * 9);
            index = 40 + parseInt(randoms * 10);
            return;
        }
        if (distance >= 1600) {
            friendsnum = 1500 + parseInt(randoms) * 90;
            countrys = 12 + parseInt(randoms * 9);
            index = 30 + parseInt(randoms * 10);
            return;
        }
        if (distance >= 800) {
            friendsnum = 600 + parseInt(randoms) * 90;
            countrys = 12 + parseInt(randoms * 9);
            index = 20 + parseInt(randoms * 10);
            return;
        }
        if (distance > 0) {
            friendsnum = 100 + parseInt(randoms) * 90;
            countrys = 3 + parseInt(randoms * 9);
            index = 5 + parseInt(randoms * 10);
            return;
        }
    }

    function getResults() {
        var result = {};
        result.distance = distance;
        result.index = index;
        result.countrys = countrys;
        result.friendsnum = friendsnum;
        return result;
    }

    function requestShare() {
        share.title = '我的爸气指数是' + people.index + "%，超过了" + people.friendsnum + "人，你敢来挑战么？";
        share.link = 'http://m.lailaihui.com/html/201506/21/fuqin/';
        share.imgUrl = 'http://m.lailaihui.com/html/201506/21/fuqin/image/share.jpg',
        share.desc = '我的爸气指数是' + people.index + "%，超过了" + people.friendsnum + "人，你敢来挑战么？",
        $.ajax({
            url: '/weixin/jsTicket.action',
            type: 'get',
            dataType: 'json',
            data: {
                url: location.href,
                accId: 2
            },
            success: function(data) {
                share.timestamp = data.timestamp;
                share.nonceStr = data.noncestr;
                share.signature = data.signature;
                share.appId = data.appid;
                wxShare();
            },
            error: function(data) {
                console.log("Something is error");
            }

        });
    }

    function wxShare() {
        wx.config({
            debug: false,
            appId: share.appId,
            timestamp: share.timestamp,
            nonceStr: share.nonceStr,
            signature: share.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });

        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: share.title,
                link: share.link,
                imgUrl: share.imgUrl,
                success: function() {
                    console.log("success");
                },
                cancel: function() {
                    console.warn("faild");
                }
            });
            wx.onMenuShareAppMessage({
                title: share.title,
                desc: share.desc,
                link: share.link,
                imgUrl: share.imgUrl,
                success: function() {
                    console.log("success");
                },
                cancel: function() {
                    console.warn("faild");
                }
            });
        });
    }

    //游戏初始化
    init();
}());