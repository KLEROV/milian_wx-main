<template>
	<!-- 提现 -->
	<view class="withdraw">
		<view class="withdraw-header">
			<view class="withdraw-title">
				<text>觅都余额</text>
				<view @click="details">提现明细 <image src="@/static/img-withdraw/jiantou.png" mode=""></image>
				</view>
			</view>

			<view class="withdraw-content">
				<image src="@/static/img-withdraw/big.png" mode=""></image>
				<text style="font-size: 52rpx;">{{userinfo.beans}}</text>
				<!-- <text style="font-size: 40rpx;">56</text> -->
			</view>
		</view>

		<view class="withdraw-number">
			<view class="textNumber">
				提现数量
			</view>
			<view class="withdraw-Inp">
				<input type="digit" v-model="numbers" placeholder="请输入提现数量" :maxlength="number" @input="numberFixed" />
			</view>
		</view>

		<!-- 添加收款账号 -->
		<view class="withdraw-acc  withdraw-number">
			<view class="textNumber">
				添加收款账号
			</view>

			<view class="withdraw-Inp" v-if="flag ==true
			">

				<view class="withdraw-pop" @click="addCollection">
					<image src="@/static/img-withdraw/tianjia.png" mode=""></image>
					<text>点击添加收款账号</text>
				</view>
			</view>

			<view class="withdraw-Inps" v-if="flag ==false">
				<view class="withdraw-start">
					提现至
				</view>
				<view class="withdraw-cont">
					{{withdrawAcc.name.substring(0, 4)}} (尾号{{withdrawAcc.card.substring(withdrawAcc.card.length - 4)}})
				</view>
				<view class="withdraw-end" @click="editBank">
					<text>更换</text>
					<image src="@/static/img-withdraw/jiantou1.png" mode=""></image>
				</view>
			</view>


		</view>


		<!-- 立即提现 -->
		<view class="withdraw-button">
			<button class="btn" type="default" @click="withdrawal">立即提现</button>
			<view class="texts">温馨提醒：每月1～10日可申请提现，1觅豆=1¥</view>
		</view>



		<!-- 添加收款账户 -->

		<van-popup :show="show" round closeable position="bottom" custom-style="height: 35%" @close="closed"
			:close-on-click-overlay="false">
			<view class="collection">
				<view class="collection-title">添加收款银行卡信息</view>
				<view class="collection-content">
					<van-cell-group :model="bankMessage">
						<van-field label="持卡人" :value="bankMessage.name" @change="bankMessage.name = $event.mp.detail"
							placeholder="请填写持卡人姓名" border />
						<van-field label="银行卡号" :value="bankMessage.card" @change="bankMessage.card = $event.mp.detail"
							maxlength="19" placeholder="持卡人本人银行卡号" border />

					</van-cell-group>
				</view>
				<view class="collection-btn">
					<button class=".btn" type="default" @click="saveUsermsg">保存</button>
				</view>
			</view>
		</van-popup>




		<!-- 修改收款账户 -->
		<van-popup :show="showEdit" round closeable position="bottom" custom-style="height: 35%" @close="closed">
			<view class="collection">
				<view class="collection-title">添加收款银行卡信息</view>

				<view class="collection-content">

					<van-cell-group :model="bankMessage">
						<van-field label="持卡人" :value="bankMessage.name" @change="bankMessage.name = $event.mp.detail"
							placeholder="请填写持卡人姓名" border />
						<van-field label="银行卡号" :value="bankMessage.card" @change="bankMessage.card = $event.mp.detail"
							maxlength="19" placeholder="持卡人本人银行卡号" border />

					</van-cell-group>
				</view>
				<view class="collection-btn">
					<button class=".btn" type="default" @click="saveUsermsg">保存</button>
				</view>
			</view>

		</van-popup>

		<van-notify id="van-notify" />

	</view>
</template>

