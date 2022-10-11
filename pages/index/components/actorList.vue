<template>
	<view class="content">
		<view class="tip" v-if="_data1.getChatShow">
			<image src="@/static/homeImage/3.png"></image>
			<view>滑动卡片，偶遇那个TA</view>
		</view>
		<swiper :current="current" interval=2000 display-multiple-items=3 @change='bindchange'
			@transition='transition_ing' @animationfinish='transition_ed' previous-margin='-400rpx'
			next-margin="-400rpx" v-if="_data1.getChatShow">
			<swiper-item></swiper-item>
			<swiper-item v-for="(item,i) in _data1.data" :key='i'
				:class="{active:active.get[i],lostActive:active.lost[i]}" data='666'>
				<view class="pic">
					<image :src="item.avatar_url" />
				</view>
				<view class="actMessage">
					<view class="title">{{item.name}}</view>
					<view class="point">
						<image src="@/static/homeImage/hand.png" />
						<view>
							{{item.hot}}%
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item></swiper-item>
		</swiper>

		<view class="detailMessage" v-if="_data1.getChatShow">
			<view class="hallo">性格超好的{{_data1.data[current].name}}，快来和我聊天吧～</view>
			<view class="chatMessage">
				<view>
					<image src="@/static/homeImage/2.png" />
					<view>被搭讪{{_data1.data[current].be_accost_num}}次</view>
				</view>
				<view>
					<image src="@/static/homeImage/1.png" />
					<view>搭讪别人{{_data1.data[current].accost_num}}次</view>
				</view>
			</view>
			<view class="needMoney" @click="getchat">
				<view>
					<view style="color:white;font-size:36rpx;" @click='getChat'>去搭讪</view>
					<image src="@/static/homeImage/4.png" />
					<view style="color:#FFB654;font-size:32rpx;margin-top:6rpx;">{{_data1.data[current].price}}</view>
				</view>
			</view>
			<view class="restMoney">
				<image src="@/static/homeImage/4.png" />
				<view>&nbsp;觅豆余额：</view>
				<view style="color:#FFB654;">{{restMoney}}</view>
			</view>
		</view>
		<view class="overlays" v-if="_data1.copyWeChat">
			<image src="@/static/img-square/cancel.png" mode="" class="popops-cancel" @click="cancelAcco">
			</image>
			<view class="overlay-img">
				<!-- <image class="img-big" src="../../static/img-square/accost1.png" mode=""></image> -->
				<image class="img-big"
					src="http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg" mode="">
				</image>

				<text class="overlay-text">点击复制微信号</text>
				<view class="overlay-wx">
					<view>
						<text>hahahhahahaah</text>
						<!-- <text style="margin-right: 20rpx;">{{_data1.data[current].wechat}}</text> -->
						<button type="default" class="copy-btn" @click="copy(_data1.data[current].wechat)">复制</button>
					</view>

				</view>
				<text class="overlay-introduce">在【我的搭讪】中可查看微信号及其余已公开的社交账号，还可以给对方打分哦</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['_data1'],
		data() {
			return {
				active: {
					get: [1],
					lost: [0],
				},
				restMoney: 0,
				showSuccess: false
			}
		},
		created() {

		},
		methods: {
			getchat() { //搭讪
				// const url = '/accost/' + (this._data1.data[this.current].id);
				const url = '/accost/3';
				console.log(this._data1.data[this.current])
				this.$api.post(url).then((res) => {
					switch (res.data.message){
						case '搭讪成功':
							let baseData = uni.getStorageSync('userinfos');
							baseData.beans -= this._data1.data[this.current].price;
							this.restMoney = baseData.beans;
							uni.setStorageSync('userinfos', baseData);
							this.$emit('change', 0);
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
					console.log(err, 2);
				})
			},
			bindchange(e) { //完整划动
				const currentNow = e.detail.current;
			},
			transition_ed(e) { //划动结束
				const currentNow = e.detail.current; //当前目标头像
				this.move(currentNow, this.current, this._data1.type);
			},
			transition_ing(e) { //划动中...

				if (this.dx > e.detail.dx) {
					// console.log('向右滑动')
				} else {
					// console.log('向左滑动')
				}

			},
			move(newData, old, type) { //移动逻辑
				this.active = {
					get: [],
					lost: []
				};
				this.active.get[newData] = 1; //当前目标添加动画
				this.active.lost[newData-1] = 1;
				this.$nextTick(function() {
					this._data1.target = newData;
				})
			},
			// 复制
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function(res) {
						console.log('复制的信息：', value);
						uni.showToast({
							title: '复制成功',
						});
					}
				});

			}, //微信复制隐藏
			cancelAcco() {
				this.$emit('change', 1);
			}
		},
		mounted() {
			this.restMoney = uni.getStorageSync('userinfos').beans;
		},
		computed: {
			current: {
				set() {

				},
				get() {
					return this._data1.target;
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		position: fixed;

		.tip {
			width: 288rpx;
			height: 100rpx;
			margin: 80rpx auto 0;

			image {
				width: 112rpx;
				height: 112rpx;
				display: block;
				margin: 0 auto;
			}

			view {
				font-size: 28rpx;

				font-weight: 400;
				color: #FFFFFF;
				line-height: 48rpx;
			}
		}
	}

	.detailMessage {
		width: 100%;
		height: 400rpx;
		position: absolute;
		bottom: 40rpx;
		left: 0;

		.hallo {
			text-align: center;
			font-size: 32rpx;
			color: white;
		}

		.chatMessage {
			justify-content: space-around;
			flex-wrap: wrap;
			display: flex;
			margin-top: 48rpx;

			>view {
				min-width: 32%;
				border: 2rpx solid #FFFFFF;
				border-radius: 35rpx;
				padding: 8rpx 26rpx;
				text-align: center;
				position: relative;

				view {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					display: inline-block;
					position: relative;
					top: -7rpx;
					margin-left: 14rpx;
				}

				image {
					width: 44rpx;
					height: 44rpx;
					display: inline-block;
					position: relative;
					top: 10rpx;
				}
			}
		}

		.needMoney {
			width: 522rpx;
			background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
			border-radius: 54rpx;
			overflow: hidden;
			margin: 64rpx auto 24rpx;
			text-align: center;

			>view {
				padding: 28rpx 0rpx;
				display: inline-block;

				view {
					float: left;
				}

				image {
					width: 40rpx;
					height: 40rpx;
					margin: 6rpx 10rpx 0 24rpx;
					float: left;
				}
			}

		}

		.restMoney {
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 32rpx;
				height: 32rpx;
				display: block;
				float: left;
				margin-right: 10rpx;
			}

			view {
				font-size: 28rpx;
				color: white;
				float: left;
			}
		}
	}

	swiper {
		margin-top: 100rpx;
		width: 100%;
		height: 510rpx;
		text-align: center;

		swiper-item {
			width: 510rpx;
			position: relative;

			>view {
				overflow: hidden;

				>view {
					float: left;
					color: white;

				}

				.title {
					font-size: 28rpx;
					width: 340rpx;
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.point {
					float: right;
					margin-right: 26rpx;

					image {
						width: 46rpx;
						height: 48rpx
					}

					view {
						float: right;
						font-size: 20rpx;
						margin: 10rpx 0 0 10rpx;
					}
				}
			}

			.pic {
				width: 120px;
				height: 120px;
				display: block;
				margin: 0px auto;
				border-radius: 24rpx;
				overflow: hidden;
				// background: rgba(0, 0, 0, .3);
				position: absolute;
				left: 50rpx;
				bottom: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.actMessage {
				position: absolute;
				bottom: 10rpx;
				left: 66rpx;
				width: 100%;
			}
		}

		swiper-item.active {
			>view {
				.title {
					font-size: 36rpx;
					margin-left: 26rpx;
				}

				.point {
					image {
						width: 46rpx;
						height: 48rpx
					}

					view {
						font-size: 28rpx;
					}
				}
			}

			.pic {
				width: 510rpx;
				height: 510rpx;
				left: 0;
				animation: scaleUp .5s ease;
			}

			.actMessage {
				left: 0;
				bottom: 26rpx;
			}
		}

		swiper-item.lostActive {
			.pic {
				right: -100rpx;
			}

			.actMessage {
				left: 0;
			}

			.point {
				margin-right: 80rpx;
			}
		}

	}

	@keyframes scaleUp {
		0% {
			width: 132rpx;
			height: 132rpx;

		}

		100% {
			width: 520rpx;
			height: 520rpx;

		}
	}

	@keyframes fontScaleUp {
		0% {
			font-size: 28rpx;

		}

		100% {
			width: 520rpx;
			height: 520rpx;

		}
	}


	.overlays {
		width: 65%;
		height: 100%;
		margin: 50% auto;
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
				top: 254rpx;
				left: 130rpx;
				color: #FFFFFF;
			}

			.overlay-wx {
				position: relative;
				top: -180rpx;

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
				top: 376rpx;
				left: 0;
				color: #FFFFFF;
				font-size: 22rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
			}


		}
	}
</style>
