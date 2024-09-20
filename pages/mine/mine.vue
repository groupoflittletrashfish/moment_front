<template>
	<view class="container unified_color">
		<view class="background">
			<image src="../../static/image/fengmian.jpg" class="fengmian"></image>
			<!-- 头像及签名等信息 -->
			<view class="avatar_container">
				<!-- 头像 -->
				<u-avatar :src="user.avatar" class="avatar" size="200"></u-avatar>
				<!-- 信息 -->
				<view class="desc">
					<view class="nickname">{{user.nickname}}</view>
					<view class="sign">{{user.sign}}</view>
				</view>
			</view>
		</view>
		<uni-icons class="gear" type="gear" size="30" @click="toSettingsView"></uni-icons>
	</view>
</template>

<script>
	import {
		uploadFile
	} from '../../service/api/file';
	import {
		getUserInfo
	} from '../../service/api/user.js';
	export default {
		data() {
			return {
				user: {
					type: Object
				}
			}
		},
		mounted() {
			getUserInfo().then(data => {
				const json = JSON.parse(data)
				this.user = json
				uni.setStorageSync('user', json)
			})
		},
		methods: {
			selectPhoto() {

			},
			toSettingsView(){
				console.info(11111)
				uni.navigateTo({
					url: '/pages/settings/settings'
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
		/* 去除标题栏高度 */
		/* padding-top: ; */
		box-sizing: border-box;
		position: relative;
	}

	.background {
		width: 100%;
		height: 35%;
		position: absolute;

	}
	
	.gear{
		position: absolute;
		right: 10rpx;
		top: calc(var(--status-bar-height) + 5rpx);
		z-index: 99;
	}

	.fengmian {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.avatar_container {
		z-index: 10;
		position: absolute;
		top: calc(50% - 100rpx);
		left: calc(50% - 40%);
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		width: 80%;
		
	}

	.nickname {
		margin-top: 20rpx;
		font-size: large;
		font-weight: bolder;
	}
	
	.sign{
		font-size: smaller;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		width: 100%;
	}
	
	.desc{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: inherit;
	}
</style>