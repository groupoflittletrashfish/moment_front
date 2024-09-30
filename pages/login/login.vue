<template>
	<view class="father">
		<!-- 背景 -->
		<view>
			<image class="login_background" src="@/static/login_background.webp"></image>
		</view>
		<view class="container">
			<uni-easyinput class="in" v-model="username" placeholder="用户名"></uni-easyinput>
			<uni-easyinput class="in" type="password" v-model="password" placeholder="密码"></uni-easyinput>
			<button class="in submit_button" @click="login">login in</button>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		login
	} from '../../service/api/user.js'
	export default {
		data() {
			return {
				username: 'noname',
				password: '123',
				aaa: 'noname'
			}
		},
		methods: {
			login() {
				login({
					username: this.username,
					password: this.password
				}).then(data => {
					uni.setStorageSync('token', data.token)

					//直接获取一次用户的信息
					getUserInfo().then(usr => {
						uni.setStorageSync('user', usr)
						console.log(uni.getStorageSync('user'))
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}).catch(e => {
						console.error(e)
					})
				}).catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style>
	.father {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;

	}

	.container {
		padding: 5rpx;
		width: 90%;
		height: 30%;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.login_background {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 60%;
	}

	.in {
		margin: 10rpx 0;
		opacity: 70%;
	}

	.submit_button {
		font-size: smaller;
		height: 80rpx;
		line-height: 80rpx;
	}

	/* 未生效 */
	::v-deep .uni-input-input {
		height: 100px !important;
		line-height: 100px !important;
	}
</style>