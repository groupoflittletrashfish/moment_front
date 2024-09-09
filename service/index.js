import Vue from 'vue'
import Request from './request.js'
const http = new Request();
// 此方法在request.js里用于更改基础请求路径
http.setConfig((config) => {
	console.log('执行了配置...')
	// console.log(config)
	var url = ""
	console.log(process.env.NODE_ENV)
	if (process.env.NODE_ENV === 'development') {
		url = 'http://6n1850q762.goho.co:13890';
	} else {
		url = '';
	}
	console.log('url:' + url)
	config.baseUrl = url
	return config
})

http.interceptor.request((config, cancel) => {
	/* 请求之前拦截器 */
	uni.showLoading({
		title: "请稍后...",
		mask: true,
		duration:15000
	})
	var _token = uni.getStorageSync('token'); // 从本地缓存中同步获取指定 key 对应的内容。
	if (_token) {
		config.header.token = _token;
	}
	return config;
})
http.interceptor.response(
	(response) => {
		/* 请求之后拦截器 */
		uni.hideLoading(); //关闭加载动画
		if (!response || response.statusCode == 401) {
			uni.clearStorage();
			uni.reLaunch({
				url: '/pages_package_login/login/login.vue',
			});
			return false;
		}
		if (!response || response.statusCode == 404) {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '接口不存在'
			});
		} else if (response.errMsg && response.errMsg == 'request:fail') {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '网络连接失败'
			});
		} else {
			if (response.statusCode == 200 && response.data.code == 200) {
				return response.data.data;
			} else {
				if (!response.data) {
					uni.reLaunch({
						url: '/pages_package_login/login/login.vue',
					});
					//如果是401,那么即token失效,清空缓存并跳转到登录页面
				} else if (response.data.code == 401) {
					uni.clearStorage();
					uni.reLaunch({
						url: '/pages/login/login',
					});
				} else if (response.data.code == 402) {
					uni.showModal({
						title: '提示',
						content: response.data.msg,
						showCancel: false
					});
				} else if (response.data.code == 409) {
					uni.showModal({
						title: '提示',
						content: response.data.msg,
						showCancel: false
					});
				} else if (response.data.code == 400) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: response.data.msg
					});
				} else {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: response.data.msg,
						duration:5000
					});
				}
			}
		}

	});
export {
	http
};