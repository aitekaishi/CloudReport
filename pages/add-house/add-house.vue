<template>
	<view class="order-cotain">
		<view class="none"></view>
		<view class="input">
			<view class="input-title">所在城市</view>
			<input type="text" focus v-model="city" @input="onCity" class="uni-input" placeholder="请选择所选城市" />
		</view>
<view class="none"></view>
		<view class="input">
			<view class="input-title">您的姓名</view>
			<input type="text" v-model="name" @input="onName" class="uni-input" placeholder="请填写您的真实姓名" />
		</view>
<view class="none"></view>
		<view class="input">
			<view class="input-title">联系电话</view>
			<input type="number" maxlength="11" v-model="phone" @input="onPhone" class="uni-input" placeholder="请填写您的手机号码" />
		</view>
		<view class="none"></view>
		<view class="input">
			<view class="input-title">房屋面积</view>
			<input type="number" v-model="area" @input="onArea" class="uni-input" placeholder="请填写房屋产权面积" />
		</view>
		<view class="none"></view>
		<view class="input">
			<view class="input-title">详细地址</view>
			<input type="text" v-model="aress" @input="onAress" class="uni-input" placeholder="例如：羊湖小区3栋5单元102" />
		</view>
		<view class="none"></view>
		<view class="addhouse-add" @click="submit()">
			提交房屋信息
		</view>
	</view>
</template>

<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
export default {
	data() {
		return {
			city: '',
			name: '',
			phone: '',
			area: '',
			aress: '',
		};
	},
	methods: {
		onCity: function(event) {
			this.city = event.target.value;
		},
		onName: function(event) {
			this.name = event.target.value;
		},
		onPhone: function(event) {
			this.phone = event.target.value;
		},
		onArea(event) {
			let _this = this
			_this.area = event.target.value
			
		},
		onAress(event) {
			this.aress = event.target.value;
		},
		submit() {
			let _this = this;
			if (_this.city.length < 2) {
				uni.showToast({
					title: '请正确填写城市',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (_this.name.length < 2) {
				uni.showToast({
					title: '请正确填写名字',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (_this.area == ''||_this.area == 0) {
				uni.showToast({
					title: '请正确填写房屋面积',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (_this.aress.length < 2) {
				uni.showToast({
					title: '请填写房屋地址',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (!/^[0-9]{11}$/.test(_this.phone)) {
				uni.showToast({
					title: '请正确填写手机号码',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '提交中'
			});
			uni.setStorageSync('qqqq',1)
			var Todo = leanCloud.Object.extend('MyHouse');
			var todo = new Todo();
			todo.set('user', leanCloud.User.current());
			todo.set('city', _this.city);
			todo.set('name', _this.name);
			todo.set('phone', Number(_this.phone));
			todo.set('area', parseFloat(_this.area));
			todo.set('address', _this.aress); 
			todo.save().then(
				function(todo) {
					uni.hideLoading();
					uni.showToast({
						title: '添加成功',
						duration: 1000
					});
						uni.navigateTo({
							url: '../myhouse/myhouse'
						});
				},
				function(error) {
					uni.hideLoading();
					console.log(error)
					/* uni.navigateTo({
						url: '../submit-fail/submit-fail'
					}); */
				}
			);
		
		}
	},
	updated() {
	},
	created() {
	}
};
</script>

<style scoped lang="less">
.input {
	display: flex;
	width: 100%;
	height: 108upx;
	line-height: 108upx;
	margin-bottom: 10upx;
	background: #ffffff;

	.input-title {
		color: #000000;
		font-size: 28upx;
		margin-left: 22upx;
	}

	.uni-input {
		flex: 1;
		font-size: 28upx;
		margin: 16upx;
		height: 108upx;
		line-height: 108upx;
		margin-top: 0;
	}
}

.none {
	width: 100%;
	height: 18upx;
	background: #f9f9fb;
}
.addhouse-add{
	background: #FF9900;
	color: #ffffff;
	width: 440upx;
	border-radius: 12upx;
	text-align: center;
	margin: 100upx auto;
	padding: 15upx;
}
.order-cotain {
	background: #f9f9fb;
	min-height: 100vh;
}
</style>
