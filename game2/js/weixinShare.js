/**
 * Created by creditease on 2015/3/31.
 */
//todo 部分要修改
(function () {
    var share = {
        title: '我的爸气指数' + people.index + "超过了" + people.friendsnum +"你敢来挑战么？",
        link: 'http://hd.yirendai.com',//to modify
        imgUrl: 'http://hd.yirendai.com/Public/wap/image/share.jpg',//to modfiy
        desc: '我的爸气指数' + people.index + "超过了" + people.friendsnum +"你敢来挑战么？",//分享的描述 to modify
        timestamp: '',
        nonceStr: '',
        signature: '',
        appId: 'wxc43027eac3205dad'//to modify
    };
    $.ajax({
        url: '/index/js_wx_ticket',//to modify 后台API
        type: 'get',
        dataType: 'json',
		data:{url:location.href},
        success: function (data) {
            share.timestamp = data.timestamp;
            share.nonceStr = data.noncestr;
            share.signature = data.signature;
            wxShare();
        },
		error:function(data){
			console.log("Something is error");
		}

    });

    function wxShare() {
        wx.config({
            debug: false,
            appId: share.appId,
            timestamp: share.timestamp,
            nonceStr: share.nonceStr,
            signature: share.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });

        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: share.title,
                link: share.link,
                imgUrl: share.imgUrl,
                success: function () {
                    console.log("success");
                },
                cancel: function () {
                    console.warn("faild");
                }
            });
            wx.onMenuShareAppMessage({
                title: share.title,
                desc: share.desc,
                link: share.link,
                imgUrl: share.imgUrl,
                success: function () {
                    console.log("success");
                },
                cancel: function () {
                    console.warn("faild");
                }
            });
        });
    }

}());
