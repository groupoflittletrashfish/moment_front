<template>
	<view>
		<view class="unified_color">
			<view class="label">{{type_name}}</view>
			<view class="list" v-for="(item,index) in list" :key="index" @click="toSetting(item.url)">
				<view>{{item.title}}</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "menus-list",
		data() {
			return {

			};
		},
		props: {
			type_name: '',
			list: {
				type: Array
			}
		},
		methods:{
			toSetting(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.label {
		font-size: small;
		color: grey;
	}

	.list {
		background-color: #24242C;
		margin: 5rpx 0;
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>