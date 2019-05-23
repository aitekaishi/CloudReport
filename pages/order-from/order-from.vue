<template>
	<view class="order-from">
		<view :class="orderlen?'':'none'" v-for="(item,index) in items" :key=item.orderId>
			<view class="nonea"></view>
			<view class="order-contain">
				<view class="one">
					<view class="one-one">订单号：{{item.orderId}}</view>
					<view class="one-two" :class="{ xixibbb: item.status == '待支付'&&item.xixi ==true }">待支付</view>
					<view class="one-two" :class="{ xixibbb: item.status == '待支付'&&item.xixi ==false  }">已关闭</view>
					<view class="one-two" :class="{ xixibbb: item.status == '已支付' }">已支付</view>
				</view>
				<view class="two">{{item.createdAt}}</view>
				<view class="br"></view>
				<view class="three">
					<view class="three-one">{{item.serviceType}}</view>
					<view :class="{ 'xixiaaa': item.serviceId != 2 }" class="three-two">¥{{item.total-item.insurancePrice}}</view>
				</view>
				<view class="br"></view>
				<view v-for="(itema,indexa) in item.server" :key=indexa class="three">
					<view :class="{ xixiaaa: itema == '全程监理服务' }" class="three-one">{{ itema }}</view>
					<view :class="{ xixiaaa: itema != '全程监理服务' }" class="three-one">工程监理责任险</view>
					<view :class="{ 'xixiaaa': itema != '全程监理服务' }" class="three-two">¥{{item.insurancePrice}}</view>
					<view :class="{ 'xixiaaa': itema != '水电节点' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '泥工节点' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '木作节点' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '油漆节点' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '竣工节点' }" class="three-two">¥399</view>
					<view :class="{ 'xixiaaa': itema != '图纸审核' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '预算审核' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '合同陪签' }" class="three-two">¥299</view>
					
					<view :class="{ 'xixiaaa': itema != '毛坯房验房' }" class="three-two">¥299</view>
					<view :class="{ 'xixiaaa': itema != '精装房验房' }" class="three-two">¥399</view>
				</view>
				<view class="br"></view>
				<view class="br"></view>
				<view class="four">
					<view class="four-one">合计</view>
					<view class="four-two">¥{{item.total}}</view>
				</view>
				<view class="br"></view>
				<view class="five">
					<view @click="order(index)" class="five-one button">订单详情</view>
					<view :class="{ 'xixibbb': item.status == '待支付'&&item.xixi ==true }" @click="pay(index)" class="five-two button">立即支付</view>
					<view :class="{ 'xixibbb': item.status == '待支付'&&item.xixi !=true }" class="five-two button">交易关闭</view>
					<view :class="{ 'xixibbb': item.status == '已支付' }" @click="assess(index)" class="five-two button">评价</view>
				</view>
			</view>
			
		</view>
		<view :class="orderlen?'no-order none':'no-order'">
			<view class="view">
				
			</view>
			<image src="../../static/order/no-order.png" mode="widthFix"></image>
			<view class="no-order-contain">
				目前没有可查看的订单哦~
			</view>
		</view>
	</view>
</template>

