<!-- <page-meta :page-style=" flag ? 'overflow: hidden;' : '' " /> -->
<template>
	<!-- 我的信息页面-头部 -->
	<view class="persondata">
		<view class="persondata-header">
			<image :src="tableData.avatar_url ||imgavatar " mode="" class="persondata-avator"></image>
			<view class="persondata-content" @click="editdata">
				<view class="persondata-name">
					<text style="font-size: 36rpx;margin-right: 15rpx;">{{tableData.name || usersss.name}} </text>
					<image class="nameImg" src="@/static/img-my/likes.png" mode=""></image>
					<text>{{tableData.rating ||usersss.percentage}}%</text>
				</view>
				<view class="persondata-price">
					<text>搭讪:</text>
					<image class="imgPrice" src="@/static/img-my/bean.png" mode=""></image>
					{{tableData.price || usersss.price}}/次
				</view>
				<view class="persondata-tag">
					<view class="persondata-sex" v-if="tableData.gender == 0">
						<image class="imgTag" src="@/static/img-my/sex-woman.png" mode="">
						</image>
						<text>{{tableData.age =='' ? 18 :tableData.age}}</text>
					</view>
					<!-- <view class="persondata-sex2" v-if="tableData.gender == 1"> -->
					<view class="persondata-sex2" v-else>
						<image class="imgTag" src="@/static/img-my/sex-man.png" mode="">
						</image>
						<text>{{tableData.age =='' ||tableData.age ==undefined ? 18 :tableData.age}}</text>
					</view>
					<view class="persondata-address">
						<image class="imgTag2" src="@/static/img-my/address.png" mode=""></image>
						<text>{{ addressName }}</text>
					</view>

				</view>
			</view>

			<image class="persondata-message" src="@/static/img-my/message.png" mode="" @click="systemMessage"></image>
			<view class="littleRed"></view>
			<view class="editData" @click="editdata">
				编辑资料
			</view>
		</view>


		<!-- 介绍文案 -->
		<view class="personality">
			<text>{{tableData.description =="" || tableData.description==undefined ? Copywriting :tableData.description}}</text>
		</view>


		<!-- 编辑资料的弹窗 -->
		<van-dialog title="编辑资料" :show="show" theme="round-button" use-slot="true" confirm-button-text="保存" class="dia"
			@confirm="submits()" lock-scroll>
			<image class="diaImg" src="@/static/img-my/cancel.png" mode="" @click="redcancel"></image>
			<!-- 上传用户头像 -->
			<view class="userUpload">
				<image class="cameras" src="@/static/img-my/camera.png" mode="" @click="editImg()"></image>
				<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
				<image class="img" :src="userinfo.avatar" show-menu-by-longpress="true"></image>
			</view>
			<view class="accbox">
				<view class="poptitle">
					<text class="text-ABC">搭讪费用设置</text>
					<view>
						<slider :value="userinfo.price" activeColor="#FFB654" min="1" max="100" show-value
							block-size="20" @changing="changes" @change="sliderChange">
						</slider>
					</view>
				</view>
				<view class="poptitle-inp">
					<text>自我介绍</text>
					<form :model="userinfo">
						<textarea class="formtextarea" type="text" v-model="userinfo.description"
							placeholder="介绍一下自己吧~" />
					</form>
				</view>
			</view>
		</van-dialog>

	</view>
</template>

<script>
	import {
		baseUrl
	} from "@/api/api.js"
	import request from "@/api/api.js"
	import ImageCropper from "@/common/invinbg-image-cropper.vue"


	export default {
		components: {
			ImageCropper,
		},
		props: ['tableData', 'addressName'],
		data() {
			return {

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
				// 个人信息
				Copywriting: "添加一段自我介绍吧，让大家认识",
				sex: 'woman',
				// 编辑资料的弹窗
				show: false,
				flag: true,
				// 测试数据
				imgurl: "",

				// 默认头像
				// imgavatar: require('@/static/logo.png'),
				userList: {
					nick: "",
					acc: "",
					number: 575
				},

				// 获取token
				token: "",


				// 滑块测试
				number: 0,

				tempFilePath: "",
				cropFilePath: "",
				// 编辑资料个人信息
				userinfo: {},
				url: ""
			}
		},
		methods: {
			init() {
				var acc = uni.getStorageSync('userinfos')
				this.userinfo.avatar = acc.avatar_url
				this.userinfo.price = acc.price
				this.userinfo.description = acc.description
			},
			systemMessage() { //跳转到系统消息
				uni.navigateTo({
					url: '/components/systemMessage',
					fail(err) {
						console.log(err)
					}
				})
			},

			// 编辑资料
			editdata() {
				this.show = true
				this.init()
			},
			redcancel() {
				this.show = false
			},

			// 测试
			//上传返回图片

			// },
			// 修改用户图片
			editImg() {
				var _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						_this.tempFilePath = res.tempFilePaths
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: baseUrl + '/user/avatar', //上传的地址
							filePath: tempFilePaths[0],
							name: 'avatar',
							header: {
								"Authorization": "Bearer " + _this.token,
								"Content-Type": "multipart/form-data"
							},
							success: (uploadFileRes) => {
								console.log('ooooooooo', JSON.parse(uploadFileRes.data).data.path);
								_this.userinfo.avatar = JSON.parse(uploadFileRes.data).data
									.path
								uni.$emit('update', true)
								setTimeout(() => {
									_this.init()
								}, 500)
							}
						});
					}
				});
			},


			confirm(e) {
				this.tempFilePath = ''
				this.userinfo.avatar = e.detail.tempFilePath
			},
			cancel() {
				console.log('canceled')
			},

			// 保存编辑资料
			submits() {
				request.put('/user/me', {
					price: this.userinfo.price,
					description: this.userinfo.description
				}).then(res => {
					console.log(res)
					uni.$emit('update', true)
					setTimeout(() => {
						this.init()
					}, 500)
				})
				this.show = false
			},

			// slider 改变事件
			sliderChange(e) {
				this.userinfo.price = e.detail.value
			},

			changes(e) {
				this.userinfo.price = e.detail.value
			}


		},
		created() {
			var _this = this;
			uni.getStorage({
				key: "Token",
				success(res) {
					_this.token = res.data
				}
			});
			this.init()

		}
	}
