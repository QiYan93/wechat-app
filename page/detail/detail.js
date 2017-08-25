const mta = require('../../utils/mta_analysis.js');
Page({
    data:{
    },
    onLoad(option){
        wx.showToast({
            title:'正在加载',
            icon:'loading',
            duration: 100000
        })
        this.setData({
            title: option.name,
            option: option
        })
        this.setHistory(option);
        this.getData(option)
    },
    onReady() {
        mta.Page.init()
    },
    /* 下拉刷新 */
    onPullDownRefresh(){
        this.getData(this.data.option)
    },
    /* 分享 */
    onShareAppMessage(){
        var option = this.data.option,
            type = option.type,
            name = option.name,
            number = option.number;
        return {
            title: name+'--单号：'+number,
            path: 'page/detail/detail?type='+type+'&number='+number+'&name='+name,
            imageUrl: '../../images/share.png',
            success: function(){
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 1500
                })
            },
            fail: function(err){
                wx.showToast({
                    title: '分享失败',
                    image: '../../images/error.png',
                    duration: 1500
                })
            }
        }
    },
    /* 获取数据 */
    getData(option){
        var that = this;
        var type = option.type;
        var number = option.number;
        wx.request({
            url: 'https://qiyan93.com/kuaidi?type='+type+'&number='+number,
            method: 'GET', 
            header: {
                'Content-Type': 'application/json'
            }, 
            success: function (res) {
                if(res.data.data){
                    res.data.data.Traces = res.data.data.Traces.reverse();
                    that.setData({
                        result: res.data.data,
                        title: res.data.comName
                    });
                }else{
                    that.setData({
                        result: res.data
                    });
                }
                wx.stopPullDownRefresh()
            },
            fail: function () {
                that.setData({
                    result: {
                        msg:'服务器在吃饭，待会再试'
                    }
                });
                wx.stopPullDownRefresh()
            },
            complete: function(){
                wx.hideToast();
            }
        })
    },
    /* 存储历史纪录 */
    setHistory(option){
        var history = wx.getStorageSync('history');
        if(history){
            var has = history.some((item)=>{
                if(item.type===option.type&&item.name===option.name){
                    return true;
                }
            })
            if(!has){
                history.push({
                    number: option.number,
                    type: option.type,
                    name: option.name
                })
            }else{
                return;
            }
            wx.setStorage({
                key: 'history',
                data: history
            })
        }else{
            wx.setStorage({
                key: 'history',
                data: [{
                    number: option.number,
                    type: option.type,
                    name: option.name
                }]
            })
        }
    }
})