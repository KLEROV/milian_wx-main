<template>
	<view :style='{height:height}' class="mainBg">
		<view class="main">
			<view class="listBar">
				<view v-for="(item,index) in tabList" :key='index' :class="{'active':activeList[index]}"
					@click="tabChange({index})">{{item}}</view>
			</view>
			<view class="rule" @click="rule({index})">上榜规则</view>
			<view class="topActer" v-show='show'>
				<view class="top_2">
					<!-- <image src="@/static/hotImage/top2.png"></image> -->
					<view class="actSrc">
						<image :src="dataList[1].user.avatar_url"></image>
					</view>
					<view class="actorName">{{dataList[1].user.name}}</view>
					<view class="fanNum">{{dataList[1].hot}}</view>
					<view class="list_connect" @click='getChat(dataList[1].user_id)'>搭讪</view>
				</view>
				<view class="top_1">
					<!-- <image src="@/static/hotImage/top1.png"></image> -->
					<view class="actSrc">
						<image :src="dataList[0].user.avatar"></image>
					</view>
					<view class="actorName">{{dataList[0].user.name}}</view>
					<view class="fanNum">{{dataList[0].hot}}</view>
					<view class="list_connect" style="margin:122rpx 45rpx 0;" @click='getChat(dataList[0].user_id)'>搭讪</view>
				</view>
				<view class="top_3">
					<!-- <image src="@/static/hotImage/top3.png"></image> -->
					<view class="actSrc">
						<image :src="dataList[2].user.avatar_url"></image>
					</view>
					<view class="actorName">{{dataList[2].user.name}}</view>
					<view class="fanNum">{{dataList[2].hot}}</view>
					<view class="list_connect" @click='getChat(dataList[2].user_id)'>搭讪</view>
				</view>
			</view>
			<view class="list" v-show='show'>
				<view v-for="(item,i) in dataList" v-if="i>2" :key='i'>
					<view class="list_num">{{i+1}}</view>
					<view class="list_pic">
						<image :src="item.user.avatar_url"></image>
					</view>
					<view class="list_name">{{item.user.name}}</view>
					<view class="hot">
						<image src="@/static/hotImage/hot.png"></image>
						<view class="hotNum">{{item.hot}}</view>
					</view>
					<view class="list_connect" @click='getChat(item.user_id)'>搭讪</view>
				</view>
				<view class="lastAct">
					<view class="list_num" style="">{{dataList.length}}</view>
					<view class="list_pic" style="">
						<image :src="dataList[dataList.length-1].user.avatar_url"></image>
					</view>
					<view class="list_name">{{dataList[dataList.length-1].user.name}}</view>
					<view class="hot">
						<image src="@/static/hotImage/hot.png"></image>
						<view class="hotNum">{{dataList[dataList.length-1].hot}}</view>
					</view>
					<view class="last">搭讪他人，增加热度排名～</view>
				</view>
			</view>
		</view>

		<chat :peopleList='peopleList' @change='change'></chat>
		<van-dialog class="van-dialog" :title="alertMsg.title" :show="alertMsg.show" :message='alertMsg.msg' :messageAlign="alertMsg.messageAlign" theme='round-button' confirmButtonText='我知道了' @close='close' closeOnClickOverlay>
		</van-dialog>

	</view>
