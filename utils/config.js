function getUrl(key) {
    var arr = {
        article: 'https://wxapp.cnews.qq.com/getSubNewsContent',
        relateNews: 'https://wxapp.cnews.qq.com/getSubNewsRelate',
        topic: 'https://wxapp.cnews.qq.com/getSpecialListItems',
        topic_v: 'https://wxapp.cnews.qq.com/getSpecialVideoListItems',
        media_info: 'https://wxapp.cnews.qq.com/getSubItem',
        media_article:'https://wxapp.cnews.qq.com/getSubNewsIndex',
        media_video:'https://wxapp.cnews.qq.com/getVideoNewsIndex',
        media_next:'https://wxapp.cnews.qq.com/getSubNewsListItems',
        comment:'https://wxapp.cnews.qq.com/getQQNewsComment',

        timeLine: 'https://wxapp.cnews.qq.com/getSubNewsInterest?devid=113&chlid=wxapp_kb_tl',
        jwdApi:'https://wxapp.cnews.qq.com/getLocChl?adcode=110108',
        postApi:'https://wxapp.cnews.qq.com/uploadUserInfo',
        cityListApi: 'https://wxapp.cnews.qq.com/getSubChannels',
        videoApi: 'https://wxapp.cnews.qq.com/getSubNewsChlidInterest?chlid=kb_video_news',
        springApi: 'https://wxapp.cnews.qq.com/getSubNewsChlidInterest?chlid=kb_news_springf',
        locatApi: 'https://wxapp.cnews.qq.com/getSubNewsChlidInterest?chlid='
    }

    return arr[key]  ? arr[key] : false;
}

module.exports = {
    getUrl: getUrl
};