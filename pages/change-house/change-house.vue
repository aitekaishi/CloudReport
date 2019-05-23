<template>
	<view class="order-cotain">
		<view class="none"></view>
		<view class="input">
			<view class="input-title">您的姓名</view>
			<input type="text" v-model="name" @input="onName" class="uni-input" placeholder="请填写您的真实姓名"/>
		</view>

		<view class="input">
			<view class="input-title">手机号码</view>
			<input type="number" maxlength="11" v-model="phone" @input="onPhone" class="uni-input" placeholder="请填写您的手机号码" />
		</view>
		<view class="input">
			<view class="input-title">房屋面积</view>
			<input type="number" v-model="area" @input="onArea" class="uni-input" placeholder="请填写房屋产权面积" />
		</view>
		<view class="input">
			<view class="input-title">房屋地址</view>
			<input type="text" v-model="address" @input="onAress" class="uni-input" placeholder="例如：羊湖小区3栋5单元102" />
		</view>
		<view class="none"></view>
		<view class="addhouse-add" @click="submit()">完成</view>
	</view>
</template>

<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
export default {
	data() {
		return {
			name: '',
			phone: '',
			area: '',
			address: ''
		};
	},
	methods: {
		onName: function(event) {
			this.name = event.target.value;
		},
		onPhone: function(event) {
			this.phone = event.target.value;
		},
		onArea(event) {
			this.area = event.target.value;
		},
		onAress(event) {
			this.address = event.target.value;
		},
		submit() {
			let _this = this;
			if (_this.name.length < 2) {
				uni.showToast({
					title: '请正确填写名字',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (_this.area == '') {
				uni.showToast({
					title: '请填写房屋面积',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			if (_this.address.length < 2) {
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
			 var todo = leanCloud.Object.createWithoutData('MyHouse', uni.getStorageSync('objectId'));
			todo.set('name', _this.name);
			todo.set('phone', Number(_this.phone));
			todo.set('area', Number(_this.area));
			todo.set('address', _this.address);
			todo.save().then(function (todo) {
				console.log(todo)
				uni.navigateTo({
					url: '../myhouse/myhouse'
				});
				uni.hideLoading()
			},function(error){
				console.log(error)
			});
			
		}
	},
	updated() {},
	created() {},
	onShow() {
		var house = uni.getStorageSync('house-details')
		this.address = house[0].address
		this.name = house[0].name
		this.phone = house[0].phone
		this.area = house[0].area
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
	height: 10upx;
	background: #f9f9fb;
}
.addhouse-add {
	background: #ff9900;
	color: #ffffff;
	width: 440upx;
	border-radius: 12upx;
	text-align: center;
	margin: 100upx auto;
	padding: 15upx;
}
.order-cotain {
	background-color: #F8F9FB;
	min-height: 100vh;
}
</style>
