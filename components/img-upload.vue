<template>
  <view class="wait">
	  <view class="wait-title">
		  <view class="assess-text assess-text3">图片（选填）</view>
	  <view class="assess-text assess-text2">{{numberImg}}/5</view>
	  </view>
	<view class="wait-contain">
		<view class="dis-view" v-for="(item,index) in items" :key=index>
			<image class="img-item" :src="item" mode="widthFix"></image>
		</view>
		<view class="dis-view" :class="hiddened?'disback':'none'" @click="chooseImage">
			<image class="img-button" src="/static/img/addpic@2x.png" mode="widthFix"></image>
		</view>
	</view>
  </view>
</template>

<script>
export default {
  //props: ['text']
  data() {
  	return {
		items:[],
		numberImg:0,
		hiddened:true
  	};
  },
  methods:{
  	chooseImage(){
		const _this = this
		uni.chooseImage({
			count: 5, //默认9
			sizeType: ['original', 'compressed'], 
			sourceType: ['album'],
			success: function (res) {
				console.log(res.tempFilePaths.length);
				_this.items = res.tempFilePaths
				_this.numberImg = res.tempFilePaths.length
				uni.setStorageSync('imglist',_this.items)
				if(res.tempFilePaths.length == 5){
				   _this.hiddened = false
				}
			}
		});
	}
  },
  created(){

  },
  updated(){
	  
  }
}
</script>

<style scoped="scoped">
	.img-item{
		width: 140upx;
		margin: 5upx;
		height: 140upx !important;
	}
	.dis-view{
		display: inline-block;
	}
	.img-button{
		width: 140upx;
		margin-left: 30upx;
	}
	.wait{
		background: #FFFFFF;
		position: relative;
		top: -30upx;
	}
	.wait-title{
		background: #F8F9FB;
		padding-bottom: 20upx;
	}
	.wait-contain{
		padding-top: 10upx;
	},
	.disback{
		display: inline-block;
	}
	.none{
		display: none;
	}
	.assess-text{
		font-size: 30upx;
		color: #9B9B9B;
	}
	.assess-text2{
		float: right;
		position: relative;
		top: -50upx;
	}
	.wait-title{
		padding: 20upx;
	}
</style>
