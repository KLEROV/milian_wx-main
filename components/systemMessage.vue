<template>
	<view class="content">
		<view class="main">
			<image src="@/static/homeImage/login-logo.jpg"></image>
			<view>
				<view class="title">进来抽奖，即得100万现金红包瓜分资格</view>
				<view class="detail">抽奖重磅福利来啦！仅限【3月29日】，参与邀请好友活动，完成1次抽奖，即可获得瓜分100万现金大奖资格，还有机会获得iPhone13等丰厚大礼</view>
				<!--<view class="getDetail">
					 <view>查看详情</view> 
					<image src="@/static/myImage/192fd2ae.jpg"></image>
				</view>-->
				<view class="time">02-22</view>
			</view>
			<view>
				<view class="title">2022年的另一半，来觅恋找吧～</view>
				<view class="detail">快看过来，觅恋悄悄为你准备了一份【聊天秘籍】，听说使用了这套秘籍，脱单几率大幅度提升呢，仅限今日，赶紧去看看吧～</view>
				<view class="getDetail">
					<view>查看详情</view>
					<image src="@/static/myImage/192fd2ae.jpg"></image>
				</view>
				<view class="time">02-22</view>
			</view>
			<view>
				<view class="title">2月加油！</view>
				<view class="detail">1月最后的一周开启，不知不觉过完了这周就是2月了，点点搭讪，和另一半一起迎接崭新的2月吧！</view>
				<!--<view class="getDetail">
					 <view>查看详情</view> 
					<image src="@/static/myImage/192fd2ae.jpg"></image>
				</view>-->
				<view class="time">02-22</view>
			</view>
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
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.main{
		width:686rpx;
		margin: 0 auto;
		>image{
			width: 100%;
			margin:44rpx 0 0rpx 0;
		}
		>view{
			padding-bottom:32rpx;
			border-bottom:2rpx solid #F3F3F3;;
			margin-top:32rpx;
		}
		.title{
			font-size:28rpx;
			font-weight: 500;
			color: #3E3E3E;
			line-height: 40rpx;
			margin-bottom:16rpx;
		}
		.detail,.getDetail,.time{
			font-size: 24rpx;
			font-weight: 400;
			color: #3E3E3E;
			line-height: 36rpx;
		}
		.getDetail{
			color: #AB5FF1;
			line-height: 34px;
			overflow: hidden;
			view{
				float: left;
			}
			image{
				width: 22rpx;
				height:14rpx;
				margin-left:8rpx;
			}
		}
		.time{
			color: #C9C9C9;
			line-height: 34rpx;
			text-align: right;
			margin-top:8rpx;
		}
	}
	
</style>
