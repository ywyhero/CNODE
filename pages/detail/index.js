/**
 * Created by Administrator on 2017/1/17.
 */
import first from '../first/index'
import Wxparse from '../../wxParse/wxParse'
var util = require('../../utils/util.js');
Page({
    data: {
        scrollTop:50,
        detailContent:[],
        replyList: [],
        winHeight:0,
        hidden: false
    },
    onLoad:function(){
        var that = this;
        wx.getSystemInfo({
            success:function(res){
                that.setData({
                    winHeight: res.windowHeight
                })
            }
        })
    },
    getDate:function (item, time) {
        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
        return item;
    },
    onReady: function(){
        var that = this;
        wx.request({
            url: 'https://cnodejs.org/api/v1/topic/'+ first.id,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    detailContent: that.getDate(res.data.data)
                });
                var article = res.data.data.content;
                Wxparse.wxParse('article', 'html', article, that,5);
                wx.request({
                    url: 'https://cnodejs.org/api/v1/topic/'+ first.id +'?mdrender=false',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        that.setData({
                            replyList: res.data.data.replies.reverse().map(function (item) {
                                item.create_at = util.getDateDiff(new Date(item.create_at));
                                return item;
                            }),
                            hidden: true
                        });
                    }
                })
            }
        })
    }
})