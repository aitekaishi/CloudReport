<template>
	<view class="setting">
		<view class="none"></view>
		<!-- <uni-list>
			<uni-list-item @click='clear' title="清除缓存" note="清除后将无法恢复"></uni-list-item>
		</uni-list> -->
		<view class="none"></view>
		<uni-list>
			<uni-list-item @click='loginOut' title="退出登录" :note="note"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				note: ''
			};
		},
		components: {
			uniList,
			uniListItem
		},
		methods: {
			/* clear() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '清除缓存',
					success: function(res) {
						if (res.confirm) {
							console.log('clear')
							uni.showLoading()
							uni.clearStorageSync();
							_this.note = '当前授权登录账号：' + uni.getStorageSync('nickName')
							setTimeout(function() {
								uni.hideLoading()
							}, 400)
							setTimeout(function() {
								uni.showToast({
									title: '清除成功',
									icon: "success",
									duration: 1500
								})
							}, 500)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}, */
			loginOut() {
				let _this = this
				console.log('loginOut')
				uni.showModal({
					title: '提示',
					content: '退出登录',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading()
							uni.clearStorageSync();
							setTimeout(function() {
								uni.hideLoading()
								_this.note = '当前授权登录账号：' + uni.getStorageSync('nickName')
							}, 400)
							setTimeout(function() {
								uni.showToast({
									title: '退出登录成功',
									icon: "success",
									duration: 1500
								})
								uni.navigateTo({
									url: '../index/index'
								});
							}, 500)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		created() {
			this.note = '当前授权登录账号：' + uni.getStorageSync('nickName')
		}
	}
</script>

<style>
	.none {
		width: 100%;
		height: 10upx;
		background: #F9F9FB;
	}

	.uni-list:before,
	.uni-list:after,
	.uni-list-cell__container:after {
		background: #FFFFFF;
	}

	.setting {
		background: #F9F9FB;
		min-height: 100vh;
	}
</style>
