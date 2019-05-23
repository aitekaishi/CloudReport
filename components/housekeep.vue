<template>
	<view class="gongdione">
		<view class="gongdione-one">
			<view class="gongdione-one-left">{{ address }}</view>
			<view class="gongdione-one-right" @click="qiehuan">切换</view>
		</view>
		<view class="gongdione-one">
			<view class="gongdione-two-left">当前阶段</view>
			<view class="gongdione-two-left">下一阶段</view>
		</view>
		<view class="gongdione-three">
			<view class="gongdione-three-left">{{ currentAcceptancePhase }}</view>
			<view class="gongdione-three-mid">
				<image src="../static/icon_duobianxing@2x.png" mode="widthFix" />
				<view class="gongdione-three-mid-contain">
					<view class="gongdione-three-mid-title">进行到</view>
					<view class="gongdione-three-mid-titlea">
						<text class="gongdione-three-mid-titlea-one">{{ progress }}</text>
						<text class="gongdione-three-mid-titlea-two">%</text>
					</view>
				</view>
			</view>
			<view class=" gongdione-three-right">{{ nextAcceptancePhase }}</view>
		</view>
		<view class="gongdi-jianli">
			已为您监理
			<text class="gongdi-day">{{ day }}</text>
			天
		</view>
		<view class="gongdione-one">
			<view class="gongdione-one-left-fore">
				<view class="gongdione-one-left-fore-text"></view>
				检查报告
			</view>
			<view :class="newxiaoxi == true? '.visnome .gongdione-one-right-fore':'.gongdione-one-right-fore'" @click="newmessage()">
				<view class="newmessage">新</view>
				<view class="newmessage-title">最近整改</view>
				<view class="newmessage-desc"></view>
			</view>
		</view>
		<view class="gongdione-z"></view>
		<view class="gongdione-y" :class="{ disnome: progress != 100 }">
			<view class="gongdione-y-left-contain">
				<view class="gongdione-y-left">
					<view class="gongdione-y-left-one"><image class="uni-steps-item-descb-imga" src="../static/icon_wancheng@2x.png"></image></view>
					<view class="gongdione-y-left-two">{{ createdAtsuccess }}</view>
				</view>
				<view class="gongdione-y-two">完成订单</view>
				<view class="uni-steps-item-descb">订单已完成</view>
			</view>
		</view>
		<view class="gongdione-y-bottom" :class="{ disnome: progress != 100 }"></view>
		<view v-for="(item, index) in containedItems" :key="index">
			<view class="gongdione-y" @click="index(index)">
				<view class="gongdione-y-left-contain">
					<view class="gongdione-y-left">
						<view class="gongdione-y-left-one">{{ len - index }}</view>
						<view class="gongdione-y-left-two">{{ item.updatedAt }}</view>
						<view class="gongdione-y-left-three" :class="{ vis: len - index != len }">最新</view>
					</view>
					<view class="gongdione-y-two">{{ item.formName }}</view>
					<view v-for="(item, indexa) in numarraya" :key="indexa" class="uni-steps-item-descb" :class="{ disnome: index != indexa }">
						符合标准：
						<image class="uni-steps-item-descb-img" src="../static/icon_hege@2x.png"></image>
						{{ item }}项合格
					</view>
					<view v-for="(item, indexb) in numarrayb" :key="indexb" class="uni-steps-item-descb" :class="{ disnome: index != indexb }">
						存在隐患：
						<image class="uni-steps-item-descb-img" src="../static/icon_buhege@2x.png"></image>
						{{ item }}项不合格
					</view>
				</view>
				<view class="gongdione-y-right"><image :src=item.form mode="widthFix" /></view>
			</view>
			<view class="gongdione-y-bottom"></view>
		</view>

		<view class="gongdione-y gongdione-y-last">
			<view class="gongdione-y-left-contain">
				<view class="gongdione-y-left">
					<view class="gongdione-y-left-one"><image class="uni-steps-item-descb-imga" src="../static/icon_shengcheng@2x.png"></image></view>
					<view class="gongdione-y-left-two">{{ createdAt }}</view>
				</view>
				<view class="gongdione-y-two">生成订单</view>
				<view class="uni-steps-item-descb">订单已生成</view>
			</view>
		</view>
		<!-- <uni-steps :data="[
		    {title:'买家下单',desc:'2018-11-11'},
		    {title:'卖家发货',desc:'2018-11-12'},
		    {title:'买家签收',desc:'2018-11-13'},
		    {title:'交易完成',desc:'2018-11-14'}]" 
		    direction="column" 
		    :active="20">
		</uni-steps> -->
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
	</view>
</template>

