<template>
	<view class="myinfo">
		<view class="myinfo-header">
			<image class="image-header" :src="header" mode="widthFix" />
			<text class="text-header">{{ name }}</text>
			<button class="buton" plain="true">
				<text class="text-phone">{{ phone }}</text>
			</button>
		</view>
		<view class="weui-cells weui-cells_after-title">
			<button @click="work" plain="true">
				<navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
					<image src="/static/myinfo/icon_fangwu@2x.png" mode="widthFix" />
					<view class="weui-cell__bd">我的房屋</view>
					<view class="weui-cell__ft weui-cell__ft_in-access"></view>
				</navigator>
			</button>
			<view class="bottom"></view>
			<button @click="myOrder" plain="true">
				<navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
					<image src="/static/myinfo/icon_wodedingdan@2x.png" mode="widthFix" />
					<view class="weui-cell__bd">我的订单</view>
					<view class="weui-cell__ft weui-cell__ft_in-access"></view>
				</navigator>
			</button>
			<view class="bottom"></view>
			<button @click="zhengaibaogao" plain="true">
				<navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
					<image src="/static/myinfo/icon_zhgbg@2x.png" mode="widthFix" />
					<view class="weui-cell__bd">整改验收报告</view>
					<view class="weui-cell__ft weui-cell__ft_in-access"></view>
				</navigator>
			</button>
			<view class="bottom"></view>
			<button @click="setting" plain="true">
				<navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
					<image src="/static/myinfo/icon-shezhi@2x.png" mode="widthFix" />
					<view class="weui-cell__bd">设置</view>
					<view class="weui-cell__ft weui-cell__ft_in-access"></view>
				</navigator>
			</button>
		</view>
	</view>
</template>

<script>
import md5 from 'md5';
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
export default {
	data() {
		return {
			header: '',
			name: '',
			phone: '',
		};
	},
	methods: {
		work() {
			let _this = this;
			var queryaaa = new leanCloud.Query('MyHouse');
			queryaaa.equalTo('user',leanCloud.User.current())
			queryaaa.find().then(
				function(res) {
					uni.setStorageSync('activeIndex',2);
					if (res.length>0) {
						uni.navigateTo({
							url: '../myhouse/myhouse'
						});
					} else{
						uni.navigateTo({
							url: '../no-house/no-house'
						});
					}
				},
				function(error) {}
			);
		},

		myOrder() {
			console.log("我的订单")
			let _this = this;
			var query = new leanCloud.Query('Order');
			query.equalTo('user',leanCloud.User.current())
			query.find().then(function(res) {
				console.log(res)
				for (let i = 0; i < res.length; i++) {
					if (res[i].attributes.status == '待付款') {
						console.log('待付款')
						console.log((new Date()-res[i].createdAt)/60000)
						if((new Date()-res[i].createdAt)/60000>30) {
							var todo = leanCloud.Object.createWithoutData('Order', res[i].id);
							  todo.destroy().then(function (success) {
								
							  }, function (error) {
								
							  });
						}
					}
				}
				uni.navigateTo({
					url: '../order-from/order-from'
				});
			}), function(error) {
				console.log(error)
			};
		},
		setting() {
			uni.navigateTo({
				url: '../setting/setting'
			});
		},
		zhengaibaogao() {
			uni.navigateTo({
				url: '../rectify/rectify'
			});
		}
	},
	created() {
		this.header = uni.getStorageSync('avatarUrl');
		this.name = uni.getStorageSync('nickName');
		this.phone = uni.getStorageSync('shoujihao')
	}
};
</script>

<style scoped="scoped">
.myinfo {
	text-align: left;
}
button {
	border: none;
	text-align: left;
}
image {
	width: 46upx;
	height: 46upx;
	position: relative;
	left: -15upx;
}
.weui-cell {
	padding: 10upx !important;
}
.weui-cell__bd {
	font-size: 32upx;
	caption-side: #333333;
}
.weui-cell__ft_in-access {
	font-size: 28upx;
}
.bottom {
	height: 2upx;
	background: #ededed;
	width: 712upx;
	margin: 0 auto;
}
.myinfo-header {
	padding: 32upx 50upx;
	background: -webkit-linear-gradient(#ff9900, #f1b04d); /* Safari 5.1 - 6.0 */
}
.image-header {
	width: 100upx;
	height: 110upx;
	border-radius: 50%;
	position: relative;
	top: 10upx;
}
.text-header {
	font-size: 40upx;
	color: #ffffff;
	position: relative;
	top: -50upx;
}
.text-phone {
	font-size: 28upx;
	color: #ffffff;
}
.buton {
	display: inline-block;
	position: relative;
	left: -160upx;
	top: 30upx;
}
.weui-cells:after {
	border-bottom: none;
}
.xixiaaaa {
	display: none;
}
</style>
