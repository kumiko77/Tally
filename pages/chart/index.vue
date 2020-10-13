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
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					list: [{
						name: '1月'
					},{
						name: '2月'
					},{
						name: '3月'
					},{
						name: '4月'
					},{
						name: '5月'
					},{
						name: '6月'
					},{
						name: '7月'
					},{
						name: '8月'
					},{
						name: '9月'
					},{
						name: '10月'
					},{
						name: '11月'
					},{
						name: '12月'
					}],
					current: 0
				}
		},
		methods:{
			change(index) {
							this.current = index;
						}
		}
	}
</script>

<style lang="scss" scoped>
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
	}
</style>
