<template>
	<view class="cloud-image">
		<swiper @change="change" :current=indexnum >
			<block v-for="(item, index) in items" :key="index">
				<swiper-item><image lazy-load :src="item"></image></swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [],
			indexnum:''
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: uni.getStorageSync('num') + 1 + '/' + uni.getStorageSync('length')
		});
		uni.setNavigationBarColor({
			frontColor: '#000000',
			backgroundColor: '#ffffff'
		});
		this.items = uni.getStorageSync('imagesurl');
		this.indexnum = uni.getStorageSync('num')
	},
	methods: {
		change(e){
			uni.setNavigationBarTitle({
				title: e.detail.current + 1 + '/' + uni.getStorageSync('length')
			});
		}
	}
};
</script>

<style>
.cloud-image {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	white-space: nowrap;
}
.cloud-image image {
	vertical-align: middle !important;
	align-items: center;
}
swiper {
	height: 100vh !important;
}
swiper-item{
	height: 100vh !important;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
