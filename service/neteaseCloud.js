class NeteaseCloud {
	constructor(url) {
		this.url = 'http://139.224.163.144:3000'
	}

	get(route, data = {}, successFunction) {
		return uni.request({
			url: this.url + route,
			data: data,
			success: res => {
				successFunction(res.data)
			},
			fail(error) {
				console.error(error)
			}
		})
	}
}


export default new NeteaseCloud()