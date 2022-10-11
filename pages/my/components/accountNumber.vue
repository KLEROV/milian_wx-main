<template>
	<view class="account">
		<view class="title">我的账号</view>

		<view class="wx-message">
			<view class="wxMe-header">
				<image class="img1" src="@/static/img-my/wx.png" mode=""></image>
				<text>微信</text>
			</view>

			<!-- 添加账号之前 -->
			<view class="before-addAcc" v-if="addAccWx == false">
				<view class="addaccBox" @click="addwxAcc">
					<image src="@/static/img-my/addaccwx.png" mode=""></image>
					<text>想要被搭讪，先添加微信号~</text>
				</view>
			</view>

			<view class="" v-if="addAccWx ==true">
				<view class="wxMe-name">
					<text style="margin-right: 20rpx;">昵称:</text> <text>{{userinfo.name}}</text>
				</view>
				<view class="wxMe-acc">
					<text style="margin-right: 20rpx;">微信号:</text> <text>{{userinfos[0].account}}</text>
				</view>
			</view>

		</view>
		<!-- 小红书 -->
		<view class="redbook-message wx-message">
			<view class="wxMe-header">
				<image class="img1" src="@/static/img-my/redbook.png" mode=""></image>
				<text>小红书</text>
				<image v-if="addAcc==true" class="img2" src="@/static/img-my/edit.png" mode="" @click="editAcc"></image>
			<!-- 	<view style="margin-left: 20rpx;">
					隐藏
					<van-switch :checked="checked" @change="onChange" active-color="#B464EF" /> 显示
					<view class="">
						{{checkeds}}
					</view>
				</view> -->
			</view>

			<!-- 添加账号之前 -->
			<view class="before-addAcc" v-if="addAcc == false">
				<view class="addaccBox" @click="addAccred">
					<image src="@/static/img-my/addacc.png" mode=""></image>
					<text>添加账号信息</text>
				</view>
			</view>
			<!-- 添加账号之后显示 -->
			<view class="" v-if="addAcc == true">
				<view class="wxMe-name">
					<text style="margin-right: 20rpx;">昵称:</text> <text>{{userinfos[1].nickname}}</text>
				</view>
				<view class="wxMe-acc">
					<text style="margin-right: 20rpx;">账号:</text> <text>{{userinfos[1].account}}</text>
				</view>
			</view>
		</view>
		<!-- 微博 -->
		<view class="wb-message wx-message">
			<view class="wxMe-header">
				<image class="img1" src="@/static/img-my/wb.png" mode=""></image>
				<text>微博</text>
				<image v-if="addAccwb == true" class="img2" src="@/static/img-my/edit.png" @click="editWb" mode="">
				</image>
				<view>
					<!-- 	隐藏
					<van-switch :checked="checked" @change="onChange" active-color="#B464EF" /> 显示
					<view class="">
						{{checkeds}}
					</view> -->
				</view>
			</view>

			<!-- 添加账号之前 -->
			<view class="before-addAcc  before-addAcc1" v-if="addAccwb == false">
				<view class="addaccBox" @click="beforeWb">
					<image src="@/static/img-my/addacc.png" mode=""></image>
					<text>添加账号信息</text>
				</view>
			</view>
			<view class="wxMe-name" v-if="addAccwb == true">
				<text style="margin-right: 20rpx;">昵称:</text> <text>{{userinfos[2].nickname}}</text>
			</view>

		</view>

		<!-- 联系我们 -->
		<view class="contact" @click="contactus">
			<text>有问题？联系我们</text>
		</view>



		<!-- 添加微信账号的弹窗 -->
		<van-dialog title="添加账号" :show="showWx" theme="round-button" use-slot="true" confirm-button-text="保存"
			class="dia" @confirm="submitwx()">
			<image class="diaImg" src="@/static/img-my/cancel.png" mode="" @click="wxcancel"></image>
			<view class="accbox">
				<form :model="formwx">
					<view class="poptitle">
						<image src="@/static/img-my/wx1.png" mode=""></image>
						<text>微信</text>
					</view>
					<view class="poptitle-inp">
						<input type="text" v-model="formwx.account" placeholder="请输入微信账号" />
					</view>
					<view class="poptitlesT">
						<text>性别</text>
					</view>
					<view class="poptitle-sex">
						<view class="boxone" @click="toggerMan" v-model="formwxs.sex">
							<image :src="flag ==1 ?mans : man" mode=""></image>
							<text>男</text>
						</view>
						<view class="boxtwo" @click="toggerWoman" v-model="formwxs.sex">
							<image :src="flag ==2?woman :womans" mode=""></image>
							<text>女</text>
						</view>
					</view>
				</form>
			</view>
		</van-dialog>




		<!-- 添加小红书账号的弹窗 -->
		<van-dialog title="添加账号" :show="show" @close="closed()" theme="round-button" use-slot="true"
			confirm-button-text="保存" class="dia" @confirm="submits()">
			<image class="diaImg" src="@/static/img-my/cancel.png" mode="" @click="redcancel"></image>
			<view class="accbox">
				<view class="poptitle">
					<image src="@/static/img-my/redbook1.png" mode=""></image>
					<text>小红书</text>
				</view>
				<view class="poptitle-inp">
					<form :model="formacc">
						<input type="text" v-model="formacc.nickname" placeholder="请输入小红书昵称" />
						<input type="text" v-model="formacc.account" placeholder="请输入小红书账号" />
					</form>
				</view>
			</view>
		</van-dialog>

		<!-- 编辑小红书的弹窗 -->
		<van-dialog title="编辑账号" :show="editshow" theme="round-button" use-slot="true" confirm-button-text="保存"
			class="dia" @confirm="editsubmits()">
			<image class="diaImg" src="@/static/img-my/cancel.png" mode="" @click="editredcancel"></image>
			<view class="accbox">
				<view class="poptitle">
					<image src="@/static/img-my/redbook1.png" mode=""></image>
					<text>小红书</text>
				</view>
				<view class="poptitle-inp">
					<form :model="userinfos[1]">
						<input type="text" v-model="userinfos[1].nickname" placeholder="请输入小红书昵称" />
						<input type="text" v-model="userinfos[1].account" placeholder="请输入小红书账号" />
					</form>
				</view>
			</view>
		</van-dialog>


		<!-- 添加微博账号的弹窗 -->
		<van-dialog title="添加账号" :show="wbShow" theme="round-button" use-slot="true" confirm-button-text="保存"
			class="dia" @confirm="submitwb()">
			<image class="diaImg" src="@/static/img-my/cancel.png" mode="" @click="wbcancel"></image>
			<view class="accbox">
				<view class="poptitle">
					<image src="@/static/img-my/wb1.png" mode=""></image>
					<text>微博</text>
				</view>
				<view class="poptitle-inp">
					<form :model="formwb">
						<input type="text" v-model="formwb.nickname" placeholder="请输入微博昵称" />
					</form>
				</view>
			</view>
		</van-dialog>


		<!-- 编辑微博账号的弹窗 -->
		<van-dialog title="编辑账号" :show="editwbShow" theme="round-button" use-slot="true" confirm-button-text="保存"
			class="dia" @confirm="editsubmitwb()">
			<image class="diaImg" src="@/static/img-my/cancel.png" mode="" @click="editwbcancel"></image>
			<view class="accbox">
				<view class="poptitle">
					<image src="@/static/img-my/wb1.png" mode=""></image>
					<text>微博</text>
				</view>
				<view class="poptitle-inp">
					<form :model="userinfos[2]">
						<input type="text" v-model="userinfos[2].nickname" placeholder="请输入微博昵称" />
					</form>
				</view>
			</view>
		</van-dialog>


		<!-- 联系我们 遮罩层 -->
		<van-overlay :show="contactshow" class="overlayUs">
			<view class="wrappers">
				<image @click="offoverlayUs" class="cancel" src="@/static/img-my/cancel.png" mode=""></image>
				<view class="wrapper-title">
					<text>如有疑问请添加</text>
					<text>客服微信</text>
					<image class="lower-arrow" src="@/static/img-my/bottom.png" mode="">
					</image>
				</view>
				<view class="wrapper-wx">
					<image src="@/static/img-my/wxjt.jpg" show-menu-by-longpress="true" mode=""></image>
				</view>
				<view class="wrapper-bottom">
					<text>长按二维码，添加客服微信</text>
				</view>
			</view>
		</van-overlay>



	</view>
