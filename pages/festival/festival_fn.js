// var app = getApp();
// var fetch = app.fetch;

var newsListApi = 'https://wxapp.cnews.qq.com/getSubNewsInterest?devid=113&chlid=main';

var forkData = require('../../data/data_index');
var util = require('../../utils/util');
var fetch = util.fetch;

var KEY = 'newslist';

// function getData(me) {
// 	fetch(newsListApi).then(function(d){
// 		formatData(d.data);

// 		me.setData({
// 			newsListData: d.data[KEY]
// 		});
// 	})
// }
// 公共方法，找到数组arr中key等于query的index
function _getQueryIndex(arr,key,query){
	var temp ;

	var len = arr.length;
	while(len--){
		var item = arr[len];
		if(item[key] === query){
			temp =  len;
			break;
		}
	}

	return temp;
};
function formatData(d) {
	// 把评论数合并到新闻数组上
	var newsArr = d[KEY];
	var commentArr = d.changeInfo.subIdComments;
	var news_len = newsArr.length;

	while(news_len--){
		var item = newsArr[news_len];
		var id = item.id;
		
		var index =	_getQueryIndex(commentArr,'id',id);
		item.comments = commentArr[index].comments;
		item.pathUrl = getParaUrl(item);
		console.log(item.pathUrl);
	}
	console.log(d);
};
function getParaUrl(item){
	var url = '../article/normal/normal?';
	return `${url}id=${item.id}&commentid=${item.commentid}&comments=${item.comments}&chlname=${item.chlname}&timeStamp=${item.timestamp}`;
}
function xhr(d) {
	setTimeout(function () { wx.hideNavigationBarLoading(); }, 1000);
}
// 新数据塞到旧数据
function new2old(newArr,oldArr){
	oldArr = newArr.concat(oldArr);
}
function upperLoad(me){
	wx.showNavigationBarLoading();
	fetch(newsListApi,{forward:0},true).then(function(d){
		// 
		formatData(d.data);
		var newArr = me.data.pullListDate;
		var oldArr = me.data.newsListData;
		new2old(newArr,oldArr);
		newArr = d.data[KEY];
		me.setData({
			pullListDate: newArr,
			newsListData: oldArr
		});
		wx.hideNavigationBarLoading();
	})
}
function lowerLoad(me){
	wx.showNavigationBarLoading();
	var oldArr = me.data.newsListData;
	fetch(newsListApi,{forward:1},true).then(function(d){
		console.log(d);
		formatData(d.data);
		oldArr = oldArr.concat(d.data[KEY]);
		me.setData({
			newsListData: oldArr
		});
		wx.hideNavigationBarLoading();
	})
}
module.exports.getParaUrl = getParaUrl;
exports.upperLoad = upperLoad;
exports.lowerLoad = lowerLoad;
