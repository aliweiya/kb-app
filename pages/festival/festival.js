//index.js

var Fn = require("../index/index_fn.js");
var conf =  require("../../utils/config");

var api = conf.getUrl('springApi');
Page({
	data: {
		// 拉去的新数据
		pullListDate: [],
		// 旧数据
		newsListData: [],
		scrollTop: null,
		child: 'kb_news_wxapptest',
		path: '../article/normal/normal?',
		api: api
	},
	onLoad: function () {
		// Fn.upperLoad(this);
	},
	onShow: function () {
		Fn.init(this);
	},
	onPullDownRefresh: function(){
		Fn.upperLoad(this);
	},
  	onReachBottom: function(){
  	   Fn.lowerLoad(this);
 	},
	scroll: function () {
		
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
	onShareAppMessage: function () {
		return {
			title: '天天快报',
			desc: '帮你了解更多春节特色',
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
	touchend: function(e){
		
		var info = e.changedTouches[0];
		var distanceX = info.clientX - this.touchInfo.clientX;
		var distanceY = info.clientY - this.touchInfo.clientY;

		if(distanceX<-80 && Math.abs(distanceY)<50){
			wx.switchTab({
				url: '../locat/locat'
			})
		}
		if(distanceX>80 && Math.abs(distanceY)<40){
			wx.switchTab({
				url: '../video/video'
			})
		}
		console.log(distanceX);
	}
})
