var util = require('../../utils/util.js');
var page = 1;
var id = '';
Page({
    data: {
        scrollTop:50,
        hidden: false,
        winHeight: 0,
        currentTab:0,
        newsList: [],
        goodList:[],
        shareList:[],
        askList:[],
        jobList: []
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
    onReady: function () {
        var that = this;
        wx.request({
            url: 'https://cnodejs.org/api/v1/topics',
            data:{
                page: page,
                limit: 20
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    newsList: res.data.data.map(function (item) {
                        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                        return item;
                    }),
                    hidden: true
                })
            }
        })
    },
    getData:function(that){
        if(that.data.currentTab == 0){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        newsList: res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 1){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=good',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        goodList:  res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 2){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=share',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        shareList:  res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 3){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=ask',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        askList:  res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 4){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=job',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        jobList:  res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }
    },
    /**
     * 滑动切换tab
     */
    bindChange: function (e) {
        var that = this;
        if (that.data.currentTab === e.detail.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.detail.current
            });
            that.getData(that);
        }
    },
    /**
     * 点击tab切换
     */
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current,
                hidden: false
            });
            that.getData(that);
        }
    },
    refresh:function(){
        var that = this;
        that.setData({
            hidden: false
        })
        if(that.data.currentTab == 0){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        newsList: res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 1){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=good',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        goodList: res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 2){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=share',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        shareList: res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 3){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=ask',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        askList: res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 4){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=job',
                data:{
                    page: 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        jobList: res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        }),
                        hidden: true
                    })
                }
            })
        }

    },
    loadMore:function(){
        var that = this;
        that.setData({
            hidden: false
        })
        if(that.data.currentTab == 0){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics',
                data:{
                    page: page + 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        newsList: that.data.newsList.concat(res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        })),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 1){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=good',
                data:{
                    page: page + 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        goodList: that.data.goodList.concat(res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        })),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 2){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=share',
                data:{
                    page: page + 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        shareList: that.data.shareList.concat(res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        })),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 3){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=ask',
                data:{
                    page: page + 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        askList: that.data.askList.concat(res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        })),
                        hidden: true
                    })
                }
            })
        }else if(that.data.currentTab == 4){
            wx.request({
                url: 'https://cnodejs.org/api/v1/topics?tab=job',
                data:{
                    page: page + 1,
                    limit: 20
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        jobList: that.data.jobList.concat(res.data.data.map(function (item) {
                            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                            return item;
                        })),
                        hidden: true
                    })
                }
            })
        }

    },
    toDetail: function (e) {
        id = e.target.dataset.id
        module.exports.id = id
        wx.navigateTo({
            url: '../detail/index'
        })
    }
})