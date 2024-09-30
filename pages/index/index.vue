<template>
	<view class="container">
		<!-- 吸顶和tabs -->
		<u-sticky bgColor="#ffffff">
			<view class="unified_color tabs">
				<u-tabs :list="tabs" :activeStyle="{
				    color: 'white',
				    fontWeight: 'bolder',
				    transform: 'scale(1.05)',
					fontSize:'large'
				}" lineWidth="60" lineColor="#f56c6c" :inactiveStyle="{
				    color: 'white',
				    transform: 'scale(1)',
					fontSize:'large'
				}" @change="change_tab">

					<!-- 发布按钮 -->
					<view slot="right">
						<uni-icons type="camera-filled" color="#fff" size="30" class="photo" @click="toPublicMomentView"
							style="margin-right: 10rpx;">
						</uni-icons>
					</view>
				</u-tabs>
			</view>

		</u-sticky>


		<!-- 瀑布流 -->
		<view v-show="index == 0" class="template_container">
			<z-paging :fixed="false" ref="paging" v-model="list" @query="queryList" class="scroll">
				<view class="left">
					<view v-for="(item,index) in list" :key="index">
						<pubuliu-list v-if="index% 2==0" :url="item.url" num="1" :title="item.title" :name="item.name"
							:avatar="item.avatar" :tags="item.tags"></pubuliu-list>
					</view>
				</view>
				<view class="right">
					<view v-for="(item,index) in list" :key="index">
						<pubuliu-list v-if="index% 2==1" :url="item.url" num="1" :title="item.title" :name="item.name"
							:avatar="item.avatar" :tags="item.tags"></pubuliu-list>
					</view>
				</view>
			</z-paging>
		</view>

		<!-- 时光 -->
		<view class="unified_color" v-show="index== 1">
			<u-scroll-list :indicator="false" class="scroll_list">
				<view v-for="(item, index) in time_scroll_list" :key="index">
					<view class="scroll_item">{{item.name}}</view>
				</view>
			</u-scroll-list>
		</view>
	</view>
</template>

<script>
	// import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import {
		queryAllMoment
	} from '../../service/api/moment'


	export default {
		mounted() {
			// this.load_moment()
		},
		// mixins: [ZPMixin],
		data() {
			return {
				tabs: [{
					'name': '广场'
				}, {
					'name': '时光'
				}],
				index: 0,
				list: [],
				time_scroll_list: [{
					'name': '心情'
				}, {
					'name': '歌单'
				}]
			}
		},
		methods: {
			change_tab(item) {
				this.index = item.index
			},
			toPublicMomentView() {
				uni.navigateTo({
					url: '/pages/publish_moment/publish_moment'
				})
			},
			queryList(pageNo, pageSize) {
				queryAllMoment({
					'index': pageNo,
					'offset': pageSize
				}).then(data => {
					let tmp = []
					data.forEach(obj => {
						if (obj['momentMedia']) {
							obj['momentMedia'].forEach(e => {
								tmp.push({
									'url': e,
									'title': obj['momentDesc'],
									'avatar': obj['avatar'],
									'name': obj['nickname'],
									'tags': JSON.parse(obj['momentTag'])
								})
							})
						}
					})
					this.$refs.paging.complete(tmp);
				}).catch(e => {
					this.$refs.paging.complete(false);
				})
			}
		}
	}
</script>

<style>
	.container {
		text-align: justify;
		box-sizing: border-box;
		padding-top: var(--status-bar-height);
		height: 100%;
		display: flex;
		flex-direction: column;
	}


	.left,
	.right {
		display: inline-block;
		vertical-align: top;
		width: 49%;
	}

	.scroll {
		flex: 1;
		height: inherit;
		width: 100%;
	}

	.template_container {
		height: calc(100% - 50rpx);
	}

	.scroll_list {
		height: 120rpx;
		padding: 10rpx 10rpx;
	}

	.scroll_item {
		width: 80rpx;
		margin: 10rpx 10rpx;
		border-radius: 10rpx;
		background-color: #24242C;
		text-align: center;
	}

	.photo {
		/* top: calc(var(--status-bar-height) + 5rpx + 35%); */
		/* 	z-index: 99;
		background-color: blue; */
	}


	/deep/ .u-tabs__wrapper__nav__line {
		left: 25rpx;
	}

	/* 	.tabs{
		background-color: red;
		flex:1;
		display: inline-block;
	} */
</style>