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
			<view class="menu-item" v-for="(item,index) in typeList.out" :key="index" @click="menuItemClick(item, index, 'out')" v-if="current==0">
				<view class="img-box">
					<image :src="typeActive==index?item.activeImage:item.image" mode="widthFix"></image>
				</view>
				<view class="name-box">
					{{item.typeName}}
				</view>
			</view>
			<view class="menu-item" v-for="(item,index) in typeList.in" :key="index" @click="menuItemClick(item, index, 'in')" v-if="current==1">
				<view class="img-box">
					<image :src="typeActive==index?item.activeImage:item.image" mode="widthFix"></image>
				</view>
				<view class="name-box">
					{{item.typeName}}
				</view>
			</view>
		</view>
		<u-keyboard ref="uKeyboard" mode="tally" v-model="show" :tooltip="false" @confirm="save"></u-keyboard>
		<u-tabbar :list="vuex_tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import typeJson from '../../common/json/type.json'
	export default {
		data() {
			return {
				list: [{
					name: '支出'
				}, {
					name: '收入'
				}],
				typeList: [],
				current:0,
				typeActive: '999',
				typeActiveEngName: '',
				typeActiveName: '',
				isOut:true,
				show: false
			}
		},
		mounted() {
			this.typeList = typeJson.data
		},
		watch: {
			show() {
				if(!this.show) {
					this.typeActive = '999'
				}
			},
			current() {
				this.current === 0? this.isOut=true : this.isOut=false
			}
		},
		methods: {
			change(index) {
				this.current = index;
			},
			menuItemClick: function(data, index) {
				this.typeActive = index
				this.typeActiveEngName = data.type
				this.typeActiveName = data.typeName
				this.show = true
				this.$refs.uKeyboard.open()
			},
			save: function(val) {
				const obj = {
					time: val.date.dateTime,
					year: val.date.year,
					month: val.date.month,
					date: val.date.date,
					day:val.date.dateTime.getDay(),
					money: this.isOut?-val.value:val.value,
					accountType: this.isOut?'out':'in',
					type: this.typeActiveEngName,
					typeName: this.typeActiveName
				}		
						this.$uniCloud('saveAccount', obj).then(res => {
							uni.switchTab({
							    url: '../detail/index'
							});
						})
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
