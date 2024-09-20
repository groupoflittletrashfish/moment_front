<template>
	<view class="container unified_color">
		<u-toast ref="uToast"></u-toast>
		<u-toast ref="uToast"></u-toast>
		<my-navigation @left_click="left_click" @right_click="right_click">提交</my-navigation>
		<!-- 内容实体框 -->
		<u--textarea class="textarea" v-model="content" placeholder="your idea" autoHeight height=100
			maxlength="200"></u--textarea>
		<view>


			<!-- 标签页 -->
			<scroll-view scroll-x="true">
				<view class="scroll-X">
					<tag data="添加" backgroundColor="#ff5500" style="display: inline;margin-left: 10rpx;"
						@click.native="addTag" v-show="!show_input" />
					<view style="display: inline-block;" class="input_container">
						<u--input v-model="desc" color="#fff" maxlength="10" class="newTag" fontSize="smaller"
							:adjustPosition="false" border="bottom" v-show="show_input" @blur="confirmTag" />
					</view>
					<tag :data="item.tag_desc" v-for="(item, index) in tags" :key="index"
						style="display: inline;margin-left: 10rpx" @click.native="add2Content(item)"></tag>
				</view>
			</scroll-view>


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
		publish,
		queryAllTags,
		addTag
	} from '../../service/api/moment';

	export default {
		data() {
			return {
				content: '',
				selected_photo: [],
				tags: [],
				desc: '',
				show_input: false
			}
		},
		mounted() {
			queryAllTags().then(data => {
				this.tags = data
			})
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
						maximum: 1 // 最大选择文件数
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
					if (file_path.length == 0) {
						this.$refs.uToast.show({
							'message': '发布时刻必须上传图片或视频'
						})
						return
					}
					publish({
						"momentDesc": this.getContent(),
						"tags": this.getTags(),
						"files": file_path
					})
					// 还原数据并关闭
					this.selected_photo = []
					this.content = ''
					uni.navigateBack()
				})
			},
			addTag() {
				if (this.isTagMaxLength()) {
					this.$refs.uToast.show({
						message: '最多添加5个标签'
					})
					return
				}
				this.show_input = true
			},
			add2Content(item) {
				if (this.isTagMaxLength()) {
					this.$refs.uToast.show({
						message: '最多添加5个标签'
					})
					return
				}
				let txt = '#' + item.tag_desc
				if (this.content.includes(txt)) {
					return
				}
				this.content = txt + ' ' + this.content
			},
			confirmTag() {
				if (this.isTagMaxLength()) {
					this.$refs.uToast.show({
						message: '最多添加5个标签'
					})
					return
				}
				addTag({
					'desc': this.desc
				}).then(data => {
					this.content = '#' + this.desc + ' ' + this.content
					this.show_input = false
					this.desc = ''
				})
			},
			isTagMaxLength() {
				const arr = this.content.split(' ')
				let count = 1
				arr.forEach(e => {
					if (e.startsWith('#')) {
						count += 1
					}
				})
				if (count > 5) {
					return true
				}
				return false
			},
			getContent() {
				const arr = this.content.split(' ')
				// 获取第一个不是#开头的字符串
				let firstValid = ''
				for (let item of arr) {
					if (item.startsWith('#')) {
						continue
					}
					firstValid = item
					break
				}
				if (undefined != firstValid && firstValid != '') {
					const index = this.content.indexOf(firstValid)
					let validContent = this.content.substring(index)
					return validContent
				} else {
					return ''
				}
			},
			getTags() {
				const arr = this.content.split(' ')
				let result = []
				arr.forEach(e => {
					if (e.startsWith('#')) {
						result.push(e.substring(1))
					}
				})
				return result
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
		position: relative;
	}

	.photo_container {
		display: flex;
		flex-direction: row;
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

	.scroll-X {
		margin: 10rpx 5rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		white-space: nowrap
	}

	.input_container {
		bottom: 0;
	}

	.newTag {
		display: inline;
		width: 200rpx;
		line-height: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
</style>