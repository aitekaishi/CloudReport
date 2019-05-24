<template>
	<view class="page">
		<view class="page__bd">
			<view class="weui-tab">
				<view class="weui-navbar">
					<block v-for="(item, index) in tabs" :key="index">
						<view :id="index" :class="{ 'weui-bar__item_on': activeIndex == index }" class="weui-navbar__item" @click="tabClick(index)">
							<view class="weui-navbar__title">{{ item }}</view>
						</view>
					</block>
					<view class="weui-navbar__slider" :class="navbarSliderClass"></view>
				</view>
				<view class="weui-tab__panel">
					<view class="weui-tab__content" :hidden="activeIndex != 0">
						<view class="gongdione">
							<view class="gongdione-one" :class="{ xixiaaaa: activeIndex2 == false }">
								<view class="gongdione-one-left">{{ address }}</view>
								<view class="gongdione-one-right" @click="qiehuan">切换</view>
							</view>
							<view :class="{ xixiaaaa: activeIndex1 == false }" class="gongdione-one">
								<view class="gongdione-two-left">当前阶段</view>
								<view class="gongdione-two-left">下一阶段</view>
							</view>
							<view :class="{ xixiaaaa: activeIndex1 == false }" class="gongdione-three">
								<view class="gongdione-three-left">{{ currentAcceptancePhase }}</view>
								<view class="gongdione-three-mid">
									<image src="/static/icon_duobianxing@2x.png" mode="widthFix" />
									<view class="gongdione-three-mid-contain">
										<view class="gongdione-three-mid-title">进行到</view>
										<view class="gongdione-three-mid-titlea">
											<text class="gongdione-three-mid-titlea-one">{{ progress }}</text>
											<text class="gongdione-three-mid-titlea-two">%</text>
										</view>
									</view>
								</view>
								<view :class="{ xixiaaaa: activeIndex1 == false }" class=" gongdione-three-right">{{ nextAcceptancePhase }}</view>
							</view>
							<view :class="{ xixiaaaa: activeIndex1 == false }" class="gongdi-jianli">
								已为您监理
								<text class="gongdi-day">{{ day }}</text>
								天
							</view>
							<view :class="{ xixiaaaa: activeIndex1 == false }" class="gongdione-one">
								<view class="gongdione-one-left-fore">
									<view class="gongdione-one-left-fore-text"></view>
									检查报告
								</view>
								<view :class="{ xixiaaaa: activeIndex1 == false || newxiaoxi == false }" class="gongdione-one-right-fore" @click="newmessage()">
									<view class="newmessage">新</view>
									<view class="newmessage-title">最近整改</view>
									<view class="newmessage-desc"></view>
								</view>
							</view>
							<view :class="{ xixiaaaa: activeIndex1 == false }" class="gongdione-z"></view>
							<view :class="{ xixiaaaa: activeIndex1 == false || progress != 100 }" class="gongdione-y">
								<view class="gongdione-y-left-contain">
									<view class="gongdione-y-left">
										<view class="gongdione-y-left-one"><image class="uni-steps-item-descb-imga" src="/static/icon_wancheng@2x.png"></image></view>
										<view class="gongdione-y-left-two">{{ createdAtsuccess }}</view>
									</view>
									<view class="gongdione-y-two">完成订单</view>
									<view class="uni-steps-item-descb">订单已完成</view>
								</view>
							</view>
							<view :class="{ xixiaaaa: activeIndex1 == false || progress != 100 }" class="gongdione-y-bottom"></view>
							<view :class="{ xixiaaaa: activeIndex1 == false }" v-for="(item, index) in containedItems" :key="index">
								<view class="gongdione-y" @click="index(index)">
									<view class="gongdione-y-left-contain">
										<view class="gongdione-y-left">
											<view class="gongdione-y-left-one">{{ len - index }}</view>
											<view class="gongdione-y-left-two">{{ item.updatedAt }}</view>
											<view class="gongdione-y-left-three" :class="{ vis: len - index != len }">最新</view>
										</view>
										<view class="gongdione-y-two">{{ item.formName }}</view>
										<view class="uni-steps-item-descb">
											符合标准：
											<image class="uni-steps-item-descb-img" src="/static/icon_hege@2x.png"></image>
											{{ item.eligibilityCount }}项合格
										</view>
										<view class="uni-steps-item-descb">
											存在隐患：
											<image class="uni-steps-item-descb-img" src="/static/icon_buhege@2x.png"></image>
											{{ item.notEligibilityCount }}项不合格
										</view>
									</view>
									<view class="gongdione-y-right"><image lazy-load :src="item.data[0].data[0]" mode="widthFix" /></view>
								</view>
								<view class="gongdione-y-bottom"></view>
							</view>

							<view :class="{ xixiaaaa: activeIndex1 == false }" class="gongdione-y gongdione-y-last">
								<view class="gongdione-y-left-contain">
									<view class="gongdione-y-left">
										<view class="gongdione-y-left-one"><image class="uni-steps-item-descb-imga" src="/static/icon_shengcheng@2x.png"></image></view>
										<view class="gongdione-y-left-two">{{ createdAt }}</view>
									</view>
									<view class="gongdione-y-two">生成订单</view>
									<view class="uni-steps-item-descb">订单已生成</view>
								</view>
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
							<mpvue-picker
								:themeColor="themeColora"
								ref="mpvuePickera"
								:mode="modea"
								:deepLength="deepLengtha"
								:pickerValueDefault="pickerValueDefaulta"
								@onConfirm="onConfirma"
								@onCancel="onCancela"
								:pickerValueArray="pickerValueArraya"
							></mpvue-picker>
						</view>
					</view>
					<view class="NoOrder" :class="{ xixiaaaa: activeIndex1 == true }">没有订单</view>
					<view class="weui-tab__content" :hidden="activeIndex != 1"><myinfo></myinfo></view>
				</view>
			</view>
		</view>
		<view :class="{ xixiaaaa: userinfo == false }" class="uni-mask"></view>
		<view :class="{ xixiaaaa: userinfo == false }" class="denglu">
			<view class="denglu-title">
				<view>
					<image class="image" src="http://lc-ndknejad.cn-n1.lcfile.com/e42c97188659375d7860/icon_shoucidenglu%402x.png" mode=""></image>
					<text>首次登录时，需要完成以下步骤</text>
				</view>
			</view>
			<view style="height: 20upx;"></view>
			<view class="bottoma"></view>
			<view class="denglu-title-title">授权佰橙优家读取您的微信昵称和头像</view>
			<button :class="{ xixiaaaa: xixia == false }" class="shouquan button" open-type="getUserInfo" @getuserinfo="getUser" plain="true" :loading="load">一键授权</button>
			<button class="button" :class="{ xixiaaaa: xixia == true }" plain="true" disabled="disabled">已授权</button>
			<view style="height: 30upx;"></view>
			<view class="bottoma"></view>
			<view class="denglu-title-title">授权佰橙优家读取您微信绑定的手机号</view>
			<view style="height: 30upx;"></view>
			<view class="bottoma"></view>
			<button :class="{ xixiaaaa: xixib == false }" class="shouquan button zzzzz" plain="true" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				一键授权微信认证手机号
			</button>
			<button class="button zzzzz" :class="{ xixiaaaa: xixib == true }" plain="true" disabled="disabled">已授权</button>
		</view>
	</view>
