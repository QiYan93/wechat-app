App({
	onLaunch() {
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