<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
//import uniSteps from "@/components/uni-steps/uni-steps.vue"
export default {
	data() {
		return {
			day: '',
			progress: 0,
			address: '',
			pickerSingleArray: [],
			pickerSingleArrayrever: [],
			themeColor: '#000000',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			list: '',
			currentAcceptancePhase: '',
			nextAcceptancePhase: '',
			nextTime: '',
			createdAt: '',
			containedItems:[],
			len: '',
			createdAtsuccess: '',
			numarray: [],
			numarraya: [],
			numarrayc: [],
			numarrayb: [],
			newxiaoxi:true,
		};
	},
	components: {
		mpvuePicker
		//uniSteps
	},
	mounted(){
		
	},
	methods: {
		newmessage(){
			uni.setStorageSync('newmessage',true);
			this.newxiaoxi = true;
			uni.setStorageSync('RectificationReportlena',uni.getStorageSync('RectificationReportlen'));
			uni.setStorageSync('rectify-repot',uni.getStorageSync('newmessagecloud')[uni.getStorageSync('RectificationReportlen')-1]);
			console.log(uni.getStorageSync('rectify-repot'))
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
			uni.showLoading({
				mask:true,
				title:'加载中'
			})
			let _this = this;
			_this.numarray = [];
			_this.numarrayc = [];
			_this.address = '';
			_this.address = e.label;
			uni.setStorageSync('address', _this.address);
			var querya = new leanCloud.Query('SupervisionCloudReport');
			querya.equalTo('projectAddress',e.label)
			querya.find().then(function(res) {
				uni.setStorageSync('cloudtitle', res[0].attributes.reportContent);
				uni.setStorageSync('cloudimage', res[0].attributes.livePicture);
				uni.setStorageSync('jianliId', res[0].attributes.supervisor);
				_this.currentAcceptancePhase = res[0].attributes.currentAcceptancePhase;
				_this.nextAcceptancePhase = res[0].attributes.nextAcceptancePhase;
				_this.day = parseInt((new Date() - new Date(res[0].createdAt.toString())) / 1000 / 60 / 60 / 24) + 1;
				_this.nextTime = res[0].attributes.nextAcceptancePhase;
				_this.createdAt =
					new Date(res[0].createdAt.toString()).getFullYear() +
					'年' +
					(new Date(res[0].createdAt.toString()).getMonth() + 1) +
					'月' +
					new Date(res[0].createdAt.toString()).getDate() +
					'日';
				}, function(error) {
			});
				var SupervisionItemresb = []
				var queryb = new leanCloud.Query('SupervisionItem');
				queryb.equalTo('projectAddress', _this.address)
				queryb.find().then(
					function(res) {
						uni.setStorageSync('SupervisionItemres',res)
						var SupervisionItemres = []
						SupervisionItemres = uni.getStorageSync('SupervisionItemres')
						for (var i = 0; i < SupervisionItemres.length; i++) {
							var num = 0;
							var numa = 0;
							var x = SupervisionItemres[i].data[0].data[0].match(/(\S*)&download/)[1]
							SupervisionItemres[i].form = x
							SupervisionItemres[i].updatedAt =
								new Date(SupervisionItemres[i].updatedAt.toString()).getFullYear() +
								'年' +
								(new Date(SupervisionItemres[i].updatedAt.toString()).getMonth() + 1) +
								'月' +
								new Date(SupervisionItemres[i].updatedAt.toString()).getDate() +
								'日';
							for (let y = 0; y < SupervisionItemres[i].data.length; y++) {
								if (SupervisionItemres[i].data[y].content == '合格') {
									num = num + 1;
								}
							}
							_this.numarray.push(num);
							_this.numarraya = _this.numarray.reverse();
							for (let y = 0; y < SupervisionItemres[i].data.length; y++) {
								if (SupervisionItemres[i].data[y].content == '不合格') {
									numa = numa + 1;
								}
							}
							_this.numarrayc.push(numa);
							_this.numarrayb = _this.numarrayc.reverse();
						}
						_this.containedItems = SupervisionItemres.reverse();
						_this.len = _this.containedItems.length;
						_this.progress = parseInt(_this.len*100 / 23);
						console.log('_this.containedItems')
						console.log(_this.containedItems)
						uni.hideLoading()
					},
					function(error) {}
				);
		},
		index(index) {
			let _this = this;
			uni.setStorageSync('hegenum', _this.numarraya[index]);
			uni.setStorageSync('buhegenum', _this.numarrayb[index]);
			//console.log(leanCloud.User.current());
			uni.setStorageSync('title', _this.containedItems[index].formName);
			var queryb = new leanCloud.Query('SupervisionItem');
			queryb.equalTo('projectAddress', _this.address).equalTo('formName', _this.containedItems[index].formName);
			queryb.find().then(
				function(res) {
					uni.setStorageSync('SupervisionItem', res);
						uni.navigateTo({
							url: '../cloud/cloud'
						});
				},
				function(error) {}
			);
		}
	},
	updated(){
		console.log('ddd')
	},
	created() {
		let _this = this;
		uni.showLoading({
			mask:true,
			title:'加载中'
		})
		setTimeout(function(){
			_this.newxiaoxi = uni.getStorageSync('newmessage')
			console.log('housekeep')
			var arr = uni.getStorageSync('SupervisionCloudReport')
			//uni.removeStorageSync('SupervisionItemres')
			for (let i = 0; i < arr.length; i++) {
				_this.pickerSingleArrayrever.push(JSON.parse('{"label":"' + arr[i].projectAddress + '"}'));
			}
			_this.pickerSingleArray = _this.pickerSingleArrayrever.reverse();
			var liupan = arr.length - 1;
			if(arr[liupan]){
				_this.address = arr[liupan].projectAddress;
				uni.setStorageSync('cloudtitle', arr[liupan].reportContent);
				uni.setStorageSync('cloudimage', arr[liupan].livePicture);
				uni.setStorageSync('jianliId', arr[liupan].supervisor);
				uni.setStorageSync('address', _this.address);
				_this.currentAcceptancePhase = arr[liupan].currentAcceptancePhase;
				_this.nextAcceptancePhase = arr[liupan].nextAcceptancePhase;
				_this.day = parseInt((new Date() - new Date(arr[liupan].createdAt.toString())) / 1000 / 60 / 60 / 24) + 1;
				uni.setStorageSync(
					'supervisordate',
					new Date(arr[liupan].reportDate.toString()).getFullYear() +
						'年' +
						(new Date(arr[liupan].reportDate.toString()).getMonth() + 1) +
						'月' +
						new Date(arr[liupan].reportDate.toString()).getDate() +
						'日'
				);
				_this.nextTime = arr[liupan].nextAcceptancePhase;
				_this.createdAt =
					new Date(arr[liupan].createdAt.toString()).getFullYear() +
					'年' +
					(new Date(arr[liupan].createdAt.toString()).getMonth() + 1) +
					'月' +
					new Date(arr[liupan].createdAt.toString()).getDate() +
					'日';
			}
					var SupervisionItemres = []
					SupervisionItemres = uni.getStorageSync('SupervisionItemres')
					for (var i = 0; i < SupervisionItemres.length; i++) {
						var num = 0;
						var numa = 0;
						var x = SupervisionItemres[i].data[0].data[0].match(/(\S*)&download/)[1]
						SupervisionItemres[i].form = x
						SupervisionItemres[i].updatedAt =
							new Date(SupervisionItemres[i].updatedAt.toString()).getFullYear() +
							'年' +
							(new Date(SupervisionItemres[i].updatedAt.toString()).getMonth() + 1) +
							'月' +
							new Date(SupervisionItemres[i].updatedAt.toString()).getDate() +
							'日';
						for (let y = 0; y < SupervisionItemres[i].data.length; y++) {
							if (SupervisionItemres[i].data[y].content == '合格') {
								num = num + 1;
							}
						}
						_this.numarray.push(num);
						_this.numarraya = _this.numarray.reverse();
						for (let y = 0; y < SupervisionItemres[i].data.length; y++) {
							if (SupervisionItemres[i].data[y].content == '不合格') {
								numa = numa + 1;
							}
						}
						_this.numarrayc.push(numa);
						_this.numarrayb = _this.numarrayc.reverse();
					}
					_this.containedItems = SupervisionItemres.reverse();
					_this.len = _this.containedItems.length;
					_this.progress = parseInt(_this.len*100 / 23);
					uni.hideLoading()
		},1000)
	}
};
</script>

