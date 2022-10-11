<template>
	<view class="content">
		<view class="main" :style="{height:mainHeight*2+'rpx'}">
			<!-- <image src="../../static/homeimage/bg.gif" class="bg"></image> -->

			<view :style="{ width: picSet.width + 'rpx',animation:picSet.animation,position:'relative'}">
				<view :style="{ width: picSet.width*2 + 'rpx',position:'relative'}">
					<view :style="{ width:  picSet.width + 'rpx'}">
						<view v-for="(item, i) in dataArr" :key="i" class="pic" :style="{ width: container*2 + 'rpx', height: picSet.height*2 + 'rpx','position':'relative'}" :data='i'>
							<view :style="{width: item.picWidth*2 + 'rpx',height: item.picWidth*2 + 'rpx',top: item.top*2 + 'rpx',left: item.left*2 + 'rpx',overflow:'hidden','border-radius':'50%','position':'absolute'}"
								@click='actorList(i)'>
								<img :src="item.avatar_url" style='width: 100%;height: 100%;' @error='imgErr'/>
							</view>

						</view>
					</view>
 
					<view :style="{ width:  picSet.width + 'rpx'}">
						<view v-for="(item, i) in dataArr" :key="i" class="pic" :style="{ width: container*2 + 'rpx', height: picSet.height*2 + 'rpx' }" :data='i'>
							<view :style="{width: item.picWidth*2 + 'rpx',height: item.picWidth*2 + 'rpx',top: item.top*2 + 'rpx',left: item.left*2 + 'rpx',overflow:'hidden','border-radius':'50%'}" @click='actorList(i)'>
								<img :src="item.avatar_url" style='width: 100%;height: 100%;' />
							</view>
						</view>
					</view>
				</view>
			</view>					
		</view>
		<van-popup :show="show" closeable @close="onClose" custom-style="height:100%;width:100%" close-icon-position="top-left">
			<actorList :_data1='msg' @change='change'></actorList>
		</van-popup>
	</view>
</template>

<script>
	import {
		positionSet
	} from "./positionSet";//图片随机大小和位置
	import actorList from './components/actorList.vue';
	export default {
		data() {
			return {
				container: 140,
				mainHeight: 0,
				show: false,
				picSet: {
					width: 0,
					// height: 0,
					animation: '',
					picType: 4
				},
				dataArr: [],
				msg: {
					target: 0, //目标current
					data: [],//传到子组件的数据
					copyWeChat: false ,//复制弹窗控制,
					getChatShow:true//提交弹窗控制
				}
			}
		},
		components: {
			actorList
		},

		methods: {
			imgErr(){
				console.log('erer');
			},
			actorList(index) { //头像弹窗
				this.msg.target = index;
				this.msg.data = this.dataArr;
				this.msg.getChatShow = true;
				this.msg.copyWeChat = false;
				this.show = true;
			},
			howMove(arr, len) {//头像移动控制
				this.picSet.animation = ''
				const getWindow = wx.getSystemInfoSync();
				const screenWidth = getWindow.windowWidth;
				if (len >= this.picSet.picType * 3) {
					this.picSet.width = Math.ceil(len / this.picSet.picType) * this.container * 2;
					this.picSet.height = getWindow.windowHeight / this.picSet.picType;
					// setTimeout(()=>{
					// 	this.picSet.animation = 'move ' + this.picSet.width / 160 + 's linear infinite';
					// },2000)
					
				} else {
					this.picSet.width = screenWidth;
					this.picSet.height = getWindow.windowHeight / this.picSet.picType;
					this.container = 120;
				}
				return positionSet(arr, this.picSet.height, this.container);
			},
			onClose() {//
				this.show = false;
	
			},
			change(res) {//搭讪提交后弹窗状态
				switch (res){
					case 0://关闭搭讪提交,微信号复制弹窗显示
						this.msg.getChatShow=false;
						this.msg.copyWeChat = true;
						break;
					case 1://关闭微信号复制
						this.show=false;
						this.msg.copyWeChat = false;
						this.getUserList();
						break;
					case 2:
						
						break;
					default:
						break;
				}
			},
			getUserList() { //主页用户列表
				uni.showLoading({
					title: '加载中...'
				})
				const url = '/users?page=1';
				this.$api.get(url).then((res) => {
					var arr = [];
					if (res.statusCode == 200) {
						for (var i = 0; i < 10; i++) {
							arr.push(...res.data.data);
							
							arr[i].avatar_url =
								'http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg';
						}
						this.msg.data = arr;
						this.dataArr = this.howMove(arr, arr.length);
						setTimeout(()=>{
							uni.hideLoading();
						},1000);
						
					}

				}).catch(err => {
					uni.showToast({
						title: '数据丢失了,请检查网络',
						icon: 'none',
						duration: 2000
					})
					console.log(err, 2);
				})
			}
		},
		computed: {
			arr1: {
				set: () => {

				},
				get: (e) => {
					return e.dataArr
				}
			}
		},
		mounted() {
			const getWindow = wx.getSystemInfoSync();
			this.mainHeight = getWindow.windowHeight;
			this.getUserList();
			
		},
		onLoad() {


		},
		onPullDownRefresh() {
			if (this.show) {
				return false;
			}
			this.picSet.animation='';
			this.getUserList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		overflow: hidden;
		position: fixed;
		background:linear-gradient(#793FD9,#3F2385);
		.bg {
			width: 100%;
			height: 100%;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
		}

		>view>view>view {
			overflow: hidden;
			float: left;

			.pic {
				float: left;
				position: relative;
			}
		}
		
	}
		.van-popup{
			background: rgba(0,0,0,.2)!important;
		}
	@keyframes move {
		0% {
			transform: translateX(0%)
		}

		50% {
			transform: translateX(-50%)
		}

		100% {
			transform: translateX(-100%)
		}
	}
</style>
