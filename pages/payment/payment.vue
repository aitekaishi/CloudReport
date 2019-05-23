<template>
	<view class="details">
		<view class="one">
			<view class="one-one">
				<view class="one-name">{{ items.name }}</view>
				<view class="one-phone">{{ items.mobilePhoneNumber }}</view>
			</view>
			<view :class="{ xixiaaa: outTime == true }" class="xixiisdds">{{ minute }}分{{ second }}秒</view>
			<view class="one-two">
				<view class="one-city">{{ items.city }} {{ items.address }}</view>
			</view>
		</view>
		<view class="two">
			<view class="two-title">感谢您对佰橙优家的信任，下单30分钟未支付订单将自动关闭。</view>
			<view class="two-button">
				<button plain="true" open-type="contact">在线客服</button>
				<button :class="{ xixiaaa: outTime == true }" @click="comment(items.orderId)" class="two-button-comment">立即支付</button>
				<button :class="{ xixiaaa: outTime != true }" class="two-button-comment">交易关闭</button>
			</view>
		</view>
		<view class="three">
			<view class="three-one">费用信息</view>
			<view class="three-two three-zzz">
				<view class="three-two-one">建筑面积</view>
				<view class="three-two-two">{{ items.area }}m²</view>
			</view>
			<view class="three-two">
				<view class="three-two-one">服务类型</view>
				<view class="three-two-two">{{ items.serviceType }}</view>
			</view>
			<view class="three-two" v-for="(itema, indexa) in items.server" :key="indexa" :class="{ xixiaaa: itema != '全程监理服务' }">
				<view class="three-two-one">
					服务费用
				</view>
				<view class="three-two-two">
					29元/m²×{{mianqi}}m²={{chukaibaoxian}}元
				</view>
			</view>
			<view v-for="(itema, indexa) in items.server" :key="indexa" class="three-two">
				<view :class="{ xixiaaa: itema == '全程监理服务' }" class="three-onea">{{ itema }}</view>
				<view :class="{ xixiaaa: itema != '全程监理服务' }" class="three-onea">工程监理责任险</view>
				<view :class="{ xixiaaa: itema != '全程监理服务' }" class="three-twoa">¥{{ baoxian }}</view>
				<view :class="{ xixiaaa: itema != '水电节点' }" class="three-twoa">¥299</view>
				<view :class="{ 'xixiaaa': itema != '泥工节点' }" class="three-twoa">¥299</view>
				<view :class="{ 'xixiaaa': itema != '木作节点' }" class="three-twoa">¥299</view>
				<view :class="{ xixiaaa: itema != '油漆节点' }" class="three-twoa">¥299</view>
				<view :class="{ xixiaaa: itema != '竣工节点' }" class="three-twoa">¥399</view>
				<view :class="{ xixiaaa: itema != '图纸审核' }" class="three-twoa">¥299</view>
				<view :class="{ xixiaaa: itema != '预算审核' }" class="three-twoa">¥299</view>
				<view :class="{ xixiaaa: itema != '合同陪签' }" class="three-twoa">¥299</view>

				<view :class="{ xixiaaa: itema != '毛坯房验房' }" class="three-twoa">¥299</view>
				<view :class="{ xixiaaa: itema != '精装房验房' }" class="three-twoa">¥399</view>
			</view>
			<!-- <view class="three-two three-zzz">
				<view class="three-two-one">
					监理工程险
				</view>
				<view class="three-two-two">
					¥{{items.insurancePrice}}元
				</view>
			</view> -->
			<view class="three-zzz"></view>
			<view class="three-two">
				<view class="three-two-one bold">总计</view>
				<view class="three-two-two bold">¥{{ items.total }}</view>
			</view>
		</view>
		<view class="three four">
			<view class="three-one">订单信息</view>
			<view class="three-two">
				<view class="three-two-one">订单编号</view>
				<view class="three-two-two">{{ items.orderId }}</view>
			</view>
			<view class="three-two">
				<view class="three-two-one">下单时间</view>
				<view class="three-two-two">{{ createdAt }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
export default {
	data() {
		return {
			items: [],
			createdAt: '',
			//updatedAt:'',
			baoxian: '',
			goodsObj: [
				{
					name: 'HomeMinuteTimer',
					checked: false,
					list: []
				}
			],
			minutes: '',
			seconds: 59,
			outTime: false,
			mianqi:0,
			chukaibaoxian:0
		};
	},
	created() {
		let _this = this
		console.log(uni.getStorageSync('itemOne'));
		console.log(uni.getStorageSync('createdAtIndex'));
		_this.items = uni.getStorageSync('itemOne');
		_this.baoxian = uni.getStorageSync('baoxian');
		console.log(_this.items);
		_this.chukaibaoxian = _this.items.total - _this.items.insurancePrice
		if (_this.items.area>=80) {
			_this.mianqi = _this.items.area
		} else{
			_this.mianqi = 80
		}
		var getMinutes = '';
		if (new Date(uni.getStorageSync('createdAtIndex')).getMinutes() < 10) {
			getMinutes = '0' + new Date(uni.getStorageSync('createdAtIndex')).getMinutes();
		} else {
			getMinutes = new Date(uni.getStorageSync('createdAtIndex')).getMinutes();
		}
		var mouth = ''
		var day = ''
		var hour = ''
		var ms = ''
		if ((new Date(uni.getStorageSync('createdAtIndex')).getMonth() + 1)>9) {
			mouth = new Date(uni.getStorageSync('createdAtIndex')).getMonth() + 1
		} else{
			mouth = '0'+ (new Date(uni.getStorageSync('createdAtIndex')).getMonth() + 1)
		}
		if ((new Date(uni.getStorageSync('createdAtIndex')).getDate())>9) {
			day = new Date(uni.getStorageSync('createdAtIndex')).getDate() + 1
		} else{
			day = '0'+ (new Date(uni.getStorageSync('createdAtIndex')).getDate())
		}
		if ((new Date(uni.getStorageSync('createdAtIndex')).getHours())>9) {
			hour = new Date(uni.getStorageSync('createdAtIndex')).getHours()
		} else{
			hour = '0'+ (new Date(uni.getStorageSync('createdAtIndex')).getHours())
		}
		if ((new Date(uni.getStorageSync('createdAtIndex')).getSeconds())>9) {
			ms = new Date(uni.getStorageSync('createdAtIndex')).getSeconds()
		} else{
			ms = '0'+ (new Date(uni.getStorageSync('createdAtIndex')).getSeconds())
		}
		this.createdAt=new Date(uni.getStorageSync('createdAtIndex')).getFullYear()+'/'+mouth+'/'+day +'  '+hour+':'+getMinutes+':'+ms
		this.minutes = 29 - parseInt((new Date() - new Date(uni.getStorageSync('createdAtIndex'))) / 60000);
		console.log(this.minutes)
		if (this.minutes <= 0) {
			console.log('大于30');
			this.minutes = 0;
			this.seconds = 0
			let _this = this
			_this.outTime = true
			/* var todo = leanCloud.Object.createWithoutData('Order', uni.getStorageSync('itemOne').objectId);
			todo.destroy().then(
				function(success) {
					
					console.log(uni.getStorageSync('itemOne').objectId);
				},
				function(error) {
					// 删除失败
				}
			); */
		}
	},
	watch: {
		second: {
			handler(newVal) {
				this.num(newVal);
			}
		},
		minute: {
			handler(newVal) {
				this.num(newVal);
			}
		}
	},
	mounted() {
		this.add();
	},
	computed: {
		second: function() {
			return this.num(this.seconds);
		},
		minute: function() {
			return this.num(this.minutes);
		}
	},
	methods: {
		num: function(n) {
			return n < 10 ? '0' + n : '' + n;
		},
		add: function() {
			var _this = this;
			var time = setInterval(function() {
				if (_this.seconds === 0 && _this.minutes !== 0) {
					_this.seconds = 59;
					_this.minutes -= 1;
				} else if (_this.minutes === 0 && _this.seconds === 0) {
					_this.seconds = 0;
					clearInterval(time);
					_this.outTime = true
				} else {
					_this.seconds -= 1;
				}
			}, 1000);
		},
		comment(index) {
			uni.navigateToMiniProgram({
			      appId: 'wxe6c9e42e3b5227d0',
			      path: 'pages/index/index', 
			      success(res) {
			        console.log("success") 
			      }
			})
			/* uni.setStorageSync('assessOrder', index);
			let _this = this;
			uni.showLoading({
				title: '提交中'
			});
			leanCloud.Cloud.run('wxOrder', { productDescription: '佰橙科技-装修监理费', amount:  _this.items.total * 100 })
				.then(data => {
					console.log(data);
					data.success = () => {
						var todo = leanCloud.Object.createWithoutData('Order', uni.getStorageSync('itemOne').objectId);
						todo.destroy().then(
							function(success) {
								var Todo = leanCloud.Object.extend('Order');
								var todo = new Todo();
								todo.set('user', leanCloud.User.current());
								todo.set('city',uni.getStorageSync('itemOne').city);
								todo.set('name',uni.getStorageSync('itemOne').name);
								todo.set('mobilePhoneNumber',uni.getStorageSync('itemOne').mobilePhoneNumber);
								todo.set('area', parseFloat(uni.getStorageSync('itemOne').area));
								todo.set('status', '已支付');
								todo.set('total',uni.getStorageSync('itemOne').total);
								todo.set('serviceType', uni.getStorageSync('itemOne').serviceType);
								todo.set('server', uni.getStorageSync('itemOne').server);
								todo.set('servicePrice', uni.getStorageSync('itemOne').servicePrice);
								todo.set('address',uni.getStorageSync('itemOne').address);
								todo.set('insuranceType',uni.getStorageSync('itemOne').insuranceType);
								todo.set('insurancePrice',uni.getStorageSync('itemOne').insurancePrice);
								todo.set('insuranceId',uni.getStorageSync('itemOne').insuranceId);
								todo.save().then(
									function(todo) {
										uni.hideLoading();
										uni.showToast({
											title: '支付成功',
											duration: 1000
										});
										setTimeout(function() {
											uni.navigateTo({
												url: '../index/index'
											});
										}, 1000);
									},
									function(error) {
										uni.hideLoading();
										console.log(error)
									}
								);
							},
							function(error) {
								// 删除失败
							}
						);
					};
					data.fail = ({ errMsg }) => {
						console.log(errMsg);
						uni.showToast({
							title: '支付失败',
							duration: 1000
						});
					};
					uni.requestPayment(data);
				})
				.catch(error => {
					console.log(error);
				}); */
		}
	}
};
</script>

<style scoped>
.xixiaaa {
	display: none !important;
}
.details {
	background-color: #F8F9FB;
	min-height: 100vh;
}
.one-one,
.one-two {
	display: flex;
}
.one-name {
	font-size: 36upx;
	line-height: 40upx;
	color: #ffffff;
	margin-right: 12upx;
}
.one-phone,
.one-city {
	font-size: 30upx;
	line-height: 40upx;
	color: #ffffff;
	width: 450upx;
}
.three-onea,
.three-twoa {
	padding-top: 10upx;
	padding-bottom: 10upx;
	color: #666666;
	font-size: 30upx;
}
.three-twoa {
	color: #666666;
}
.one {
	background: -webkit-linear-gradient(#ff9900, #f1b04d);
	padding: 30upx;
	padding-bottom: 110upx;
}
.two {
	width: 618upx;
	height: 120upx;
	background: #ffffff;
	border-radius: 10upx;
	padding: 36upx;
	padding-top: 10upx;
	padding-bottom: 72upx;
	margin: 0 auto;
	position: relative;
	top: -80upx;
}
.two-title {
	color: #777777;
	font-size: 30upx;
}
.two-button {
	display: flex;
	width: 100%;
	margin-top: 20upx;
}
button,
.two-button-comment {
	border: 2upx solid #ff9900;
	background: #ffffff;
	color: #ff9900;
	font-size: 30upx;
	height: 60upx;
	width: 192upx;
	line-height: 60upx;
	text-align: center;
	position: relative;
	left: 143upx;
}
.two-button-comment {
	border-radius: 10upx;
	background: #ff9900;
	color: #ffffff;
	border: none;
	left: 53upx;
}
.two-button-comment:after {
	border: none;
}
.three {
	padding: 36upx;
	width: 618upx;
	background: #ffffff;
	margin: 0 auto;
	border-radius: 10upx;
	position: relative;
	top: -50upx;
	padding-top: 20upx;
}
.three-one {
	font-size: 30upx;
	color: #4a4a4a;
	font-weight: 600;
	padding-bottom: 20upx;
	border-bottom: 2upx solid #cccccc;
}
.three-two {
	display: flex;
	justify-content: space-between;
}
.three-zzz {
	border-bottom: 2upx dashed #cccccc;
	padding-bottom: 20upx;
}

.three-two-one,
.three-two-two {
	font-size: 30upx;
	color: #777777;
	padding-top: 20upx;
}
.three-two-two {
	flex: 1;
	text-align: right;
}
.bold {
	color: #4a4a4a;
	font-weight: 600;
}
.four {
	top: -20upx;
}
.xixiisdds {
	font-size: 36upx;
	color: #ffffff;
	position: absolute;
	right: 60upx;
	top: 30upx;
}
</style>
