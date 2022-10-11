<template>
	<!-- 充值 -->
	<view class="recharge">
		<view class="recharge-header">
			<view class="recharge-title">
				<text>觅都余额</text>
				<view @click="jump">提现明细 <image src="@/static/img-recharge/jiantou.png" mode=""></image>
				</view>
			</view>

			<view class="recharge-content">
				<image src="@/static/img-recharge/big.png" mode=""></image>
				<text style="font-size: 52rpx;">{{userinfo.beans}}</text>
				<!-- <text style="font-size: 40rpx;">56</text> -->
			</view>
		</view>

		<view class="recharge-money">
			<view class="moneyTitle">
				充值金额
			</view>
			<view class="gears">
				<view :class="[indexList ==index ? 'defas' :'']" class="defa" v-for="(item,index) in rechargeList"
					@click="recharge(index)" :key="index">
					<view class="defaHeader">
						<image src="@/static/img-recharge/small.png" mode=""></image>
						<text class="text-one">{{item.number}}</text>
					</view>
					<view class="defaPrice">
						<text class="text-two">￥{{item.price}}</text>
					</view>

					<view class="defaBottom" v-show="index ===0 || index ===1">
						首充赠{{index+1}}
					</view>

				</view>
			</view>
		</view>


		<!-- 充值按钮 -->
		<view class="recharge-button">
			<button class="btn" type="default" @click="pay">充值</button>
			<view class="texts">温馨提醒：觅豆充值成功后无法退款</view>
		</view>
	</view>
</template>

<script>
	import request from "@/api/api.js"
	export default {
		data() {
			return {
				indexList: 0,
				rechargeList: [{
						number: 5,
						price: "5.00"
					},
					{
						number: 10,
						price: "10.00"
					},
					{
						number: 50,
						price: "50.00"
					},
					{
						number: 100,
						price: "100.00"
					},

				],
				userinfo: {}
			}
		},
		methods: {
			init() {
				this.userinfo = uni.getStorageSync('userinfos')
			},
			recharge(index) {
				console.log(index)
				this.indexList = index
			},
			// 充值
			// 发起支付
			pay() {

				request.post("/user/payment/1", {

				}).then(res => {
					console.log(res)
				})


				// uni.requestPayment({
				// 	provider: 'wxpay',
				// 	timeStamp: String(Date.now()),
				// 	nonceStr: 'A1B2C3D4E5',
				// 	package: 'prepay_id=wx20180101abcdefg',
				// 	signType: 'MD5',
				// 	paySign: '',
				// 	success: function(res) {
				// 		console.log('success:' + JSON.stringify(res));
				// 	},
				// 	fail: function(err) {
				// 		console.log('fail:' + JSON.stringify(err));
				// 	}
				// });
			},
			// 跳转页面
			jump() {
				uni.navigateTo({
					url: "./details"
				})
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style lang="scss">
	.recharge {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.recharge-header {
			width: 100%;
			padding: 20rpx 20rpx 60rpx 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background: url("~@/static/img-recharge/bg.png");
			background-size: 100% 100%;
			margin-bottom: 30rpx;

			.recharge-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #FFFFFF;
				opacity: 0.5;
				font-size: 28rpx;

				image {
					width: 20rpx;
					height: 20rpx;
					margin-left: 10rpx;
				}
			}

			.recharge-content {
				width: 100%;
				margin-top: 30rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;

				image {
					width: 52rpx;
					height: 52rpx;
					margin-right: 25rpx;
				}
			}
		}

		.recharge-money {


			.moneyTitle {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
			}

			.gears {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.defa {
					width: 47%;
					border: 1px solid #C9C9C9;
					border-radius: 20rpx;
					margin-top: 25rpx;
					padding-top: 30rpx;
					box-sizing: border-box;

					.defaHeader {
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 36rpx;
							height: 36rpx;
							margin-right: 12rpx;
						}
					}

					.defaPrice {
						margin: 20rpx 0 20rpx 0;
						text-align: center;
					}

					.defaBottom {
						text-align: center;
						background: #AB5FF1;
						border-radius: 0px 0px 8px 8px;
						font-size: 24rpx;
						color: #FFFFFF;
						padding: 5rpx 0;
						box-sizing: border-box;
					}
				}
			}


		}

		.recharge-button {
			width: 100%;
			margin-top: 400rpx;

			.btn {
				width: 500rpx;
				height: 88rpx;
				background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
				border-radius: 40rpx;
				text-align: center;
				line-height: 88rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				margin-bottom: 25rpx;
			}

			.texts {

				text-align: center;
				font-size: 28rpx;
				color: #9C9B9B;
			}
		}

		.defas {
			background: #E2C8F9;

			.text-one {
				color: #AB5FF1;
			}

			.text-two {
				color: #AB5FF1;
			}
		}

	}
</style>
