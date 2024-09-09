<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<my-navigation @left_click="left_click" @right_click="right_click">提交</my-navigation>
		<!-- 内容实体框 -->
		<u--textarea class="textarea" v-model="content" placeholder="your idea" autoHeight height=100
			maxlength="200"></u--textarea>
		<view>
			<view class="photo_container">
				<!-- 已选中照片 -->
				<view v-for="(item,index) in selected_photo" :key="index">
					<view class="photo_select" @longpress="remove_photo(index)">
						<image :src="item" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
				<!-- 永远有一个➕ -->
				<view class="photo_select add" @click="choose_photo">+</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uploadFile
	} from '../../service/api/file';
	import {
		publish
	} from '../../service/api/moment';

	export default {
		data() {
			return {
				content: '',
				selected_photo: []
			}
		},
		methods: {
			choose_photo() {
				let that = this
				plus.gallery.pick(
					function(e) {
						e.files.forEach(file => {
							try {
								that.selected_photo.push(file)
							} catch (e) {
								console.log(e)
							}
						});
					},
					function(e) {
						console.log('取消选择');
					}, {
						filter: 'none', // 可以设置为 'image'、'video' 或 'none' (不限制类型)
						multiple: true, // 支持多选
						system: false, // 使用系统UI（默认为false，使用自定义UI）
						maximum: 9 // 最大选择文件数
					}
				);
			},
			remove_photo(index) {
				this.selected_photo.splice(index, 1)
			},
			left_click() {
				uni.navigateBack()
			},
			right_click() {
				let file_path = []
				let pmss = []
				this.selected_photo.forEach(file => {
					let pms = uploadFile(file).then(data => {
						file_path.push(data)
					})
					pmss.push(pms)
				})
				// 等文件上传完以后调用发布接口
				Promise.all(pmss).then(data => {
					if (this.content.trim() === '' && file_path.length == 0) {
						this.$refs.uToast.show({
							'message': '文字和图片不能同时为空'
						})
						return
					}
					publish({
						"momentDesc": this.content,
						"files": file_path
					})
					// 还原数据并关闭
					this.selected_photo = []
					this.content = ''
					uni.navigateBack()
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 5rpx;
		box-sizing: border-box;
	}

	.photo_container {
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
	}

	.photo_select {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid grey;
	}

	.add {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5rpx;
	}

	.textarea {
		min-height: 250rpx;
	}
</style>