<template>
	<view class="content">
		<view class="main">
			<image src="@/static/myImage/invite.png"></image>
			<view class="msg">已绑定邀请人:{{name}}</view>
			<view class="code">{{msg}}</view>
			<button @click='submit'>邀请好友</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				msg:'',
				name:''
			}
		},
		components: {

		},
		onLoad() {

		},
		methods: {
			submit() {

			}
		},
		mounted() {
				const baseMsg=getCurrentPages()[0].options;
				const url='/user/binding',
				param={code:baseMsg.code};
				this.msg=baseMsg.code;
				this.name=baseMsg.nickname;
				this.$api.post(url,param).then((res)=>{//邀请绑定
					const msg=res.data.message;
					uni.showToast({
						title:msg,
						icon:'none',
						duration:2000
					})
				}).catch((err)=>{
					console.log(err)
				})
		}
	}
</script>

<style lang="scss">
	.main {
		image {
			width: 356rpx;
			height: 310rpx;
			display: block;
			margin: 128rpx auto 56rpx;
			border: 2rpx dashed black;
		}

		view {
			margin: 0 auto;
			height: 44rpx;
			font-size: 32rpx;
			line-height: 44rpx;
			text-align: center;
		}

		.msg {
			width: 292rpx;
			font-weight: 400;
			color: #9C9B9B;
			margin-bottom: 16rpx;
		}

		.code {
			width: 150rpx;
			font-weight: 500;
			color: #3E3E3E;

		}

		button {
			width: 508rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
			border-radius: 54rpx;
			margin: 32rpx auto 0;
		}
	}
</style>
