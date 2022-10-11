<template>
	<!-- 提现明细 -->
	<view class="details">
		<view class="detailsList" v-for="(item,index) in listData" :key="index">
			<view class="listLeft">
				<view class="text-one">{{item.admin_status}}</view>
				<view class="text-two">{{item.apply_at}}</view>
			</view>
			<view class="listRight">
				<image src="@/static/img-withdraw/details.png" mode=""></image>
				<text>-{{item.beans}}</text>
				<!-- <text>00 </text> -->
			</view>
		</view>

		<view class="showBottom">
			显示近3个月记录
		</view>
	</view>
</template>

<script>
	import request from "@/api/api.js"
	export default {
		data() {
			return {
				listData: [{
						title: '审核中',
						date: "2020-13-21",
						icon: '100.00'
					},
					{
						title: '审核中',
						date: "2020-13-21",
						icon: '100.00'
					},
					{
						title: '提现成功',
						date: "2020-13-21",
						icon: '100.00'
					},
					{
						title: '审核中',
						date: "2020-13-21",
						icon: '100.00'
					},
					{
						title: '审核驳回',
						date: "2020-13-21",
						icon: '100.00'
					},
					{
						title: '审核中',
						date: "2020-13-21",
						icon: '100.00'
					},
					{
						title: '审核中',
						date: "2020-13-21",
						icon: '100.00'
					},
				]
			}
		},
		methods: {
			init() {
				request.get('/user/withdraws').then(res => {
					this.listData = res.data.data
				})
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style lang="scss">
	.details {
		width: 100%;
		height: 100%;
		padding: 30rpx 20rpx;
		box-sizing: border-box;

		.detailsList {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 25rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #F3F3F3;

			.listLeft {
				.text-one {
					color: #666666;
					font-size: 28rpx;
				}

				.text-two {
					color: #9C9B9B;
					font-size: 24rpx;
					margin-top: 20rpx;
				}
			}

			.listRight {
				font-size: 28rpx;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 10rpx;
					vertical-align: middle;
				}
			}
		}

		.showBottom {
			width: 100%;
			text-align: center;
			font-size: 28rpx;
			color: #9C9B9B;
			margin-top: 50rpx;
		}
	}
</style>
