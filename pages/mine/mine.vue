<template>
	<view class="container1 unified_color">
		<u-toast ref="uToast"></u-toast>
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

		<!-- tab -->
		<view style="display: flex;flex-direction: row;z-index: 1000;width: 100%;margin: 5rpx 10rpx;">
			<u-tabs :list="menuTabs" :activeStyle="{
				    color: 'white',
				    fontWeight: 'bolder',
				    transform: 'scale(1.05)'
				}" lineWidth="80" lineColor="#f56c6c" :inactiveStyle="{
				    color: 'white',
				    transform: 'scale(1)'
				}" itemStyle="padding-left: 10rpx; padding-right: 15px; height: 34px;" @change="changeTab" />
		</view>



		<!-- 歌单tab页 -->
		<view style="flex:1;padding: 0 5rpx;box-sizing: border-box;">
			<z-paging :fixed="false" ref="paging" v-model="playlist" class="scroll" v-show="currentPlayListIndex==1"
				@query="loginNeteastCloud">
				<view v-for="(item,index) in playlist" :key="index">
					<playlist :item="item" style="margin: 10rpx 0;" @click.native="toSong(item)"></playlist>
				</view>
			</z-paging>
		</view>
	</view>
</template>

<script>
	import {
		uploadFile
	} from '../../service/api/file';
	import {
		getUserInfo
	} from '../../service/api/user.js';
	import neteaseHttp from '../../service/neteaseCloud.js';

	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				menuTabs: [{
						name: '我的分享'
					},
					{
						name: '我的歌单'
					}
				],
				currentPlayListIndex: 0,
				isNeteaseCloudBind: true,
				playlist: []
			}
		},
		mounted() {
			this.checkNeteaseCloudBind()
			this.loginNeteastCloud()
		},
		methods: {
			selectPhoto() {
				this.isNeteaseCloudBind = this.checkNeteaseCloudBind()
			},
			changeTab(item) {
				this.currentPlayListIndex = item.index
			},
			toSettingsView() {
				uni.navigateTo({
					url: '/pages/settings/settings'
				}).catch(e => {
					console.error(e)
				})
			},
			checkNeteaseCloudBind() {
				const user = uni.getStorageSync('user')
				const phone = user['netease_cloud_phone']
				const password = user['netease_cloud_password']
				if (phone == '' || password == '') {
					return false
				}
				return true
			},
			async loginNeteastCloud() {
				if (!this.isNeteaseCloudBind) {
					this.$refs.uToast.show({
						'message': '未绑定网易云'
					})
					return
				}
				//检查登录状态
				await neteaseHttp.get('/login/status', {}, (res) => {
					console.log(res)
					const status = res.data.account.status
					//未登录状态则登录
					if (status === -10) {
						console.info('网易云音乐未登录')
						const user = uni.getStorageSync('user')
						const phone = user['netease_cloud_phone']
						const password = user['netease_cloud_password']
						neteaseHttp.get('/login/cellphone', {
							'phone': phone,
							'password': password
						}, (data) => {
							//登录成功不做任何处理，但是一旦失败则报错，逻辑还没有

						})
					}
					//缓存网易云音乐的用户ID
					uni.setStorageSync('netease_cloud_user_id', res.data.account.id)
				})
				//登录完成以后获取歌单
				await neteaseHttp.get('/user/playlist', {
					'uid': uni.getStorageSync('netease_cloud_user_id')
				}, res => {
					//此处网易返回的一个字段是more,推测是分页，暂时未处理
					const playlist = res.playlist
					if (playlist) {
						let arr = []
						playlist.forEach(e => {
							const creator = e.creator
							arr.push({
								'name': e.name,
								'id': e.id,
								'coverImg': e.coverImgUrl,
								'describe': e.describe,
								'creatorNickname': creator.nickname,
								'creatorAvatar': creator.avatarUrl,
								'creatorBackground': creator.backgroundUrl,
								'creatorId': creator.userId,
								// 播放次数
								'playCount': e.playCount,
								// 歌曲总数
								'trackCount': e.trackCount,
							})
						})
						this.$refs.paging.setLocalPaging(arr);
					}

					console.log(this.playlist)
				})
			},
			toSong(item) {
				uni.navigateTo({
					url: `/pages/song_list/song_list?data=${encodeURIComponent(JSON.stringify(item))}`,
				})
			}
		}
	}
</script>

<style>
	.container1 {
		width: 100%;
		height: 100%;
		/* 去除标题栏高度 */
		/* padding-top: ; */
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.background {
		width: 100%;
		height: 35%;
		background-color: blue;
		position: relative;
	}

	.gear {
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

	.sign {
		font-size: smaller;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		width: 100%;
	}

	.desc {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: inherit;
	}


	.u-tabs__line {
		width: auto !important;
		/* 确保宽度自动调整 */
		left: 0 !important;
		/* 确保对齐到左边 */
	}

	/deep/ .u-tabs__wrapper__nav__line {
		left: 25rpx;
	}
</style>