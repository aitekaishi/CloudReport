<template>
	<view :class="{ xixiaaaa: login == false }">
		<view :class="{ xixiaaaa: userinfo == false }" class="uni-mask"></view>
		<view :class="{ xixiaaaa: userinfo == false }" class="denglu">
			<view class="denglu-title">
				<view>
					<image src="http://lc-ndknejad.cn-n1.lcfile.com/e42c97188659375d7860/icon_shoucidenglu%402x.png" mode=""></image>
					<text>首次登录时，需要完成以下步骤</text>
				</view>
			</view>
			<view style="height: 20upx;"></view>
			<view class="bottoma"></view>
			<view class="denglu-title-title">授权佰橙优家读取您的微信昵称和头像</view>
			<button :class="{ xixiaaaa: xixia == false }" class="shouquan" open-type="getUserInfo" @getuserinfo="getUser" plain="true" :loading="load">一键授权</button>
			<button :class="{ xixiaaaa: xixia == true }" plain="true" disabled="disabled">已授权</button>
			<view style="height: 30upx;"></view>
			<view class="bottoma"></view>
			<view class="denglu-title-title">授权佰橙优家读取您微信绑定的手机号</view>
			<button :class="{ xixiaaaa: xixib == false }" class="shouquan" plain="true" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键授权微信认证手机号</button>
			<button :class="{ xixiaaaa: xixib == true }" plain="true" disabled="disabled">已授权</button>
		</view>
	</view>
</template>

<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
import md5 from 'md5';
var WXBizDataCrypt = require('../WXBizDataCrypt');
export default {
	data() {
		return {
			xixia: '',
			xixib: true,
			login: true
		};
	},
	props: ['userinfo'],
	methods: {
		getUser({ detail }) {
			let _this = this;
			_this.load = true;
			if (detail.errMsg === 'getUserInfo:ok') {
				_this.load = false;
				var queryb = new leanCloud.Query('_User');
				queryb.equalTo('nickName', detail.userInfo.nickName).equalTo('city', detail.userInfo.city)
				queryb.find().then(
					function(res) {
						console.log(res.length)
						if(res.length == 1){
							leanCloud.User.logIn(res[0].attributes.username, 'lamll888').then(
							
								function(loginedUser) {
									_this.xixia = false;
									console.log('loginedUser');
									console.log(loginedUser.attributes);
								},
								function(error) {
									alert(JSON.stringify(error));
								}
							);
						}else{
							var user = new leanCloud.User();
							user.loginWithWeapp({ preferUnionId: true })
								.then(user => {
									uni.removeStorageSync('purePhoneNumber')
									uni.setStorageSync('purePhoneNumber', user);
								})
								.catch(console.error);
							uni.setStorageSync(
								'nameuseruser',
								md5(new Date())
									.toString()
									.substring(0, 25)
							);
							uni.setStorageSync('nickName', detail.userInfo.nickName);
							uni.setStorageSync('avatarUrl', detail.userInfo.avatarUrl);
							uni.setStorageSync('setUsername', uni.getStorageSync('nameuseruser'));
							uni.setStorageSync('city', detail.userInfo.city);
							uni.setStorageSync('language', detail.userInfo.language);
							uni.setStorageSync('gender', detail.userInfo.gender);
							uni.setStorageSync('province', detail.userInfo.province);
							uni.setStorageSync('country', detail.userInfo.country);
							user.setUsername(uni.getStorageSync('nameuseruser'));
							user.setPassword('lamll888');
							user.set('city', detail.userInfo.city);
							user.set('nickName', detail.userInfo.nickName);
							user.set('language', detail.userInfo.language);
							user.set('gender', detail.userInfo.gender);
							user.set('province', detail.userInfo.province);
							user.set('avatarUrl', detail.userInfo.avatarUrl);
							user.set('country', detail.userInfo.country);
							//user.setEmail('2237339292@qq.com');
							_this.xixia = false;
						}
					},
					function(error) {}
				);
				
			} else {
				_this.load = false;
				uni.showToast({
					title: '登陆失败！请重新授权',
					icon: 'none',
					duration: 1000
				});
			}
		},
		getPhoneNumber(e) {
			console.log(e)
			const _this = this;
			_this.xixib = false;
			setTimeout(function(){
				_this.login = false;
			},1000)
			if(uni.getStorageSync('purePhoneNumber') == ''){
				return
			}else{
				var appId = 'wxd16393f5438c5881';
				var sessionKey = uni.getStorageSync('purePhoneNumber').authData.lc_weapp.session_key;
				console.log(sessionKey)
				var encryptedData = e.detail.encryptedData;
				var iv = e.detail.iv;
				var pc = new WXBizDataCrypt(appId, sessionKey);
				var data = pc.decryptData(encryptedData, iv);
				uni.setStorageSync('bangdingshoujihao', data.phoneNumber);
				console.log(data.phoneNumber)
				var todo = leanCloud.Object.createWithoutData('_User', leanCloud.User.current().id);
				todo.set('mobilePhoneNumber', data.phoneNumber);
				todo.save().then(function(todo) {
					uni.showToast({
						title: '授权成功',
						icon: 'none',
						duration: 1000
					});
				});
			}
		}
	},
	created() {
		let _this = this;
		uni.getSetting({
			success(res) {
				if (!res.authSetting['scope.userInfo'] || uni.getStorageSync('avatarUrl') == '') {
					_this.xixia = true;
				} else {
					_this.xixia = false;
				}
			}
		});
	}
};
</script>

<style scoped="scoped">
.xixiaaaa {
	display: none;
}
.uni-mask {
	width: 100vw;
	height: 5060upx;
	background: rgba(0, 0, 0, 0.9);
	position: absolute;
	top: 0;
	z-index: 1000;
}
.denglu {
	width: 650upx;
	margin: 0 auto;
	background: #ffffff;
	border-radius: 16upx;
	height: 700upx;
	z-index: 1001;
	position: fixed;
	top: 300upx;
	left: 50upx;
	box-sizing: border-box;
	padding: 60upx;
}
button {
	border: none;
	width: 530upx;
	height: 88upx;
	color: #333333;
	font-size: 32upx;
	border: 10upx;
	background: #cccccc;
	line-height: 88upx;
	margin-top: 40upx;
}
.denglu-title {
	display: flex;
	justify-content: flex-start;
}
image {
	width: 52upx;
	height: 66upx;
}
.denglu-title text {
	font-size: 32upx;
	color: #666666;
	position: relative;
	top: -20upx;
	left: 20upx;
}
.bottoma {
	height: 2upx;
	background: #cccccc;
}
.denglu-title-title {
	font-size: 30upx;
	color: #666666;
	text-align: center;
	margin-top: 30upx;
}
.shouquan {
	color: #ffffff;
	background: #ff9900;
}
</style>
