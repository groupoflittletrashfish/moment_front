<template>
	<view class="unified_color container">
		<scroll-view class="scroll_view" v-for="(item,index) in menus" :key="index">
			<menus-list :type_name="item.type_name" :list="item.list"></menus-list>
			<u-button style="margin: 10rpx 0;" text="月落" type="error" @click="logout">登出</u-button>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus: [{
					type_name: '媒体',
					list: [{
						'title': '网易云音乐绑定',
						'url': '/pages/wangyiyun_setting/wangyiyun_setting'
					}]
				}]
			}
		},
		methods: {
			logout() {
				uni.setStorageSync('token', '')
				uni.setStorageSync('user',{})
				uni.reLaunch({
					url: '/pages/login/login'
				}).catch(e=>{
					console.error(e)
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 10rpx;
	}

	.scroll_view {
		height: 100%;
	}
</style>