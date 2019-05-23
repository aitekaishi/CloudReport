<template>
	<view class="nohouse">
		<image src="http://lc-ndknejad.cn-n1.lcfile.com/0f96015edd90fecab225/nohouse.png" mode="widthFix"></image>
		<view class="addhouse">
			<image src="http://lc-ndknejad.cn-n1.lcfile.com/a3520686a1c08b4c3dbe/addhouse.png" mode="widthFix" @click="addHouse"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			addHouse(){
				uni.navigateTo({
					url: '../add-house/add-house'
				});
			}
		},
		created() {
			console.log('没有房屋')
		}
	}
</script>

<style scoped>
	.nohouse{
		background: #F9F9FB;
		min-height: 100vh;
	}
.nohouse image{
	width: 100vw;
}
.addhouse{
	position: fixed;
	bottom: 0;
	height: 90upx;
} 
</style>
