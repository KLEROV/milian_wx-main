<template>
	<!-- 广场 -->
	<view class="square">
		<van-sticky>
			<view class="square-header">
				<!-- 男女选择 -->
				<view class="sex-switch">
					<text class="woman" @click="woman" :style="womanSty">女</text>
					<text class="man" @click="man" :style="manSty">男</text>
				</view>
				<!-- 附近 -->
				<view class="nearby" @click="nearbys" :style="nearbyy">
					<text>附近</text>
				</view>
				<!-- 城市 -->
				<view class="city">
					<van-dropdown-menu active-color="#AB5FF1" duration="500">
						<van-dropdown-item :title="value1" @open="openCity" id="item" @close="colsedCity">
							<!-- <indexList class="indexList"></indexList> -->
							<!-- <uni-indexed-list :options="list" :showSelect="true" @click="bindClick"></uni-indexed-list> -->
							<!-- 		<van-index-bar>
								<view>
									<van-index-anchor index="A" />
									<van-cell title="文本" />
									<van-cell title="文本" />
									<van-cell title="文本" />
								</view>

								<view>
									<van-index-anchor index="B" />
									<van-cell title="文本" />
									<van-cell title="文本" />
									<van-cell title="文本" />
								</view> -->

							<!-- </van-index-bar> -->

							<!-- <city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity"
								:hotCity="hotCity" :obtainCitys="obtainCitys" :isSearch="false" ref="citys">
							</city-select> -->
							<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity"
								:obtainCitys="obtainCitys" :isSearch="false" ref="citys">
							</city-select>
						</van-dropdown-item>

					</van-dropdown-menu>
				</view>
				<!-- 更多 -->
				<view class="more">
					<van-dropdown-menu active-color="#AB5FF1" duration="500">
						<van-dropdown-item title="更多" @open="openimg" @close="closeimg" close-on-click-outside
							id="mores">
							<text class="moreOption" :class="{'moress':iscolors ==index}" :style="colors"
								v-for="(item,index) in option1" :key="index" @click="changeColors(index)">
								{{item.text}}
							</text>
						</van-dropdown-item>
						<image class="more-images" :src="images" mode=""></image>
					</van-dropdown-menu>
				</view>


			</view>
		</van-sticky>
		<!-- 列表 -->
		<view class="user-list" v-for="(item,index) in userList" :key="index">
			<!-- 小豆子 -->
			<view class="userlist-bean">
				<image src="@/static/img-square/bean.png" mode=""></image>
				<block>{{item.price}}/次</block>
			</view>
			<view class="user-list-box">

				<!-- <image src="@/static/logo.png" class="userList-img" mode="scaleToFill"></image> -->
				<view class="userList-img">
					<image :src="item.avatar_url" mode=""></image>
				</view>

				<view class="user-list-right">
					<view class="userlist-header">
						<text class="heder-name">{{item.name}}</text>
						<block>
							<image src="@/static/img-square/fabulous.png" mode=""></image>
							{{item.rating}}%
						</block>
					</view>
					<text style="color:#9C9B9B;font-size: 24rpx;">
						{{item.description}}
					</text>
					<view class="userlist-bottom">
						<view class="bottomBox">
							<image src="@/static/img-square/accost.png" mode=""></image>
							<text>被搭讪{{item.be_accost_num}}次</text>
						</view>
						<view class="bottomBox">
							<image src="@/static/img-square/beaccost.png" mode=""></image>
							<text>搭讪{{item.accost_num}}次</text>
						</view>
						<view>
							<button type="default" class="userlist-btn" @click="accost(item)">搭讪</button>
						</view>
					</view>
				</view>
			</view>

		</view>


		<!-- 点击搭讪-弹出层 -->
		<!-- <van-popup :show="show" @close="onClose"> -->
		<van-overlay :show="show" z-index="11">
			<view class="popops">
				<image src="@/static/img-square/cancel.png" mode="" class="popops-cancel" @click="cancelAcc">
				</image>
				<!-- 取消 -->
				<view class="popops-image">
					<image class="popops-avator" :src="peopleList.avatar_url" mode=""></image>
					<!-- 名字 && 点赞-->
					<view class="popops-name">
						<text style="color: #FFFFFF;font-weight: 500;">{{peopleList.name}}</text>
						<view style="color: #BBB2B3;">
							<image class="popops-imgs" src="@/static/img-square/likes.png" mode="">
							</image>
							{{peopleList.rating}}%
						</view>
					</view>
				</view>
				<view class="popops-btn">
					<view class="bar-class">
						<button type="default" class="btns" @click="gopop"><text style="margin-right:30rpx;">
								去搭讪
							</text>
							<image src="@/static/img-square/bean-p1.png" mode=""></image>
							<text style="color: #FFB654 ;">{{peopleList.price}}</text>
						</button>

					</view>
					<view class="balance">
						<image src="@/static/img-square/bean-p2.png" mode=""></image>
						<text style="color: #FFFFFF;">觅豆余额：</text>
						<text style="color: #FFB654;"> {{users.beans}} </text>
						</text>
					</view>
				</view>
			</view>
			<!--  </van-popup> -->
		</van-overlay>


		<!-- 搭讪成功 -->
		<van-overlay :show="showSuccess" @click="canclepop" z-index="11">
			<view class="overlays">
				<image src="@/static/img-square/cancel.png" mode="" class="popops-cancel" @click="cancelAcco">
				</image>
				<view class="overlay-img">
					<image class="img-big" src="../../static/img-square/accost1.png" mode=""></image>
					<text class="overlay-text">点击赋值微信号</text>
					<view class="overlay-wx">
						<view style="display: flex;">
							<text style="margin-right: 20rpx;">{{weixin}}</text>
							<button type="default" class="copy-btn" @click="copy(weixin)">复制</button>
						</view>

					</view>
					<text class="overlay-introduce">在【我的搭讪】中可查看微信号及其余已公开的社交账号，还可以给对方打分哦</text>
				</view>
			</view>
		</van-overlay>
	</view>
