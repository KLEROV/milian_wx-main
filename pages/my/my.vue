<template>
	<page-meta :page-style=" show ? 'overflow: hidden;' : '' " />
	<view class="my">
		<!-- 个人头像资料 -->
		<persondata :tableData="tableData" :addressName="addressName"></persondata>
		<bill :tableData="tableData" @show='shows'></bill>
		<account></account>
		<van-notify id="van-notify" />


		<!-- 第一次进入展示蒙层 -->
		<van-overlay :show="show" @click="onClickHide" lock-scroll>
			<view class="wrapper">
				<image class="img1" src="@/static/img-my/shade1.png" mode=""></image>
				<image class="img2" src="@/static/img-my/shade2.png" mode=""></image>
				<button type="default" class="btn">我知道了</button>
				<image class="img3" src="@/static/img-my/shade3.png" mode=""></image>
				<image class="img4" src="@/static/img-my/shade4.png" mode=""></image>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	import persondata from "./components/personData.vue"
	import bill from "./components/bill.vue"
	import account from "./components/accountNumber.vue"
	import request from "@/api/api.js"
	import Notify from "@/wxcomponents/vant/dist/notify/notify"
	import amap from "@/common/amap-wx.130.js"
	
	export default {
		onLoad() {
			console.log(123)
			console.log(this.$api);
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.getRegeo()
		},
		onShareAppMessage(res) {
			console.log(res)
			if (res.from === "menu") {
				console.log(res.target)
			}
			return {
				title: '分享好友，一起觅恋～',
				path: '/pages/my/my',
				imageUrl: "../../static/img-share/img1.png",
			}
		},
		components: {
			persondata,
			bill,
			account
		},
		data() {
			return {
				tableData: {},
				// 地址信息的参数
				amapPlugin: null,
				key: 'e3a17dce47dd6bf68ad6a111fe4dc7c3',
				addressName: '',
				weather: {
					hasData: false,
					data: []
				},
				show: '',
				first: 0,
			};
		},
		methods: {
			init() {
				request.get('/user/me', {}).then(res => {
					console.log('这是my的个人信息数据', res)
					if(res.statusCode === 401){
						Notify({
							type: 'danger',
							message: '登录失效，请重新登录',
						});
						uni.clearStorageSync()
						uni.redirectTo({
							url: '../start/start'
						});
					}
					if (res.statusCode === 200) {
						this.tableData = res.data.data
						uni.setStorageSync('userinfos', res.data.data)
					}
				})
				console.log(uni.getStorageSync('first'))
				// 判断是否首次进入
				if (uni.getStorageSync('first') > 0) {
					this.show = false
				} else if (this.first === 0) {
					this.show = true
				}
			},
			// 地址
			getRegeo() {
				uni.showLoading({
					title: '获取信息中'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log('地理信息', data)
						this.addressName = data[0].regeocodeData.addressComponent.city;
						uni.hideLoading();
						uni.setStorageSync('Locations', data)
					}
				});


			},
			// 测试-向子组件传递方法
			shows() {
				console.log(123)
			},
			// 关闭蒙层
			onClickHide() {
				this.first += 1
				uni.setStorageSync('first', this.first)
				this.show = false
			}
		},
		created() {
			this.init()
			uni.$on('update', data => {
				console.log('叫你更新数据了', data)
				if (data == true) {
					this.init()
				}
			})
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},


	}
</script>

<style lang="scss">
	.my {
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #D5C3FF 0%, rgba(255, 255, 255, 0.3) 100%);

		.wrapper {
			width: 100%;
			height: 100%;
			position: relative;

			.btn {
				width: 240rpx;
				height: 80rpx;
				border-radius: 40rpx;
				opacity: 0.69;
				border: 1px solid #FFFFFF;
				position: absolute;
				top: 50%;
				left: 35%;
				background: none;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
			}

			.img1 {
				width: 386rpx;
				height: 132rpx;
				position: absolute;
				top: 75rpx;
				left: 200rpx;
			}

			.img2 {
				width: 524rpx;
				height: 106rpx;
				position: absolute;
				top: 200rpx;
				left: 80rpx;
			}

			.img3 {
				width: 686rpx;
				height: 218rpx;
				position: absolute;
				bottom: 250rpx;
				left: 25rpx;
			}

			.img4 {
				width: 686rpx;
				height: 218rpx;
				position: absolute;
				bottom: 20rpx;
				left: 30rpx;
			}
		}
	}
</style>
