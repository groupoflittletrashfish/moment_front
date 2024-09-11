<template>
	<view class="container">
		<!-- 吸顶和tabs -->
		<u-sticky bgColor="#ffffff">
			<u-tabs :list="tabs" class="unified_color" :activeStyle="{
            color: '#000000',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }" lineWidth="60" lineColor="#f56c6c" :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }"></u-tabs>
		</u-sticky>


		<!-- 瀑布流 -->
		<view v-show="index == 1" class="template_container">
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
				}],
				index: 1,
				list: []
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

	/deep/ .u-tabs__wrapper__nav__line {
		left: 25rpx;
	}
</style>