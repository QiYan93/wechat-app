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
    onPullDownRefresh(){
        this.getData(this.data.option)
    },
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