<template>
	<view class="bill">
		<!-- 我的搭讪 -->
		<view class="perdata">
			<view class="perdata-accost" @click='myChat'>
				<view style="font-weight: bold;">{{tableData.accost_num ||usersss.dashan}}</view>
				<view style="color: #858585;font-size: 28rpx;">我的搭讪</view>
				<image class="perdata-accostImg" src="@/static/img-my/score.png" mode=""></image>
			</view>
			<view class="perdata-beaccost" @click='getChated'>
				<view style="font-weight: bold;">{{tableData.be_accost_num || usersss.bedashan}}</view>
				<view style="color: #858585;font-size: 28rpx;">被搭讪</view>
			</view>
			<view class="perdata-hot" @click='goHot'>
				<view style="font-weight: bold;">{{tableData.hot ||usersss.hot}}</view>
				<view class="perdata-hotItem">
					热度值
					<image class="perdata-hotImg" src="@/static/img-my/hot.png" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 账户信息 -->
		<view class="account">
			<!-- 觅豆余额 -->
			<view class="balance">
				<view class="balance-box1">
					<image class="box1-img" src="@/static/img-my/balance.png" mode=""></image>
					<text>觅豆余额</text>
				</view>
				<view class="balance-box2">
					<text style="font-size: 30rpx;">{{tableData.beans ||usersss.beans }}</text>
					<!-- <text style="font-size: 20rpx;">{{number}}</text> -->
				</view>
				<view class="balance-box3">
					<button type="default" plain="true" class="btn1" @click="withdraw">提现</button>
					<button type="default" class="btn2" @click="recharge">充值</button>
				</view>
			</view>
			<!-- 邀请好友 -->
			<view class="invitation  balance">
				<view class="invitation-triangle">
					<text class="triangle-text">赚密豆</text>
				</view>
				<view class="balance-box1">
					<image class="box1-img" src="@/static/img-my/invitation.png" mode=""></image>
					<text>邀请好友</text>
				</view>
				<view class="balance-box2">
					<text style="font-size: 30rpx;">{{tableData.invitees_count || usersss.firends}}人</text>

				</view>
				<view class="balance-box3">
					<button type="default" plain="true" class="btn1" v-if="tableData.inviter_id===0" @click="invitation">邀请</button>
					<button type="default" class="btn2" @click="bind">绑定</button>
				</view>
			</view>

		</view>


		<!-- 我的账单 -->
		<view class="my-bill">
			<!-- 我的账单明细 -->
			<view class="billHeader">
				<text style="font-size: 32rpx;">我的账单</text>

				<view @click="billcenter">
					<text style="font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;opacity: 0.6;">明细</text>
					<image class="billHeader-img" src="../../../static/img-my/arrows.png" mode=""></image>
				</view>
			</view>

			<!-- 消费 -->
			<!-- <view class="" v-for="item in accList">
				<text></text>	
			</view> -->

			<view class="billContent">
				<view class="billContent-box1">
					<text style="font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;opacity: 0.6;">总消费</text>
					<view class="billContent-number">
						<text>{{tableData.cost_total ||usersss.consume}}</text>
						<!-- <text style="font-size: 28rpx;">00</text> -->
					</view>
				</view>
				<view class="billContent-box1">
					<text style="font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;opacity: 0.6;">总充值</text>
					<view class="billContent-number">
						<text>{{tableData.recharge_total ||usersss.recharge}}</text>
						<!-- <text style="font-size: 28rpx;">00</text> -->
					</view>
				</view>
				<view class="earnings billContent-box1">
					<text style="font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;opacity: 0.6;">总收益</text>
					<view class="billContent-number">
						<text>{{tableData.income_total ||usersss.earnings}}</text>
						<!-- <text style="font-size: 28rpx;">00</text> -->
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import request from "@/api/api.js"
	export default {
		props: {
			tableData: {
				type: Object,
			}
		},
		data() {
			return {
				number: "00",
				datalist: "",
				usersss: {
					name: "十七是个男孩子",
					percentage: 99,
					price: 10,
					dashan: 0,
					bedashan: 0,
					hot: 0,
					beans: 99,
					firends: 10,
					consume: '79.00',
					recharge: '100.00',
					earnings: '300.00'
				},
				userPrice: this.tableData
			}
		},
		methods: {
			init() {
				console.log('这是传递过来的数据', this.datalist)
			},
			myChat(){//我的搭讪
				uni.navigateTo({
					url: "../../components/myChat"
				})
			},
			getChated(){//被搭讪
				uni.navigateTo({
					url: "../../components/getChated"
				})
			},
			goHot(){//跳转热门
				uni.switchTab({
					url: "/pages/hot/hot",
					fail(err) {
						console.log(err);
					}
				})
			},
			//跳转到邀请好友纪录
			invitation(){
				console.log(12)
				uni.navigateTo({
					url: "../../components/inviteRecord"
				})
			},
			//绑定
			bind(){
				uni.navigateTo({
					url: "../../components/enterInviteCode"
				})
			},
			
			// 充值
			recharge() {
				console.log(123)
				uni.navigateTo({
					url: "../../components/recharge"
				})
			},

			// 提现
			withdraw() {
				uni.navigateTo({
					url: '../../components/withdraw'
				})
			},

			// 账单中心
			billcenter() {
				uni.navigateTo({
					url: `../../components/billcenter`
				})

			},


			beans() {

			}

		},
		created() {
			this.init()
		}

	}
