<template>
	<view class="content">
		<view class="main">
			<van-popup :show="peopleList.show" position="center" custom-style="" @close="onclose" z-index=9999999999 closeable
			 close-icon='../../../../static/images/cancel.png'>
				<view class="popops" v-if="peopleList.submitShow">
					<view class="popops-image">
						<image class="popops-avator" :src="peopleList.msg.avatar_url" mode=""></image>
						<view class="popops-name">
							<text
								style="color: #FFFFFF;font-weight: 500;font-size: 32rpx;">{{peopleList.msg.name}}</text>
							<view style="color: #BBB2B3;">
								<image class="popops-imgs" src="@/static/img-square/likes.png">
								</image>
								{{peopleList.msg.rating}}%
							</view>
						</view>
					</view>
					<view class="popops-btn">
						<view class="bar-class">
							<button type="default" class="btns" @click="gochat(peopleList.msg.id)"><text
									style="margin-right:30rpx;font-size: 32rpx;">
									去搭讪
								</text>
								<image src="@/static/img-square/bean-p1.png" mode=""></image>
								<text style="color: #FFB654 ;">{{peopleList.msg.price}}</text>
							</button>

						</view>
						<view class="balance">
							<image src="@/static/img-square/bean-p2.png" mode=""></image>
							<text style="color: #FFFFFF;">觅豆余额：</text>
							<text style="color: #FFB654;"> {{peopleList.restMoney}} </text>
							</text>
						</view>
					</view>
				</view>
				<view class="overlays" v-if="peopleList.copyWhat">
					<image src="@/static/img-square/cancel.png" mode="" class="popops-cancel" @click="cancelAcco">
					</image>
					<view class="overlay-img">
						<!-- <image class="img-big" src="../../static/img-square/accost1.png" mode=""></image> -->
						<image class="img-big"
							src="http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							mode=""></image>

						<text class="overlay-text">点击复制微信号</text>
						<view class="overlay-wx">
							<view>
								<text>hahahhahahaah</text>
								<!-- <text style="margin-right: 20rpx;">{{_data1.data[current].wechat}}</text> -->
								<button type="default" class="copy-btn"
									@click="copy(_data1.data[current].wechat)">复制</button>
							</view>

						</view>
						<text class="overlay-introduce">在【我的搭讪】中可查看微信号及其余已公开的社交账号，还可以给对方打分哦</text>
					</view>
				</view>
			</van-popup>

		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				show:false,
				submitShow:true
			}
		},
		props: ['peopleList'],
		components: {

		},
		beforeCreate() {

		},
		methods: {
			gochat(id) { //搭讪
				const url = '/accost/' + id;
				try {
					this.$api.post(url).then((res) => {
						switch (res.data.message){
							case '搭讪成功':
								let baseData = uni.getStorageSync('userinfos');
								baseData.beans -= this.peopleList.msg.price;
								this.$emit('change', 1);
								uni.setStorageSync('userinfos', baseData);
								uni.$emit('update', true);
								break;
							case '余额不足':
								uni.showToast({
									title: '余额不足,请充值!!!',
									icon: 'none',
									duration: 1000
								})
								setTimeout(()=>{
									uni.navigateTo({
										url:'/components/recharge'
									})
								},1000)
								return false
								break;
							default:
								
								break;
						}
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						})						
					}).catch(err => {

						uni.showToast({
							title: err.message,
							icon: 'none',
							duration: 2000
						})
					})
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			cancelAcco(){
				this.$emit('change', 0);
			},
			onclose() {
				this.$emit('change', 0);

			}
		},
		computed: {

		},
		mounted() {

		},
		onLoad() {


		}
	}
</script>

<style lang="scss">
	.van-popup {
		background-color: rgba(0, 0, 0, 0) !important;
	}

	.popops {
		height: 770rpx;
		width: 520rpx;
		position: relative;
		margin: 0rpx auto;

		.popops-image {
			width: 520rpx;
			height: 520rpx;
			position: relative;
			border-radius: 24rpx;
			overflow: hidden;

			.popops-avator {
				width: 100%;
				height: 100%;
				display: block;
			}

			.popops-name {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: -13%;
				padding: 0 20rpx;
				box-sizing: border-box;

				.popops-imgs {
					width: 40rpx;
					height: 40rpx;
					vertical-align: top;
					margin-right: 15rpx;
				}
			}
		}

		.popops-btn {
			width: 100%;
			margin-top: 65rpx;

			.bar-class {

				.btns {
					border: none;
					border-radius: 50rpx;
					color: #FFFFFF;
					background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					padding: 6rpx 0;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 15rpx;
				}
			}

			.balance {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 30rpx;

				image {
					width: 35rpx;
					height: 35rpx;
					margin-right: 5rpx;
				}
			}
		}
	}

	.overlays {
		margin: 0 auto;
		position: relative;

		>image {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top: -60rpx;
			right: 0;
			z-index: 12;
		}

		.overlay-img {
			width: 100%;
			height: 100%;
			position: relative;

			.img-big {
				width: 480rpx;
				height: 480rpx;
			}

			.overlay-text {
				position: absolute;
				top: 50%;
				left: 27%;
				color: #FFFFFF;
			}

			.overlay-wx {
				position: relative;
				top: -162rpx;

				view {
					text-align: center;

					text,
					button {
						display: inline-block;
						color: white;
					}

					button {
						width: 100rpx;
						height: 40rpx;
						color: #704409;
						background-color: #FFB654;
						font-size: 20rpx;
						line-height: 40rpx;
						border-radius: 20rpx;
						position: relative;
						top: 10rpx;
					}
				}


			}

			.overlay-introduce {
				width: 100%;
				position: absolute;
				top: 74%;
				left: 0;
				color: #FFFFFF;
				font-size: 22rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
			}

		}
	}
</style>
