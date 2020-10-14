<template>
	<view class="box">
		<view class="header">
			<view class="check">
				支出
				<image src="../../static/icon/time_down.png" mode="widthFix"></image>
			</view>
			<view class="menu">
				<view class="menu-week">周</view>
				<view class="menu-month menu-item-itemed">月</view>
				<view class="menu-year">年</view>
			</view>
		</view>
		<view class="month-select">
			<u-tabs :list="list" :is-scroll="true" :current="current" @change="change" :item-width="120"></u-tabs>
		</view>
		<view class="total">
			<view class="count">
				总支出：666.66
			</view>
			<view class="average">
				平均值：20.25
			</view>
		</view>
		<view class="chart">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" disable-scroll=true @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas> -->
		</view>
		<view class="rank-box">
			<view class="rank-title">
				支出排行榜
			</view>
			<view class="rank-item">
				<view class="img-box">
					<image src="../../static/icon/e_catering_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="info-box">
					<view class="info-box-line-info">
						<view class="info-box-line-info-left">
							<span class="info-box-name">餐饮</span>
							<span class="info-box-percent">77.0%</span>
						</view>
						<view class="info-box-line-info-right">
							161.3
						</view>
					</view>
					<view class="info-box-line-percent">
						<strong><u-line-progress :show-percent="false" active-color="#f9db61" :percent="70"></u-line-progress></strong>
					</view>
				</view>
			</view>
			<view class="rank-item">
				<view class="img-box">
					<image src="../../static/icon/e_catering_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="info-box">
					<view class="info-box-line-info">
						<view class="info-box-line-info-left">
							<span class="info-box-name">餐饮</span>
							<span class="info-box-percent">77.0%</span>
						</view>
						<view class="info-box-line-info-right">
							161.3
						</view>
					</view>
					<view class="info-box-line-percent">
						<strong><u-line-progress :show-percent="false" active-color="#f9db61" :percent="70"></u-line-progress></strong>
					</view>
				</view>
			</view>
			<view class="rank-item">
				<view class="img-box">
					<image src="../../static/icon/e_catering_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="info-box">
					<view class="info-box-line-info">
						<view class="info-box-line-info-left">
							<span class="info-box-name">餐饮</span>
							<span class="info-box-percent">77.0%</span>
						</view>
						<view class="info-box-line-info-right">
							161.3
						</view>
					</view>
					<view class="info-box-line-percent">
						<strong><u-line-progress :show-percent="false" active-color="#f9db61" :percent="70"></u-line-progress></strong>
					</view>
				</view>
			</view>
			<view class="rank-item">
				<view class="img-box">
					<image src="../../static/icon/e_catering_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="info-box">
					<view class="info-box-line-info">
						<view class="info-box-line-info-left">
							<span class="info-box-name">餐饮</span>
							<span class="info-box-percent">77.0%</span>
						</view>
						<view class="info-box-line-info-right">
							161.3
						</view>
					</view>
					<view class="info-box-line-percent">
						<strong><u-line-progress :show-percent="false" active-color="#f9db61" :percent="70"></u-line-progress></strong>
					</view>
				</view>
			</view>
			<view class="rank-item">
				<view class="img-box">
					<image src="../../static/icon/e_catering_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="info-box">
					<view class="info-box-line-info">
						<view class="info-box-line-info-left">
							<span class="info-box-name">餐饮</span>
							<span class="info-box-percent">77.0%</span>
						</view>
						<view class="info-box-line-info-right">
							161.3
						</view>
					</view>
					<view class="info-box-line-percent">
						<strong><u-line-progress :show-percent="false" active-color="#f9db61" :percent="70"></u-line-progress></strong>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: '',
				list: [{
					name: '1月'
				}, {
					name: '2月'
				}, {
					name: '3月'
				}, {
					name: '4月'
				}, {
					name: '5月'
				}, {
					name: '6月'
				}, {
					name: '7月'
				}, {
					name: '8月'
				}, {
					name: '9月'
				}, {
					name: '10月'
				}, {
					name: '11月'
				}, {
					name: '12月'
				}],
				current: 0
			}
		},
		mounted() {
			const {
				globalData
			} = getApp()
			this.pixelRatio = globalData.pixelRatio
			this.cWidth = uni.upx2px(730);
			this.cHeight = uni.upx2px(200);
			this.showColumn()
		},
		methods: {
			change(index) {
				this.current = index;
			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			toJSON() {},
			showColumn(canvasId, chartData) {
				console.log(this.globalData)
				console.log(this.cWidth)
				canvaLineA = new this.$uCharts({
					$this: this,
					canvasId: 'canvasColumn',
					type: 'line',
					fontSize: 11,
					legend: {
						show: false
					},
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: 1,
					categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
					series: [{
						name: '成交量A',
						data: [35, 20, 25, 37, 4, 20,35, 20, 325, 537, 4, 20,235, 20, 125, 37, 4, 20,35, 20, 25, 37, 4, 20],
						color: '#666'
					}],
					animation: true,
					dataLabel: false,
					xAxis: {
						type: 'grid',
						gridType: 'dash',
						disableGrid:true,
						labelCount: 7, //x轴单屏显示数据的数量，默认为5个
					},
					yAxis: {
						disabled: true,
						disableGrid:true,
						gridType: 'dash',
						gridColor: '#CCCCCC',
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						line: {
							type: 'straight',
							width: 1,
							color: 'red'
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 750upx;
		height: 230upx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #ccc;
		border-bottom: 2rpx solid #ccc;
		padding: 0 10rpx;
	}

	.charts {
		width: 730upx;
		height: 200upx;
		background-color: #FFFFFF;

	}

	.box {
		.header {
			background: #f9db61;
			font-size: 35rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-bottom: 15rpx;

			image {
				width: 30rpx;
				margin-left: 10rpx;
			}

			.menu {
				display: flex;
				width: 500rpx;
				margin: 0 30rpx;
				border: 1px solid #343233;
				border-radius: 7px;
				height: 70rpx;
				line-height: 70rpx;
				background: #f9db61;
				font-size: 30rpx;

				.menu-week,
				.menu-month,
				.menu-year {
					width: 33.3%;
					text-align: center;

					&.menu-item-itemed {
						background: #343233;
						color: #f9db61;
					}
				}
			}
		}

		.total {
			color: #888;
			font-weight: 200;
			padding: 30rpx 25rpx;

			.count {
				font-size: 30rpx;
				margin-bottom: 5rpx;
			}

			.average {
				font-size: 25rpx;
			}
		}
		.rank-box {
			.rank-title {
				padding: 15rpx 30rpx;
				color: #555;
				font-weight: 200;
				font-size: 25rpx;
			}
			.rank-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.img-box {
					margin: 0 20rpx;
					image {
						width: 60rpx;
					}
				}
				.info-box {
					width: 660rpx;
					padding: 15rpx 20rpx 15rpx 0;
					border-bottom: 1rpx solid #f3f1f5;
					.info-box-line-info {
						display: flex;
						align-items: center;
						justify-content: space-between;
						&-left {
							color: #555;
							.info-box-name {
								font-size: 30rpx;
								margin-right: 5rpx
							}
							.info-box-percent {
								font-size: 25rpx;
							}
						}
						&-right {
							
						}
					}
					.info-box-line-percent {
						position: relative;
						top: -10rpx;
					}
				}
			}
		}
	}
</style>
