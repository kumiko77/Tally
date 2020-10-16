<template>
	<view class="box">
		<view class="select-box">
			<u-tabs :list="list" 
					activeColor="#857746" 
					inactiveColor="#857746" 
					bgColor="#f9db61" 
					:bold="400"
					:is-scroll="true" 
					:current="current"
					@change="change" 
					:itemWidth="125"
					:item-width="120"
					:gutter="0"
					:barWidth="125"
			></u-tabs>
		</view>
		<view class="menu-box">
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/cc_home_w_and_e_l@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			<view class="menu-item">
				<view class="img-box">
					<image src="../../static/icon/e_travel@3x.png" mode="widthFix"></image>
				</view>
				<view class="name-box">
					餐饮
				</view>
			</view>
			
		</view>
		<u-keyboard ref="uKeyboard" mode="tally" v-model="show" :tooltip="false"></u-keyboard>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '支出'
				}, {
					name: '收入'
				}],
				current:0,
				show: true
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss">
	.box {
		.select-box {
			background: #f9db61;
			width: 100%;
			padding: 0 250rpx;
		}
		.menu-box {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin: 0 10rpx;
			.menu-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 30rpx;
				.img-box {
					image {
						width: 100rpx;
						height: 100rpx;
					}
				}
				.name-box {
					font-size: 25rpx;
					color: #666;
				}
			}
		}
	}
</style>
