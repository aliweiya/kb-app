var conf = require('./config');
var util = require('./util');
var extend = util.extend;
var fetch = util.fetch;
var Promise = require("../lib/WechatAppPlayer/lib-inject").Promise;

var app = getApp();
var g = app.global;

function getLoginCode() {

    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                resolve(res)
            },
            fail: function (e) {
                reject(e)
            },
            complete: function (res) {
                console.log(res)
            }
        })
    })
}
function getUserInfo() {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo({
            success: function (res) {
                resolve(res)
            },
            fail: function (e) {
                reject(e)
            },
            complete: function (res) {
                console.log(res)
            }
        })
    })
}
function getJWD() {
    return new Promise(function (resolve, reject) {
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                resolve(res)
            },
            fail: function (e) {
                reject(e)
            },
            complete: function (res) {
                console.log(res)
            }
        })
    })
}
function postUserInfo() {
    var api = conf.getUrl('postApi');
    var postInfo = g.comPostInfo;

    return new Promise(function (resolve, reject) {
        wx.request({
            url: api,
            data: postInfo,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
               resolve(res)
            },
            fail: function (e) {
                reject(e);
                wx.showToast({
                    title: '网络错误',
                    icon: 'success',
                    duration: 2000
                    })
            }
        })
    })
}

function init() {
    var t = g.comPostInfo;
    return new Promise(function (resolve, reject) {
        if(t.code){
            resolve(t.code);
            return 
        }
        getLoginCode().then(function (res) {
            extend(t, res)
            // getUserInfo().then(function (res) {
            //     extend(t, res)
            //     getJWD().then(function(res){
            //             extend(t,res);
            //             postUserInfo().then(function(res){
            //                extend(t,res.data.userInfo);
            //                console.log(g);
            //             })
            //     })
            // })
            resolve(t);
            postUserInfo().then(function(res){
                extend(t,res.data.userInfo);
                console.log(g);
            })
        }, function (e) {
            reject(e)
        })
    })
}


module.exports = {
    getLoginCode,
    getUserInfo,
    getJWD,
    postUserInfo,
    init
};