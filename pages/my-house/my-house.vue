<template>
	<view class="my-housea">
		<view class="my-house-title">
			<view class="my-house-title-left">请选择需要购买监理服务的房屋</view>
			<view class="my-house-title-right" @click="addHouse">
				<image src="http://lc-ndknejad.cn-n1.lcfile.com/825b9188abd531046199/icon_tiajia%402x.png" mode="widthFix"></image>
				<text>添加房屋</text>
			</view>
		</view>
		<view v-for="(item,index) in items" :key=index class="my-house-contain">
			<view class="my-house-contain-title">{{item.address}}</view>
			<view class="my-house-contain-titlea">您的姓名：{{item.name}}</view>
			<view class="my-house-contain-titlea">手机号码：{{item.phone}}</view>
			<view class="my-house-contain-titlea">房屋面积：{{item.area}}㎡</view>
			<view class="addhouse-add" @click="jianli(index)">
				{{serverName}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[],
				serverName:''
			}
		},
		methods: {
			jianli(index){
				uni.setStorageSync('jianli',uni.getStorageSync("supervisionHouse")[index])
				if (this.serverName == "购买全程监理服务") {
					uni.navigateTo({
						url: '../buy/buy'
					});
				}if (this.serverName == "购买验房服务") {
					uni.navigateTo({
						url: '../buy-yanfang/buy-yanfang'
					});
				}if (this.serverName == "购买节点验收服务") {
					uni.navigateTo({
						url: '../buy-jiedian/buy-jiedian'
					});
				}if (this.serverName == "购买前期审核服务") {
					uni.navigateTo({
						url: '../bu-qianqishenhe/bu-qianqishenhe'
					});
				}
			},
			addHouse(){
				uni.navigateTo({
					url: '../add-house/add-house'
				});
			}
		},
		created(){
			console.log(uni.getStorageSync('wodetiaozhuang'))
			this.items = uni.getStorageSync("supervisionHouse")
			this.serverName = uni.getStorageSync("supervisionName")
		},
		onUnload() {
			if (uni.getStorageSync('wodetiaozhuang') == 2) {
				uni.setStorageSync('activeIndex',2)
			} else{
				uni.setStorageSync('activeIndex',0)
			}
		}
	}
</script>

<style scoped="scoped">
.my-housea{
	padding: 24upx;
	background-color: #F8F9FB;
	min-height: 100vh;
}
.my-house-title{
	font-size: 24upx;
	color: #666666;
	display: flex;
	justify-content: space-between;
}
.my-house-title-right image{
	width: 20upx;
	margin-right: 10upx;
}
.my-house-title-right{
	background: #FFFFFF;
	padding: 10upx 20upx;
	border-radius: 12upx;
}
	
.my-house-title-left{
	position: relative;
	top:10upx;
}
.my-house-contain{
	width: 710upx;
	height: 462upx;
	background: #FFFFFF;
	border-radius: 12upx;
	box-sizing: border-box;
	margin: 0 auto;
	margin-top: 30upx;
	padding: 30upx 20upx;
}
.my-house-contain-title{
	font-size: 28upx;
	color: #333333;
	font-weight: 700;
	line-height: 65upx;
}
.my-house-contain-titlea{
	font-size: 28upx;
	color: #666666;
	line-height: 65upx;
}
.addhouse-add{
	background: #FF9900;
	color: #ffffff;
	width: 440upx;
	border-radius: 12upx;
	text-align: center;
	margin: 50upx auto;
	padding: 15upx;
}
</style>
