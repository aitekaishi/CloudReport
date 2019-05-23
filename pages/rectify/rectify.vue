<template>
	<view>
		<view class="gongdione-one" :class="{ xixiaaaa: activeIndex2 == false }">
			<view class="gongdione-one-left">{{ address }}</view>
			<view class="gongdione-one-right" @click="qiehuan">切换</view>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<uni-list>
			<uni-list-item v-for="(item,index) in items" :key=index :title=item.updatedAt @click="components(index)"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
export default {
	components: { uniList, uniListItem,mpvuePicker },
	data() {
		return {
			items: [],
			pickerSingleArray: [],
			pickerSingleArrayrever: [],
			themeColor: '#000000',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			address:'',
			activeIndex2:false
		};
	},
	methods: {
		components(index){
			let _this = this;
			uni.setStorageSync('rectify-repot',_this.items[index])
			uni.navigateTo({
				url: '../rectify-repot/rectify-repot'
			});
		},
		onCancel(e) {},
		qiehuan() {
			this.pickerValueArray = this.pickerSingleArray;
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			let _this = this;
			_this.address = e.label;
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			var querya = new leanCloud.Query('RectificationReport');
			uni.setStorageSync('RectificationReportAddress',_this.address)
			querya.equalTo('projectAddress',_this.address)
			querya.find().then(
				function(res) {
					for (let i = 0; i < res.length; i++) {
						res[i].updatedAt =
							new Date(res[i].updatedAt.toString()).getFullYear() +
							'-' +
							(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
							'-' +
							new Date(res[i].updatedAt.toString()).getDate();
					}
					_this.items = res.reverse();
					uni.hideLoading();
				},
				function(error) {}
			);
		}
	},
	onShow() {
		let _this = this;
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		var MyHouse = new leanCloud.Query('Order');
		MyHouse.equalTo('user', leanCloud.User.current()).equalTo('status', '已支付');
		MyHouse.find().then(
			function(res) {
				uni.hideLoading()
				console.log(res)
				if (res.length == 0) {
					uni.showToast({
						title:'暂未添加房屋',
						icon:'none'
					})
					uni.hideLoading()
					_this.activeIndex2 = false
				}else{
					_this.activeIndex2 = true
				}
				var MyHouseTitle = [];
				var temp = []; 
				for (let i = 0; i < res.length; i++) {
					if (temp.indexOf(res[i].attributes.address) == -1) {
						temp.push(res[i].attributes.address);
					}
				}
				console.log(temp)
				for (let i = 0; i < temp.length; i++) {
					MyHouseTitle.push(JSON.parse('{"label":"' + temp[i] + '"}'));
				}
				_this.pickerSingleArray = MyHouseTitle.reverse();
				if (uni.getStorageSync('RectificationReportAddress') == '') {
					_this.address = res[res.length-1].attributes.address
					var RectificationReport = new leanCloud.Query('RectificationReport');
					RectificationReport.equalTo('projectAddress',_this.address)
					RectificationReport.find().then(
						function(res) {
							for (let i = 0; i < res.length; i++) {
								res[i].updatedAt =
									new Date(res[i].updatedAt.toString()).getFullYear() +
									'-' +
									(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
									'-' +
									new Date(res[i].updatedAt.toString()).getDate();
							}
							_this.items = res.reverse();
							uni.hideLoading();
						},
						function(error) {
							console.log(error)
							uni.hideLoading();
						}
					);
				} else{
					_this.address = uni.getStorageSync('RectificationReportAddress')
					var RectificationReport = new leanCloud.Query('RectificationReport');
					RectificationReport.equalTo('projectAddress',_this.address)
					RectificationReport.find().then(
						function(res) {
							for (let i = 0; i < res.length; i++) {
								res[i].updatedAt =
									new Date(res[i].updatedAt.toString()).getFullYear() +
									'-' +
									(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
									'-' +
									new Date(res[i].updatedAt.toString()).getDate();
							}
							_this.items = res.reverse();
							uni.hideLoading();
						},
						function(error) {
							console.log(error)
							uni.hideLoading();
						}
					);
				}
				
			},
			function(error) {
				uni.hideLoading()
				console.log(error)
			}
		);
	},
	created() {
		
	}
};
</script>

<style scoped="scoped">
	.xixiaaaa{
		display: none !important;
	}
	.gongdione-one {
		display: flex;
		justify-content: space-between;
		padding: 40upx 22upx;
	}
	.gongdione-one-left {
		font-size: 28upx;
		color: #333333;
		font-weight: 600;
	}
	.gongdione-one-right {
		font-size: 28upx;
		color: #999999;
		padding: 0upx 30upx;
		border: 2upx solid #999999;
		border-radius: 30upx;
	}
</style>
