<template>
	<view class="container">
		<uni-icons type="left" size="30" @click="left_click"></uni-icons>
		<view>
			<button class="btn" size="success" type="default" @click="right_click">
				<slot></slot>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my_navigation",
		data() {
			return {

			};
		},
		methods: {
			left_click() {
				this.$emit("left_click");
			},
			right_click() {
				this.$emit('right_click')
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: var(--status-bar-height);
		margin-top: var(--status-bar-height);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.btn {
		padding: 0 10rpx;
		height: calc(var(--status-bar-height) - 40rpx) !important;
		line-height: calc(var(--status-bar-height) - 40rpx);
		background-color: limegreen;
		margin-right: 15rpx;

	}
</style>