<template>
	<view class="container">
		<view class="background">
			<image src="../../static/image/fengmian.jpg" class="fengmian"></image>
		</view>
		<!-- 发布按钮 -->
		<uni-icons class="photo" type="camera-filled" size="30" @click="to_public_moment_view"></uni-icons>
	</view>
</template>

<script>
	import {
		uploadFile
	} from '../../service/api/file';
	export default {
		data() {
			return {

			}
		},
		methods: {
			to_public_moment_view(){
				uni.navigateTo({
					url:'/pages/publish_moment/publish_moment'
				})
			},
			selectPhoto() {
				
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: blanchedalmond;
		/* 去除标题栏高度 */
		/* padding-top: ; */
		box-sizing: border-box;
		position: relative;
	}

	.background {
		width: 100%;
		height: 30%;
		position: absolute;
		z-index: 1;
	}

	.photo {
		position: absolute;
		right: 10rpx;
		top: calc(var(--status-bar-height) + 5rpx);
		z-index: 99;
	}

	.fengmian {
		width: 100%;
		height: 100%;
	}
</style>