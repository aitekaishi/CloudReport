<template>
  <view class="wait">
    <image src="/static/img/index/pic_wait.png" mode="widthFix"/>
		<p>即将上线，敬请期待…</p>
  </view>
</template>

<script>
export default {
  //props: ['text']
  methods:{
  	
  },
  created(){
  	console.log('wait')
  	wx.getStorage({
		  key: 'avatarUrl',
		  success(res) {
		    console.log(res.data)
		  }
		})
		wx.getStorage({
		  key: 'nickName',
		  success(res) {
		    console.log(res.data)
		  }
		})
  }
}
</script>

<style scoped="scoped">
	image{
		width: 402rpx;
		height: 238rpx;
		margin: 0 auto;
	}
	.wait{
		margin-top: 292rpx;
	}
	p{
		font-size: 32rpx;
		color: #9B9B9B;
		margin-top: 40rpx;padding-left: 20rpx;
	}
</style>
