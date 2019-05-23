<template>
	<view class="cloud">
		<view class="qqqq">
			{{zzzz}}
		</view>
		<view class="cloud-contain">
			<view class="cloud-one">监理：{{namea}}</view>
			<view class="cloud-time">{{supervisordate}}</view>
		</view>
		<!-- <view class="cloud-tiancog"></view> -->
		<view v-for="(item, index) in reportContent" :key="index">
			<view class="cloud-suoming-title">{{item}}</view>
		</view>
		<view class="cloud-tiancog"></view>
		<view class="cloud-image">
			<image lazy-load v-for="(item,index) in SupervisionSubItemimage" @click=inage(index) :key='index' :src=item />
		</view>
		<view class="cloud-tiancog"></view>
		<view class="cloud-suoming">
			现存隐患：
			<image class="uni-steps-item-descb-img" src="/static/icon_buhege@2x.png"></image>
			{{buhegenum}}项不合格
		</view>
		<view v-for="(item, index) in numarrayd" :key="index">
			<view class="shoufqing" @click="buhegeclick(index)">
				<view class="shoufqing-left">{{item.title}}</view>
				<view :class="buhegeindex != index? 'disable':'.noneliupan'" class="shoufqing-right"><image class="uni-steps-item-descb-img" src="/static/icon_xiala@2x.png"></image></view>
				<view :class="buhegeindex == index? 'disable':'.noneliupan'" class="shoufqing-right"><image class="uni-steps-item-descb-img" src="/static/icon_zhaopian@2x.png"></image></view>
			</view>
			<view class="scroll_box" :class="buhegeindex == index? '.axio':'.hahahh'">
				<scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
					<view v-for="(itema,indexa) in item.data" :key="indexa"  class="item_list">
						<view class="item_book_text"><image lazy-load @click="buhegeimage(index)" :src=itema ></image></view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	
	
		<view class="cloud-suoming">
			符合标准：
			<image class="uni-steps-item-descb-img" src="/static/icon_hege@2x.png"></image>
			{{hegenum}}项合格
		</view>
		<view v-for="(item, index) in numarrayb" :key="index">
			<view class="shoufqing" @click="hegeclick(index)">
				<view class="shoufqing-left">{{item.title}}</view>
				<view :class="hegeindex != index? 'disable':'.noneliupan'" class="shoufqing-right"><image class="uni-steps-item-descb-img" src="/static/icon_xiala@2x.png"></image></view>
				<view :class="hegeindex == index? 'disable':'.noneliupan'" class="shoufqing-right"><image class="uni-steps-item-descb-img" src="/static/icon_zhaopian@2x.png"></image></view>
			</view>
			<view class="scroll_box" :class="hegeindex == index? '.axio':'.hahahh'">
				<scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
					<view v-for="(itema,indexa) in item.data" :key="indexa"  class="item_list">
						<view class="item_book_text">
							<image lazy-load :src=itema  @click="hegeimage(index)"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