<script>
	import * as leanCloud from 'leancloud-storage/dist/av-weapp.js'
	export default {
		data() {
			return {
				items:[],
				orderlen:'',
				payment:'',
			}
		},
		onShow() {
			let _this = this;
			uni.setStorageSync('activeIndex',2)
			var query = new leanCloud.Query('Order');
			query.equalTo('user',leanCloud.User.current())
			query.find().then(function(res) {
				_this.orderlen = res.length
				var createdAtArr = []
				for (let i = 0; i < res.length; i++) {
					console.log(res[i].createdAt)
					createdAtArr.push(res[i].createdAt)
					if (i == res.length-1) {
						uni.setStorageSync('createdAt',createdAtArr.reverse())
					}
					for (let y = 0; y < res[i].attributes.server.length; y++) {
						/* for (let x in _this.items[i].attributes.server[y]) {
							console.log(_this.items[i].attributes.server[y][x])
							_this.items[i].attributes.server[y] = _this.items[i].attributes.server[y][x]
						} */
						res[i].attributes.server[y] = res[i].attributes.server[y].name
					}
				}
				let hahah = []
				console.log('_this.items')
				hahah = res.reverse()
				for (let i = 0; i < hahah.length; i++) {
					hahah[i].attributes['xixi'] = (30-((new Date()-new Date(hahah[i].createdAt))/60000)>0)
				}
				_this.items = hahah
				console.log(_this.items)
				for (let i = 0; i < _this.items.length; i++) {
					console.log(_this.items[i])
				}
				console.log(uni.getStorageSync('createdAt'))
				//console.log((new Date()-new Date(uni.getStorageSync('createdAt')[0]))/60000)
				console.log(new Date())
				for (let i = 0; i < _this.items.length; i++) {
					var mouth = ''
					var day = ''
					if ((new Date(_this.items[i].createdAt).getMonth() + 1)>9) {
						mouth = new Date(_this.items[i].createdAt).getMonth() + 1
					} else{
						mouth = '0'+ (new Date(_this.items[i].createdAt).getMonth() + 1)
					}
					if ((new Date(_this.items[i].createdAt).getDate())>9) {
						day = new Date(_this.items[i].createdAt).getDate()
					} else{
						day = '0'+ (new Date(_this.items[i].createdAt).getDate())
					}
					_this.items[i].createdAt=new Date(_this.items[i].createdAt).getFullYear()+'-'+mouth+'-'+day/* +':'+new Date(_this.items[i].createdAt).getHours()+':'+new Date(_this.items[i].createdAt).getMinutes()+':'+new Date(_this.items[i].createdAt).getSeconds() */
				}
				
			}), function(error) {
				console.log(error)
			};
		},
		methods:{
			order(index){
				let _this = this;
				console.log(_this.items[index])
				uni.setStorageSync('itemOne',_this.items[index])
				uni.setStorageSync('baoxian',_this.items[index].attributes.insurancePrice)
				uni.setStorageSync('createdAtIndex',uni.getStorageSync('createdAt')[index])
				uni.setStorageSync('updatedAtIndex',_this.items[index].updatedAt)
						if (_this.items[index].attributes.status == '已支付') {
							uni.navigateTo({
								url: '../order-details/order-details'
							});
						} else {
							uni.navigateTo({
								url: '../payment/payment'
							});
						}
			},
			assess(index){
				uni.setStorageSync('assessOrder',index)
				console.log(this.items[index])
				uni.setStorageSync("indexServerType",this.items[index].attributes.serviceType)
				uni.navigateTo({
					url: '../assess/assess'
				});
			},
			pay(index){
				if(30-((new Date()-new Date(uni.getStorageSync('createdAt')[index]))/60000)>0){
					uni.navigateToMiniProgram({
					      appId: 'wxe6c9e42e3b5227d0',
					      path: 'pages/index/index', 
					      success(res) {
					        console.log("success") 
					      }
					})
				}else if(30-((new Date()-new Date(uni.getStorageSync('createdAt')[index]))/60000)<=0){
					uni.showToast({
						title:'订单超时，交易关闭',
						icon:'none'
					})
				}
				
				/* console.log(this.items[index])
				console.log(30-(new Date()-new Date(uni.getStorageSync('createdAt')[index]))/60000)
				let _this = this
				if (30-((new Date()-new Date(uni.getStorageSync('createdAt')[index]))/60000)<=0) {
					uni.showLoading({
						title:'请重新下单',
						icon:'none'
					})
						var todo = leanCloud.Object.createWithoutData('Order', _this.items[index].id);
						  todo.destroy().then(function (success) {
							  console.log(_this.items[index].id)
							var query = new leanCloud.Query('Order');
							query.equalTo('user',leanCloud.User.current())
							query.find().then(function(res) {
								console.log(res)
								_this.items = res.reverse()
								_this.orderlen = res.length
								var createdAtArr = []
								_this.onShow()
								console.log(new Date(_this.items[1].createdAt))
								for (let i = 0; i < _this.items.length; i++) {
									createdAtArr.push(_this.items[i].createdAt)
									if (i == _this.items.length-1) {
										uni.setStorageSync('createdAt',createdAtArr)
									}
								}
								console.log(uni.getStorageSync('createdAt'))
								console.log((new Date()-new Date(uni.getStorageSync('createdAt')[1]))/60000)
								console.log(new Date())
								for (let i = 0; i < _this.items.length; i++) {
									_this.items[i].createdAt=new Date(_this.items[i].createdAt).getFullYear()+'-'+(new Date(_this.items[i].createdAt).getMonth()+1)+'-'+new Date(_this.items[i].createdAt).getDate()/* +':'+new Date(_this.items[i].createdAt).getHours()+':'+new Date(_this.items[i].createdAt).getMinutes()+':'+new Date(_this.items[i].createdAt).getSeconds() 
									//console.log(new Date(_this.items[i].createdAt).toLocaleString())
								}
								
							}), function(error) {
								console.log(error)
							};
						  }, function (error) {
							// 删除失败
						  });
						setTimeout(function(){
								uni.hideLoading()
						},1000)
				}else{
					leanCloud.Cloud.run('wxOrder', { productDescription: '佰橙科技-装修监理费', amount: _this.items[index].attributes.total*100}).then(data => {
							console.log(data);
							data.success = () => {
								var todo = leanCloud.Object.createWithoutData('Order', _this.items[index].id);
								todo.destroy().then(
									function(success) {
										var Todo = leanCloud.Object.extend('Order');
										var todo = new Todo();
										todo.set('user', leanCloud.User.current());
										todo.set('city',_this.items[index].attributes.city);
										todo.set('name',_this.items[index].attributes.name);
										todo.set('mobilePhoneNumber',_this.items[index].attributes.mobilePhoneNumber);
										todo.set('area', parseFloat(_this.items[index].attributes.area));
										todo.set('status', '已支付');
										todo.set('total',_this.items[index].attributes.total);
										todo.set('serviceType', _this.items[index].attributes.serviceType);
										todo.set('server', _this.items[index].attributes.server);
										todo.set('servicePrice', _this.items[index].attributes.servicePrice);
										todo.set('address',_this.items[index].attributes.address);
										todo.set('insuranceType',_this.items[index].attributes.insuranceType);
										todo.set('insurancePrice',_this.items[index].attributes.insurancePrice);
										todo.set('insuranceId',_this.items[index].attributes.insuranceId);
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
								uni.showToast({
									title: '支付失败',
									duration: 1000,
									icon:'none'
								});
							};
							uni.requestPayment(data);
						}).catch(error => {
							console.log(error);
						});
				} */
				
			}
		},
		/* onUnload() {
			uni.setStorageSync('activeIndex',2)
			uni.navigateTo({
				url: '../index/index'
			});
		} */
	}
