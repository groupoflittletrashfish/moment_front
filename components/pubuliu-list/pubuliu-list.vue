<template>
	<view class="item unified_color">
		<image class="item-img" :src="url" mode="widthFix" @click="preview" v-if="!show"></image>
		<!-- 标签 -->
		<view class="tags_container">
			<tag v-for="(item,index) in tags" :key="index" :data="item" fontSize="20rpx" class="tag"></tag>
		</view>
		<view class="item-title-box"> </view>
		<view url="url" class="item-title" v-show="title">{{title}}</view>
		<view class="name">
			<image class="item-ava" :src="avatar"></image>
			<text class="name-title">{{name}}</text>
			<view class="heart">
				<text>{{num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			url: '',
			title: '',
			name: '',
			num: '',
			avatar: '',
			tags: {
				type: Array,
				default: () => []
			}
		},
		mounted() {
			const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
			const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
			const extension = this.url.split('.').pop().toLowerCase();
			if (imageExtensions.includes(extension)) {
				this.media_type = 'image'

			}
			if (videoExtensions.includes(extension)) {
				this.media_type = 'video'
			}
		},
		data() {
			return {
				media_type: 'image',
				show: false
			}
		},
		methods: {
			preview() {
				if (this.media_type === 'image') {
					uni.previewImage({
						urls: [this.url]
					})
				}
				if (this.media_type === 'video') {
					// this.show = true
					// let videoContext = uni.createVideoContext('url', this)
					// videoContext.requestFullScreen({
					// 	'direction': 0
					// })
					const videoPlayer = plus.video.createVideoPlayer(this.url, {
						"src": this.url, // 视频地址
						"autoplay": true,
						"controls": true,
						"show-progress": true,
						"loop": true,
						"show-center-play-btn": false, // 是否显示中央播放按钮
						"show-fullscreen-btn": false, // 是否显示全屏按钮
						"show-play-btn": false, // 是否显示播放按钮
					});
					videoPlayer.requestFullScreen(0)
					videoPlayer.play()
					videoPlayer.addEventListener('fullscreenclick', function(e) {
						//点击屏幕就退出全屏
						videoPlayer.exitFullScreen()
					})
				}
			},
			// play() {
			// 	console.log(3333)
			// 	this.videoContext.requestFullScreen()
			// }
		}
	}
</script>

<style>
	.item {
		margin: 10rpx 3%;
		margin-bottom: 20rpx;
		display: inline-block;
		width: 96%;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.item-ava {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
	}

	.heart {
		width: 30rpx;
		height: 26rpx;
		margin-right: 8rpx;
	}

	.heart {
		display: flex;
		align-items: center;
	}

	.item-img {
		width: 100%;
	}

	.item-title {
		font-size: 24rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-family: 'PingFang SC-Medium';
		margin: 15rpx;
		line-height: 27rpx;
		color: white;
	}

	.item .name {
		display: flex;
		padding: 0 15rpx;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
		align-items: center;
		font-size: 22rpx;
		color: white;
		font-family: 'PingFang SC-Medium';
	}

	.name image {
		flex: 0 0 auto;
	}

	.item-title-box {
		display: flex;
		position: relative;
	}

	.name-title {
		flex: 1;
		margin-left: 18rpx;
		margin-right: 20rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		color: white;
	}

	.name text:last-child {
		color: #c4c4c4;
		text-decoration: underline;
		line-height: 10rpx;

	}

	.tags_container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		width: 96%;
		
	}
	
	.tag{
		margin: 0 5rpx;
	}
</style>