</template>
<script>
import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
import md5 from 'md5';
var WXBizDataCrypt = require('../../WXBizDataCrypt');
import housekeep from '@/components/housekeep';
import myinfo from '@/components/myinfo';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import denglu from '@/components/denglu.vue';
export default {
	data() {
		return {
			tabs: ['监理云报告', '我的'],
			activeIndex: 0,
			fontSize: 30,
			ac: false,
			phonea: 1,
			day: '0',
			progress: 0,
			address: '',
			pickerSingleArray: [],
			themeColor: '#000000',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			pickerSingleArraya: [],
			themeColora: '#000000',
			modea: '',
			deepLengtha: 1,
			pickerValueDefaulta: [0],
			pickerValueArraya: [],
			list: '',
			activeIndex2: false,
			currentAcceptancePhase: '无',
			nextAcceptancePhase: '无',
			createdAt: '',
			containedItems: [],
			len: '',
			createdAtsuccess: '',
			newxiaoxi: false,
			numarrayx: [],
			numarrayy: [],
			xxxx: [],
			userinfo: false,
			xixia: true,
			xixib: true,
			login: true,
			activeIndex1: false
			//navbarSliderClass:'weui-navbar__slider_0'
		};
	},
	components: {
		housekeep,
		myinfo,
		mpvuePicker,
		denglu
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '佰橙优家'
		});
		uni.setNavigationBarColor({
			frontColor: '#000000',
			backgroundColor: '#ffffff'
		});
		if (uni.getSystemInfoSync().platform == 'devtools') {
			this.ac = true;
		}
	},
	updated() {
		var _this = this;
		if (_this.xixia == false && _this.xixib == false) {
			_this.userinfo = false;
		}
	},
	computed: {
		navbarSliderClass() {
			let _this = this;
			/* if (uni.getStorageSync('getPhoneNumber') == 1) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				});
				uni.removeStorageSync('getPhoneNumber');
			} */
			console.log(leanCloud.User.current());
			if (this.activeIndex == 0) {
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userInfo'] || uni.getStorageSync('avatarUrl') == '') {
							_this.userinfo = true;
						} else {
							_this.userinfo = false;
							var MyHouseQuery = new leanCloud.Query('Order');
							MyHouseQuery.equalTo('user', leanCloud.User.current()).equalTo('status', '已支付');
							MyHouseQuery.find().then(
								function(res) {
									console.log('1.请求Order');
									console.log(res);
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
									if (res.length == 0) {
										uni.showToast({
											title: '暂未添加房屋',
											icon: 'none'
										});
										uni.hideLoading();
										_this.activeIndex2 = false;
										_this.activeIndex1 = false;
										return;
									} else {
										_this.activeIndex2 = true;
										_this.activeIndex1 = true;
									}
									if (uni.getStorageSync('shouyedizhi') == '') {
										_this.address = res[res.length - 1].attributes.address;
									} else {
										_this.address = uni.getStorageSync('shouyedizhi');
									}
									if (uni.getStorageSync('fuwutype') == '') {
										console.log('没服务记录');
										var OrderQuery = new leanCloud.Query('Order');
										OrderQuery.equalTo('user', leanCloud.User.current())
											.equalTo('status', '已支付')
											.equalTo('address', _this.address);
										OrderQuery.find().then(
											function(res) {
												uni.hideLoading();
												console.log('3.根据房屋地址找订单');
												console.log(res);
												if (res.length == 0) {
													uni.showToast({
														title: '当前房屋暂无订单',
														icon: 'none'
													});
													_this.activeIndex1 = false;
												} else {
													_this.activeIndex1 = true;
													uni.setStorageSync('fuwutype', res[res.length-1].id);
													var OrderQuerya = new leanCloud.Query('Order');
													OrderQuerya.equalTo('user', leanCloud.User.current())
														.equalTo('status', '已支付')
														.equalTo('address', _this.address)
														.equalTo('objectId', res[res.length-1].id);
													OrderQuerya.find().then(
														function(res) {
															console.log('4.根据房屋地址跟服务类型找订单');
															console.log(res);
															uni.setStorageSync('progressA',res[0].attributes.server.length);
															_this.createdAt =
																new Date(res[0].createdAt.toString()).getFullYear() +
																'年' +
																(new Date(res[0].createdAt.toString()).getMonth() + 1) +
																'月' +
																new Date(res[0].createdAt.toString()).getDate() +
																'日';
																console.log('_this.createdAt')
																console.log(_this.createdAt)
															uni.setStorageSync('orderId', res[0].id);
															var ContractQuery = new leanCloud.Query('Contract');
															ContractQuery.equalTo('orderPointer', res[0].id);
															ContractQuery.find().then(
																function(res) {
																	console.log('5.根据订单号找合同');
																	console.log(res);
																	var SupervisionCloudReportb = new leanCloud.Query('RectificationReport');
																	SupervisionCloudReportb.equalTo('contractPointer', res[0].id);
																	SupervisionCloudReportb.find().then(
																		function(res) {
																			console.log('6.根据contractPointer找整改报告');
																			console.log(res);
																			uni.removeStorageSync('RectificationReportlen');
																			uni.removeStorageSync('newmessagecloud');
																			uni.setStorageSync('newmessagecloud', res);
																			console.log(uni.getStorageSync('newmessagecloud'));
																			uni.setStorageSync('RectificationReportlen', res.length);
																			if (res.length == uni.getStorageSync('newmessagelen') || res.length == 0) {
																				_this.newxiaoxi = false;
																			} else {
																				_this.newxiaoxi = true;
																			}
																		},
																		function(error) {}
																	);
																	console.log('asaasasa');
																	_this.currentAcceptancePhase = '无'
																	_this.nextAcceptancePhase = '无'
																	var queryaaa = new leanCloud.Query('SupervisionCloudReport');
																	queryaaa.equalTo('contractPointer', res[0].id);
																	queryaaa.find().then(
																		function(res) {
																			console.log('根据contractPointer请求SupervisionCloudReport');
																			console.log(res);
																			if (res.length > 0) {
																				_this.currentAcceptancePhase = res[res.length - 1].attributes.currentAcceptancePhase;
																				_this.nextAcceptancePhase = res[res.length - 1].attributes.nextAcceptancePhase;
																			}
																		},
																		function(error) {}
																	);
																	var queryb = new leanCloud.Query('SupervisionItem');
																	queryb.equalTo('contractPointer', res[0].id);
																	queryb.find().then(
																		function(res) {
																			console.log('根据contractPointer请求SupervisionItem');
																			console.log(res);
																			_this.day = res.length;
																			console.log(uni.getStorageSync('fuwutype'));
																				var queryb = new leanCloud.Query('Order');
																				queryb.equalTo('objectId', uni.getStorageSync('fuwutype'));
																				queryb.find().then(
																					function(resa) {
																						console.log('resa')
																						console.log(resa)
																						if (resa[0].attributes.serviceType == '全程监理服务（29元/m²）') {
																							_this.progress = parseInt((res.length / 23) * 100);
																						} else {
																							_this.progress = parseInt((res.length / uni.getStorageSync('progressA')) * 100);}
																					},
																					function(error) {}
																				);
																			for (var i = 0; i < res.length; i++) {
																				if (!res[i].attributes.data[0].data[0]) {
																					res[i].attributes.data[0].data[0] = ''
																					res[i].updatedAt =
																						new Date(res[i].updatedAt.toString()).getFullYear() +
																						'年' +
																						(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
																						'月' +
																						new Date(res[i].updatedAt.toString()).getDate() +
																						'日';
																				}else{
																					res[i].attributes.data[0].data[0] = res[i].attributes.data[0].data[0].match(/(\S*)&download/)[1];
																					res[i].updatedAt =
																						new Date(res[i].updatedAt.toString()).getFullYear() +
																						'年' +
																						(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
																						'月' +
																						new Date(res[i].updatedAt.toString()).getDate() +
																						'日';
																				}
																				
																			}
																			_this.createdAtsuccess = res[res.length-1].updatedAt
																			_this.containedItems = res;
																			console.log(_this.containedItems);
																			_this.len = _this.containedItems.length;
																			uni.hideLoading();
																		},
																		function(error) {}
																	);
																},
																function(error) {}
															);
														},
														function(error) {}
													);
												}
											},
											function(error) {
												uni.hideLoading();
											}
										);
									} else {
										console.log('有服务记录');
										var OrderQuery = new leanCloud.Query('Order');
										OrderQuery.equalTo('user', leanCloud.User.current())
											.equalTo('status', '已支付')
											.equalTo('address', _this.address);
										OrderQuery.find().then(
											function(res) {
												uni.hideLoading();
												console.log('3.根据房屋地址找订单');
												console.log(res);
												if (res.length == 0) {
													uni.showToast({
														title: '当前房屋暂无订单',
														icon: 'none'
													});
													_this.activeIndex1 = false;
												} else {
													_this.activeIndex1 = true;
													var OrderQuerya = new leanCloud.Query('Order');
													OrderQuerya.equalTo('user', leanCloud.User.current())
														.equalTo('status', '已支付')
														.equalTo('address', _this.address)
														.equalTo('objectId', uni.getStorageSync('fuwutype'));
													OrderQuerya.find().then(
														function(res) {
															console.log('4.根据房屋地址跟服务类型找订单');
															console.log(res);
															console.log(res[0].attributes.server.length);
															uni.setStorageSync('progressA',res[0].attributes.server.length);
															console.log('555')
															console.log(uni.getStorageSync('progressA').length)
															/* _this.day = parseInt((new Date() - new Date(res[0].createdAt.toString())) / 1000 / 60 / 60 / 24) + 1; */
															_this.createdAt =
																new Date(res[0].createdAt.toString()).getFullYear() +
																'年' +
																(new Date(res[0].createdAt.toString()).getMonth() + 1) +
																'月' +
																new Date(res[0].createdAt.toString()).getDate() +
																'日';
																console.log('_this.createdAt')
																console.log(_this.createdAt)
															uni.setStorageSync('orderId', res[0].id);
															var ContractQuery = new leanCloud.Query('Contract');
															ContractQuery.equalTo('orderPointer', res[0].id);
															ContractQuery.find().then(
																function(res) {
																	console.log('5.根据订单号找合同');
																	console.log(res);
																	var SupervisionCloudReportb = new leanCloud.Query('RectificationReport');
																	SupervisionCloudReportb.equalTo('contractPointer', res[0].id);
																	SupervisionCloudReportb.find().then(
																		function(res) {
																			console.log('6.根据contractPointer找整改报告');
																			console.log(res);
																			uni.removeStorageSync('RectificationReportlen');
																			uni.removeStorageSync('newmessagecloud');
																			uni.setStorageSync('newmessagecloud', res);
																			console.log(uni.getStorageSync('newmessagecloud'));
																			uni.setStorageSync('RectificationReportlen', res.length);
																			if (res.length == uni.getStorageSync('newmessagelen') || res.length == 0) {
																				_this.newxiaoxi = false;
																			} else {
																				_this.newxiaoxi = true;
																			}
																		},
																		function(error) {}
																	);
																	console.log('asaasasa');
																	_this.currentAcceptancePhase = '无'
																	_this.nextAcceptancePhase = '无'
																	var queryaaa = new leanCloud.Query('SupervisionCloudReport');
																	queryaaa.equalTo('contractPointer', res[0].id);
																	queryaaa.find().then(
																		function(res) {
																			console.log('根据contractPointer请求SupervisionCloudReport');
																			console.log(res);
																			if (res.length > 0) {
																				_this.currentAcceptancePhase = res[res.length - 1].attributes.currentAcceptancePhase;
																				_this.nextAcceptancePhase = res[res.length - 1].attributes.nextAcceptancePhase;
																			}
																		},
																		function(error) {}
																	);
																	var queryb = new leanCloud.Query('SupervisionItem');
																	queryb.equalTo('contractPointer', res[0].id);
																	queryb.find().then(
																		function(res) {
																			console.log('根据contractPointer请求SupervisionItem');
																			console.log(res);
																			_this.day = res.length;
																			console.log(uni.getStorageSync('fuwutype'));
																				var queryb = new leanCloud.Query('Order');
																				queryb.equalTo('objectId', uni.getStorageSync('fuwutype'));
																				queryb.find().then(
																					function(resa) {
																						console.log('resa')
																						console.log(resa)
																						if (resa[0].attributes.serviceType == '全程监理服务（29元/m²）') {
																							_this.progress = parseInt((res.length / 23) * 100);
																						} else {
																							_this.progress = parseInt((res.length / uni.getStorageSync('progressA')) * 100);}
																					},
																					function(error) {}
																				);
																			for (var i = 0; i < res.length; i++) {
																				if (!res[i].attributes.data[0].data[0]) {
																					res[i].attributes.data[0].data[0] = ''
																					res[i].updatedAt =
																						new Date(res[i].updatedAt.toString()).getFullYear() +
																						'年' +
																						(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
																						'月' +
																						new Date(res[i].updatedAt.toString()).getDate() +
																						'日';
																				}else{
																					res[i].attributes.data[0].data[0] = res[i].attributes.data[0].data[0].match(/(\S*)&download/)[1];
																					res[i].updatedAt =
																						new Date(res[i].updatedAt.toString()).getFullYear() +
																						'年' +
																						(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
																						'月' +
																						new Date(res[i].updatedAt.toString()).getDate() +
																						'日';
																				}
																				
																			}
																			_this.createdAtsuccess = res[res.length-1].updatedAt
																			_this.containedItems = res;
																			console.log(_this.containedItems);
																			_this.len = _this.containedItems.length;
																			uni.hideLoading();
																		},
																		function(error) {}
																	);
																},
																function(error) {}
															);
														},
														function(error) {}
													);
												}
											},
											function(error) {
												uni.hideLoading();
											}
										);
									}
								},
								function(error) {
									console.log(error);
								}
							);
						}
					}
				});
				return 'weui-navbar__slider_0';
			}
			if (this.activeIndex == 1) {
				_this.activeIndex1 = true;
				uni.hideLoading();
				return 'weui-navbar__slider_1';
			}
		}
	},
	methods: {
		tabClick(index) {
			let _this = this;
			_this.activeIndex = index;
		},
		newmessage() {
			let _this = this;
			_this.newxiaoxi = false;
			console.log(uni.getStorageSync('newmessagecloud'));
			uni.removeStorageSync('newmessagelen');
			console.log(uni.getStorageSync('RectificationReportlen'));
			uni.setStorageSync('newmessagelen', uni.getStorageSync('RectificationReportlen'));
			console.log(uni.getStorageSync('newmessagecloud'));
			uni.setStorageSync('rectify-repot', uni.getStorageSync('newmessagecloud')[uni.getStorageSync('RectificationReportlen') - 1]);
			console.log(uni.getStorageSync('newmessagecloud'));
			uni.navigateTo({
				url: '../rectify-repot/rectify-repot'
			});
		},
		onCancel(e) {},
		onCancela(e) {},
		qiehuan() {
			this.pickerValueArray = this.pickerSingleArray;
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			let _this = this;
			uni.setStorageSync('shouyedizhi', e.label);
			var OrderQuery = new leanCloud.Query('Order');
			OrderQuery.equalTo('user', leanCloud.User.current())
				.equalTo('address', e.label).equalTo('status', '已支付')
			OrderQuery.find().then(
				function(res) {
					console.log('获取订单');
					console.log(res);
					var pickerSingleArrayreverb = [];
					_this.pickerSingleArraya = [];
					if (res.length == 0) {
						uni.showToast({
							title: '当前房屋暂无订单',
							icon: 'none'
						});
						_this.activeIndex1 = false;
						_this.currentAcceptancePhase = '无';
						_this.nextAcceptancePhase = '无';
						_this.day = '';
						_this.progress = 0;
					} else {
						_this.activeIndex1 = true;
						
						var orderId = [];
						for (let i = 0; i < res.length; i++) {
							/* for (let y = 0; y < res[i].attributes.server.length; y++) {
								for (let x in res[i].attributes.server[y]) {
									res[i].attributes.server[y] = res[i].attributes.server[y][x]
								}
							} */
							var name = [];
							for (let y = 0; y < res[i].attributes.server.length; y++) {
								name.push(res[i].attributes.server[y].name)
								
							}
							orderId.push(res[i].id)
							orderId = orderId.reverse()
							uni.setStorageSync('orderIdId',orderId)
							console.log(name)
							pickerSingleArrayreverb.push(JSON.parse('{"label":"' + name.toString() + '"}'));
							_this.pickerSingleArraya = pickerSingleArrayreverb.reverse();
							
						}
						console.log(orderId)
						_this.pickerValueArraya = _this.pickerSingleArraya;
						_this.modea = 'selector';
						_this.deepLengtha = 1;
						_this.pickerValueDefaulta = [0];
						_this.$refs.mpvuePickera.show();
					}
				},
				function(error) {}
			);
			_this.address = e.label;
		},
		onConfirma(e) {
			let _this = this;
			_this.containedItems = [];
			console.log(e.index[0])
			uni.setStorageSync('fuwutype', uni.getStorageSync('orderIdId')[e.index[0]]);
			var OrderQuerya = new leanCloud.Query('Order');
			OrderQuerya.equalTo('user', leanCloud.User.current())
				.equalTo('status', '已支付')
				.equalTo('address', uni.getStorageSync('shouyedizhi'))
				.equalTo('objectId',uni.getStorageSync('orderIdId')[e.index[0]] );
			OrderQuerya.find().then(
				function(res) {
					console.log('4.根据房屋地址跟服务类型找订单');
					console.log(res);
					console.log(res[0].attributes.server.length);
					uni.setStorageSync('progressA',res[0].attributes.server.length);
					_this.createdAt =new Date(res[0].createdAt.toString()).getFullYear() +'年' +(new Date(res[0].createdAt.toString()).getMonth() + 1) +'月' +new Date(res[0].createdAt.toString()).getDate() +'日';
						console.log('_this.createdAt')
						console.log(_this.createdAt)
					uni.setStorageSync('orderId', res[0].id);
					var ContractQuery = new leanCloud.Query('Contract');
					ContractQuery.equalTo('orderPointer', res[0].id);
					ContractQuery.find().then(
						function(res) {
							console.log('5.根据订单号找合同');
							console.log(res);
							var SupervisionCloudReportb = new leanCloud.Query('RectificationReport');
							SupervisionCloudReportb.equalTo('contractPointer', res[0].id);
							SupervisionCloudReportb.find().then(
								function(res) {
									console.log('6.根据contractPointer找整改报告');
									console.log(res);
									uni.removeStorageSync('RectificationReportlen');
									uni.removeStorageSync('newmessagecloud');
									uni.setStorageSync('newmessagecloud', res);
									console.log(uni.getStorageSync('newmessagecloud'));
									uni.setStorageSync('RectificationReportlen', res.length);
									if (res.length == uni.getStorageSync('newmessagelen') || res.length == 0) {
										_this.newxiaoxi = false;
									} else {
										_this.newxiaoxi = true;
									}
								},
								function(error) {}
							);
							console.log('asaasasa');
							_this.currentAcceptancePhase = '无'
							_this.nextAcceptancePhase = '无'
							var queryaaa = new leanCloud.Query('SupervisionCloudReport');
							queryaaa.equalTo('contractPointer', res[0].id);
							queryaaa.find().then(
								function(res) {
									console.log('根据contractPointer请求SupervisionCloudReport');
									console.log(res);
									if (res.length > 0) {
										_this.currentAcceptancePhase = res[res.length - 1].attributes.currentAcceptancePhase;
										_this.nextAcceptancePhase = res[res.length - 1].attributes.nextAcceptancePhase;
									}
								},
								function(error) {}
							);
							var queryb = new leanCloud.Query('SupervisionItem');
							queryb.equalTo('contractPointer', res[0].id);
							queryb.find().then(
								function(res) {
									console.log('根据contractPointer请求SupervisionItem');
									console.log(res);
									_this.day = res.length;
									console.log(uni.getStorageSync('fuwutype'));
										var queryb = new leanCloud.Query('Order');
										queryb.equalTo('objectId', uni.getStorageSync('fuwutype'));
										queryb.find().then(
											function(resa) {
												console.log('resa')
												console.log(resa)
												if (resa[0].attributes.serviceType == '全程监理服务（29元/m²）') {
													_this.progress = parseInt((res.length / 23) * 100);
												} else {
													_this.progress = parseInt((res.length / uni.getStorageSync('progressA')) * 100);}
											},
											function(error) {}
										);
									for (var i = 0; i < res.length; i++) {
										if (!res[i].attributes.data[0].data[0]) {
											res[i].attributes.data[0].data[0] = ''
											res[i].updatedAt =
												new Date(res[i].updatedAt.toString()).getFullYear() +
												'年' +
												(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
												'月' +
												new Date(res[i].updatedAt.toString()).getDate() +
												'日';
										}else{
											res[i].attributes.data[0].data[0] = res[i].attributes.data[0].data[0].match(/(\S*)&download/)[1];
											res[i].updatedAt =
												new Date(res[i].updatedAt.toString()).getFullYear() +
												'年' +
												(new Date(res[i].updatedAt.toString()).getMonth() + 1) +
												'月' +
												new Date(res[i].updatedAt.toString()).getDate() +
												'日';
										}
										
									}
									_this.createdAtsuccess = res[res.length-1].updatedAt
									_this.containedItems = res;
									console.log(_this.containedItems);
									_this.len = _this.containedItems.length;
									
								},
								function(error) {}
							);
						},
						function(error) {}
					);
				},
				function(error) {}
			);
		},
		index(index) {
			let _this = this;
			console.log(index)
			uni.setStorageSync('title', _this.containedItems[index].attributes.formName);
			console.log(_this.containedItems[index].attributes.contractPointer);
			uni.setStorageSync('contractPointer', _this.containedItems[index].attributes.contractPointer);
			uni.setStorageSync('SupervisionItem', _this.containedItems[index]);
			uni.navigateTo({
				url: '../cloud/cloud'
			});
			/* var queryb = new leanCloud.Query('SupervisionItem');
			queryb.equalTo('projectAddress', _this.address).equalTo('formName', _this.containedItems[index].formName);
			queryb.find().then(
				function(res) {
					console.log(res);
					uni.setStorageSync('SupervisionItem', res);
					uni.navigateTo({
						url: '../cloud/cloud'
					});
				},
				function(error) {}
			); */
		},
		getUser({ detail }) {
			let _this = this;
			_this.load = true;
			if (detail.errMsg === 'getUserInfo:ok') {
				_this.load = false;
				uni.showLoading({
					mask: true,
					title: '加载中'
				});
				uni.setStorageSync('nickName', detail.userInfo.nickName);
				uni.setStorageSync('avatarUrl', detail.userInfo.avatarUrl);
				var queryb = new leanCloud.Query('_User');
				queryb.equalTo('nickName', detail.userInfo.nickName).equalTo('city', detail.userInfo.city);
				queryb.find().then(
					function(res) {
						uni.hideLoading();
						console.log(res.length);
						if (res.length == 1) {
							leanCloud.User.logIn(res[0].attributes.username, 'lamll888').then(
								function(loginedUser) {
									_this.xixia = false;
									console.log('loginedUser');
									console.log(loginedUser.attributes);
									uni.setStorageSync('shoujihao', loginedUser.attributes.mobilePhoneNumber);
								},
								function(error) {
									alert(JSON.stringify(error));
								}
							);
						} else {
							var user = new leanCloud.User();
							user.loginWithWeapp({ preferUnionId: true })
								.then(user => {
									uni.removeStorageSync('purePhoneNumber');
									uni.setStorageSync('purePhoneNumber', user);
								})
								.catch(console.error);
							uni.setStorageSync(
								'nameuseruser',
								md5(new Date())
									.toString()
									.substring(0, 25)
							);
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
					function(error) {
						console.log(error);
						uni.hideLoading();
					}
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
			console.log(e);
			const _this = this;
			_this.xixib = false;
			_this.login = false;
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			uni.removeStorageSync('getPhoneNumber');
			uni.setStorageSync('getPhoneNumber', 1);
			if (uni.getStorageSync('purePhoneNumber') == '') {
				uni.setStorageSync('purePhoneNumber');
				uni.navigateTo({
					url: '../index/index'
				});
				return;
			} else {
				var appId = 'wxd16393f5438c5881';
				var sessionKey = uni.getStorageSync('purePhoneNumber').authData.lc_weapp.session_key;
				console.log(sessionKey);
				var encryptedData = e.detail.encryptedData;
				var iv = e.detail.iv;
				var pc = new WXBizDataCrypt(appId, sessionKey);
				var data = pc.decryptData(encryptedData, iv);
				uni.setStorageSync('shoujihao', data.phoneNumber);
				console.log(data.phoneNumber);
				var todo = leanCloud.Object.createWithoutData('_User', leanCloud.User.current().id);
				todo.set('mobilePhoneNumber', data.phoneNumber);
				todo.save().then(function(todo) {
					uni.showToast({
						title: '授权成功',
						icon: 'none',
						duration: 1000
					});
					uni.navigateTo({
						url: '../index/index'
					});
				});
			}
		}
	},
	created() {},
	onShow() {}
};
</script>

<style scoped>
.xixiaaaa {
	display: none;
}
.page,
.page__bd {
	height: 100%;
	background: #ffffff;
	min-height: 100vh;
}

.weui-tab__content {
	text-align: center;
}

.weui-navbar__slider_0 {
	transform: translateX(140upx);
}

.weui-navbar__slider_1 {
	transform: translateX(515upx);
}

.weui-navbar__slider {
	width: 100upx;
	background: #ff9900;
}

.weui-navbar__title {
	font-size: 34upx;
	color: #999999;
	opacity: 0.7;
}

.weui-navbar {
	background: #ffffff;
	border-bottom: none;
	position: fixed;
}

.weui-bar__item_on .weui-navbar__title {
	color: #ff9900 !important;
	opacity: 1 !important;
}

.weui-navbar__item {
	margin: 0 40upx;
}

button {
	height: 98upx;
	border: none;
	display: inline-block;
	border-radius: 0;
	padding: 0;
	float: left;
}

.view-bt {
	position: fixed;
	bottom: 0;
}

.bt-img1,
.bt-img2 {
	width: 200upx;
	height: 98upx;
}

.bt-img3 {
	width: 350upx;
	height: 98upx;
}

.weui-tab__panel {
	margin: 0;
}
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
.newmessage {
	display: inline-block;
	width: 36upx;
	height: 36upx;
	background: #ee9e47;
	color: #ffffff;
	text-align: center;
	font-size: 28upx;
	line-height: 36upx;
}
.visnome {
	visibility: hidden;
}
.newmessage-title {
	display: inline-block;
	font-size: 28upx;
	color: #333333;
	margin-left: 15upx;
	margin-right: 10upx;
}
.newmessage-desc {
	display: inline-block;
	width: 16upx;
	height: 16upx;
	background: #ff0000;
	border-radius: 50%;
}
.uni-mask {
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	position: absolute;
	top: 0;
	z-index: 1000;
}
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
.button {
	border: none;
	width: 530upx;
	height: 88upx;
	color: #333333;
	font-size: 32upx;
	border: 10upx;
	background: #cccccc;
	line-height: 88upx;
	margin-top: 40upx;
	text-align: center;
	border-radius: 16upx;
	margin: 50upx 0;
}
.denglu-title {
	display: flex;
	justify-content: flex-start;
}
.image {
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
.zzzzz {
	position: relative;
	top: -30upx;
}
</style>
