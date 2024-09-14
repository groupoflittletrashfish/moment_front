<template>
	<view class="unified_color container">
		<scroll-view class="scroll_view" v-for="(item,index) in menus" :key="index">
			<menus-list :type_name="item.type_name" :list="item.list"></menus-list>
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
						'url':'/pages/wangyiyun_setting/wangyiyun_setting'
					}]
				}]
			}
		},
		methods: {

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