</script>

<style lang="scss">
	.persondata {
		width: 100%;
		height: 100%;

		.persondata-header {
			padding: 32rpx;
			box-sizing: border-box;
			position: relative;

			.persondata-avator {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}

			.persondata-content {
				display: inline-block;
				margin-left: 30rpx;

				.persondata-name {
					display: flex;
					align-items: center;
					font-size: 32rpx;

					.nameImg {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.persondata-price {
					width: 220rpx;
					padding: 5rpx 20rpx;
					border: 1px solid #FF9E55;
					background: #FEEACF;
					color: #FF9E55;
					font-size: 24rpx;
					margin: 20rpx 0;
					border-radius: 30rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;


					.imgPrice {
						width: 24rpx;
						height: 24rpx;
						margin-right: 0 10rpx;
					}
				}

				.persondata-tag {
					color: #FFFFFF;
					display: flex;

					.persondata-sex,
					.persondata-sex2 {
						width: 68rpx;
						height: 32rpx;
						border-radius: 10rpx;
						background: url("~@/static/img-my/tag1.png");
						background-size: 100% 100%;
						font-size: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.imgTag,
							{
							width: 20rpx;
							height: 20rpx;
						}
					}

					.persondata-address {
						display: flex;
						justify-content: center;
						align-items: center;
						min-width: 120rpx;
						height: 32rpx;
						// background: url("~@/static/img-my/tag2.png");
						// background-size: 100% 100%;
						background: linear-gradient(90deg, #E279FF, #FFAFE3);
						margin-left: 30rpx;
						border-radius: 30rpx;
						font-size: 20rpx;

						// padding: 5rpx;
						// box-sizing: border-box;
						.imgTag2 {
							width: 20rpx;
							height: 20rpx;
						}
					}

					.persondata-sex2 {
						background: url("~@/static/img-my/tag3.png");
						background-size: 100% 100%;
					}
				}
			}

			.persondata-message {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 44rpx;
				right: 32rpx;
			}

			.littleRed {
				width: 12rpx;
				height: 12rpx;
				border-radius: 50%;
				background-color: #FF8D8D;
				position: absolute;
				top: 44rpx;
				right: 32rpx;
			}

			.editData {
				width: 148rpx;
				height: 48rpx;
				background: #000000;
				border-radius: 24rpx 0 0 24rpx;
				opacity: 0.14;
				position: absolute;
				right: 0;
				bottom: 32rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 48rpx;
			}

		}

		// 介绍文案
		.personality {
			color: #858585;
			font-size: 24rpx;
			padding: 0 32rpx;
			box-sizing: border-box;

		}

		.accbox {
			padding: 0 30rpx;
			box-sizing: border-box;

			.poptitle {
				.text-ABC {
					display: inline-block;
					font-size: 32rpx;
					font-weight: 500;
					color: #3E3E3E;
					margin-bottom: 30rpx;

				}
			}


			.poptitle-inp {
				text {
					display: inline-block;
					font-size: 32rpx;
					font-weight: 500;
					color: #3E3E3E;
					margin-bottom: 30rpx;
				}

				.formtextarea {
					width: 100%;
					padding: 20rpx;
					background-color: #F7F7F9;
					border-radius: 10rpx;
					box-sizing: border-box;
				}
			}
		}





		// 编辑弹窗
		.userUpload {
			width: 200rpx;
			height: 200rpx;
			margin: 50rpx auto;
			border-radius: 50%;
			border: 1px solid #ccc;
			position: relative;

			.img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			.cameras {
				width: 65rpx;
				height: 65rpx;
				position: absolute;
				bottom: -6rpx;
				right: 0;
			}
		}



		//弹窗的样式
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


	}
</style>