</script>

<style lang="scss">
	.bill {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.perdata {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 20rpx;
			box-sizing: border-box;

			.perdata-accost {
				color: #3E3E3E;
				font-size: 32rpx;
				text-align: center;
				position: relative;

				.perdata-accostImg {
					width: 96rpx;
					height: 32rpx;
					position: absolute;
					top: 14rpx;
					right: -70rpx;
				}
			}

			.perdata-beaccost {
				color: #3E3E3E;
				font-size: 32rpx;
				text-align: center;
			}

			.perdata-hot {
				text-align: center;
				color: #3E3E3E;
				font-size: 32rpx;

				.perdata-hotItem {
					color: #858585;
					font-size: 28rpx;
					display: flex;
					align-items: center;

					.perdata-hotImg {
						width: 28rpx;
						height: 28rpx;
						margin-left: 6rpx;
					}
				}
			}
		}

		.account {
			display: flex;
			justify-content: space-between;

			.balance {
				width: 48%;
				height: auto;
				background: #FFFFFF;
				box-shadow: 0px 0px 7px 0px rgba(159, 150, 253, 0.46);
				border-radius: 10rpx;
				padding: 30rpx;
				box-sizing: border-box;

				.balance-box1 {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;

					.box1-img {
						width: 40rpx;
						height: 40rpx;
						margin-right: 12rpx;
					}
				}

				.balance-box2 {
					margin: 20rpx 0;
					font-weight: 600;
					text-align: center;
				}

				.balance-box3 {
					display: flex;
					justify-content: center;

					button {
						width: 100rpx;
						height: 48rpx;
						border-radius: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 20rpx;
						margin: 0;
					}

					.btn1 {
						color: #3E3E3E;
						border: 1px solid #3E3E3E;
						margin-right: 20rpx;
					}

					.btn2 {
						color: #FFFFFF;
						background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					}
				}
			}

			.invitation {
				position: relative;

				.invitation-triangle {
					position: absolute;
					top: 0;
					right: 0;
					width: 0;
					height: 0;
					border-top: 100rpx solid #F17171;
					border-left: 100rpx solid transparent;

					.triangle-text {
						width: 70rpx;
						position: absolute;
						top: -80rpx;
						right: -7rpx;
						font-size: 20rpx;
						color: #FFFFFF;
						transform: rotate(48deg);
					}
				}
			}
		}

		.my-bill {
			padding: 30rpx;
			background-color: #9F96FD;
			border-radius: 16rpx;
			box-shadow: 0px 0px 7px 0px rgba(159, 150, 253, 0.46);
			margin-top: 30rpx;
			box-sizing: border-box;
			color: #FFFFFF;

			.billHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 5px 0;
				box-sizing: border-box;

				// 明细的图标
				.billHeader-img {
					width: 20rpx;
					height: 20rpx;
					margin-left: 10rpx;
				}
			}

			.billContent {
				display: flex;
				justify-content: space-between;

				.billContent-box1 {
					text-align: center;
					font-size: 40rpx;

					.billContent-number {
						margin-top: 12rpx;
					}
				}
			}
		}
	}
</style>
