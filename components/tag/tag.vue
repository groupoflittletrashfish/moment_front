<template>
	<view>
		<text :contenteditable="contenteditable" class="text"
			:style="{backgroundColor:backgroundColor,fontSize:fontSize}">{{data}}</text>
	</view>
</template>

<script>
	export default {
		name: "tag",
		data() {
			return {

			};
		},
		props: {
			data: '',
			contenteditable: {
				type: Boolean,
				default: false
			},
			backgroundColor: {
				type: String,
				default: 'seagreen'
			},
			fontSize: {
				type: String,
				default: 'smaller'
			}
		}
	}
</script>

<style>
	.text {
		height: 5rpx;
		line-height: 5rpx;
		background-color: seagreen;
		border-radius: 12rpx;
		/* font-size: smaller; */
		box-sizing: border-box;
		padding: 2rpx 4rpx;
	}
</style>