</template>

<script>
	// import indexList from "./components/indexList.vue";
	import request from "../../api/api.js"
	import citySelect from "@/city-select/city-select.vue"
	import citys from "./citys/citys.js"

	export default {
		onShareAppMessage(res) {
			console.log(res)
			if (res.from === "menu") {
				console.log(res.target)
			}
			return {
				title: '觅恋一下，简单交友',
				path: '/pages/square/square',
				imageUrl: "../../static/img-share/img2.png",
			}
		},
		components: {
			// indexList,
			citySelect
		},
		onLoad() {
			var address = uni.getStorageSync('Locations');
			//动态更新数据
			setTimeout(() => {
				//修改需要构建索引参数的名称
				this.formatName = 'cityName'
				//修改当前城市
				this.activeCity = {
					cityName: address[0].regeocodeData.addressComponent.city,
					cityCode: address[0].regeocodeData.addressComponent.adcode
				}
				//修改热门城市
				this.hotCity = [{
						cityName: '南京',
						cityCode: 110100
					},
					{
						cityName: '北京',
						cityCode: 110102
					}
				]
				//修改构建索引数据
				this.obtainCitys = citys
				uni.showToast({
					icon: 'none',
					title: '更新数据成功',
					// #ifdef MP-WEIXIN
					duration: 3000,
					// #endif
					mask: true
				})
			}, 500)

		},
		data() {
			return {

				// 微信号
				weixin: '1187790777',
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'title',
				//当前城市
				activeCity: {
					id: 1,
					title: '成都市'
				},
				//热门城市
				hotCity: [{
						id: 0,
						title: '北京市'
					},
					{
						id: 1,
						title: '上海市'
					}
				],
				//显示的城市数据
				obtainCitys: [{
						id: 0,
						title: '南京'
					},
					{
						id: 1,
						title: '北京'
					},
					{
						id: 2,
						title: '天津'
					},
					{
						id: 3,
						title: '东京'
					}
				],





				manSty: "",
				womanSty: "",
				inverted: true,

				// 城市的数据
				optionCity: [],
				// 更多的数组
				option1: [{
						text: '最新注册',
						value: 0,
						color: "#fff"
					},
					{
						text: '收费价格',
						value: 1
					},
					{
						text: '最好评',
						value: 2
					},
					{
						text: '被搭讪次数最多',
						value: 3
					},
					{
						text: '主动搭讪最多',
						value: 4
					},
				],
				// value1: '更多',
				// 更多的小图标
				images: require('@/static/img-square/more.png'),

				// 选中下拉菜单内容样式
				colors: "",
				iscolors: -1,

				// 用户列表数据
				userList: [],

				// 附近选中颜色
				nearbyy: "",
				flag: false,

				// 弹出层的状态
				show: false,

				// 搭讪成功弹窗状态
				showSuccess: false,

				// 索引列表的数据
				value1: "城市",
				// 个人信息
				users: "",

				// 点击搭讪弹窗的数据
				peopleList: {},

				// 通知个人中心刷新数据
				refresh: true,
				// 男女选择
				// gender: ,
				// 经度
				lon: "",
				// 维度
				lat: "",
				// 正序倒叙
				direct: "",
				// 订单
				order: "",
				// 城市
				city: ""
			}
		},
		methods: {
			goole() {
				request.get('/users', {
					gender: this.users.gender,
					lon: this.lon,
					lat: this.lat,
					city: this.city,
					direct: this.direct,
					order: this.order
				}).then(res => {
					this.userList = res.data.data
				})
			},

			// 用户列表数据
			init() {
				this.users = uni.getStorageSync('userinfos')
				if (this.users.gender === 0) {
					this.users.gender = 1
				} else if (this.users.gender === 1) {
					this.users.gender = 0
				}
				request.get('/users', {
					gender: this.users.gender
				}).then(res => {
					this.userList = res.data.data
				})

				console.log('这是搭讪成功打印的数据')
				if (this.users.gender === 0) {
					this.womanSty = 'color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)'
					this.manSty = ''
				} else if (this.users.gender === 1) {
					this.manSty = 'color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)'
					this.womanSty = ''
				}



			},
			man() {
				this.manSty = 'color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)'
				this.womanSty = ''
				this.users.gender = 1
				this.goole()
			},
			woman() {
				this.womanSty = 'color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)'
				this.manSty = ''
				this.users.gender = 0
				this.goole()
			},

			// 更多
			// 选中的效果
			openimg() {
				this.images = require("@/static/img-square/more-active.png")
				this.flag = false
				this.nearbyy = ''
				// this.selectComponent('#item').toggle(false);
			},

			// 取消选中的效果
			closeimg() {
				this.images = require("@/static/img-square/more.png")
				console.log('更多的关闭事件')
			},

			colsedCity() {
				console.log('城市的关闭事件')
			},

			// 改变选中的颜色
			changeColors(index) {
				// 	if (this.iscolors=== index) {
				// 		this.colors = 'background-color:#E2C8F9;color:#AB5FF1 '
				// 	}
				// },
				this.iscolors = index
				if (index === 0) {
					this.order = 'created_at';
					this.direct = 'asc';
				} else if (index === 1) {
					this.order = 'price';
					this.direct = 'asc';
				} else if (index === 2) {
					this.order = 'rating';
					this.direct = 'asc';
				} else if (index === 3) {
					this.order = 'be_accost_num';
					this.direct = 'asc';
				} else if (index === 4) {
					this.order = 'accost_num';
					this.direct = 'asc';
				}
				this.goole()

			},
			// 搭讪
			accost(value) {
				console.log(value)
				this.show = true
				this.peopleList = value
			},

			// 取消搭讪
			canclepop() {
				this.show = false
			},

			// 附近
			nearbys() {

				console.log(123)
				this.flag = !this.flag;
				if (this.flag == true) {
					this.nearbyy = 'color:#AB5FF1';
					this.selectComponent('#item').toggle(false);
					this.selectComponent('#mores').toggle(false);
					var location = uni.getStorageSync('Location');
					this.lon = location.longitude;
					this.lat = location.latitude;
					this.goole();
				} else {
					this.nearbyy = '';
					this.lon = '';
					this.lat = '';
					this.goole()
				}
			},

			// 去搭讪
			gopop() {
				request.post('/accost/' + this.peopleList.id).then(res => {
					if (res.statusCode === 200) {
						this.show = false;
						this.showSuccess = true;
						uni.$emit('update', this.refresh);
						setTimeout(() => {
							this.init()
						}, 1000)
					} else {
						console.log(res)
						uni.showToast({
							title: res.data.message,
							duration: 2000,
							icon: 'loading',
							success() {
								setTimeout(() => {
									uni.navigateTo({
										url: "/components/recharge"
									})
								}, 2000)
							}
						})

					}
				})

			},
			// 取消搭讪的事假
			cancelAcc() {
				this.show = false
			},

			// 取消搭讪成功的事件
			cancelAcco() {
				this.showSuccess = false
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

			},
			// 索引列表的点击事件
			cityClick(item) {
				console.log(item)
				this.value1 = item.cityName
				this.city = item.cityName
				this.selectComponent('#item').toggle()
				this.goole()
				// uni.showToast({
				// 	icon: 'none',
				// 	title: 'item: ' + JSON.stringify(item),
				// 	// #ifdef MP-WEIXIN
				// 	duration: 3000,
				// 	// #endif
				// 	mask: true
				// })
			},

			// 城市下拉事件
			openCity() {
				this.flag = false;
				this.nearbyy = ''

				console.log('城市列表打开事件')
				// this.selectComponent('#mores').toggle(false);
			}

		},
		created() {

			this.init()
			// var _this = this
			// 获取经纬度
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
							console.log('当前地址信息', res)
							// _this.lon = res.longitude
							// _this.lat = res.latitude

							uni.setStorageSync('Location', res)
						}
					})
				}
			})


			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function(res) {
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 		console.log('当前地址信息', res)
			// 	}
			// })
		}
	}
