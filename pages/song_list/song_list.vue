<template>
	<view class="unified_container unified_color" style="display: flex;flex-direction: column;">
		<view style="margin-left: 30rpx;display: flex;flex-direction: row;">
			<u--image :src="item.coverImg" width="100px" height="100px" radius="14px"></u--image>
			<view style="display: flex;flex-direction: column;margin-left: 30rpx;">
				<text style="font-size: smaller;margin-top: 10rpx;font-weight: bold;">{{item.name}}</text>
				<view style="display: flex;flex-direction: row;margin-top: 10rpx;">
					<u-avatar :src="item.creatorAvatar"></u-avatar>
					<text style="font-size: small;margin-left: 10rpx;">{{item.creatorNickname}}</text>
				</view>
			</view>
		</view>

		<!-- 歌单列表 -->
		<view style="flex: 1;box-sizing: border-box;padding: 10rpx 5rpx;">
			<z-paging :fixed="false" ref="paging" v-model="songList" class="scroll" @query="loadSongs"
				default-page-size="2000" :refresher-enabled="false">
				<view v-for="(item,index) in songList" :key="index">
					<view style="display: flex;flex-direction: row;align-items: center;height: 100rpx;margin: 15rpx 0;">
						<!-- 序号 -->
						<view style="width:80rpx ;text-align: center;">{{index + 1}}</view>
						<!-- 歌名 -->
						<view style="width: calc(100% - 80rpx - 60rpx)">
							<view
								style="display: flex;flex-direction: row;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
								<text>{{item.name}}</text>
								<text v-if="item.alia && item.alia.length>0" style="color: darkgrey;">
									({{item.alia[0]}})
								</text>
							</view>
							<!-- 标签及歌手 -->
							<view class="extra">
								<view>
									<!-- 需要先判断是否有音源 -->
									<view v-if="item.noCopyrightRcmd" style="display: flex;flex-direction: row;">
										<view v-show="item.vip === 1" class="tag"
											style="color: red;border-color: rgba(255, 0, 0, 0.5)"> VIP </view>
										<view v-show="item.vip === 1" class="tag"
											style="color: red;border-color: rgba(255, 0, 0, 0.5)"> 试听 </view>
										<view v-show="item.hr ||item.sq" class="tag"
											style="color: gold;border-color: rgba(255, 127, 36, 0.5)"> 超清母带 </view>
										<view v-show="!item.hr && !item.sq && item.h" class="tag"
											style="color: gold;border-color: rgba(255, 127, 36, 0.5)"> 沉浸式 </view>
									</view>
									<view v-else>
										<view class="tag"> 无音源 </view>
									</view>
								</view>
								<text style="font-size: small;color: grey;">{{item.arName}} - </text>
								<text style="font-size: small;color: grey;">{{item.alName}}</text>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<!-- 播放状态框 -->
		<view style="height: 10%;">
			<u-popup mode="bottom" :overlay="false" show>
				<view style="color: black;height: 100%;">111111111</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import neteaseHttp from '../../service/neteaseCloud.js';
	export default {
		onLoad(options) {
			this.item = JSON.parse(decodeURIComponent(options.data));
		},
		data() {
			return {
				item: {},
				songList: []
			}
		},
		methods: {
			loadSongs() {
				neteaseHttp.get('/playlist/detail', {
					'id': this.item.id
				}, data => {
					console.info(data)
					if (data.playlist.tracks) {
						let arr = []
						data.playlist.tracks.forEach(e => {
							arr.push({
								'id': e.id,
								'name': e.name,
								'alia': e.alia,
								// 歌手ID
								'arId': e.ar[0].id,
								// 歌手名字
								'arName': e.ar[0].name,
								// 0: 免费  1: 2元购买单曲  4: 购买专辑  8: 低音质免费
								'vip': e.fee,
								//专辑ID
								'alId': e.al.id,
								//专辑名称
								'alName': e.al.name,
								//是否超清母带
								'hr': e.hr ? true : false,
								'sq': e.sq ? true : false,
								'h': e.h ? true : false,
								//是否可播,null为可播放，非null的情况下type:2也可以播
								'noCopyrightRcmd': e.noCopyrightRcmd == null || e.noCopyrightRcmd
									.type === 2
							})
						})

						this.$refs.paging.setLocalPaging(arr);
					}
				})
			}
		}
	}
</script>

<style>
	.extra {
		display: flex;
		flex-direction: row;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}


	.tag {
		border: 1rpx solid grey;
		font-size: 16rpx;
		color: grey;
		font-weight: bold;
		padding: 0 8rpx;
		margin-right: 7rpx;
	}
</style>