<template>
	<!--暂无消息-->
	<view class="content">
		<image src="../static/homeImage/t6.png" @error="imgErr"></image>
		<view class="main">
			<button @click.prevent="change">我知道了</button>
			<image src="../static/homeImage/t5.png" @error="imgErr"></image>				
		</view>
		<van-tabbar :active="0" bind:change="onChange" active-color="#000" inactive-color="#9C9B9B">
			<van-tabbar-item icon="../../../../static/images/home2.png" style='color:black'>首页</van-tabbar-item>
			<van-tabbar-item icon="../../../../static/images/square1.png">广场</van-tabbar-item>
			<van-tabbar-item icon="../../../../static/images/hot1.png">热门</van-tabbar-item>
			<van-tabbar-item icon="../../../../static/images/my1.png">我的</van-tabbar-item>
		</van-tabbar>
	</view>
</template>

<script>

	export default {
		data() {
			return {

			}
		},
		components: {

		},

		methods: {
			change(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			init(){
				this.$api.get('/user/me', {}).then(res => {
					if (res.statusCode === 200) {
						this.tableData = res.data.data
						uni.setStorageSync('userinfos', res.data.data)
					}else{
						uni.showToast({
							title:'网络不佳,请稍后再试!!!',
							icon:'none',
							duration:2000
						})
					}
				})
			},
			imgErr(){//图片加载失败
				console.log('45545')
			}

		},
		computed: {

		},
		mounted() {
			this.init();
			
		},
		onLoad() {
				

		}
	}
</script>

<style lang="scss">
	view,
	button,
	image {
		padding: 0;
		margin: 0;
		border: none;
	}

	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		>image {
			width: 750rpx;
			height: 1624rpx;
			display: block;
			position: fixed;
			top: -80rpx;
			left: 0;
		}

		;

		.main {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 88888888;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			button {
				width: 240rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 54rpx;
				margin-top: 300rpx;
				border: 2rpx solid #FFFFFF;
				margin: 700rpx auto 0;
				background: none;
				color: white;
			}

			>image {
				width: 646rpx;
				height: 412rpx;
				position: absolute;
				bottom:60rpx;
				left:76rpx;
			}

		}
	}

	van-tabbar {
		.van-icon--image {
			width: 60rpx !important;
			height: 60rpx !important;
		}

		.van-tabbar-item__text {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 30rpx;
		}
		.van-hairline--top-bottom{
			height:120rpx;
			border-radius: 24rpx 24rpx 0px 0px;
		}
	}
</style>
