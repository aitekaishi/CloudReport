<template>
	<view class="details">
		<view class="one">
			<view class="one-one">
				<view class="one-name">{{items.name}}</view>
				<view class="one-phone">{{items.mobilePhoneNumber}}</view>
			</view>
			<view class="one-two">
				<view class="one-city">{{items.city}} {{items.address}}</view>
			</view>
		</view>
		<view class="two">
			<view class="two-title">
				感谢您对橙子优家的信任，期待您再次购买我们的服务。
			</view>
			<view class="two-button">
				<button plain=true open-type='contact'>在线客服</button>
				<button @click="comment(items.orderId)" class="two-button-comment">评价</button>
			</view>
		</view>
		<view class="three">
			<view class="three-one">
				费用信息
			</view>
			<view class="three-two three-zzz">
				<view class="three-two-one">
					建筑面积
				</view>
				<view class="three-two-two">
					{{items.area}}m²
				</view>
			</view>
			<view class="three-two">
				<view class="three-two-one">
					服务类型
				</view>
				<view class="three-two-two">
					{{items.serviceType}}
				</view>
			</view>
			<view class="three-two" v-for="(itema, indexa) in items.server" :key="indexa" :class="{ xixiaaa: itema != '全程监理服务' }">
				<view class="three-two-one">
					服务费用
				</view>
				<view class="three-two-two">
					29元/m²×{{mianqi}}m²={{chukaibaoxian}}元
				</view>
			</view>
			<view v-for="(itema,indexa) in items.server" :key=indexa class="three-two">
						<view :class="{ xixiaaa: itema == '全程监理服务' }" class="three-onea">{{ itema }}</view>
						<view :class="{ xixiaaa: itema != '全程监理服务' }" class="three-onea">工程监理责任险</view>
						<view :class="{ 'xixiaaa': itema != '全程监理服务' }" class="three-twoa">¥{{baoxian}}</view>
						<view :class="{ 'xixiaaa': itema != '水电节点' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '泥工节点' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '木作节点' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '油漆节点' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '竣工节点' }" class="three-twoa">¥399</view>
						<view :class="{ 'xixiaaa': itema != '图纸审核' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '预算审核' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '合同陪签' }" class="three-twoa">¥299</view>
						
						<view :class="{ 'xixiaaa': itema != '毛坯房验房' }" class="three-twoa">¥299</view>
						<view :class="{ 'xixiaaa': itema != '精装房验房' }" class="three-twoa">¥399</view>
			</view>
			<!-- <view class="three-two three-zzz">
				<view class="three-two-one">
					监理工程险
				</view>
				<view class="three-two-two">
					¥{{items.insurancePrice}}元
				</view>
			</view> -->
			<view class="three-zzz">
				
			</view>
			<view class="three-two">
				<view class="three-two-one bold">
					总计
				</view>
				<view class="three-two-two bold">
					¥{{items.total}}
				</view>
			</view>
		</view>
		<view class="three four">
			<view class="three-one">
				订单信息
			</view>
			<view class="three-two">
				<view class="three-two-one">
					订单编号
				</view>
				<view class="three-two-two">
					{{items.orderId}}
				</view>
			</view>
			<view class="three-two">
				<view class="three-two-one">
					下单时间
				</view>
				<view class="three-two-two">
					{{createdAt}}
				</view>
			</view>
			<view class="three-two">
				<view class="three-two-one">
					完成时间
				</view>
				<view class="three-two-two">
					{{updatedAt}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[],
				createdAt:'',
				updatedAt:'',
				baoxian:'',
				mianqi:0,
				chukaibaoxian:0
			};
		},
		created() {
			let _this = this
			console.log(uni.getStorageSync('itemOne'))
			console.log(new Date(uni.getStorageSync('createdAtIndex')))
			_this.items = uni.getStorageSync('itemOne')
			console.log(this.items.serviceType)
			_this.baoxian = uni.getStorageSync('baoxian')
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
			
			var getMinutesa = '';
			if (new Date(uni.getStorageSync('createdAtIndex')).getMinutes() < 10) {
				getMinutesa = '0' + new Date(uni.getStorageSync('createdAtIndex')).getMinutes();
			} else {
				getMinutesa = new Date(uni.getStorageSync('createdAtIndex')).getMinutes();
			}
			var moutha = ''
			var daya = ''
			var houra = ''
			var msa = ''
			if ((new Date(uni.getStorageSync('updatedAtIndex')).getMonth() + 1)>9) {
				moutha = new Date(uni.getStorageSync('updatedAtIndex')).getMonth() + 1
			} else{
				moutha = '0'+ (new Date(uni.getStorageSync('updatedAtIndex')).getMonth() + 1)
			}
			if ((new Date(uni.getStorageSync('updatedAtIndex')).getDate())>9) {
				daya = new Date(uni.getStorageSync('updatedAtIndex')).getDate() + 1
			} else{
				daya = '0'+ (new Date(uni.getStorageSync('updatedAtIndex')).getDate())
			}
			if ((new Date(uni.getStorageSync('updatedAtIndex')).getHours())>9) {
				houra = new Date(uni.getStorageSync('updatedAtIndex')).getHours()
			} else{
				houra = '0'+ (new Date(uni.getStorageSync('updatedAtIndex')).getHours())
			}
			if ((new Date(uni.getStorageSync('updatedAtIndex')).getSeconds())>9) {
				msa = new Date(uni.getStorageSync('updatedAtIndex')).getSeconds()
			} else{
				msa = '0'+ (new Date(uni.getStorageSync('updatedAtIndex')).getSeconds())
			}
			this.createdAt=new Date(uni.getStorageSync('createdAtIndex')).getFullYear()+'/'+mouth+'/'+day +'  '+hour+':'+getMinutes+':'+ms
			this.updatedAt=new Date(uni.getStorageSync('updatedAtIndex')).getFullYear()+'/'+moutha+'/'+daya +'  '+houra+':'+getMinutesa+':'+msa
		},
		methods:{
			comment(index){
				uni.setStorageSync('assessOrder',index)
				uni.setStorageSync("indexServerType",this.items.serviceType)
				uni.navigateTo({
					url: '../assess/assess'
				});
			}
		}
	}
