<template>
	<view>
		<view style="display: flex;flex-direction: row;align-items: center;box-sizing: border-box; padding: 0 30rpx;">
			<u--image :src="item.coverImg" width="60px" height="60px" radius="8px"></u--image>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: bolder;">{{item.name}}</view>
				<view style="font-size: smaller;color: grey;">
					<text >{{item.trackCount}}首·</text>
					<text>{{item.playCount}}次播放·</text>
					<text>{{item.creatorNickname}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "playlist",
		props: {
			item: {}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>