<style scoped="scoped">
.vis {
	visibility: hidden;
}
.gongdione-y-bottom {
	height: 2upx;
	background: #cccccc;
	width: 650upx;
	position: relative;
	left: 70upx;
	top: -50upx;
}
.gongdione-y-contain {
	position: relative;
	top: -40upx;
	display: flex;
	justify-content: space-between;
}
.uni-steps-item-descb {
	font-size: 28upx;
	color: #666666;
	margin-left: 40upx;
}
.uni-steps-item-descb-img {
	width: 24upx;
	height: 24upx;
	margin-right: 10upx;
	position: relative;
	top: 0;
}
.gongdione {
	text-align: left;
	min-height: 100vh;
	width: 100vw;
	overflow-x: hidden;
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
.gongdione-two-left {
	font-size: 28upx;
	color: #999999;
}
.gongdione-three {
	display: flex;
	justify-content: space-between;
	height: 84upx;
	position: relative;
	top: -30upx;
}
.gongdione-three-left {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 266upx;
	color: #fefefe;
	font-size: 28upx;
	background: #f2941b;
	padding-left: 22upx;
}
.gongdione-three-mid {
	position: relative;
	top: -80upx;
}
.gongdione-three-mid image {
	width: 218upx;
	z-index: 1000;
}
.gongdione-three-right {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #fefefe;
	font-size: 28upx;
	width: 266upx;
	background: #f2941b;
	padding: 0 22upx;
	text-align: justify;
}
.gongdione-three-mid-title {
	font-size: 24upx;
	color: #ffffff;
}
.gongdione-three-mid-contain {
	position: relative;
	top: -200upx;
	left: 73upx;
}
.gongdione-one-right-fore {
	font-size: 24upx;
	color: #999999;
	position: relative;
	top: 8upx;
}
.gongdione-three-mid-titlea {
	width: 200upx;
	position: relative;
	left: -60upx;
	text-align: center;
	top: -10upx;
}
.gongdione-three-mid-titlea-one {
	font-size: 58upx;
	color: #ffffff;
}
.gongdione-three-mid-titlea-two {
	font-size: 32upx;
	color: #ffffff;
}
.gongdi-day {
	color: #ff9900;
	font-size: 42upx;
	line-height: 33upx;
	padding-left: 10upx;
	padding-right: 10upx;
	position: relative;
	top: 5upx;
}
.gongdi-jianli {
	color: #ff9900;
	font-size: 28upx;
	line-height: 33upx;
	height: 48upx;
	text-align: center;
	border: 2upx solid #ff9900;
	display: inline-block;
	padding: 10upx 20upx 0 20upx;
	border-radius: 30upx;
	width: 300upx;
	margin: 60upx 220upx 10upx 200upx;
}
.gongdione-one-left-fore {
	color: #333333;
	font-size: 32upx;
	padding: 0;
	font-weight: 600;
}
.gongdione-one-left-fore-text {
	width: 6upx;
	height: 30upx;
	background: #ff9900;
	display: inline-block;
	position: relative;
	top: 5upx;
	margin-right: 10upx;
}
.gongdione-z {
	height: 1upx;
	background: #cccccc;
	margin: 0 22upx 0 22upx;
	position: relative;
	top: -10upx;
	margin-bottom: 40upx;
}
.gongdione-y {
	display: flex;
	justify-content: space-between;
	padding-top: 70upx;
	border-left: 2upx dashed #999999;
	margin: 0 30upx 0 30upx;
}
.gongdione-y-last {
	border-left: none;
	border-bottom: none;
}
.gongdione-y-none {
	padding-top: 0;
}
.gongdione-y-right {
	width: 248upx;
	height: 178upx;
	position: relative;
	top: -80upx;
}
.gongdione-y-right image {
	width: 248upx;
	height: 178upx !important;
}
.gongdione-y-left {
	display: flex;
	justify-content: flex-start;
	position: relative;
	left: -16upx;
}
.gongdione-y-left-one {
	width: 30upx;
	height: 30upx;
	border-radius: 50%;
	background: #ff9900;
	font-size: 24upx;
	text-align: center;
	line-height: 30upx;
	color: #ffffff;
	display: inline-block;
}
.gongdione-y-left-two {
	color: #999999;
	font-size: 28upx;
	position: relative;
	top: -5upx;
	left: 10upx;
}
.gongdione-y-left-three {
	color: #ff9900;
	font-size: 28upx;
	position: relative;
	left: 30upx;
	height: 30upx;
	line-height: 30upx;
	padding: 0 15upx;
	border-radius: 10upx;
	border: 2upx solid #ff9900;
}
.gongdione-y-two {
	font-size: 32upx;
	color: #333333;
	margin-left: 40upx;
}
.uni-steps-item-descb-imga {
	width: 30upx;
	height: 30upx;
}
.gongdione-y-left-contain {
	position: relative;
	top: -85upx;
}
.disnome {
	display: none;
}
.newmessage{
	display: inline-block;
	width: 36upx;
	height: 36upx;
	background: #EE9E47;
	color: #FFFFFF;
	text-align: center;
	font-size: 28upx;
	line-height: 36upx;
}
.visnome{
	visibility: hidden;
}
.newmessage-title{
	display: inline-block;
	font-size: 28upx;
	color: #333333;
	margin-left: 15upx;
	margin-right: 10upx;
}
.newmessage-desc{
	display: inline-block;
	width: 16upx;
	height: 16upx;
	background: #FF0000;
	border-radius: 50%;
}
</style>
