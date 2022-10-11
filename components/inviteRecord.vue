<template>
	<view class="content">
		<!--邀请好友-->
		<image src='@/static/myImage/mybg.png'></image>
		<view class="main">
			<button class="invite" open-type="share">立即邀请</button>
			<view class="inviteCode">我的邀请码：{{inviteCode}}</view>
			<image src="@/static/myImage/copy.png" class="copy" @click="copyInviteCode"></image>
			<view class="msg">
				<view class="title">奖励记录</view>
				<view class="title">累计奖励</view>
				<view class="num">{{rewardArr.meta.total.count}}人</view>
				<view class="num">
					<view>
						<view>{{rewardArr.meta.total.sum.slice(0,rewardArr.meta.total.sum.indexOf('.'))}}</view>
						<view class="dot">{{rewardArr.meta.total.sum.slice(rewardArr.meta.total.sum.indexOf('.'))}}</view>
					</view>
				</view>
			</view>

			<van-tabs animated>
				<van-tab title="奖励纪录">
					<view v-for="(item,i) in rewardArr.data" :key='i' class='rewardCord'>
						<van-image round width="84rpx" height="84rpx" :src="item.data.avatar" />
						<view class="name">{{item.data.to_user_name}}</view>
						<view class="reward">搭讪收益{{item.data.income}}</view>
						<view class="time">奖励<view>{{item.num}}</view></view>
					</view>

				</van-tab>
				<van-tab title="绑定记录">
					<view v-for="(item,i) in bindRecord.data" :key='i'>
						<van-image round width="84rpx" height="84rpx" :src="item.avatar" />
						<view class="name">{{item.name}}</view>
						<view class="time">{{item.be_invited_at}}</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<view class="howPlay" @click="howPlay">玩法</view>
		<van-popup :show="show" closeable close-icon-position="top-right" position="bottom" custom-style="height: 818rpx" @close="onClose" round>
			<view class="title">
				<image src="@/static/myImage/6.png" class="left"></image>
				<view>玩法说明</view>
				<image src="@/static/myImage/7.png" class="right"></image>
			</view>
			<view class="step">
				<view class="detail">
					<image src='@/static/myImage/4.png'></image>
					<text>分享链接\n给好友</text>
				</view>
				<view class="space">
					<image src='@/static/myImage/9.png'></image>
				</view>
				<view class="detail">
					<image src='@/static/myImage/2.png'></image>
					<text>好友登录\n填写邀请码</text>
				</view>
				<view class="space">
					<image src='@/static/myImage/9.png'></image>
				</view>
				<view class="detail">
					<image src='@/static/myImage/3.png'></image>
					<text>好友被搭讪</text>
				</view>
				<view class="space">
					<image src='@/static/myImage/9.png'></image>
				</view>
				<view class="detail">
					<image src='@/static/myImage/5.png'></image>
					<text>我获得邀请\n奖励觅豆</text>
				</view>
			</view>
			<view class="rule">
				<view class="rule_title">奖励规则</view>
				<view>1、达成绑定关系的好友被搭讪获得收益时，我将获得收益的5%作为奖励</view>
				<view>2、获得奖励后，可在【我的】——【觅豆余额】中进行提现，1觅豆=1¥</view>
			</view>
		</van-popup>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				show: false,
				inviteCode:'AFAF06',
				rewardArr: {
					"data": [{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 4,
								"income": "6.50",
								"to_user_name": "Marcia Stam",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 3,
								"income": "6.50",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"to_user_name": "Minnie Langosh",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 4,
								"income": "6.50",
								"to_user_name": "Marcamm",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 4,
								"income": "6.50",
								"to_user_name": "Marciaamm",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							
							"action": "invite_income",
							"data": {
								"to_user_uid": 4,
								"income": "6.50",
								"to_user_name": "Marciam",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
					 	"data": {
								"to_user_uid": 4,
								"income": "6.50",
								"to_user_name": "Mamm",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 3,
								"income": "6.50",
								"to_user_name": "Mingosh",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 3,
								"income": "6.50",
								"to_user_name": "Minnie",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
					 {
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 3,
								"income": "6.50",
								"to_user_name": "Mgosh",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
								"from_user_name": "JOKER"
							}
						},
						{
							"num": "0.33",
							"action": "invite_income",
							"data": {
								"to_user_uid": 3,
								"income": "6.50",
								"to_user_name": "innh",
								"avatar":"http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg",
								"from_user_uid": 89,
					  	"from_user_name": "JOKER"
							}
						}
					],
					"links": {
						"first": "http://192.168.0.62/api/user/bean-logs?page=1",
						"last": "http://192.168.0.62/api/user/bean-logs?page=1",
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
								"url": "http://192.168.0.62/api/user/bean-logs?page=1",
								"label": "1",
					  	"active": true
							},
							{
								"url": null,
								"label": "Next &raquo;",
								"active": false
							}
						],
						"path": "http://192.168.0.62/api/user/bean-logs",
						"per_page": 50,
						"to": 12,
						"total": {
							"sum": "4.62",
							"count": 14
						}
					}
				},
				bindRecord:{
					"data": [
					        {
					            "id": 3,
					            "name": "Minnie Langosh",
					            "be_invited_at":"2022-04-19 16:24:30",
					            "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
					        },
					        {
					            "id": 4,
					            "name": "Marcia Stamm",
					            "be_invited_at": "2022-04-19 16:24:30",
					            "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
					        },
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 3,
							    "name": "Minnie Langosh",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							},
							{
							    "id": 4,
							    "name": "Marcia Stamm",
							    "be_invited_at": "2022-04-19 16:24:30",
							    "avatar": "http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg"
							}
					    ],
					    "links": {
					        "first": "http://192.168.0.62/api/user/bind-logs?page=1",
					        "last": "http://192.168.0.62/api/user/bind-logs?page=1",
					        "prev": null,
					        "next": null
					    },
					    "meta": {
					        "current_page": 1,
					        "from": 1,
					        "last_page": 1,
					        "links": [
					            {
					                "url": null,
					                "label": "&laquo; Previous",
					                "active": false
					            },
					            {
					                "url": "http://192.168.0.62/api/user/bind-logs?page=1",
					                "label": "1",
					                "active": true
					            },
					            {
					                "url": null,
					                "label": "Next &raquo;",
					                "active": false
					            }
					        ],
					        "path": "http://192.168.0.62/api/user/bind-logs",
					        "per_page": 50,
					        "to": 2,
					        "total": 2
					    }
				}	
			}
		},
		components: {

		},
		onLoad() {

		},
		methods: {
			onClose() {
				this.show = false;
			},
			
			howPlay() {
				this.show = true;
			},
			rewardRecord() {//奖励记录
				const url = '/user/bean-logs?actions[]=invite_income';
				api.get(url).then((res) => {
					// console.log(res);
					if (res.statusCode == 200) {

					}

				}).catch(err => {
					console.log(err, 2);
				})
			},
			bindRecoed() {//绑定记录
				const url = '/user/bind-logs';
				this.$api.get(url).then((res) => {
					// console.log(res);
					if (res.statusCode == 200) {

					}

				}).catch(err => {
					console.log(err, 2);
				})
			},
			copyInviteCode(){//复制到剪切板
				uni.setClipboardData({//复制
					data: this.inviteCode,
					showToast:true,
					success:()=>{
						uni.showToast({
							title:'复制成功!!!',
							icon:'none',
							duration:2000
						})
					},
					fail:() => {
						uni.showToast({
							title:'复制失败!!!',
							icon:'none',
							duration:2000
						})
					},
					complete:() => {
						console.log('complete');
					}
				});
				// uni.getClipboardData({//获取剪切板内容
				// 	success: function (res) {
				// 		console.log(res);
				// 	},
				// 	fail:() => {
				// 		console.log('fail');
				// 	},
				// 	complete:() => {
				// 		console.log('complete');
				// 	}
				// });
			}
		},
		onShareAppMessage(res) {
			return{
				title: '觅恋一下，简单交友',
				desc:'群抽奖微信群公众号活动少不了我',
				path: `/components/hasInvitedPeople?nickname=${uni.getStorageSync('userinfos').name}&code=${uni.getStorageSync('userinfos').no}`,
				imageUrl: "../../static/img-share/img1.png"
			}
			
		},
		mounted() {
			this.inviteCode=uni.getStorageSync('userinfos').no;
			// this.rewardRecord();
			// this.bindRecoed();
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #F73656 0%, #FF8E6B 100%);

		>image {
			width: 750rpx;
			height: 970rpx;
		}
	}

	.howPlay {
		width: 142rpx;
		height: 64rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 64rpx;
		text-align: center;
		position: fixed;
		right: -10rpx;
		top: 100rpx;
		background: rgba(0, 0, 0, .26);
		border-radius: 32rpx 0px 0px 32rpx;
	}

	.van-popup {
		padding: 32rpx;

		.title {
			position: relative;
			margin-top: 72rpx;

			image {
				width: 36rpx;
				height: 30rpx;
				display: block;
				position: absolute;
				top: 10rpx;

			}

			.left {
				left: 172rpx;
			}

			.right {
				right: 172rpx;
			}

			view {
				font-size: 34rpx;
				font-weight: 500;
				color: #3E3E3E;
				line-height: 48rpx;
				margin: 0 48rpx;
				text-align: center;
			}
		}

		.step {
			overflow: hidden;
			margin: 48rpx auto 46rpx;

			image,
			text {
				display: inline-block;
			}

			view {
				float: left;
				text-align: center;
				width: 120rpx;
			}

			.detail {
				image {
					width: 80rpx;
					height: 80rpx;
					border: 2rpx dashed black;
				}

				text {
					font-size: 24rpx;
					font-weight: 400;
					color: #9C9B9B;
					line-height: 34rpx;
					text-align: center;
				}
			}

			.space {
				width: 68rpx;

				image {
					width: 18rpx;
					height: 22rpx;
					margin-top: 32rpx;
				}
			}
		}

		.rule {
			view {
				font-size: 28rpx;
				font-weight: 400;
				color: #9C9B9B;
				line-height: 48rpx;
				margin-bottom: 18rpx;
			}

			.rule_title {
				font-weight: 500;
				color: #3E3E3E;
				line-height: 40rpx;
				padding-left: 40rpx;
				background: url(@/static/myImage/8.png) no-repeat;
				background-size: 36rpx 36rpx;

			}
		}
	}



	.main {
		width: 100%;
		padding-bottom: 20rpx;
		position: relative;
		.copy{
			width: 22rpx;
			height: 22rpx;
			position: absolute;
			top: 138rpx;
			right: 166rpx;
		}
		.invite {
			width: 560rpx;
			height: 96rpx;
			font-size: 40rpx;
			font-weight: 500;
			color: #682903;
			line-height: 96rpx;
			text-align: center;
			background: linear-gradient(180deg, #FCD77E 0%, #FCB765 100%);
			border-radius: 48rpx;
			margin: 0 auto 32rpx;
		}

		.inviteCode {
			width: 312rpx;
			height: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 44rpx;
			text-align: center;
			margin: 0 auto 32rpx;
		}

		.msg {
			overflow: hidden;
			margin: 0 auto 48rpx;
			width: 688rpx;
			background: white;
			border-radius: 16rpx;

			.title {
				width: 344rpx;
				height: 80rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #AA2607;
				line-height: 80rpx;
				float: left;
				text-align: center;
				background: #FFEDED;
			}

			.num {
				width: 344rpx;
				height: 80rpx;
				font-size: 36rpx;
				font-weight: 600;
				color: #AA2607;
				line-height: 80rpx;
				float: left;
				text-align: center;
				position: relative;
				overflow: hidden;

				view {
					display: inline-block;
				}

				.dot {
					font-size: 20rpx;
					width: 36rpx;
					height: 60rpx;
					line-height: 100rpx;
				}
			}
		}
	}

	.van-tabs {
		width: 644rpx;
		padding: 32rpx;
		margin: 48rpx auto;
		background: #FFFFFF;
		border-radius: 16rpx;

		.van-ellipsis {
			font-size: 32rpx;
			font-weight: 500;
			color: #9C9B9B;
			line-height: 44rpx;
		}

		.van-tabs__line {
			background-color: #AA2607;
			bottom: -15rpx;
			width: 40rpx !important;
			border-radius: 16rpx;
		}

		.van-tab--active {
			.van-ellipsis {
				color: #AA2607;
			}
		}

		van-tab {
			padding:20rpx 0;
			view {
				overflow: hidden;
				padding: 10rpx 0;
			}
			
			

			van-image {
				float: left;
				margin-right:20rpx ;
			}

			.name {
				font-size: 30rpx;
				font-weight: 500;
				color: #3E3E3E;
				line-height: 84rpx;
				float: left;
				margin-left: 16rpx;
				padding: 0;
			}

			.time {
				font-size: 24rpx;
				font-weight: 400;
				color: #9C9B9B;
				line-height: 90rpx;
				float: right;
				padding: 0;
			}
			.rewardCord{
				.name{
					float:none;
					line-height:50rpx;
				}
				.reward{
					display: inline-block;
					font-size: 30rpx;
					font-weight: 400;
					color: #9C9B9B;
					line-height: 40rpx;
				}
				.time{
					line-height:30rpx;
					color:#3E3E3E;
					view{
						padding: 0;
						float: right;
						font-size: 36rpx;
						margin-left:10rpx;
					}
				} 
			}
		}

	}
</style>