</template>

<script>
	import request from "@/api/api.js"
	// import switchc from "@/common/zz-switchc.vue"
	export default {
		components: {
			// switchc
		},
		data() {
			return {
				// 区分多个switch 开关
				number: 0,
				// 是否添加微信账号
				addAccWx: false,
				// 是否添加账号
				addAcc: false,

				// 是否添加微博账号
				addAccwb: false,
				// 添加微信弹窗状态
				showWx: false,

				// 添加账号弹窗的状态
				show: false,
				editshow: false,
				// 微博弹窗状态
				wbShow: false,
				editwbShow: false,
				// 添加微信账号表单
				formwx: {
					type: 'wechat',
					account: "",
					// sex: "",
					account_status: 1,
				},
				formwxs: {
					sex: 0
				},

				// 添加账号表单
				formacc: {
					type: "xiaohongshu",
					nickname: "",
					account: "",
					account_status: 1,
				},

				editformacc: {
					type: "xiaohongshu",
					nickname: "",
					account: "",
					account_status: 1,
				},

				formwb: {
					type: "weibo",
					nickname: "",
					account_status: 1,
				},
				editformwb: {
					type: "weibo",
					nickname: "",
					account_status: 1,
				},

				// 联系我们
				contactshow: false,
				// 选择性别
				man: require('@/static/img-my/cencel-man.png'),
				mans: require('@/static/img-my/active-man.png'),
				woman: require('@/static/img-my/active-woman.png'),
				womans: require('@/static/img-my/cencel-woman.png'),
				flag: 2,

				userinfo: {},

				userinfos: [],
				checked: true,
				checkeds: "显示"
			}
		},
		methods: {
			init() {
				this.userinfo = uni.getStorageSync('userinfos')
				console.log('我的账号的信息', this.userinfo)
				if (this.userinfo.user_accounts !== '' || this.userinfo.user_accounts !== null) {
					console.log('怎么么有进来呀')
					for (let item in this.userinfo.user_accounts) {
						console.log('这是微信打印的item 呀  我的天', this.userinfo.user_accounts[item])
						var ass = this.userinfo.user_accounts[item]
						if (ass.type == 'wechat') {
							console.log('这是微信呀')
							this.userinfos.push({
								account: ass.account
							})
							this.addAccWx = true
						} else if (ass.type == 'xiaohongshu') {
							this.userinfos.push({
								account: ass.account,
								nickname: ass.nickname,
								id: ass.user_account_id
							})
							this.addAcc = true
						} else if (ass.type == 'weibo') {
							this.userinfos.push({
								nickname: ass.nickname,
								id: ass.user_account_id
							})
							this.addAccwb = true
						}
					}
				}
				console.log(this.userinfos)
			},

			// 添加小红书账号
			addAccred() {
				console.log(123)
				this.show = true
			},

			// 添加微博账号
			beforeWb() {
				this.wbShow = true
			},

			// 确认提交微信 
			submitwx() {
				request.post('/user/account', this.formwx).then((res) => {
					console.log(res)
					if (res.statusCode === 200) {
						request.put('/user/me', {
							gender: this.formwxs.sex
						}).then((res) => {
							uni.removeStorageSync('userinfos')
							uni.$emit('update', true)
							console.log(res)
							setTimeout(() => {
								this.addAccWx = true
								this.init()
							}, 2000)
						})
					}
				})

				this.showWx = false
			},


			// 确认提交-小红书
			submits() {
				// this.show = false
				console.log(this.formacc)
				request.post('/user/account', this.formacc).then((res) => {
					if (res.statusCode === 200) {
						console.log(res)
						this.editformacc = res.data.data.account
						this.addAcc = true
					}
				})
				this.show = false
			},

			// 确认提交-微博
			submitwb() {
				request.post('/user/account', this.formwb).then(res => {
					if (res.statusCode === 200) {
						this.editformwb = res.data.data.account
						this.addAccwb = true
					}
				})
				this.wbShow = false
			},

			// 关闭弹窗
			closed() {
				// this.formacc = {}
			},
			// 关闭微信窗口
			wxcancel() {
				this.showWx = false
			},

			// 关闭小红书窗口
			redcancel() {
				this.show = false
			},
			editredcancel() {
				this.editshow = false
			},
			// 关闭微博窗口
			wbcancel() {
				this.wbShow = false
			},
			editwbcancel() {
				this.editwbShow = false
			},

			// 联系我们
			contactus() {
				this.contactshow = true
			},
			// 关闭联系我们弹窗
			offoverlayUs() {
				this.contactshow = false
			},
			addwxAcc() {
				this.showWx = true
			},

			toggerMan() {
				this.flag = 1
				this.formwxs.sex = 1
			},
			toggerWoman() {
				this.flag = 2
				this.formwxs.sex = 0
			},
			// 修改小红书
			editAcc() {
				this.editshow = true
			},
			editsubmits() {
				console.log(this.editformacc)
				var ids = this.userinfos[1].id
				request.put('/user/account/' + ids, this.userinfos[1]).then((res) => {
					if (res.statusCode === 200) {
						this.init()
					}
				})
				this.editshow = false
			},
			// 修改微博账号
			editWb() {
				this.editwbShow = true
			},
			editsubmitwb() {
				var ids = this.userinfos[2].id
				request.put('/user/account/' + ids, this.userinfos[2]

				).then((res) => {
					this.init()
				})
				this.editwbShow = false
			},

			onChange(e) {
				this.checked = e.detail
				if (this.checked == true) {
					this.checkeds = '显示'
				} else {
					this.checkeds = '隐藏'
				}
			}


		},
		created() {

		},
		mounted() {
			this.init()


		}
	}
