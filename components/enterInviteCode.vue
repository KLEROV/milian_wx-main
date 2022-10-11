<template>
	<view class="content">
		<view class="main">
			<image src="@/static/myImage/invite.png"></image>
			<input type="text" placeholder="输入邀请码" maxlength="6" v-model="value"/>
			<button @click='submit'>立即绑定</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		components: {

		},
		onLoad() {

		},
		methods: {			
			submit(){
				if(this.value&&this.value.length==6){
					const url = '/user/binding',
						param={
							code:this.value
						};
					this.$api.post(url,param).then((res) => {
						this.toast(res.data.message);
								
					}).catch(err => {
						console.log(err, 2);
					})
				}else{
					let inviteMsg='邀请码不能小于六位!!!'
					uni.showToast({
						title:inviteMsg,
						icon:'none',
						duration:2000
					})
				}
			},
			toast(msg){
				uni.showToast({
					title: msg,
					icon:'none',
					duration: 2000
				});
			}
		}
	}
</script>

<style lang="scss">
	.main {	
		image{
			width:356rpx;
			height:310rpx;
			display: block;
			margin:128rpx auto 84rpx;
			border:2rpx dashed black;
		}
		input{
			width:230rpx;
			border-radius:40rpx;
			display: block;
			margin:0 auto 48rpx;
			padding:18rpx 140rpx;
			background: #F7F7F9;
			font-size: 28rpx;
			font-weight: 400;
			text-align: center;
			color: #000000;
		}
		button{
			width: 508rpx;
			height: 80rpx;
			line-height:80rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
			border-radius: 54rpx;
			margin: 0 auto;
		}
	}
</style>
