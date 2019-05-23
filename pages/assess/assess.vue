<template>
	<view class="assess-contain">
		<view class="assess-text assess-text1">文字评价</view>
		<view class="assess-text assess-text2">{{number}}/500</view>
		<view class="uni-textarea">
			<textarea v-model='value' @blur="bindTextAreaBlur" placeholder='写写你对我们服务的评价' placeholder-style='color: #B2B2B2;font-size: 32upx;' maxlength='500' @input='inputHandle'/>
		</view>
		<view class="assess-text assess-text3">评分</view>
		<uni-rate class='rate-class' :value='rateVal' size='25' margin='10' @change='rateHandle'></uni-rate>
		<button :class="disabled?'true':'false'" @click="submit">提交</button>
	</view>
</template>

<script>
	import * as leanCloud from 'leancloud-storage/dist/av-weapp.js'

	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		data() {
			return {
				number:0,
				rateVal:0,
				disabled:false,
				value:'',
			};
		},
		components: {uniRate},
		created(){
			console.log(leanCloud.User.current())
			console.log(uni.getStorageSync('assessOrder'))
			var queryx = new leanCloud.Query('_User');
			queryx.equalTo('objectId', leanCloud.User.current().id);
			queryx.find().then(
				function(res) {
					console.log(res)
					uni.setStorageSync('userPhone',res[0].attributes.mobilePhoneNumber)
					console.log(res[0].attributes.mobilePhoneNumber)
				},
				function(error) {
					console.log(error);
				}
			);
		},
		methods: {
			inputHandle(e){
				this.number = e.detail.value.length
			},
			rateHandle(value){
				this.rateVal = value.value
			},
			submit(){
				let _this = this;
				uni.showLoading({
					title:'提交中'
				})
				uni.setStorageSync('UserCity','长沙')
				var Todo = leanCloud.Object.extend('Assess');
				var todo = new Todo();
				todo.set('user', leanCloud.User.current());
				todo.set('value', _this.value);
				todo.set('score', _this.rateVal);
				todo.set('avatarUrl', uni.getStorageSync('avatarUrl'));
				todo.set('phone', parseInt(uni.getStorageSync('userPhone')));
				todo.set('city', uni.getStorageSync('UserCity'));
				todo.set('serverType', uni.getStorageSync('indexServerType'));
				todo.set('nickName', uni.getStorageSync('nickName'));
				todo.save().then(function (todo) {
				  uni.hideLoading()
				  uni.showToast({
					title: '提交成功',
					duration: 1000,
				 });
				 uni.setStorageSync('activeIndex',0)
					  uni.navigateTo({
					  	url: '../index/index'
					  });
				}, function (error) {
					console.log(error)
				  uni.hideLoading()
				  uni.showToast({
					title: '提交失败',
					duration: 1000,
					icon:'none'
				  });
				});
			}
		},
		updated(){
			if (this.value != "") {
				this.disabled = true
			}else{
				this.disabled = false
			}
		}
	}
</script>

<style lang="less">
.assess-contain{
	width: 100vw;
	min-height: 100vh;
	background: #F8F9FB;
	.assess-text{
		margin-top: 10upx;
		display: inline-block;
		margin-left: 30upx;
		font-size: 30upx;
		color: #9B9B9B;
	}
	.assess-text2{
		float: right;
		margin-right: 30upx;
	}
	.uni-textarea{
		width: 100vw;
		height: 306upx;
		background: #FFFFFF;
		padding: 24upx 0 0 30upx;
		margin: 15upx 0 33upx 0;
		font-size: 32upx;
	}
	.rate-class{
		margin-left: 200upx;
		background: red
	}
}
.true{
	background: #FF9900;
}
.false{
	background: #C3C3C3;
}
button{
	border-radius: 0;
	font-size: 36upx;
	color: #FFFFFF;
	position: fixed;
	bottom: 0;
	width: 100vw;
}
button::after{ border: none; }
textarea{
	width: 690upx;
}
</style>
