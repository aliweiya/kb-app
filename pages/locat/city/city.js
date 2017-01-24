var util = require('../../../utils/util.js');
var app = new getApp();
var g = app.global;
// 缓存KEY
var CACHEKEY = 'cityList';
var cityNow = '北京';

var conf =  require("../../../utils/config");

var cityApi = conf.getUrl('cityListApi');

Page({
    data: {
        cityNow: '',
        physicalCity:'',
        cityList: [],
    },
    onLoad: function () {
        var that = this;
        var cache = wx.getStorageSync(CACHEKEY);


        if (false) {
            that.setData({
                cityNow: g.comPostInfo.user_city,
                physicalCity: g.physicalCity||'定位失败',
                cityList: JSON.parse(cache)
            })
        } else {
            util.fetch(cityApi).then(function (d) {
                if(d && d.data && d.data.local_chllist){
                    var arr = that.formatdata(d.data.local_chllist);
                    wx.setStorage({
                        key: CACHEKEY,
                        data: JSON.stringify(arr)
                    })
                    that.setData({
                        cityNow: g.comPostInfo.user_city,
                        physicalCity: g.physicalCity||'定位失败',
                        cityList: arr
                    })
                }else{
                    wx.showToast({
                        title: '获取城市列表失败',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
        }

    },
    onShow: function(){
        this.setData({
            cityNow :g.cityInfo.cityName,
            provinNow :g.cityInfo.prvinceName
        })
    },
    setCity :function(obj){
        g.cityInfo = obj;
        g.comPostInfo.user_city = obj.cityName || obj.prvinceName;
        g.comPostInfo.user_cityid = obj.chlid;
        wx.setStorage({
            key:'locat',
            data: JSON.stringify(obj)
        })
    },
    provinEven: function (e) {
        var that = this;
        
        var allInfo = e.target.dataset.allinfo

        var isOnly = allInfo.cityArr;
        var city = allInfo.chlname;
        var chlid = allInfo.chlid;
        var province = allInfo.group;
        var isCityNow = (city === g.comPostInfo.user_city);

        console.log(allInfo);
        // 如果是城市就跳转 省份展开
        if (!isOnly || isOnly.length == 0) {
            // 选择城市
            if(isCityNow){
                // 如果是之前的城市
                return 
            }

            // 根据这个值判断是否刷新
            g.isNewSetCity = true;

            // 缓存数据
            var locatObj = {
                cityName: city,
                prvinceName: province,
                chlid: chlid
            };
            this.setCity(locatObj);
            
            wx.navigateBack();
        } else {
            // 展开更多城市
            var index = allInfo.posIndex;
            var cityList = that.data.cityList;

            cityList[index].isExtend = !cityList[index].isExtend;
            that.setData({
                cityList: cityList
            })
        }

    },
    _getQueryIndex: function (arr, key, query) {
        var temp;

        var len = arr.length;
        while (len--) {
            var item = arr[len];
            if (item[key] === query) {
                temp = len;
                break;
            }
        }

        return temp;
    },
    formatdata(obj) {
        var temp = [];
        var index = 0;

        for (var key in obj) {
            var item  = obj[key];

            if(item.length === 1){
                 item[0].posIndex = index;
                 item[0].cityArr = [];
                 index++;
                 temp.push(item[0]);
            }else{
                var provice = {
                    chlname: key,
                    posIndex: index,
                    isExtend: false,
                    cityArr: item
                };

                 index++;
                 temp.push(provice)
            }
        }
        return temp;
    }
})