<template>
	<view class="content" :style="{height:height+'rpx'}">
		<view class="main">
			<van-image round width="152rpx" height="152rpx" src="../../../../static/homeNew/1.png" class='t1'/>
			<van-image round width="152rpx" height="152rpx" src="../../../../static/homeNew/2.png" class='t2'/>
			<van-image round width="152rpx" height="152rpx" src="../../../../static/homeNew/3.png" class='t3'/>
			<van-image round width="152rpx" height="152rpx" src="../../../../static/homeNew/4.png" class='t4'/>
			<van-image round width="152rpx" height="152rpx" src="../../../../static/homeNew/5.png" class='t5'/>
			<van-image round width="152rpx" height="152rpx" src="../../../../static/homeNew/6.png" class='t6'/>
			<image src="../../static/homeNew/star.png" class="star"></image>
			<view class="point">
				<image src="../../static/homeNew/8.png"></image>
			</view>
		</view>
		<button @click="nextData">换一批</button>
		<image src="../../static/homeNew/7.png"></image>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				height:0
			}
		},
		components: {
			
		},

		methods: {
			nextData(){
				console.log('nextData');
			}
		},
		computed: {
			
		},
		mounted() {
			this.height=uni.getSystemInfoSync().windowHeight*2;
			
		},
		onLoad() {


		}
		
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		background:radial-gradient(#A55BF1,#07121E);
		overflow: hidden;
		position: fixed;
		.main{
			width: 100%;
			height:710rpx;
			margin:84rpx auto 104rpx;
			position: relative;
			van-image{
				position: absolute;
			}
			.star{
				width: 200rpx;
				height:200rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				right: 50%;
				bottom: 50%;
				margin: -100rpx;
			}
			.point{
				width:152rpx;
				height: 152rpx;
				position: absolute;
				top:152rpx;
				right: 48rpx;
				border-radius: 50%;
				background:rgba(0,0,0,.3);
				overflow: hidden;
				image{
					width: 60rpx;
					height: 60rpx;
					display: block;
					margin:46rpx;
					animation: move 2s ease-in-out infinite;
				}
				
			}
			.t1,.t4{
				left:48rpx;
			}
			.t3,.t6{
				right:48rpx;
			}
			.t1,.t3{
				top:152rpx;
			}
			.t4,.t6{
				bottom:152rpx;
			}
			.t2,.t5{
				left:300rpx;
			}
			.t2{
				top: 0;
			}
			.t5{
				bottom: 0;
			}
		}
		button{
			width:320rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 36rpx;
			font-weight: 500;
			color: white;
			background: linear-gradient(90deg,#7840F6 0%,#B464EF 100%);
			border-radius: 54rpx;
		}
		>image{
			width: 670rpx;
			height:172rpx;
			display: block;
			position: absolute;
			bottom:100rpx;
			left:42rpx;
		}
	}
	@keyframes move {
		0% {
			transform: scale(1)
		}
	
		50% {
			transform: scale(1.5)
		}
	
		100% {
			transform: scale(1)
		}
	}
</style>
