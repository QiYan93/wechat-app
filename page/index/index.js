const mta = require('../../utils/mta_analysis.js');
Page({
    data: {
        hotType: [{
                "name": "自动识别",
                "type": "auto"
            },
            {
                "letter": "D",
                "tel": "95353",
                "name": "德邦",
                "number": "5180435727",
                "type": "DBL"
            },
            {
                "letter": "E",
                "tel": "40080-11183",
                "name": "EMS",
                "number": "9572253781500",
                "type": "EMS"
            },
            {
                "letter": "R",
                "tel": "400-010-6660",
                "name": "如风达",
                "number": "6800000635515",
                "type": "RFD"
            },
            {
                "letter": "S",
                "tel": "95338",
                "name": "顺丰",
                "number": "952727764582",
                "type": "SF"
            },
            {
                "letter": "S",
                "tel": "95543",
                "name": "申通",
                "number": "403234843091",
                "type": "STO"
            },
            {
                "letter": "S",
                "tel": "95315",
                "name": "苏宁",
                "number": "SN0030000041011500",
                "type": "SUNING"
            },
            {
                "letter": "Y",
                "tel": "021-69777888 021-69777999",
                "name": "圆通",
                "number": "100668657244",
                "type": "YTO"
            },
            {
                "letter": "Y",
                "tel": "95546",
                "name": "韵达",
                "number": "1202237859178",
                "type": "YD"
            },
            {
                "letter": "Y",
                "tel": "11185",
                "name": "邮政包裹",
                "number": "9610027635439",
                "type": "YZPY"
            },
            {
                "letter": "Z",
                "tel": "95311",
                "name": "中通",
                "number": "421447644512",
                "type": "ZTO"
            },
            {
                "letter": "Z",
                "tel": "400-6789-000",
                "name": "宅急送",
                "number": "A002083939830",
                "type": "ZJS"
            },
            {
                "letter": "Z",
                "tel": "400-000-5566",
                "name": "中铁物流",
                "number": "119005886864",
                "type": "ZTWL"
            },
            {
                "letter": "Z",
                "tel": "11183",
                "name": "中邮",
                "number": "NE88379114242",
                "type": "ZYWL"
            },
        ],
        index: 0,
        number: null,
        showClear: false,
        disabled: false
    },
    onReady() {
        mta.Page.init();
    },
    getNumber(e){
        var number = e.detail.value;
        this.setData({
            number: number
        })
    },
    selectType(e) {
        var index = e.detail.value;
        this.setData({
            index: index
        })
    },
    toDetail(){
        var type = this.data.hotType[this.data.index].type;
        var number = this.data.number;
        var name = this.data.hotType[this.data.index].name;
        var that = this;
        this.setData({
            disabled: true
        })
        wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 1000000
        })
        if(number && type){
            if(type==='auto'){
                wx.request({
                    url: 'https://qiyan93.com/kuaidi/type?number='+number,
                    method: 'GET', 
                    header: {
                        'Content-Type': 'application/json'
                    }, 
                    success: function (res) {
                        wx.hideToast();
                        that.setData({
                            disabled: false
                        })
                        if(res.data.data.Shippers.length>1){
                            wx.navigateTo({
                                url: '/page/company/company?type='+type+'&number='+number
                            })
                        }else{
                            var ShipperCode = res.data.data.Shippers[0].ShipperCode;
                            wx.navigateTo({
                                url: '/page/detail/detail?type='+ShipperCode+'&number='+number+'&name='+name
                            })
                        }
                    },
                    fail: function () {
                        wx.showToast({
                            title: '服务器错误',
                            image:'../../images/err.png',
                            duration: 2000
                        })
                    },
                    complete: function(){
                        wx.hideToast();
                        that.setData({
                            disabled: false
                        })
                    }
                })
            }else{
                wx.navigateTo({
                    url: '/page/detail/detail?type='+type+'&number='+number+'&name='+name,
                    complete: function(){
                        that.setData({
                            disabled: false
                        })
                    }
                })
            }
        }else{
            wx.showToast({
                title: '请填写运单号',
                image:'../../images/err.png',
                duration: 1500,
                complete: function(){
                    that.setData({
                        disabled: false
                    })
                }
            })
        }
    },
    clear(){
        this.setData({
            number: null,
            showClear:false
        })
    }
})