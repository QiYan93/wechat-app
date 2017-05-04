const mta = require('../../utils/mta_analysis.js');
Page({
    data:{
        title:'请选择快递公司',
        error:null
    },
    onLoad(option){
        wx.showToast({
            title:'正在加载',
            icon:'loading',
            duration: 100000
        })
        var number = option.number;
        var that = this;
        this.setData({
            option: option
        })
        wx.request({
            url: 'https://qiyan93.com/kuaidi/type?number='+number,
            method: 'GET', 
            header: {
                'Content-Type': 'application/json'
            }, 
            success: function (res) {
                that.setData({
                    data: res.data.data
                })
            },
            fail: function () {
                that.setData({
                    error: '服务器挂了'
                })
            },
            complete: function(){
                wx.hideToast();
            }
        })
    },
    onReady(){
       mta.Page.init();
    },
    selectType(event){
        var index = event.currentTarget.dataset.index;
        var Shippers = this.data.data.Shippers;
        var type = Shippers[index].ShipperCode;
        var number = this.data.option.number;
        var name = Shippers[index].ShipperName;
        wx.navigateTo({
            url: '/page/detail/detail?type='+type+'&number='+number+'&name='+name
        })
    }
})