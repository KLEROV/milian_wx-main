<template>
	<!-- 启动页 -->
	<view class="start">
		<button type="default" @click="getUserinfo" class="btn">登录授权</button>
		<homeGuide v-if="show"></homeGuide>
	</view>

</template>

<script>
	import request from "@/api/api.js"
	import homeGuide from '../../popupGuide/homeGuide.vue'
	export default {
		data() {
			return {
				code: "",
				show: false
			}
		},
		components: {
			homeGuide
		},
		methods: {
			getUserinfo() {
				var _this = this;
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log('打印成功')
						// console.log(res)
						_this.code = res.code
					}
				})

				uni.getUserProfile({
					desc: "获取你的昵称、头像、地区及性别",
					success: res => {
						// console.log('这是一个什么', res)

						uni.setStorageSync('userinfo', res.userInfo);
						try {
							request.post('/user/mini-login', {
								code: _this.code,
								name: res.userInfo.nickName,
								gender: res.userInfo.gender,
								avatar: res.userInfo.avatarUrl
							}).then(res => {
								uni.setStorage({
									key: "Token",
									data: res.data.data.token,
									success() {
										console.log('success')
									}
								})
								uni.setStorage({
									key: "firstOpen",
									data: 1,
									success(data) {
										_this.show = true;
									}
								})
							}).catch((err) => {
								uni.showToast({
									title: JSON.stringify(err),
									icon: 'none',
									duration: 10000
								})
							})
						} catch (e) {
							uni.showToast({
								title: JSON.stringify(e),
								icon: 'none',
								duration: 10000
							})
							return false;
						}
					}

				})
			}
		},
		created() {
			var info = uni.getStorageSync('userinfo');
			// console.log(info);
			if (info) {
				uni.switchTab({
					url: '/pages/index/index',
				});
				// uni.navigateTo({
				// 	url: '/components/getChated',
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.start {
		width: 100%;
		height: 100%;

		.btn {
			position: absolute;
			bottom: 20%;
			left: 10%;
			width: 80%;
			padding: 20rpx;
			border: none;
			background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
			border-radius: 50rpx;
			color: #FFFFFF;
			font-size: 28rpx;

		}
	}
</style>
