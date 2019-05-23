<template>
	<view class="page">
		<view class="none"></view>
		<view class="page-title">您还没有登录哦</view>
		<view class="page-contain">授权登录后才能看到您的服务信息</view>
		<button open-type="getUserInfo" @getuserinfo="getUser" plain="true" :loading="load">使用微信登录</button>
	</view>
</template>
<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
import md5 from 'md5';
export default {
	data() {
		return {
			load: false
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '登录'
		});
		uni.setNavigationBarColor({
			frontColor: '#000000',
			backgroundColor: '#ffffff'
		});
	},
	methods: {
		getUser({ detail }) {
			let _this = this;
			_this.load = true;
			console.log(detail);
			if (detail.errMsg === 'getUserInfo:ok') {
				_this.load = false;
				var queryb = new leanCloud.Query('_User');
				queryb.equalTo('nickName', detail.userInfo.nickName)
				queryb.find().then(
					function(res) {
						console.log(res)
						leanCloud.User.logIn(res[0].attributes.username, 'lamll888').then(
							function(loginedUser) {
								console.log('loginedUser');
								console.log(loginedUser);
							},
							function(error) {
								alert(JSON.stringify(error));
							}
						);
					},
					function(error) {}
				);
				
				uni.showToast({
					title: '登陆成功',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../index/index'
					});
				});
			} else {
				_this.load = false;
				uni.showToast({
					title: '登陆失败！请重新授权',
					icon: 'none',
					duration: 1000
				});
			}
		}
	},
	created() {}
};
</script>

<style scoped>
.page-title {
	font-size: 46upx;
	text-align: center;
}
.page-contain {
	font-size: 32upx;
	color: #9b9b9b;
	text-align: center;
}
.none {
	height: 260upx;
}
button {
	width: 426upx;
	height: 86upx;
	line-height: 86upx;
	background: #ff9900;
	font-size: 34upx;
	color: #ffffff;
	border: none;
	margin-top: 600upx;
}
</style>
