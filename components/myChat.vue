<template>
	<!--我的搭讪-->
	<view class="content">
		<view class="main">
			<view>共{{dataArr.meta.total}}次</view>
			<view v-for="(item,i) in dataArr.data" :key='i'>
				<van-image round width="100rpx" height="100rpx" :src="item.avatar_url"/>
				<view :class="{msg:true,last:i==dataArr.data.length-1}">
					<view>
						<view class="name">{{item.name}}</view>
						<image src="@/static/homeImage/likes.png"></image>
						<view class="addNum">{{item.rating.slice(0,item.rating.indexOf('.'))}}%</view>
					</view>
					<!--微信 微博 小红书-->
					<!-- <view class='share'>
						<view>
							<image src="@/static/myImage/wx.png"></image>
							<view>微信</view>
						</view>
						<view style="border-color:#FFD6D6;">
							<image src="@/static/myImage/red.png"></image>
							<view>小红书</view>
						</view>
						<view style="border-color:#FF9E55;">
							<image src="@/static/myImage/wb.jpg"></image>
							<view>微博</view>
						</view>
					</view> -->
					<view class="myGrades">
						<view>我的打分</view>
						<view>
							<view v-for="i in (item.pivot.rate==0?4:item.pivot.rate)" :key='i' style="background:url(../../../static/myImage/star1.png) no-repeat center;background-size: cover;"></view>
							<view v-for="i in (5-(item.pivot.rate==0?4:item.pivot.rate))" :key='i' style="background:url(../../../static/myImage/star.png) no-repeat center;background-size: cover;"></view>
						</view>
					</view>
					<view :class="{grades:true,actived:!item.pivot.rate}" @click="setGradesFun(item.id,item.pivot.rate==0?4:item.pivot.rate)">打分<view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<van-popup :show="show" custom-style="height:100%;width:100%">
			<view class="setGrages">
				<view class="title">给Ta打分</view>
				<van-rate :value="setGrades.grade" icon="../../../../static/myImage/star1.png"
					void-icon="../../../../static/myImage/star.png" color='#FFB654' void-color="white"
					@change="onChange" />
				<view class="msg">我对Ta的印象：“{{setGrades.rank}}”</view>
				<button @click.prevent="submit">确定</button>
			</view>
		</van-popup>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				show: false,
				dataArr:{},
				setGrades:{
					id:0,
					grade:1,
					rank:'优秀'
				}
			}
		},
		components: {

		},
		onLoad() {

		},
		methods: {
			submit() { //打分提交
				const url='/user/'+this.setGrades.id+'/rating',
				params={rate:this.setGrades.grade};
				this.$api.post(url).then((res) => {
					if (res.statusCode == 200) {
						uni.showToast({
							icon:'none',
							title:res.data.message
						},2000)
						this.getChatList();
					}
				
				}).catch(err => {
					console.log(err, 2);
				})
				
				this.show = false;
			},
			setGradesFun(id,grade) { //设置分数弹窗
				this.setGrades.id=id;
				this.setGrades.grade=grade;
				this.show = true;
			},
			onChange(e) { //打分
				this.setGrades.grade=e.detail;
				
				switch (e.detail){
					case 1:
					this.setGrades.rank='不满意'
						break;
					case 2:
					this.setGrades.rank='一般'
						break;
					case 3:
					this.setGrades.rank='还行'
						break;
					case 4:
					this.setGrades.rank='优秀'
						break;
					default:
					this.setGrades.rank='完美'
						break;
				}
			},
			getChatList() { //获取搭讪列表
				const url = '/user/accosts';
				this.$api.get(url).then((res) => {
		
					if (res.statusCode == 200) {
						res.data.data[0].avatar_url='http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg';
						res.data.data[0].pivot.rate=res.data.data[0].pivot.rate/20;
						this.dataArr=res.data;
						// this.dataArr.data.push(...res.data.data,...res.data.data,...res.data.data,...res.data.data,...res.data.data,...res.data.data);
					}

				}).catch(err => {
					console.log(err, 2);
				})
				}
			},
		mounted() {

			this.getChatList();
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 32rpx;

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
				padding-bottom: 20rpx;
				position: relative;

				>view {
					overflow: hidden;

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
				}

				.myGrades {
					>view {
						line-height: 72rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #9C9B9B;
						overflow: hidden;

						view {
							width: 32rpx;
							height: 32rpx;
							
							
							margin-left: 8rpx;
							border: 2rpx dashed #000000;
							float: left;
							margin-top: 20rpx;
						}
					}
				}

				.share {
					overflow: hidden;
					margin-top: 14rpx;

					>view {
						border: 2rpx solid #BFEDAB;
						padding: 10rpx 16rpx;
						float: left;
						margin-right: 16rpx;
						border-radius: 22rpx;

						image {
							width: 28rpx;
							height: 28rpx;
							float: left;
						}

						view {
							font-size: 20rpx;
							font-weight: 400;
							color: #3E3E3E;
							line-height: 22rpx;
							float: left;
							margin-left: 4rpx;
						}
					}

				}

				.grades {
					color: #FFFFFF;
					width: 120rpx;
					height: 48rpx;
					text-align: center;
					line-height: 48rpx;
					background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					border-radius: 28rpx;
					float: right;
					position: absolute;
					bottom: 68rpx;
					right: 0;
				}

				.grades.actived {
					display: none;
				}
			}

			view.msg.last {
				border-bottom: none;
			}
		}
}
		van-popup {
			.van-popup {
				background: rgba(0, 0, 0, .1);
			}

			view.setGrages {
				background: white;
				padding: 30rpx 24rpx 40rpx;
				border-radius: 16rpx;
				width: 550rpx;
				margin: 284rpx auto 0;

				.title {
					font-size: 38rpx;
					color: #3E3E3E;
					line-height: 50rpx;
					text-align: center;
				}

				.msg {
					font-size: 30rpx;
					font-weight: 400;
					color: #3E3E3E;
					line-height: 40rpx;
					text-align: center;
				}

				button {
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 44rpx;
					background: linear-gradient(90deg, #7840F6 0%, #B464EF 100%);
					border-radius: 54rpx;
					padding: 24rpx;
					width: 400rpx;
					margin: 56rpx auto 0;
				}
			}

			van-rate {
				width: 394rpx;
				margin: 64rpx auto 48rpx;
				display: block;
			}

			.van-rate__icon,
			.van-icon--image {
				width: 70rpx;
				height: 70rpx;
			}

			.van-rate__icon {
				border: 2rpx dashed #000000;
			}
		}

	
</style>
