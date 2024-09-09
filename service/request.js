export default class Request {
	config = {
		baseUrl: '',
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text',
		success() {},
		fail() {},
		complete() {}
	}

	static posUrl(url) {
		/* 判断url是否为绝对路径 */
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	interceptor = {
		request(f) {
			if (f) {
				Request.requestBeforeFun = f
			}
		},
		response(f) {
			if (f) {
				Request.requestComFun = f
			}
		}
	}

	static requestBeforeFun(config) {
		return config
	}

	static requestComFun(response) {
		return response
	}
	// 更改基础请求路径
	setConfig(f) {
		// console.log(f)
		// console.log(this.config)
		this.config = f(this.config)
	}

	request(options = {}) {
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
		options.data = options.data || {}
		options.header = options.header || this.config.header
		options.method = options.method || this.config.method
		return new Promise((resolve, reject) => {
			let next = true
			let _config = null
			options.complete = (response) => {
				console.log(response)
				//自定义的返回码
				let statusCode = response.statusCode
				let code = response.data.code

				response.config = _config
				response = Request.requestComFun(response)
				//如果HTTP返回码和自定义的返回码都是200,才能执行then(),否则就catch
				if (statusCode === 200 && code === 200) { // 成功
					resolve(response)
				} else {
					//此处可能存在问题，有待优化
					reject(response)
				}
			}
			let cancel = (t = 'handle cancel') => {
				let err = {
					errMsg: t,
					config: afC
				}
				reject(err)
				next = false
			}
			let afC = {
				...this.config,
				...options
			}
			_config = {
				...afC,
				...Request.requestBeforeFun(afC, cancel)
			}
			if (!next) return
			uni.request(_config)
		})
	}

	// 设置 get 和 post 请求 需要url请求地址 data所需参数 
	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		// 使用 this.request 发起请求，传入参数，获取数据
		return this.request(options)
	}

	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	}

	upload(url, path, data, options = {}) {
		return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: this.config.baseUrl + url,
					filePath: path,
					name: 'file',
					formData: data,
					header: {
						'token': uni.getStorageSync('token')
					},
					success: (uploadFileRes) => {
						let response = JSON.parse(uploadFileRes.data)
						if (response.code == '401') {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
						resolve(response.data)
					},
					fail: (err) => {
						reject(err)
					}
				});
			})
		}
	}