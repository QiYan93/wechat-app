const mta = require('./utils/mta_analysis.js');
App({
	onLaunch() {
		mta.App.init({
			"appID":"500439075"
		});
		var that = this;
	},
	getUserData(cb) {
		var that = this;
		if (this.userData.token) {
			typeof cb == "function" && cb(this.userData.token)
		} else {
			//调用登录接口
			wx.login({
				success: function (res) {
					let code = res.code;
					// console.log(code)
					wx.getUserInfo({
						success: function (res) {
						}
					})
				}
			})
		}
	}
})