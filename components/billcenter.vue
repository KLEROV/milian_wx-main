<template>
	<!-- 账单中心 -->
	<view class="billcenter">
		<view class="billHeader">
			<view class="" v-for="(item,index) in billList" :key="index">
				<view class="listName">
					{{item.name}}
					<image @click="earnings()" v-show="index ===2" src="@/static/img-billcenter/question.png" mode="">
					</image>
				</view>
				<view class="listNumber">
					{{item.number}}
				</view>
			</view>
		</view>
		<view class="billContent">
			<view class="content-box">
				<view :class="{'content-box1':little ===index}" v-for="(item,index) in littleList" :key="index"
					@click="changes(index)">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="billBottom">
			<view class="detailsList" v-for="(item,index) in listData" :key="index">
				<view class="listLeft">
					<view class="text-one">搭讪{{item.data.to_user_name}}</view>
					<view class="text-two">{{item.created_at}}</view>
				</view>
				<view class="listRight">
					<image src="@/static/img-billcenter/bean.png" mode=""></image>
					<text>{{item.num}}</text> <text> </text>
				</view>
			</view>

			<view class="showBottom">
				显示近3个月记录
			</view>
		</view>


		<!-- 联系我们 遮罩层 -->
		<van-overlay :show="contactshow" class="overlayUs">
			<view class="wrapper">
				<view class="wrapper-title">
					收益规则
				</view>
				<view class="wrapper-box1">
					1、用户搭讪自己1次，可获得搭讪费用的65%。搭讪费用可在【我的】中设置
				</view>
				<view class="wrapper-box2">
					2、邀请好友绑定邀请码，可获得好友搭讪收益的5%
				</view>

				<button class="btn" type="default" @click="knows()">我知道了</button>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	import request from "@/api/api.js"
	import qs from 'qs'
	export default {
		data() {
			return {
				billList: [{
						name: 'xiaofei',
						number: '2245.00'
					},
					{
						name: 'chongzhi',
						number: '2245.00'
					},
					{
						name: 'shouyi',
						number: '2245.00'
					},
				],
				littleList: [{
						name: "消费",
						id: 1
					},
					{
						name: "充值",
						id: 2
					},
					{
						name: "收益",
						id: 3
					},
				],
				little: 0,
				listData: [],

				// 收益规则 状态
				contactshow: false
			}
		},
		methods: {
			init() {
				request.get('/user/me', {}).then((res) => {
					this.billList[0].number = res.data.data.cost_total
					this.billList[1].number = res.data.data.recharge_total
					this.billList[2].number = res.data.data.income_total
				})
				var ids = this.little

				if (this.little === 0) {
					ids = ['accost']
				} else if (this.little === 1) {
					ids = ['recharge']
				} else if (this.little === 2) {
					ids = ['invite_income', 'be_accosted']
				}

				request.get('/user/bean-logs', {
					'actions[]': ids
				}).then((res) => {
					this.listData = res.data.data
				})


				this.billList.map(item => {
					if (item.name == 'xiaofei') {
						item.name = '总消费'
					} else if (item.name == 'chongzhi') {
						item.name = '总充值'
					} else if (item.name == 'shouyi') {
						item.name = '总收益'
					}
				})

			},

			changes(value) {
				this.little = value
				this.init()
			},
			// 收益规则
			earnings() {
				this.contactshow = true
			},
			// 确认 
			knows() {
				this.contactshow = false
			}
		},
		created() {
			this.init()
		},

	}
</script>

<style lang="scss">
	.billcenter {
		width: 100%;
		height: 100%;

		.billHeader {
			width: 100%;
			padding: 80rpx 30rpx;
			box-sizing: border-box;
			background: url("~@/static/img-billcenter/bg.png");
			background-size: 100% 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;


			.listName {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				justify-content: center;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-left: 16rpx;
				}
			}

			.listNumber {
				font-size: 40rpx;
				margin-top: 20rpx;
			}
		}

		.billContent {
			width: 100%;

			.content-box {
				width: 80%;
				margin: -40rpx auto 0;
				border-radius: 40rpx;
				height: 88rpx;
				line-height: 88rpx;
				background: #FFFFFF;
				box-shadow: 0px 1px 4px 0px #F0E0FF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 40rpx;
				box-sizing: border-box;
				color: #9C9B9B;
				font-size: 28rpx;

				.content-box1 {
					color: #AB5FF1;
				}
			}
		}

		.billBottom {
			width: 100%;
			padding: 20rpx 30rpx 0;
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


		.overlayUs {
			width: 100%;
			height: 100%;

			.wrapper {
				width: 80%;
				height: 480rpx;
				margin: 50% auto;
				padding: 30rpx 48rpx;
				box-sizing: border-box;
				color: #3E3E3E;
				background-color: #FFFFFF;
				border-radius: 20rpx;

				.wrapper-title {
					text-align: center;
					font-size: 36rpx;
				}

				.wrapper-box1,
				.wrapper-box2 {
					font-size: 28rpx;
					margin-top: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
				}

				.btn {
					width: 80%;
					margin: 0 auto;
					height: 80rpx;
					border-radius: 40rpx;
					color: #FFFFFF;
					font-size: 32rpx;
					background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					margin-top: 60rpx;
				}
			}
		}
	}
</style>
