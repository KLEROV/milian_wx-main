export const baseUrl = "http://192.168.0.62/api"
import qs from 'qs'
// export const baseUrl = "http://139.9.155.229/api"


export function getToken() {
	try {
		const token = uni.getStorageSync('Token');
		if (token) {
			return token
		} else {
			return ''
		}
	} catch (e) {
		console.log(e)
	}
}
uni.addInterceptor('request', {
	invoke(args) {
		// console.log(args);
		// request 触发前拼接 url 
		const {
			data,
			method,
		} = args;
		if (method === "GET") {
			// 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
			const newData = qs.stringify(data, {
				arrayFormat: "repeat"
			})
			delete args.data;
			args.url = `${args.url}?${newData}`;
		}
	},
	success(args) {},
	fail(err) {},
	complete(res) {}
})

function getHeaders() {


	let token = getToken()

	let header = {
		// token
		"Authorization": "Bearer" + token, // 'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		"Accept": "application/json"

	}
	return header
}

export default {
	get(url, param) {
		return new Promise((resolve, reject) => {
			uni.request({
				method: 'GET',
				url: baseUrl + url,
				data: param,
				header: getHeaders()
			}).then(res => {
				switch (res[1].statusCode) {
					case 200:
					
						resolve(res[1])
						break
					case 400:
						resolve(res[1])
						break
					case 401:
						uni.showToast({
							title: '授权超时,请重新授权!!',
							icon: 'none',
							duration: 2000
						})
						uni.clearStorageSync();
						uni.redirectTo({
							url: '/pages/start/start'
						})
						// resolve(res[1])
						break
					default:
						reject(res[1])
				}
			}).catch(
				(response) => {

					reject(response)
				}
			)
		})
	},

	post(url, param) {
		return new Promise((resolve, reject) => {
			uni.request({
				method: 'POST',
				url: baseUrl + url,
				data: param,
				header: getHeaders(),
				// success: (res) => {
				// 	console.log(res)
				// 	resolve(res)
				// }
			}).then(res => {
				switch (res[1].statusCode) {
					case 200:

						resolve(res[1])
						break
					case 400:

						resolve(res[1])
						break
					case 401:
						uni.showToast({
							title: '授权超时,请重新授权!!',
							icon: 'none',
							duration: 2000
						})
						uni.clearStorageSync();
						uni.redirectTo({
							url: '/pages/start/start'
						})
						resolve(res[1])
						break

					case 422:
						resolve(res[1])
						break
					default:
						reject(res[1])

				}
			}).catch(
				(response) => {
					reject(response)
				}
			)
		})
	},
	put(url, param) {
		return new Promise((resolve, reject) => {
			uni.request({
				method: 'PUT',
				url: baseUrl + url,
				data: param,
				header: getHeaders(),
				// success: (res) => {
				// 	console.log(res)
				// 	resolve(res)
				// }
			}).then(res => {
				console.log(res[1].statusCode)
				switch (res[1].statusCode) {
					case 200:
						resolve(res[1])
						break
					case 400:
						resolve(res[1])
						break
					case 401:
						uni.showToast({
							title: '授权超时,请重新授权!!',
							icon: 'none',
							duration: 2000
						})
						uni.clearStorageSync();
						uni.redirectTo({
							url: '/pages/start/start'
						})
						break

					case 422:
						resolve(res[1])
						break
					default:
						reject(res[1])

				}
			}).catch(
				(response) => {
					reject(response)
				}
			)
		})
	}
}
