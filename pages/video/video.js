//index.js

var Fn = require("../index/index_fn.js");

var conf =  require("../../utils/config");

var api = conf.getUrl('videoApi');

Page({
	data: {
		// 拉去的新数据
		pullListDate: [],
		// 旧数据
		newsListData: [],
		scrollTop: null,
		xhrLock: false,
		chlid: 'kb_video_news',
		path: '../article/normal/normal?',
		api: api
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

	},
	onPullDownRefresh: function(){
		Fn.upperLoad(this);
	},
  	onReachBottom: function(){
  	   Fn.lowerLoad(this);
 	},
	bindViewTap: function(event){
		console.log( event.target.dataset.alphaBeta)
	},
	videoHrefEvent:function(e){
		//  e.target.dataset.allinfo
		var id =  e.target.dataset.url;

		console.log(id);
	},
	upper: function () {
		// 上拉加载
		// console.log('上拉加载');
		// Fn.upperLoad(this);
	},
	lower: function (e) {
		// 滚动加载
		// console.log('滚动加载');
		// Fn.lowerLoad(this);
	},
	reflash: function () {
		// Fn.upperLoad(this);
	},
	onShareAppMessage: function () {
		return {
			title: '天天快报',
			desc: '3分钟让你大开眼界',
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
		return
		var info = e.changedTouches[0];
		var distanceX = info.clientX - this.touchInfo.clientX;
		var distanceY = info.clientY - this.touchInfo.clientY;

		if(distanceX<-80 && Math.abs(distanceY)<50){
			wx.switchTab({
				url: '../festival/festival'
			})
		}
		if(distanceX>80 && Math.abs(distanceY)<40){
			wx.switchTab({
				url: '../index/index'
			})
		}
		console.log(distanceX);
	}
})
