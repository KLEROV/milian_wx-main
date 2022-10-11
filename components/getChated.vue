<template>
	<!--被搭讪-->
	<view>
		<view class="main">
			<view>共{{dataArr.meta.total}}次</view>
			<!-- <view>共66次</view> -->
			<view v-for="(item,i) in dataArr.data" :key='i'>
				<van-image round width="100rpx" height="100rpx" :src="item.avatar_url" class='pic' />
				<view :class="{msg:true,last:i==dataArr.data.length-1}">
					<view class="name">{{item.name}}</view>

					<image src="@/static/homeImage/likes.png"></image>
					<view class="addNum">{{item.rating.slice(0,item.rating.indexOf('.'))}}%</view>
					<view :class="{chat:true,actived:false}" @click="getChat(item.id)" v-if="!item.has_accost">搭讪</view>
					<view :class="{chat:true,actived:true}" v-if="item.has_accost">已搭讪</view>

				</view>
			</view>
			<chat :peopleList='peopleList' @change='change'></chat>
		</view>

	</view>
</template>

<script>
	import chat from './chat.vue'
	export default {
		data() {
			return {
				dataArr: {
					"data": [{
							"id": 3,
							"name": "Minnie Langosh",
							"avatar": "",
							"rating": "50.00",
							"avatar_url": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
							"user_accounts": [],
							"pivot": {
								"from_user_id": 2,
								"to_user_id": 3,
								"rate": 0
							},
							"inviter_name": "",
							"has_accost": 0
						},
						{
							"id": 6,
							"name": "Minnie Langosh",
							"avatar": "",
							"rating": "45.00",
							"avatar_url": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
							"user_accounts": [],
							"pivot": {
								"from_user_id": 2,
								"to_user_id": 3,
								"rate": 0
							},
							"inviter_name": "",
							"has_accost": 1
						},
						{
							"id": 8,
							"name": "Minnie Langosh",
							"avatar": "",
							"rating": "100.00",
							"avatar_url": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
							"user_accounts": [],
							"pivot": {
								"from_user_id": 2,
								"to_user_id": 3,
								"rate": 0
							},
							"inviter_name": "",
							"has_accost": 1
						}
					],
					"links": {
						"first": "http://192.168.0.62/api/user/accosts?page=1",
						"last": "http://192.168.0.62/api/user/accosts?page=1",
						"prev": null,
						"next": null
					},
					"meta": {
						"current_page": 1,
						"from": 1,
						"last_page": 1,
						"links": [{
								"url": null,
								"label": "&laquo; Previous",
								"active": false
							},
							{
								"url": "http://192.168.0.62/api/user/accosts?page=1",
								"label": "1",
								"active": true
							},
							{
								"url": null,
								"label": "Next &raquo;",
								"active": false
							}
						],
						"path": "http://192.168.0.62/api/user/accosts",
						"per_page": 20,
						"to": 1,
						"total": 1
					}
				},
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
		onLoad() {

		},
		methods: {
			getChat(id) { //打开搭讪窗口
				const url = '/users/' + id; //获取用户信息
				try {
					this.$api.get(url).then((res) => {
						this.peopleList.msg = res.data.data;
						this.peopleList.msg.avatar_url = 'http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg';
						this.peopleList.show = true;
						this.peopleList.submitShow = true;
						this.peopleList.copyWhat = false;
						this.peopleList.restMoney = uni.getStorageSync('userinfos').beans;				
					}).catch(err => {

					})
				} catch (e) {
					//TODO handle the exception
				}


			},
			change(val) {
				switch (val){
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
					this.getList();
				},2000)
				
			},
			getList() { //获取被搭讪列表
				uni.showLoading({
					title: '加载中...'
				})
				const url = '/user/be_accosts';
				this.$api.get(url).then((res) => {

					uni.hideLoading();
					// this.dataArr = res.data;

				}).catch(err => {
					console.log(err, 2);
				})
			}
		},
		mounted() {
			this.getList();
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 32rpx;

		chat {
			.van-popup {
				background-color: rgba(0, 0, 0, 0) !important;
			}
		}

		>view {
			font-size: 32rpx;
			font-weight: 500;
			color: #3E3E3E;
			line-height: 44rpx;
			overflow: hidden;
			margin-top: 32rpx;

			view.msg {
				overflow: hidden;
				width: 560rpx;
				border-bottom: 2rpx solid #F3F3F3;
				float: right;
				padding: 35rpx 0 50rpx 0;

				>image {
					width: 24rpx;
					height: 24rpx;
					float: left;
					margin: 8rpx 10rpx 0;
				}

				>view {
					font-size: 28rpx;
					font-weight: 400;
					color: #3E3E3E;
					line-height: 40rpx;
					float: left;
				}

				.name {
					font-weight: 500;
				}

				.chat {
					color: #FFFFFF;
					width: 120rpx;
					height: 48rpx;
					text-align: center;
					line-height: 48rpx;
					background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					border-radius: 28rpx;
					float: right;
				}

				.chat.actived {
					background: #C9C9C9;
				}
			}

			view.msg.last {
				border-bottom: none;
			}

		}
	}
</style>
