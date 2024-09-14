<template>
	<view class="container">
		<!-- 吸顶和tabs -->
		<u-sticky bgColor="#ffffff">
			<u-tabs :list="tabs" class="unified_color" :activeStyle="{
            color: 'white',
            fontWeight: 'bolder',
            transform: 'scale(1.05)',
			fontSize:'large'
        }" lineWidth="60" lineColor="#f56c6c" :inactiveStyle="{
            color: 'white',
            transform: 'scale(1)',
			fontSize:'large'
        }" @change="change_tab"></u-tabs>
		</u-sticky>


		<!-- 瀑布流 -->
		<view v-show="index == 0" class="template_container">
			<scroll-view class="scroll" scroll-y show-scrollbar @refresherrefresh="refresh">
				<view class="left">
					<view v-for="(item,index) in list" :key="index">
						<pubuliu-list v-if="index% 2==0" :url="item.url" num="1" :title="item.title" :name="item.name"
							:avatar="item.avatar"></pubuliu-list>
					</view>
				</view>
				<view class="right">
					<view v-for="(item,index) in list" :key="index">
						<pubuliu-list v-if="index% 2==1" :url="item.url" num="1" :title="item.title" :name="item.name"
							:avatar="item.avatar"></pubuliu-list>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 时光 -->
		<view class="unified_color">
			<u-scroll-list :indicator="false" class="scroll_list">
				<view v-for="(item, index) in time_scroll_list" :key="index">
					<view class="scroll_item">{{item.name}}</view>
				</view>
			</u-scroll-list>
		</view>
	</view>
</template>

<script>
	import {
		queryAllMoment
	} from '../../service/api/moment'


	export default {
		mounted() {
			this.load_moment()
		},
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
			refresh() {
				this.load_moment()
			},
			load_moment() {
				queryAllMoment().then(data => {
					this.list = []
					let arr = JSON.parse(data)
					arr.forEach(obj => {
						if (obj['momentMedia']) {
							obj['momentMedia'].forEach(e => {
								this.list.push({
									'url': e,
									'title': obj['momentDesc'],
									'avatar': obj['avatar'],
									'name': obj['nickname']
								})
							})
						}
					})
				}).catch(e => {
					console.error(e)
				})
			},
			change_tab(item) {
				this.index = item.index
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
	}

	.template_container {
		flex: 1;
		height: calc(100% - 50rpx);
	}
	
	.scroll_list{
		height: 120rpx;
		padding: 10rpx 10rpx;
	}
	
	.scroll_item{
		width: 80rpx;
		margin: 10rpx 10rpx;
		border-radius: 10rpx;
		background-color: #24242C;
		text-align: center;
	}

	/deep/ .u-tabs__wrapper__nav__line {
		left: 25rpx;
	}
</style>