<template><!--网络异常-->
	<view class="content">
		<view class="main">
			<image src='@/static/homeImage/t3.png'></image>				
			<view>网络异常，请刷新试试～</view>
			<button @click="refresh">刷新</button>
		</view>	 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		components:{
			
		},
		
		methods: {
			refresh(){
				uni.switchTab({
					url:'../index/index',
					success() {
						
					},
					fail() {
						uni.showToast({
							title:'网络还是不给力呢~',
							icon:'none'
						},4000)
					}
				})
			}
			
		},
		computed:{
			
		},
		mounted() {
			
		},
		onLoad() {
			
			
		}
	}
</script>

<style lang="scss">
	.main {
		image{
			width:300rpx;
			height: 300rpx;
			display: block;
			margin:240rpx auto 48rpx;
			border:2rpx dashed #3E3E3E;
		}
		view{
			font-size: 32rpx;
			font-weight: 400;
			color: #3E3E3E;
			line-height: 44rpx;
			text-align: center;
		}
		button{
			width: 158rpx;
			height: 68rpx;
			border-radius: 52rpx;
			border: 2rpx solid #9C9B9B;
			line-height:68rpx;
			margin-top:48rpx;
		}
	}
</style>
