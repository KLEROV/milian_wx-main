<template><!--暂无相关消息-->
	<view class="content">
		<view class="main">
			<image src='@/static/homeImage/t4.png'></image>				
			<view>暂无相关记录</view>
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
	}
</style>