</script>

<style lang="scss">
	.square {
		width: 100%;
		height: 100%;

		.square-header {
			width: 100%;
			height: auto;
			padding: 10rpx 15rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #F8F8F8;

			.sex-switch {
				width: 20%;
				height: 40rpx;
				border: 1rpx solid #000;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.man,
				.woman {
					width: 50%;
					height: 100%;
					border-radius: 18rpx;
					text-align: center;
				}
			}

			.tag-view {
				width: 20%;
				height: 40rpx;

			}

			// 城市的样式
			.city {
				.van-dropdown-menu {
					border: none;
					background: none;
					box-shadow: none;
					display: flex;
					align-items: center;
				}

				.van-dropdown-item {
					overflow: hidden;
				}

			}

			// 更多的样式
			.more {

				.van-dropdown-menu {
					border: none;
					background: none;
					box-shadow: none;
					display: flex;
					align-items: center;

					::after {
						display: none;
					}
				}

				.van-dropdown-menu__title {
					padding-right: 4rpx;
				}

				// .moreOption {
				// 	display: inline-block;
				// 	padding: 13rpx 25rpx;
				// 	margin: 15rpx 35rpx;
				// 	border-radius: 30rpx;
				// 	background-color: #EDEDED;
				// 	text-align: center;
				// }

				.van-popup--top {
					display: flex;
					flex-wrap: wrap;
					padding-bottom: 20rpx;
					flex: 1;
					margin-right: 15rpx;
				}

				.more-images {
					width: 25rpx;
					height: 25rpx;

				}
			}
		}


		.user-list {
			width: 100%;
			height: 100%;
			position: relative;

			.userlist-bean {
				width: 100rpx;
				height: 35rpx;
				position: absolute;
				bottom: 15%;
				left: 6%;
				z-index: 9;
				font-size: 25rpx;
				color: #FFFFFF;

				image {
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
					margin-right: 5rpx;
				}
			}

			.user-list-box {
				width: 100%;
				height: 100%;
				display: flex;
				overflow: hidden;
				padding: 25rpx 20rpx;
				box-sizing: border-box;
			}



			.userList-img {
				min-width: 180rpx;
				height: 180rpx;
				margin-right: 16rpx;
				// background-image: url('~@/static/logo.png');
				// background-size: 100% 100%;
				// background-repeat: no-repeat;
				position: relative;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}

			.user-list-right {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;

				.userlist-header {
					width: 100%;
					display: flex;
					align-items: center;

					.heder-name {
						display: inline-block;
						width: 45%;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 32rpx;
						margin-right: 15rpx;
						white-space: nowrap;
					}
				}

				image {
					width: 30rpx;
					height: 30rpx;
				}

				.userlist-bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					color: #FF9200;
					white-space: normal;
					font-size: 24rpx;

					.bottomBox {
						display: flex;
						align-items: center;
					}

					.userlist-btn {
						width: 110rpx;
						height: 48rpx;
						font-size: 24rpx;
						line-height: 48rpx;
						background: linear-gradient(180deg, #7840F6 0%, #B464EF 100%);
						border: none;
						color: #FFFFFF;
						border-radius: 30rpx;
						z-index: 9;

					}

					image {
						vertical-align: middle;
					}
				}

			}
		}

		// 取消
		.popops-cancel {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top: -60rpx;
			right: 0;
			z-index: 12;
		}

		.popops {
			width: 65%;
			position: relative;
			// display: flex;
			// justify-content: center;
			// flex-direction: column;
			height: 100%;
			margin: 40% auto;

			// // 取消
			// .popops-cancel {
			// 	width: 50rpx ;
			// 	height: 50rpx;
			// 	position: absolute;
			// 	top: 20%;
			// 	right: 20%;
			// }

			.popops-image {
				width: 100%;
				// margin: 0 auto;
				position: relative;

				.popops-avator {
					width: 100%;
					border-radius: 6%;
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
			width: 65%;
			height: 100%;
			margin: 50% auto;
			position: relative;

			.overlay-img {
				width: 100%;
				height: 100%;
				position: relative;

				.img-big {
					width: 100%;
					height: 50%;
				}

				.overlay-text {
					position: absolute;
					top: 27%;
					left: 27%;
					color: #FFFFFF;
				}

				.overlay-wx {
					position: absolute;
					top: 32%;
					left: 23%;
					color: #FFFFFF;

					.copy-btn {
						width: 100rpx;
						height: 40rpx;
						color: #704409;
						background-color: #FFB654;
						font-size: 20rpx;
						line-height: 40rpx;
						border-radius: 20rpx;
					}

				}

				.overlay-introduce {
					width: 100%;
					position: absolute;
					top: 36%;
					left: 0;
					color: #FFFFFF;
					font-size: 22rpx;
					padding: 0 40rpx;
					box-sizing: border-box;
				}

			}
		}
	}


	.moreOption {
		display: inline-block;
		padding: 13rpx 25rpx;
		margin: 15rpx 35rpx;
		border-radius: 30rpx;
		background-color: #EDEDED;
		text-align: center;
	}

	.moress {
		background-color: #E2C8F9;
		color: #AB5FF1
	}

	.near {
		color: #AB5FF1;
	}
</style>