</script>

<style lang="scss">
	.account {
		width: 100%;
		height: auto;
		padding: 20rpx 30rpx;
		box-sizing: border-box;

		.title {
			color: #3E3E3E;
			font-size: 32rpx;
			font-weight: 500;
			font-family: PingFangSC-Medium, PingFang SC;
		}

		// 账号信息
		.wx-message {
			width: 100%;
			// backdrop-filter: blur(30rpx);
			box-shadow: 0px 2px 4px 0px rgba(159, 150, 253, 0.46);
			background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
			border-radius: 10rpx;
			color: #FFFFFF;
			padding: 32rpx;
			box-sizing: border-box;
			margin-top: 25rpx;


			.wxMe-header {
				display: flex;
				align-items: center;
				height: 50rpx;

				.img1 {
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}

				.img2 {
					width: 36rpx;
					height: 36rpx;
					margin-left: 20rpx;
				}
			}

			.wxMe-name {
				margin: 20rpx 0;
			}

			.before-addAcc {
				padding: 45rpx 0;
				box-sizing: border-box;

				.addaccBox {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 34rpx;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

			}

			.before-addAcc1 {
				padding: 25rpx 0;
			}
		}

		.redbook-message,
		.wb-message {
			background: #FFFFFF;
			color: #3E3E3E;
		}


		// 联系我们
		.contact {
			width: 100%;
			margin: 40rpx 0;
			box-sizing: border-box;
			text-align: center;
		}

		// 添加小红书

		.accbox {
			padding: 20rpx;
			box-sizing: border-box;
			// height: 00rpx;
			width: 100%;

			.poptitle {
				font-size: 32rpx;
				display: flex;
				align-items: center;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}
			}

			.poptitle-inp {
				padding: 50rpx 0 25rpx 0;
				box-sizing: border-box;

				input {
					border: 1px solid #C9C9C9;
					width: 100%;
					height: 100rpx;
					border-radius: 50rpx;
					margin-bottom: 30rpx;
					padding: 20rpx 30rpx;
					box-sizing: border-box;
				}
			}

			.poptitlesT {
				margin-bottom: 30rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
			}

			.poptitle-sex {
				display: flex;
				align-items: center;

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 10rpx;
				}

				.boxone {
					margin-right: 25rpx;
					display: flex;
					align-items: center;
				}

				.boxtwo {
					display: flex;
					align-items: center;
				}
			}
		}


		.dia {
			position: relative;

			.diaImg {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				width: 24rpx;
				height: 24rpx;
			}

			button {
				background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%) !important;
			}
		}

		// 添加客服微信
		.overlayUs {
			width: 100%;
			height: 100%;

			.wrappers {
				background: url("~@/static/img-my/bg.png");
				background-size: 100% 100%;
				position: relative;
				padding: 30rpx;
				box-sizing: border-box;
				width: 80%;
				margin: 45% auto;

				.cancel {
					width: 38rpx;
					height: 38rpx;
					position: absolute;
					top: 20rpx;
					right: 20rpx;
				}

				.wrapper-title {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 36rpx;
					font-weight: 500;

					.lower-arrow {
						width: 184rpx;
						height: 100rpx;
						margin: 30rpx 0;
					}

				}

				.wrapper-wx {
					width: 280rpx;
					height: 280rpx;
					border: 2px solid #DEB0FF;
					padding: 20rpx;
					box-sizing: border-box;
					margin: 20rpx auto;
					border-radius: 25rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.wrapper-bottom {
					width: 100%;
					text-align: center;
					font-size: 28rpx;
				}
			}
		}


	}
</style>
