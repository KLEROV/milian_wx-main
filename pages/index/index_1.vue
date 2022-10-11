<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

		<uni-forms :modelValue="formData">
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item required name="hobby" label="兴趣爱好">
				<uni-data-checkbox multiple v-model="formData.hobby" :localdata="hobby" />
			</uni-forms-item>
		</uni-forms>
		<button @click="getuserinfo">Submit</button>

		<button type="default" @click="pay">发起支付</button>
	</view>
</template>

<script>
	import request from "@/api/api.js"
	export default {
		data() {
			return {
				title: 'Hello',
				formData: {},
				code: ""
			}
		},
		onLoad() {

		},
		methods: {
			init() {

				// request.post('/user/login', {
				// 	user_id: 1
				// }).then(res => {
				// 	console.log(res)
				// 	uni.setStorage({
				// 		key: "Token",
				// 		data: res.data.data.token,
				// 		success() {
				// 			console.log('success')
				// 		}
				// 	})
				// })
				// }
			},


			getuserinfo() {
				var _this = this
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log('打印成功')
						console.log(res)
						_this.code = res.code
					}
				})

				uni.getUserProfile({
					desc: "获取你的昵称、头像、地区及性别",
					success: res => {
						console.log(res)

						request.post('/user/mini-login', {
							code: _this.code,
							name: res.userInfo.nickName,
							gender: res.userInfo.gender,
							avatar: res.userInfo.avatarUrl
						}).then(res => {
							console.log(res)
							uni.setStorage({
								key: "Token",
								data: res.data.data.token,
								success() {
									console.log('success')
								}
							})
						})
					}

				})
			},
			// 发起支付
			pay() {
				
				request.post("/user/payment/1",{
					
				}).then(res=>{
					console.log(res)
				})
				
				
				// uni.requestPayment({
				// 	provider: 'wxpay',
				// 	timeStamp: String(Date.now()),
				// 	nonceStr: 'A1B2C3D4E5',
				// 	package: 'prepay_id=wx20180101abcdefg',
				// 	signType: 'MD5',
				// 	paySign: '',
				// 	success: function(res) {
				// 		console.log('success:' + JSON.stringify(res));
				// 	},
				// 	fail: function(err) {
				// 		console.log('fail:' + JSON.stringify(err));
				// 	}
				// });
			}

		},

		created() {
			this.init()
			// uni.showModal({
			// 	title: '授权',
			// 	content: "是否授权",
			// 	success: () => {
			// 		this.login()
			// 	}
			// })

		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
