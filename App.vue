<script>
	export default {
		onLaunch: function() {
			if (uni.getStorageSync('token')) {
				uni.reLaunch({
					url: '/pages/index/index',
					success() {
						plus.navigator.closeSplashscreen()
					}
				})
			} else {
				uni.reLaunch({
					url: '/pages/login/login',
					success() {
						plus.navigator.closeSplashscreen()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import "@/uni_modules/uview-ui/index.scss";
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: rgb(27, 27, 37);
		height: 100%;
		width: 100%;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	.unified_color {
		background-color: rgb(27, 27, 37);
		color: white;
	}
	
	.unified_container{
		width: 100%;
		height: 100%;
		padding: 0 5rpx;
		box-sizing: border-box;
	}
</style>