export default {
	data() {
		return {
			aindex: 2,
			namea:" ",
			supervisordate:'',
			SupervisionSubItem:[],
			SupervisionSubItemimage:[],
			reportContent:[],
			hegenum:0,
			buhegenum:0,
			numarraya:[],
			numarrayb:[],
			numarrayc:[],
			numarrayd:[],
			buhegeindex:-1,
			hegeindex:-1,
			zzzz:''
			
		};
	},
	onLoad() {
		let _this = this;
		console.log('xxx')
		console.log(uni.getStorageSync('title'))
		uni.setNavigationBarTitle({
			title: ''
		});
		_this.zzzz = uni.getStorageSync('title')
		/* uni.setStorageSync('numarraydd',_this.numarrayd)
		
		
		uni.setNavigationBarColor({
			frontColor: '#000000',
			backgroundColor: '#ffffff'
		}); */
	},
	methods:{
		hegeimage(index){
			uni.setStorageSync('imagesurl','');
			uni.setStorageSync('length',this.numarrayb[index].data.length);
			uni.setStorageSync('num',0);
			uni.setStorageSync('imagesurl',this.numarrayb[index].data);
			setTimeout(function(){
				uni.navigateTo({
					url: '../cloud-image/cloud-image'
				});
			},500)
		},
		buhegeimage(index){
			uni.setStorageSync('imagesurl','');
			uni.setStorageSync('length',this.numarrayd[index].data.length);
			uni.setStorageSync('num',0);
			uni.setStorageSync('imagesurl',this.numarrayd[index].data);
			setTimeout(function(){
				uni.navigateTo({
					url: '../cloud-image/cloud-image'
				});
			},500)
		},
		inage(index){
			uni.setStorageSync('length',this.SupervisionSubItemimage.length);
			uni.setStorageSync('num',index);
			uni.setStorageSync('imagesurl',this.SupervisionSubItemimage);
			uni.navigateTo({
				url: '../cloud-image/cloud-image'
			});
		},
		hegeclick(index){
			if (this.hegeindex == index) {
				this.hegeindex = -1
			} else{
				this.hegeindex = index
			}
		},
		buhegeclick(index){
			if (this.buhegeindex == index) {
				this.buhegeindex = -1
			} else{
				this.buhegeindex = index
			}
		}
	},
	mounted() {
	},
	created(){
		uni.showLoading({
			mask:true,
			title:'加载中'
		})
		let _this = this
		var queryb = new leanCloud.Query('SupervisionCloudReport');
		queryb.equalTo('contractPointer', uni.getStorageSync('contractPointer'));
		queryb.find().then(
			function(res) {
				console.log(res[res.length-1])
				_this.namea = res[res.length-1].attributes.supervisor
				var mouth = ''
				var day = ''
				if ((new Date(res[res.length-1].attributes.reportDate).getMonth() + 1)>9) {
					mouth = new Date(res[res.length-1].attributes.reportDate).getMonth() + 1
				} else{
					mouth = '0'+ (new Date(res[res.length-1].attributes.reportDate).getMonth() + 1)
				}
				if ((new Date(res[res.length-1].attributes.reportDate).getDate())>9) {
					day = new Date(res[res.length-1].attributes.reportDate).getDate()
				} else{
					day = '0'+ (new Date(res[res.length-1].attributes.reportDate).getDate())
				}
				_this.supervisordate = new Date(res[res.length-1].attributes.reportDate).getFullYear()+'年'+mouth+'月'+day+'日'
				_this.reportContent = res[res.length-1].attributes.reportContent.toString().split('\n')
				var SupervisionSubItemimages = []
				SupervisionSubItemimages = res[res.length-1].attributes.livePicture
				for (let y = 0; y < SupervisionSubItemimages.length; y++) {
						SupervisionSubItemimages[y] = SupervisionSubItemimages[y].match(/(\S*)&download/)[1]
				}
				_this.SupervisionSubItemimage = SupervisionSubItemimages
				
			},
			function(error) {}
		);
		let SupervisionItem = uni.getStorageSync('SupervisionItem')
		console.log(SupervisionItem)
		_this.hegenum = SupervisionItem.eligibilityCount
		_this.buhegenum = SupervisionItem.notEligibilityCount
		for (let y = 0; y < SupervisionItem.data.length; y++) {
			if(SupervisionItem.data[y].content == "合格"){
				_this.numarraya.push(SupervisionItem.data[y])
			}else if(SupervisionItem.data[y].content == "不合格"){
				_this.numarrayc.push(SupervisionItem.data[y])
			}
		}
		_this.numarrayb = _this.numarraya
		_this.numarrayd = _this.numarrayc
		/* this.reportContent = uni.getStorageSync('cloudtitle')
		this.reportContent = this.reportContent.toString().split('\n')
		var SupervisionSubItemimages = []
		SupervisionSubItemimages = uni.getStorageSync('cloudimage')
		for (let y = 0; y < SupervisionSubItemimages.length; y++) {
				SupervisionSubItemimages[y] = SupervisionSubItemimages[y].match(/(\S*)&download/)[1]
		}
		this.SupervisionSubItemimage = SupervisionSubItemimages
		
		for (let y = 0; y < uni.SupervisionItem.data.length; y++) {
			if(uni.SupervisionItem.data[y].content == "合格"){
				_this.numarraya.push(uni.SupervisionItem.data[y])
			}else if(uni.SupervisionItem.data[y].content == "不合格"){
				_this.numarrayc.push(uni.SupervisionItem.data[y])
			}
		}
		_this.numarrayb = _this.numarraya
		_this.numarrayd = _this.numarrayc
		this.hegenum = _this.numarrayb.length
		this.buhegenum = _this.numarrayd.length */
		uni.hideLoading()
	}
};
</script>

<style scoped="scoped">
	.cloud-contain{
		display: flex;
		justify-content: space-between;
	}
.cloud {
	padding: 20upx;
}
.cloud-one {
	font-size: 28upx;
	color: #333333;
	font-weight: 600;
}
.cloud-time {
	font-size: 28upx;
	color: #999999;
}
.cloud-tiancog {
	height: 30upx;
}
.cloud-suoming {
	font-size: 32upx;
	color: #333333;
	font-weight: 600;
	margin-bottom: 10upx;
}
.cloud-suoming-title {
	font-size: 28upx;
	color: #666666;
	margin-bottom: 10upx;
}
.cloud-image {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.cloud-image image {
	width: 220upx;
	height: 188upx;
	margin: 8upx;
}
.uni-steps-item-descb-img {
	width: 30upx;
	height: 30upx;
	margin-right: 10upx;
	position: relative;
	top: 5upx;
}
.shoufqing {
	display: flex;
	justify-content: space-between;
	font-size: 28upx;
	color: #666666;
	padding: 10upx 10upx 10upx 28upx;
	background: #eeeeee;
	border-radius: 26upx;
	margin-bottom: 20upx;
}
.shoufqing-right image {
	width: 24upx;
	height: 24upx;
}
.scroll_box {
	height: 188upx;
	overflow: hidden;
	white-space: nowrap;
	margin: 10upx;
}
.item_list {
	width: 230upx;
	height: auto;
	margin-right: 7upx;
	display: inline-block;
}
.item_list image{
	height: 188upx;
	width: 220upx;
}
@keyframes name{
		from{height: 0;}
		to{height: 188upx;}
	}
	.axio{
		animation: name 0.1s;
	}
	.hahahh{
		height: 0;
	}
	.disable{
		display: block;
	}
	.noneliupan{
		display: none;
	}
	.qqqq{
		font-size: 32upx;
		font-weight: 600;
		text-align: center;
	}
</style>