<script>
	import request from "@/api/api.js"
	import Notify from "@/wxcomponents/vant/dist/notify/notify"
	export default {
		data() {
			return {
				number: 10,
				numbers: "",
				// 收款账户状态
				show: false,
				value: "",
				// 修改
				showEdit: false,

				// 添加收款信息
				bankMessage: {
					name: "",
					card: "" //银行卡号6217000490000315744
				},
				withdrawAcc: {
					name: "",
					card: ""
				},
				// 收款账户填写状态
				flag: true,
				// 用户个人信息
				userinfo: {}
			}
		},
		methods: {
			init() {
				this.userinfo = uni.getStorageSync('userinfos')
				if (this.userinfo.bank !== null && this.userinfo !== undefined) {
					this.flag = false
					this.withdrawAcc.name = this.userinfo.bank.bank
					this.withdrawAcc.card = this.userinfo.bank.card

					this.bankMessage.name = this.userinfo.bank.name
					this.bankMessage.card = this.userinfo.bank.card
				}
			},
			// 只能输入小数点后两位
			numberFixed(e) {
				console.log(e)
				// e.detail.value = (e.detail.value.match(/^\d*(\.?\d{0,2})/g)[0]) || ''
				e.detail.value = (e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'))
				this.$nextTick(() => {
					this.numbers = e.detail.value
				})

			},

			// 添加收款
			addCollection() {
				this.show = true
			},

			// 保存
			saveUsermsg() {

				request.post('/user/save-bank', {
					name: this.bankMessage.name,
					card: this.bankMessage.card
				}).then((res) => {
					console.log('res', res)
					if (res.statusCode === 200) {
						let datas = res.data.data
						this.withdrawAcc.name = datas.bank
						this.withdrawAcc.card = datas.card
						this.flag = false
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						})

					}
					// this.bankMessage = {}
				})

				this.show = false
			},

			// 取消弹窗
			closed() {
				this.show = false

			},

			// this.bankMessage = {}



			// 修改银行卡号
			editBank() {
				this.show = true
				// this.showEdit = true
				// console.log(e)
			},

			// 提现
			withdrawal() {
				request.post('/user/withdraw', {
					beans: this.numbers
				}).then(res => {
					console.log(res)
					if (res.statusCode === 200) {
						setTimeout(() => {
							this.numbers = ""
						}, 1000)
					} else {
						Notify({
							type: 'danger',
							message: res.data.message,
						});
						setTimeout(() => {
							this.numbers = ""
						}, 1000)
					}
				})
			},

			// 提现明细
			details() {
				uni.navigateTo({
					url: "./details"
				})
			}
		},

		created() {
			this.init()
		},

	}
</script>

<style lang="scss">
	.withdraw {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.withdraw-header {
			width: 100%;
			padding: 20rpx 20rpx 60rpx 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background: url("~@/static/img-withdraw/bg.png");
			background-size: 100% 100%;
			margin-bottom: 30rpx;

			.withdraw-title {
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

			.withdraw-content {
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

		.withdraw-number {
			margin-top: 30rpx;

			.textNumber {
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #3E3E3E;
				font-size: 32rpx;
			}

			.withdraw-Inp {
				margin-top: 25rpx;
				width: 100%;


				input {
					width: 100%;
					padding: 30rpx 48rpx;
					box-sizing: border-box;
					background-color: #F7F7F9;
					height: 100rpx;
					border-radius: 50rpx;
				}
			}
		}

		.withdraw-acc {

			.withdraw-pop,
			.withdraw-Inps {

				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 30rpx 48rpx;
				box-sizing: border-box;
				background-color: #F7F7F9;
				height: 100rpx;
				border-radius: 50rpx;
				font-size: 28rpx;
				color: #3E3E3E;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}

			.withdraw-Inps {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;

				.withdraw-start {
					font-size: 28rpx;
					color: #3E3E3E;
					opacity: 0.5;
				}

				.withdraw-end {
					display: flex;
					align-items: center;
					font-size: 24rpx;

					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}

		}


		.withdraw-button {
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

		.collection {
			padding: 60rpx 20rpx 0 20rpx;
			box-sizing: border-box;

			.collection-title {
				font-size: 32rpx;
				color: #3E3E3E;
				margin-bottom: 30rpx;
			}

			.collection-btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.btn {
					width: 70%;
					background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					color: #FFFFFF;
					height: 80rpx;
					border-radius: 40rpx;
					line-height: 80rpx;
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