</script>

<style scoped>
	.xixiaaa{
		display: none !important;
	}
	.details{
		background-color: #F8F9FB;
		min-height: 100vh;
		
	}
.one-one,.one-two{
	display: flex;
}
.one-name{
	font-size: 36upx;
	line-height: 40upx;
	color: #FFFFFF;
	margin-right: 12upx;
	
}
.one-phone,.one-city{
	font-size: 30upx;
	line-height: 40upx;
	color: #FFFFFF;
}
.three-onea,.three-twoa{
	padding-top: 10upx;
	padding-bottom: 10upx;
	color: #666666;
	font-size: 30upx;
}
.three-twoa{
	color: #666666;
}
.one{
	background: -webkit-linear-gradient(#ff9900, #f1b04d);
	padding: 30upx;
	padding-bottom: 110upx;
}
.two{
	width: 618upx;
	height: 120upx;
	background: #FFFFFF;
	border-radius: 10upx;
	padding: 36upx;
	padding-top: 10upx;
	padding-bottom: 72upx;
	margin: 0 auto;
	position: relative;
	top: -80upx;
}
.two-title{
	color: #777777;
	font-size: 30upx;
}
.two-button{
	display: flex;
	width: 100%;
	margin-top: 20upx;
}
button,.two-button-comment{
	border: 2upx solid #FF9900;
	background: #FFFFFF;
	color: #FF9900;
	font-size: 30upx;
	height: 60upx;
	width: 192upx;
	line-height: 60upx;
	text-align: center;
	position: relative;
	left: 143upx;
}
.two-button-comment{
	border-radius: 10upx;
	background: #FF9900;
	color: #FFFFFF;
	border: none;
	left: 53upx;
	
}
.two-button-comment:after{
	border: none;
}
.three{
	padding: 36upx;
	width: 618upx;
	background: #FFFFFF;
	margin: 0 auto;
	border-radius: 10upx;
	position: relative;
	top: -50upx;
	padding-top: 20upx;
}
.three-one{
	font-size: 30upx;
	color: #4A4A4A;
	font-weight: 600;
	padding-bottom: 20upx;
	border-bottom: 2upx solid #CCCCCC;
}
.three-two{
	display: flex;
	justify-content: space-between;
}
.three-zzz{
	border-bottom: 2upx dashed #CCCCCC;
	padding-bottom: 20upx;
}

.three-two-one,.three-two-two{
	font-size: 30upx;
	color: #777777;
	padding-top: 20upx;
}
.three-two-two{
	flex: 1;
	text-align: right;
}
.bold{
	color: #4A4A4A;
	font-weight: 600;
}
.four{
	top: -20upx;
}
</style>
