

Page({
    data: {
        hasLocation: false,
    },
    getLocation: function () {
        var that = this
        wx.getLocation({
            success: function (res) {
                console.log(res)
                that.setData({
                    hasLocation: true,
                    location:res
                })
            }
        })
    },
    clear: function () {
        this.setData({
            hasLocation: false
        })
    },
    onLoad: function(){
        this.getLocation();
    }
})