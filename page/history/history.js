const mta = require('../../utils/mta_analysis.js');
Page({
    data:{
        title: '查询历史',
        error: null
    },
    onLoad(){
        // this.getHistory();
    },
    onReady(){
        mta.Page.init();
    },
    onShow(){
        this.getHistory();
    },
    onPullDownRefresh(){
        this.getHistory();
    },
    getHistory(){
        var history = wx.getStorageSync('history');
        if(history){
            this.setData({
                history:history
            })
        }else{
            this.setData({
                error:'暂无查询信息'
            })
        }
        wx.stopPullDownRefresh()
    },
    toDetail(e){
        var index = e.currentTarget.dataset.index;
        var history = this.data.history;
        var type = history[index].type;
        var number = history[index].number;
        var name = history[index].name;
        wx.navigateTo({
            url: '/page/detail/detail?type='+type+'&number='+number+'&name='+name
        })
    },
    clearHistory(){
        var that = this;
        wx.removeStorage({
            key: 'history',
            success: () => {
                that.setData({
                    error:'暂无查询信息',
                    history:[]
                })
            }
        });
    }
})