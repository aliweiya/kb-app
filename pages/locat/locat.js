//index.js

var Fn = require("../index/index_fn.js");

var app = new getApp();
var g = app.global;

var conf =  require("../../utils/config");

var api = conf.getUrl('locatApi');

Page({
	data: {
		// 拉去的新数据
		pullListDate: [],
		// 旧数据
		newsListData: [],
		scrollTop: null,
		chlid: '',
		baseApi: api,
		api: '',
		cityName: ''
	},
	onLoad: function (query) {
		this.queryData = query;
        //记一下页面初始化时间
        this.beginTime = parseInt(new Date().getTime() / 1000);
		// Fn.init(this,'fouce');
	},
	onPullDownRefresh: function(){
		Fn.upperLoad(this);
	},
  	onReachBottom: function(){
  	    Fn.lowerLoad(this);
 	},
	scroll: function (e) {
		// console.log(1);
	},
	upper: function () {
		// 上拉加载
		Fn.upperLoad(this);
	},
	lower: function (e) {
		// 滚动加载
		Fn.lowerLoad(this);
	},
	onShow: function () {
		
		// 公共参数城市
		var cityObj = g.cityInfo;
	
		var cityid = cityObj.chlid;

		// 如果获取不到城市名
		if (!cityObj.cityName) {
			this.setData({
				isLocatFail: true
			})
		} else {
			this.data.chlid = cityid;
			// 用户是否选择了新的城市 刷新
			// 用户选择的城市
			var isNewSetCity = g.isNewSetCity;
			if (isNewSetCity || this.data.newsListData<5) {
				this.setData({
					cityName: cityObj.cityName
				})
				this.data.api = this.data.baseApi + cityid;
				// 强制刷新
				Fn.init(this,'fouce');
				g.isNewSetCity = null;
			}
		}

	},
	onShareAppMessage: function () {
		return {
			title: '天天快报',
			desc: '关心你所在城市的新闻',
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
		return;
		var info = e.changedTouches[0];
		var distanceX = info.clientX - this.touchInfo.clientX;
		var distanceY = info.clientY - this.touchInfo.clientY;

		if(distanceX>80 && Math.abs(distanceY)<50){
			wx.switchTab({
				url: '../festival/festival'
			})
		}
		console.log(distanceX);
	}
})
