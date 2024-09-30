<template>
	<view class="unified_container">
		<view class="custom-blockquote" style="font-size: smaller;color: #8a8a8a;;margin-left: 10rpx;">绑定网易云音乐
		</view>
		<u--input placeholder="手机号" border="bottom" v-model="phone" @blur="uptNetease" clearable autoBlur color="white"
			style="margin: 10rpx 0;"></u--input>
		<u--input placeholder="密码" border="bottom" v-model="password" @blur="uptNetease" type="password" color="white"
			clearable password autoBlur></u--input>
	</view>
</template>

<script>
	import {
		getUserInfo,
		uptNeteaseCloud
	} from '../../service/api/user'
	export default {
		mounted() {
			let user = uni.getStorageSync('user')
			this.phone = user['netease_cloud_phone']
			this.password = user['netease_cloud_password']
		},
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		methods: {
			uptNetease() {
				uptNeteaseCloud({
					'phone': this.phone,
					'password': this.password
				}).then(data => {
					getUserInfo().then(usr => {
						uni.setStorageSync('user', usr)
					}).catch(e => {
						console.error(e)
					})
				})
			}
		}
	}
</script>

<style>
	.custom-blockquote {
		border-left: 6px solid #42b983;
		padding: 5rpx 10rpx;
		margin: 20px 0;
		color: #333;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>