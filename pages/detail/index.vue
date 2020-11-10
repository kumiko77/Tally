<template>
	<view class="box">
		<view class="header">
			<view class="total">
				<view class="date" @click="datePickerShow=true">
					<view class="year">{{date.year}}年</view>
					<view class="month">
						<span>{{date.month}}</span>
						月
						<image src="../../static/icon/down.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="money">
					<view class="income">
						<view class="money-title">
							收入
						</view>
						<view class="num">
							<span class="integer">{{inInteger}}</span>
							<span>.</span>
							<span class="decimals">{{inDecimals}}</span>
						</view>
					</view>
					<view class="expend">
						<view class="money-title">
							支出
						</view>
						<view class="num">
							<span class="integer">{{outInteger}}</span>
							<span>.</span>
							<span class="decimals">{{outDecimals}}</span>
						</view>
					</view>
				</view>
			</view>
			<view class="nav">
				<view class="nav-item">
					<view class="nav-item-logo">
						<image src="../../static/icon/mine_detail@3x.png" mode="widthFix"></image>
					</view>
					<span>账单</span>
				</view>
				<view class="nav-item">
					<view class="nav-item-logo">
						<image src="../../static/icon/mine_tallytype@3x.png" mode="widthFix"></image>
					</view>
					<span>预算</span>
				</view>
				<view class="nav-item">
					<view class="nav-item-logo">
						<image src="../../static/icon/mine_pwd@3x.png" mode="widthFix"></image>
					</view>
					<span>资金管家</span>
				</view>
			</view>
		</view>
		<scroll-view class="detail-box" scroll-y="true">
			<view class="detail-item" v-for="(item,index) in list" :key="index">
				<view class="dateil-header">
					<view class="datail-date">
						<span class="detail-date-time">
							{{item.text}}
						</span>
						<span class="detail-date-week">
							{{item.week}}
						</span>
					</view>
					<span class="detail-money">
						支出：{{item.out}}&nbsp;
						收入：{{item.in}}
					</span>
				</view>
				<view class="detail-item-definite" v-for="(detailItem, detailIndex) in item.subList" :key="detailIndex">
					<view class="detail-item-definite-left">
						<view class="detail-item-definite-logo">
							<image :src="`../../static/type/e_${detailItem.type}_l@3x.png`" mode="widthFix"></image>
						</view>
					</view>
					<view class="detail-item-definite-right">
						<span class="detail-item-definite-name">
							{{detailItem.typeName}}
						</span>
						<span class="detail-item-definite-money">
							{{detailItem.money}}
						</span>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-picker v-model="datePickerShow" :params="params" mode="time" :default-time="`${date.year}-${date.month}`" @confirm="datePicker"></u-picker>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar: 0,
				customBar: 0,
				custom: 0,
				outCount: 0,
				inCount: 0,
				date: {
					//默认当前日期
					year: 0,
					month: 0
				},
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				datePickerShow: false,
				list: [],
				triggered: false,
				_freshing: false
			}
		},
		onShow() {
			this.getAccountData()
		},
		computed: {
			outInteger: function() {
				return (this.outCount).toString().split(".")[0]
			},
			outDecimals: function() {
				if (this.outCount % 1 == 0) {
					return '00'
				} else {
					return (this.outCount).toString().split(".")[1]
				}
			},
			inInteger: function() {
				return (this.inCount).toString().split(".")[0]
			},
			inDecimals: function() {
				if (this.inCount % 1 == 0) {
					return '00'
				} else {
					return (this.inCount).toString().split(".")[1]
				}
			}
		},
		mounted() {
			//状态栏自适应
			const app = getApp().globalData
			this.statusBar = app.statusBar + 8
			this.customBar = app.customBar + app.pixelRatio * 30
			this.custom = app.custom
		},
		onShow() {
			//加载本月账单信息
			this.dateRender()
		},
		watch: {
			date: {
				handler(newVal, oldVal) {
					this.getAccountData(this.date.year, this.date.month)
				},
				deep: true,
			}
		},
		methods: {
			dateRender: function() {
				this.date = {
					//默认当前日期
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1
				}
			},
			datePicker: function(e) {
				this.date.year = e.year
				this.date.month = e.month
				this.getAccountData(e.year, e.month)
			},
			getAccountData: function(year, month) {
				this.$uniCloud('account', {
					year: +year || new Date().getFullYear(),
					month: +month || new Date().getMonth() + 1
				}).then(res => {
					const {
						data
					} = res.result
					this.list = this.sortByDate(data)
				})
			},
			refresh: function() {
				this.getAccountData()
			},
			sortByDate: function(list) {
				const newArr = [];
				this.inCount = 0;
				this.outCount = 0;
				list.forEach((item, i) => {
					let index = -1;
					//判断新数组里是否存在该日期
					let isExists = newArr.some((newItem, j) => {
						if (item.date == newItem.date) {
							index = j;
							return true;
						}
					})
					if (!isExists) {
						newArr.push({
							date: item.date,
							text: `${item.month}月${item.date}日`,
							week: this.$tool.number2Week(item.day),
							in: item.money > 0 ? item.money : 0,
							out: item.money < 0 ? Math.abs(item.money) : 0,
							subList: [item]
						})
					} else {
						newArr[index].subList.push(item);
						if (item.accountType === 'out') {
							newArr[index].out += Math.abs(item.money)
						} else {
							newArr[index].in += Number(item.money)
						}
					}
					if (item.money > 0) {
						this.inCount += item.money * 1
					} else {
						this.outCount += Math.abs(item.money)
					}
				})
				return newArr
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.header {
			height: 270rpx;
			padding: 0 40rpx;
			background: linear-gradient(to bottom, #f9db61 85%, #fff);
			color: #333;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;

			.title {
				display: inline-flex;
				justify-content: center;
				width: 100%;
				text-align: center;

				h1 {
					font-size: 40rpx;
					font-weight: bold;
				}
			}

			.total {
				display: flex;
				align-items: center;

				.date {
					margin-right: 70rpx;

					.year {
						font-size: 20rpx;
						font-weight: 200;
						margin-top: 20rpx;
					}

					.month {
						height: 50rpx;
						border-right: 1rpx solid #9e8d4c;
						font-size: 25rpx;
						display: flex;
						align-items: center;
						margin-top: 15rpx;

						span {
							font-size: 45rpx;
							font-weight: 200;
							display: inline-block;
							line-height: 40rpx;
						}

						image {
							width: 30rpx;
							height: 30rpx;
							margin-left: 10rpx;
							padding-right: 20rpx;
						}
					}
				}

				.money {
					display: flex;
					text-align: left;
					height: 90rpx;
					margin-top: 10rpx;

					.money-title {
						font-size: 20rpx;
						font-weight: 200;
					}

					.income,
					.expend {
						flex: 1;
						flex-direction: column;
						width: 230rpx;
						display: flex;
						justify-content: space-between;

						.num {
							font-weight: 200;
							margin-top: 20rpx;

							.integer {
								font-size: 40rpx;
							}
						}
					}
				}
			}

			.nav {
				display: flex;
				justify-content: space-between;
				background: #feffff;
				border-radius: 6px;
				width: 650rpx;
				margin: 10rpx auto;
				box-shadow: 0px 8px 10px #efefef;
				padding: 20rpx 40rpx;
				box-sizing: border-box;

				.nav-item {
					text-align: center;
					font-size: 20rpx;
					color: #999;

					.nav-item-logo {
						image {
							width: 50rpx;
							margin-bottom: 4rpx;
						}
					}
				}
			}
		}

		.detail-box {
			margin-top: 280rpx;
			height: 830rpx;

			.detail-item {
				margin-bottom: 30rpx;

				.dateil-header {
					color: #999;
					font-size: 20rpx;
					display: flex;
					justify-content: space-between;
					border-bottom: 1rpx solid #eae8eb;
					padding-bottom: 15rpx;

					.datail-date {
						padding-left: 30rpx;

						.detail-date-time {
							margin-right: 10rpx;
						}
					}

					.detail-money {
						padding-right: 30rpx;
					}
				}

				.detail-item-definite {
					display: flex;
					justify-content: space-between;
					align-items: center;

					&:last-of-type {
						.detail-item-definite-right {
							border: none;
						}
					}

					.detail-item-definite-left {
						margin: 0 25rpx;

						.detail-item-definite-logo {
							border-radius: 50%;
							width: 60rpx;
							height: 60rpx;
							display: flex;

							image {
								width: 60rpx;
							}
						}
					}

					.detail-item-definite-right {
						width: 660rpx;
						padding: 20rpx 30rpx 20rpx 0;
						font-size: 25rpx;
						font-weight: 200;
						height: 80rpx;
						border-bottom: 1rpx solid #f3f1f5;
						display: flex;
						justify-content: space-between;
						align-items: center;

						span {
							display: inline-block;
							// line-height: 80rpx;
						}
					}
				}
			}
		}
	}
</style>
