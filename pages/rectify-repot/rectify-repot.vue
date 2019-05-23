<template>
	<view class="clouda">
		<view v-for="(item, index) in reportContent" :key="index">
			<view class="cloud-suoming-titlea">{{item}}</view>
		</view>
		<view class="cloud-suominga">
			整改前：
		</view>
		<view class="scroll-view_x">
			<scroll-view  scroll-x style="width: auto;overflow:hidden;">
				<view v-for="(item,indexa) in itemsa" :key="indexa"  class="item_lista">
					<view class="item_book_text"><image lazy-load :src=item @click="hegeimage(indexa)"></image></view>
				</view>
			</scroll-view>
		</view>
		<view class="cloud-suominga">
			整改后：
		</view>
		<view class="scroll-view_x">
			<scroll-view scroll-x style="width: auto;overflow:hidden;">
				<view v-for="(item,indexa) in itemsb" :key="indexa"  class="item_lista">
					<view class="item_book_text"><image lazy-load :src=item @click="buhegeimage(indexa)" ></image></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportContent:[],
				itemsb:[],
				itemsa:[]
			}
		},
		methods: {
			hegeimage(index){
				uni.setStorageSync('imagesurl','');
				uni.setStorageSync('length',this.itemsa.length);
				uni.setStorageSync('num',index);
				uni.setStorageSync('imagesurl',this.itemsa);
				setTimeout(function(){
					uni.navigateTo({
						url: '../cloud-image/cloud-image'
					});
				},500)
			},
			buhegeimage(index){
				uni.setStorageSync('imagesurl','');
				uni.setStorageSync('length',this.itemsb.length);
				uni.setStorageSync('num',index);
				uni.setStorageSync('imagesurl',this.itemsb);
				setTimeout(function(){
					uni.navigateTo({
						url: '../cloud-image/cloud-image'
					});
				},500)
			}
			
		},
		created(){
			this.reportContent = uni.getStorageSync('rectify-repot').reviewOpinions
			console.log(uni.getStorageSync('rectify-repot').reviewOpinions)
			this.reportContent = this.reportContent.toString().split('\n')
			this.itemsa = uni.getStorageSync('rectify-repot').beforeRectification
			this.itemsb = uni.getStorageSync('rectify-repot').AfterRectification
		}
	}
</script>

<style>
.cloud-suoming-titlea {
	font-size: 28upx;
	color: #666666;
	margin-bottom: 10upx;
}
.clouda {
	padding: 20upx;
}
.cloud-suominga {
	font-size: 32upx;
	color: #333333;
	font-weight: 600;
	margin-bottom: 10upx;
	margin-top: 40upx;
}
.item_lista {
	width: 230upx;
	height: auto;
	margin-right: 7upx;
	display: inline-block;
}
.item_lista image{
	height: 188upx;
	width: 220upx;
}
.scroll-view_x{
	height: 188upx;
	overflow: hidden;
	white-space: nowrap;
	margin: 10upx;
}
</style>