</template>
<script>
	import chat from '../../components/chat.vue'
	export default {
		data() {
			return {
				show: false,
				height:'1900rpx',
				alertMsg: {
					title: '上榜规则',
					show: false,
					msg: `1、榜单展示热力值排名前100的用户信息，根据时间周期不同，定时刷新榜单 \n\n 2、搭讪别人一次，热力值+50；被别人搭讪一次，热力值+50`,
					messageAlign: 'left'
				},
				tabList: ['日榜', '周榜', '月榜'],
				dataList: [],
				activeList: [1, 0, 0],
				num: 0,
				peopleList: {
					msg: {},
					restMoney: 0,
					show: false,
					submitShow:true,
					copyWhat:false
				}
			}
		},
		components: {
			chat
		},
		methods: {
			tabChange(tab_list) { //tab切换
				let type = '';
				switch (tab_list.index) {
					case 0:
						type = 'day'
						break
					case 1:
						type = 'week'
						break
					case 2:
						type = 'month'
						break
				}
				if (this.activeList[tab_list.index] == 0) {
					this.activeList = [0, 0, 0]
					this.activeList[tab_list.index] = 1;
					this.getList(type);
				}
			},
			change(status){//搭讪弹窗隐藏
				switch (status){
					case 0://取消搭讪,未提交
						this.peopleList.show = false;
						break;
					case 1://提交搭讪,复制框显示 
						this.peopleList.submitShow = false;
						this.peopleList.copyWhat = true;
						break;
					default:
						
						break;
				}
				setTimeout(()=>{
					this.getList('day');
				},2000)
			},
			rule() {//规则显示
				this.alertMsg.show =true;
			},
			close() {//规则隐藏
				this.alertMsg.show = false;
			},
			getList(type) { //获取头像列表
				uni.showLoading({
					title: '加载中...'
				})
				const url = '/hot',
					param = {
						'type': type
					};
				this.$api.get(url, param).then((res) => {
					this.height=`${wx.getSystemInfoSync().windowHeight}px`;
					if(res.data.data.length==0){
						uni.hideLoading();
						uni.showToast({
							title: '无数据!',
							icon: 'none',
							duration: 4000
						})
						this.show=false;
						return false
					}
					
					switch (res.statusCode) {
						case 200:
							this.dataList = res.data.data;
							uni.hideLoading();
							this.show = true;
							break;
						case 401:
							uni.hideLoading();
							uni.showToast({
								title: '授权已过期,请重新进入!',
								icon: 'none',
								duration: 4000
							})
							break;
						default:
							uni.hideLoading();
							uni.showToast({
								title: '网络不佳,请稍后重试!',
								icon: 'none',
								duration: 2000
							})
							break;
					}
				}).catch(err => {
					console.log(err, 1);
				})

			},
			getChat(id) { //打开搭讪窗口
				const url = '/users/' + id; //获取用户信息
				try {
					this.$api.get(url).then((res) => {
						if (res.statusCode == 200) {
							this.peopleList.msg = res.data.data;
							this.peopleList.show = true;
							this.peopleList.submitShow = true;
							this.peopleList.copyWhat = false;
							this.peopleList.restMoney = uni.getStorageSync('userinfos').beans;
						}

					}).catch(err => {

					})
				} catch (e) {

				}
			}
		},
		computed: {

		},
		beforeCreate() {

		},
		mounted() {
			this.getList('day');
		},
		onPullDownRefresh() {
			this.getList('day');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.mainBg{
		background:linear-gradient(#793FD9,#3F2385);
	}
	.main {
		width: 100%;
		height: 100%;
		position: relative;
		top: 0;
		left: 0;
		overflow: auto;
		// background: url(@/static/hotImage/bg.png) no-repeat center;
		background-size: cover;
	}

	.listBar {
		width: 686rpx;
		height: 76rpx;
		border-radius: 48rpx;
		background: rgba(255, 255, 255, .23);
		justify-content: space-around;
		flex-wrap: wrap;
		display: flex;
		margin-top: 50rpx;
		margin-left: 32rpx;

		view {
			width: 168rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			color: white;
			margin-top: 10rpx;
			font-size: 28rpx;
		}

		view.active {
			background: rgba(255, 255, 255, 1);
			border-radius: 56rpx;
			color: #AB5FF1;
		}
	}

	.rule {
		width: 178rpx;
		height: 56rpx;
		line-height: 50rpx;
		text-align: center;
		border-radius: 41rpx 0 0 41rpx;
		font-weight: 500;
		font-size: 28rpx;
		color: black;
		background: #FFB654;
		position: fixed;
		right: 0;
		z-index: 99999999;
		top: 170rpx;
	}

	.topActer {
		width: 100%;
		margin-top: 80rpx;
		justify-content: space-around;
		flex-wrap: wrap;
		display: flex;
	}

	.topActer>view {
		width: 184rpx;
		height: 368rpx;
		float: left;
		position: relative;
		margin-top: 74rpx;

		// 设置图片大小
		image {
			width: 100%;
			height: 100%;
			display: block;
			position: relative;
			z-index: 999999;
		}

		view {
			width: 100%;
			font-size: 28rpx;
			text-align: center;
			color: white;
			position: absolute;
			top: 212rpx;
			left: 0;
			z-index: 9999999;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.fanNum {
			top: 260rpx;
			left: 74rpx;
			width: 104rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		view.fanNum {
			font-size: 24rpx;
			text-align: left;
		}

		// 设置头像框大小
		view.actSrc {
			width: 124rpx;
			height: 124rpx;
			border-radius: 50%;
			overflow: hidden;
			top: 47rpx;
			left: 32rpx;
			z-index: 0;
		}
	}

	.topActer>view.top_1 {
		width: 208rpx;
		height: 444rpx;
		margin-top: 0rpx;

		view.actSrc {
			width: 152rpx;
			height: 152rpx;
			top: 50rpx;
		}

		view {
			font-size: 32rpx;
			top: 240rpx;
		}

		.fanNum {
			top: 300rpx;
			font-size: 28rpx;
		}
	}

	.list {
		width: 686rpx;
		background: #3F2385;
		margin: 48rpx 0 48rpx 32rpx;
		border-radius: 22rpx;
		overflow: hidden;
		padding: 0;

		image {
			width: 100%;
			height: 100%;
		}

		>view {
			color: white;
			overflow: hidden;
			margin: 24rpx 0 24rpx 0;

			view {
				float: left;
				margin: 26rpx 0rpx 0 26rpx;
			}

		}

		.list_name {
			font-size: 28rpx;
			width: 150rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.list_num {
			font-size: 32rpx;
			width: 40rpx;
		}

		.list_pic {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 0 0 26rpx;
			padding: 0;
		}

		.hot {
			image {
				width: 24rpx;
				height: 24rpx
			}

			.hotNum {
				font-size: 24rpx;
				float: right;
				margin: 0rpx 0 0 6rpx;
				padding-top: 4rpx;
				width: 90rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}


	}

	.main .list_connect {
		width: 120rpx;
		height: 48rpx;
		text-align: center;
		border-radius: 27rpx;
		line-height: 48rpx;
		background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
		float: right;
		font-size: 28rpx;
		margin-right: 26rpx;
		margin-top: 18rpx;
	}

	.topActer .list_connect {
		background: white;
		color: #AB5FF1;
		margin: 90rpx 36rpx 0;
	}

	.list .lastAct {
		position: fixed;
		bottom: 0;
		left: 0;
		background: #300A5C;
		width: 100%;
		margin: 0;
		padding: 18rpx 0 18rpx 0;

		>view {
			margin: 20rpx 16rpx 0 0rpx;
		}

		.list_pic {
			width: 64rpx;
			height: 64rpx;
			margin-top: 0;
		}

		.list_name {
			font-size: 24rpx;
			width: 150rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.list_num {
			font-size: 28rpx;
			margin-left: 16rpx;
		}

		.hot {
			margin-top: 14rpx;

			image {
				width: 20rpx;
				height: 20rpx;
			}

			.hotNum {
				font-size: 20rpx;
				padding-top: 10rpx;
				width: 60rpx;
			}
		}

		.last {
			font-size: 28rpx;
			float: right;
		}
	}

	.van-dialog {
		z-index: 9999999999999999;
		position: relative;

		.van-button--danger {
			font-size: 32rpx;
			background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
		}

		.van-dialog__header {
			font-size: 36rpx;
			font-weight: 500;
			color: #3E3E3E;
			line-height: 50rpx;
		}

		.van-dialog__message {
			margin-top: 8rpx;

			.van-dialog__message-text {
				font-size: 28rpx;
				font-weight: 400;
				color: #3E3E3E;
				line-height: 48rpx;
			}

		}

		.van-dialog__message-text {
			text-align: center;
		}
	}
	chat{
		.van-popup {
			background-color: rgba(0, 0, 0, 0) !important;
		}
	}
	
</style>
