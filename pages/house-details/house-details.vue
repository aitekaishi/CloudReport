<template>
	<view class="my-house">
		<view class="myhouse">
			<view class="my-house-title">
				<view class="my-house-title-left">房屋基本信息</view>
				<view class="my-house-title-right" @click="addHouse">
					<image src="http://lc-ndknejad.cn-n1.lcfile.com/2c9cb98ea8622ea68aab/add.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="myhousea">
				房屋地址：{{address}}
			</view>
			<view class="myhouseb">
				您的姓名：{{name}}
			</view>
			<view class="myhouseb">
				手机号码：{{phone}}
			</view>
			<view class="myhouseb">
				房屋面积：{{area}}平方米
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:'',
				name:'',
				phone:'',
				area:''
			}
		},
		methods: {
			addHouse(){
				uni.navigateTo({
					url: '../change-house/change-house'
				});
			}
		},
		created() {
			var house = uni.getStorageSync('house-details')
			this.address = house[0].address
			this.name = house[0].name
			this.phone = house[0].phone
			this.area = house[0].area
			uni.setStorageSync('objectId',house[0].objectId)
		}
	}
</script>

<style scoped>
	.my-house{
		padding: 24upx;
		background-color: #F8F9FB;
		height: 100vh;
		overflow-y: hidden;
	}
.my-house-title{
	font-size: 24upx;
	color: #666666;
	display: flex;
	justify-content: space-between;
}
.my-house-title-right image{
	width: 40upx;
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
	font-size: 28upx;
	color: #333333;
}
.myhouse{
	width: 710upx;
	height: 500upx;
	box-sizing: border-box;
	padding:20upx;
	background: #FFFFFF;
	margin-top: 10upx;
	border-radius: 12upx;
	}
	.myhousea{
		font-size: 28upx;
		color: #333333;
		line-height: 70upx;
	}
	.myhouseb{
		font-size: 28upx;
		color: #666666;
		line-height: 70upx;
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