</script>

<style scoped lang="less">
	.order-from{
		background: #F8F9FB;
		min-height: 100vh;
		.nonea{
			width: 100%;
			height: 30upx;
			background:#F8F9FB; 
		}
	}
.order-contain{
	width: 640upx;
	padding: 24upx;
	margin: 0 auto;
	background: #FFFFFF;
	border-radius: 10upx;
}
.one,.three,.four,.five{
	display: flex;
}
.one-one{
	color: #4A4A4A;
	font-size: 32upx;
}
.one-two{
	color: #333333;
	font-size: 30upx;
	flex: 1;
	text-align: right;
	display: none;
}
.two{
	font-size: 28upx;
	color: #B2B2B2;
}
.br{
	width: 100%;
	height: 20upx;
}
.three-one{
	font-size: 30upx;
	color: #4A4A4A;
}
.three-two{
	color: #4A4A4A;
	font-size: 30upx;
	flex: 1;
	text-align: right;
}
.four-one{
	font-weight: 600;
	font-size: 32upx;
	color: #4A4A4A;
}
.four-two{
	font-weight: 600;
	color: #4A4A4A;
	font-size: 32upx;
	flex: 1;
	text-align: right;
}
.button{
	text-align: center;
	font-size: 30upx;
	width: 192upx;
	height: 60upx;
	border: 2upx solid #FF9900;
	line-height: 60upx;
	border-radius: 10upx;
	margin-left: 24upx;
	float: right;
}
.five-one{
	color: #FF9900;
	margin-left: 250upx;
}
.five-two{
	color: #FFFFFF;
	background: #FF9900;
	display: none;
}
.none{
	display: none
}
.no-order{
	margin: 0 auto;
	text-align: center;
	.view{
		height: 300upx;
	}
	image{
		width: 414upx;
		height: 242upx;
	}
	.no-order-contain{
		font-size:32upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:#9b9b9b;
		line-height:48px;
	}
}
.xixiaaa{
	display: none;
}
.xixibbb{
	display: inline-block;
}
</style>
