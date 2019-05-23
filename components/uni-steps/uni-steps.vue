<template>
	<view class="uni-steps">
		<view class="uni-steps-items" :class="'uni-steps-' + direction">
			<view class="uni-steps-item" v-for="(item,index) in steps" :key="index" :class="[item.status ? 'uni-steps-' + item.status : '']">
				<view class="uni-steps-item-title-container">
					<view class="liupan-contain">
						<view class="liupan-contain-one">
							<view class="liupan">
								<view class="uni-steps-item-title">{{ item.title }}</view>
								<view class="gongdione-y-left-three">
									最新
							</view>
							</view>
							<view class="uni-steps-item-desca" v-if="item.desc">{{ item.desc}}</view>
							<view class="uni-steps-item-descb" v-if="item.desc">符合标准：<image class="uni-steps-item-descb-img" src="../../static/icon_hege@2x.png"></image>15项合格</view>
							<view class="uni-steps-item-descb" v-if="item.desc">存在隐患：<image class="uni-steps-item-descb-img" src="../../static/icon_buhege@2x.png"></image>4项不合格</view>
							<view class="uni-steps-item-descc" v-if="item.desc">jsaslajslsa</view>
						</view>
					</view>
				
				<view class="gongdione-y-left-one">
					<view>{{index}}</view>
				</view>
				<view class="uni-steps-item-line" v-if="index !== steps.length-1"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../uni-icon/uni-icon.vue'
	export default {
		name: "uni-steps",
		components: {
			uniIcon
		},
		props: {
			direction: { //排列方向 row column
				type: String,
				default: 'row'
			},
			activeColor: { //激活状态颜色
				type: String,
				default: '#1aad19'
			},
			active: { //当前步骤
				type: [Number, String],
				default: 0
			},
			data: Array //数据
		},
		data() {
			return {}
		},
		computed: {
			steps() {
				let steps = []
				this.data.forEach((item, index) => {
					let step = {}
					step.title = item.title
					step.desc = item.desc
					step.status = this.getStatus(index)
					steps.push(step)
				})
				return steps
			}
		},
		methods: {
			getStatus(index) {
				if (index < Number(this.active)) {
					return 'finish'
				} else if (index === Number(this.active)) {
					return 'process'
				}
				return ''
			}
		}
	}
</script>

<style lang="scss">
	$steps-line-color:#ebedf0;
	$steps-text-color:#969799;
	$steps-title-size:28upx;
	$steps-desc-size:24upx;
	$steps-text-finish-color:#333333;
	$steps-bg-color:#ffffff;
	.gongdione-y-left-three{
		color: #FF9900;
		font-size: 28upx;
		position: relative;
		left:30upx;
		height: 30upx;
		line-height: 30upx;
		padding: 0 15upx;
		border-radius: 10upx;
		border: 2upx solid #FF9900;
	}
	.uni-steps-item-desca{
		margin: 10upx 0;
		font-size: 32upx;
		color: #333333;
	}
	.uni-steps-item-descb{
		margin: 10upx 0;
		font-size:28upx;
		color: #666666;
	}
	.uni-steps-item-descc{
		visibility: hidden;
	}
	.uni-steps-item-descb-img{
		width: 24upx;
		height: 24upx;
		margin-right: 10upx;
		position: relative;
		top: 0;
	}
	.liupan-contain{
		display: flex;
	}
	.liupan{
		display: flex;
	}
	.uni-steps-item-title{
		font-size: 28upx;
		color: #999999;
	}
	.gongdione-y-left-one{
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		background: #FF9900;
		font-size: 24upx;
		text-align: center;
		line-height: 30upx;
		color: #FFFFFF;
		display: inline-block;
	}
	.uni-steps {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;

		&-items {
			position: relative;
			display: flex;
			flex-direction: row;
			margin: 10px;
			box-sizing: border-box;
			overflow: hidden;

			&.uni-steps-column {
				margin: 10px 0;
				padding-left: 31px;
				flex-direction: column;

				.uni-steps-item {
					&:after {
						content: ' ';
						position: absolute;
						height: 1px;
						width: 100%;
						bottom: 9px;
						left: 0;
						background-color: #ebedf0;
						transform: scaleY(0.5);
					}

					&:last-child {
						position: relative;

						&:after {
							height: 0px;
						}

						.uni-steps-item-title-container {
							text-align: left;
						}

						.uni-steps-item-circle-container {
							left: -17px;
							right: auto
						}
					}

					&-title-container {
						transform: none;
						display: block;
						line-height: 36upx;
					}

					&-title {
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }

					&-desc {
						white-space: normal;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					&-circle-container {
						left: -17px;
						top: -1px;
						bottom: auto;
						padding: 8px 0px;
						z-index: 1;
					}

					&-line {
						height: 100%;
						width: 1px;
						left: -15px;
						top: -1px;
						bottom: auto;
					}


					&.uni-steps-process {
						.uni-steps-item-circle-container {
							bottom: auto;
							left: -21px;
						}
					}
				}
			}
		}

		&-item {
			flex: 1;
			position: relative;
			padding-bottom: 18px;

			&-title-container {
				text-align: left;
				margin-left: 3px;
				display: inline-block;
				transform: translateX(-50%);
				color: $steps-text-color;
			}

			&-title {
				font-size: $steps-title-size;
			}

			&-desc {
				font-size: $steps-desc-size;
			}

			&:first-child {
				.uni-steps-item-title-container {
					transform: none;
					margin-left: 0;
				}
			}

			&:last-child {
				position: absolute;
				right: 0;

				.uni-steps-item-title-container {
					transform: none;
					text-align: right;
				}

				.uni-steps-item-circle-container {
					left: auto;
					right: -8px
				}
			}

			&-circle-container {
				position: absolute;
				bottom: 8px;
				left: -8px;
				padding: 0 8px;
				background-color: $steps-bg-color;
				z-index: 1;
			}

			&-circle {
				width: 5px;
				height: 5px;
				background-color: $steps-text-color;
				border-radius: 50%;
			}

			&-line {
				background-color: $steps-line-color;
				position: absolute;
				bottom: 10px;
				left: 0;
				width: 100%;
				height: 1px;
			}

			&.uni-steps-finish {
				.uni-steps-item-title-container {
					color: $steps-text-finish-color;
				}
			}

			&.uni-steps-process {
				.uni-steps-item-circle-container {
					bottom: 3px;
					display: flex;
				}
			}
		}
	}
</style>
