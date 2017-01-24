//index.js

var Fn = require("index_fn.js");
var conf =  require("../../utils/config");

var api = conf.getUrl('timeLine');

Page({
	data: {
		// 拉去的新数据
		pullListDate: [],
		// 旧数据
		newsListData: [],
		scrollTop: null,
		isShowLoading: true,
		xhrLock: false,
		chlid:'wxapp_kb_tl',
		api: api,
		animationData:{}
	},
	onLoad: function (query) {
		this.queryData = query;
        //记一下页面初始化时间
        this.beginTime = parseInt(new Date().getTime() / 1000);
	},
	onShow: function () {
		Fn.init(this);
	},
	scroll: function (e) {
		// console.log(1);
	},
	onPullDownRefresh: function(){
		Fn.upperLoad(this);
	},
  	onReachBottom: function(){
  	  Fn.lowerLoad(this);
 	},
	upper: function () {
		// 上拉加载
		// Fn.upperLoad(this);
	},
	lower: function (e) {
		// 滚动加载
		// Fn.lowerLoad(this);
	},
	reflash: function () {
		// Fn.upperLoad(this);
	},
	delEven: function(e){
		console.log(e);
	},
	onShareAppMessage: function () {
		
		return {
			title: '天天快报',
			desc: '腾讯精心打造的兴趣阅读产品',
			path: 'pages/index/index'
		}
	},
	tapEven: function(event){
		Fn.report(event,this);
		Fn.setClick(this,event);
	},
	touchstart: function(e){
		this.touchInfo = e.changedTouches[0];
	},
	switchApi:function(){
		if(this.data.testapi){
			var myapi = 'https://wxapp.cnews.qq.com/getSubNewsInterest?devid=113&chlid=wxapp_kb_tl';
		}else{
			var  myapi = 'https://twxapp.cnews.qq.com/getSubNewsInterest?devid=113&chlid=wxapp_kb_tl';
		}
		
		this.setData({
			testapi: !this.data.testapi,
			api: myapi
		})

		Fn.init(this,'fouce');
	},
	touchend: function(e){
		return
		var info = e.changedTouches[0];
		var distanceX = info.clientX - this.touchInfo.clientX;
		var distanceY = info.clientY - this.touchInfo.clientY;

		if(distanceX<-80 && Math.abs(distanceY)<50){
			wx.switchTab({
				url: '../video/video'
			})
		}
		console.log(distanceX);
	}
})
