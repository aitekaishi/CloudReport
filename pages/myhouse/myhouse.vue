<template>
	<view class="my-house">
		<view class="my-house-title">
			<view class="my-house-title-left">您已经添加了{{number}}套房屋</view>
			<view class="my-house-title-right" @click="addHouse">
				<image src="http://lc-ndknejad.cn-n1.lcfile.com/825b9188abd531046199/icon_tiajia%402x.png" mode="widthFix"></image>
				<text>添加房屋</text>
			</view>
		</view>
		<view class="myhouse" v-for="(item,index) in items" :key=index>
			<view class="myhousea">
				{{item.address}}
			</view>
			<view class="myhouseb">
				您的姓名：{{item.name}}
			</view>
			<view class="myhouseb">
				手机号码：{{item.phone}}
			</view>
			<view class="myhouseb">
				房屋面积：{{item.area}}㎡
			</view>
			<view class="myhouseb">
				全程监理服务：<text @click="jianli(index)">立即购买</text>
			</view>
			<view class="myhouseb myhousebb">
				验房服务：<text @click="yanfang(index)">立即购买</text>
			</view>
			<view class="myhouseb">
				前期审核服务：<text @click="qianqishenhe(index)">立即购买</text>
			</view>
			<view class="myhouseb">
				节点验收服务：<text @click="jiedianyanshou(index)">立即购买</text>
			</view>
			<view class="addhouse-add" @click="submit(index)">
				查看房屋信息
			</view>
		</view>
	</view>
</template>

<script>
	import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
	export default {
		data() {
			return {
				number:'',
				items:[]
			}
		},
		onShow() {
		},
		onUnload() {
			console.log(uni.getStorageSync('qqqq'))
			console.log(uni.getStorageSync('index'))
			if (uni.getStorageSync('qqqq') == 1) {
				uni.removeStorageSync('qqqq')
				if (uni.getStorageSync('index') == 0) {
					uni.reLaunch({
						url: '../index/index'
					});
					uni.setStorageSync('activeIndex',0)
				} else if (uni.getStorageSync('index') == 1) {
					uni.reLaunch({
						url: '../index/index'
					});
					uni.setStorageSync('activeIndex',2)
				} else if (uni.getStorageSync('index') == 2) {
					uni.navigateTo({
						url: '../housekeep-server/housekeep-server'
					});
					uni.setStorageSync('activeIndex',0)
				} else if (uni.getStorageSync('index') == 3) {
					uni.navigateTo({
						url: '../housekeep-server/housekeep-server'
					});
					uni.setStorageSync('activeIndex',1)
				} else if (uni.getStorageSync('index') == 4) {
					uni.navigateTo({
						url: '../housekeep-server/housekeep-server'
					});
					uni.setStorageSync('activeIndex',2)
				} else if (uni.getStorageSync('index') == 5) {
					uni.navigateTo({
						url: '../housekeep-server/housekeep-server'
					});
					uni.setStorageSync('activeIndex',3)
				} else if (uni.getStorageSync('index') == 6) {
					uni.navigateTo({
						url: '../huanbao/huanbao'
					});
				} else if (uni.getStorageSync('index') == 7) {
					uni.navigateTo({
						url: '../jiazhuangxian/jiazhuangxian'
					});
				}
			}
		},
		created() {
			let _this = this;
			var queryaaa = new leanCloud.Query('MyHouse');
			queryaaa.equalTo('user',leanCloud.User.current())
			queryaaa.find().then(
				function(res) {
					console.log(res)
						uni.setStorageSync('house',res.reverse())
						_this.number = res.length
						_this.items = res
				},
				function(error) {
					
				}
			);
		},
		methods: {
			jianli(index){
				uni.navigateToMiniProgram({
				      appId: 'wxe6c9e42e3b5227d0',
				      path: 'pages/index/index', 
				      success(res) {
				        console.log("success") 
				      }
				})
				/* uni.setStorageSync('jianli',uni.getStorageSync("house")[index])
				uni.navigateTo({
					url: '../buy/buy'
				}); */
			},
			yanfang(index){
				uni.navigateToMiniProgram({
				      appId: 'wxe6c9e42e3b5227d0',
				      path: 'pages/index/index', 
				      success(res) {
				        console.log("success") 
				      }
				})
				/* uni.setStorageSync('jianli',uni.getStorageSync("house")[index])
				uni.navigateTo({
					url: '../buy-yanfang/buy-yanfang'
				}); */
			},
			qianqishenhe(index){
				uni.navigateToMiniProgram({
				      appId: 'wxe6c9e42e3b5227d0',
				      path: 'pages/index/index', 
				      success(res) {
				        console.log("success") 
				      }
				})
				/* uni.setStorageSync('jianli',uni.getStorageSync("house")[index])
				uni.navigateTo({
					url: '../bu-qianqishenhe/bu-qianqishenhe'
				}); */
			},
			jiedianyanshou(index){
				uni.navigateToMiniProgram({
				      appId: 'wxe6c9e42e3b5227d0',
				      path: 'pages/index/index', 
				      success(res) {
				        console.log("success") 
				      }
				})
				/* uni.setStorageSync('jianli',uni.getStorageSync("house")[index])
				uni.navigateTo({
					url: '../buy-jiedian/buy-jiedian'
				}); */
			},
			submit(index){
				var queryaaa = new leanCloud.Query('MyHouse');
				queryaaa.equalTo('objectId',uni.getStorageSync('house')[index].objectId)
				queryaaa.find().then(
					function(res) {
						console.log(res)
							uni.setStorageSync('house-details',res.reverse())
							uni.navigateTo({
								url: '../house-details/house-details'
							});
					},
					function(error) {}
				);
			},
			addHouse(){
				uni.navigateTo({
					url: '../add-house/add-house'
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.my-house{
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
.myhouse{
	width: 710upx;
	height: 800upx;
	box-sizing: border-box;
	padding:20upx;
	background: #FFFFFF;
	margin-top: 30upx;
	border-radius: 12upx;
	}
	.myhousea{
		font-size: 28upx;
		color: #333333;
		line-height: 70upx;
		font-weight: 700;
	}
	.myhouseb{
		font-size: 28upx;
		color: #666666;
		line-height: 70upx;
	}
	.myhousebb text{
		margin-left: 55upx;
	}
	.myhouseb text{
		color: #FFFFFF;
		padding: 5upx 40upx;
		background: #FF9900;
		border-radius: 12upx;
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
