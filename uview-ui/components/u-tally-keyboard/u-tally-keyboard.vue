<template>
	<view class="box">
		<view class="remark">
			<view class="remark-title">备注：</view>
			<input type="text">
			<span class="count">{{num===''?0:num}}</span>
		</view>
		<view class="u-keyboard" @touchmove.stop.prevent="() => {}">
			<view class="u-keyboard-grids">
				<view class="u-keyboard-grids-item" :class="[btnBgGray(index) ? 'u-bg-gray' : '', index <= 2 ? 'u-border-top' : '', index < 9 ? 'u-border-bottom' : '', (index + 1) % 3 != 0 ? 'u-border-right' : '']"
				 :style="[itemStyle(index)]" v-for="(item, index) in numList" :key="index" :hover-class="hoverClass(index)"
				 :hover-stay-time="100" @tap="keyboardClick(item)">
					<view class="u-keyboard-grids-btn">{{ item }}</view>
				</view>
				<view class="u-keyboard-grids-item u-bg-gray" hover-class="u-hover-class" :hover-stay-time="100" @touchstart.stop="backspaceClick"
				 @touchend="clearTimer">
					<view class="u-keyboard-back u-keyboard-grids-btn">
						<u-icon name="backspace" :size="38" :bold="true"></u-icon>
					</view>
				</view>
			</view>
			<view class="u-keyboard-tools">
				<view class="today u-border-top u-border-left u-border-bottom today" @click="datePickerShow = true">
					{{today.year+today.month+today.date === checkDate.year+checkDate.month+checkDate.date ? '今天':`${checkDate.year}-${checkDate.month}-${checkDate.date}`}}
				</view>
				<view class="today u-border-left u-border-bottom" @tap="keyboardClick('+')">
					+
				</view>
				<view class="today u-border-left u-border-bottom" @tap="keyboardClick('-')">
					-
				</view>
				<view class="save u-border-left u-border-bottom" @tap="save()" v-if="!calculateShow">
					完成
				</view>
				<view class="save u-border-left u-border-bottom" @tap="calculate()" v-if="calculateShow">
					=
				</view>
			</view>
		</view>
		<u-picker v-model="datePickerShow" z-index="10080" :params="params" mode="time" :default-time="`${today.year}-${today.month}-${today.date}`" @confirm="datePicker"></u-picker>
	</view>
</template>

<script>
	import {
		evaluate
	} from "eval5";
	export default {
		props: {
			// 键盘的类型，number-数字键盘，card-身份证键盘
			mode: {
				type: String,
				default: 'number'
			},
			// 是否显示键盘的"."符号
			dotEnabled: {
				type: Boolean,
				default: true
			},
			// 是否打乱键盘按键的顺序
			random: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				backspace: 'backspace', // 退格键内容
				dot: '.', // 点
				timer: null, // 长按多次删除的事件监听
				cardX: 'X', // 身份证的X符号‘
				num: '', //金额
				calculateShow: false, //等于号是否展示
				datePickerShow: false, //日期选择器是否展示
				params: {  //日期选择器配置
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				checkDate: {},
				today: {
					dateTime:'',
					year:'',
					month:'',
					date:''
				}
			};
		},
		watch: {
			num() {
				let num = this.num.toString()
				//包含运算符且末位是数字则表示可进行运算，则将完成按钮隐藏显示等于号
				if((num.indexOf('+') !== -1 || num.indexOf('-') !== -1) && !isNaN(num.substring(num.length - 1))) {
					this.calculateShow = true
				} else {
					this.calculateShow = false
				}
			}
		},
		mounted() {
			this.loadDateNow()
		},
		computed: {
			// 键盘需要显示的内容
			numList() {
				let tmp = [];
				if (!this.dotEnabled && this.mode == 'number') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
					}
				} else if (this.dotEnabled && this.mode == 'number') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
					}
				} else if (this.mode == 'card') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
					}
				}
			},
			// 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
			itemStyle() {
				return index => {
					let style = {};
					if (this.mode == 'number' && !this.dotEnabled && index == 9) style.flex = '0 0 66.6666666666%';
					return style;
				};
			},
			// 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
			btnBgGray() {
				return index => {
					if (!this.random && index == 9 && (this.mode != 'number' || (this.mode == 'number' && this.dotEnabled))) return true;
					else return false;
				};
			},
			hoverClass() {
				return index => {
					if (!this.random && index == 9 && (this.mode == 'number' && this.dotEnabled || this.mode == 'card')) return 'u-hover-class';
					else return 'u-keyboard-hover';
				}
			}
		},
		methods: {
			reset: function() {
				this.num = ''
				this.loadDateNow()
			},
			datePicker: function(e) {
				this.checkDate = e
				this.checkDate.dateTime = new Date(`${e.year}-${e.month}-${e.day}`)
				this.checkDate.date = +e.day
				this.checkDate.year = +e.year
				this.checkDate.month = +e.month
			},
			loadDateNow: function() {
				this.today.dateTime = new Date()
				this.today.year = new Date().getFullYear()
				this.today.month = new Date().getMonth() + 1
				this.today.date = new Date().getDate()
				
				this.checkDate = {...this.today}
			},
			// 点击退格键
			backspaceClick() {
				// this.$emit('backspace');
				// clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
				// this.timer = null;
				// this.timer = setInterval(() => {
				// 	this.$emit('backspace');
				// }, 250);
				this.num = this.num.substr(0, this.num.length - 1);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			// 获取键盘显示的内容
			keyboardClick(val) {
				let num  = this.num + val.toString()
				//判断最后一位是否是运算符
				if(['+','-'].indexOf(num.substring(num.length - 1)) !== -1) {
					//若是运算符判断末位与倒二位是否相等,若相等不允许重复输入运算符
					if(num.substring(num.length - 1) === num.substring(num.length - 2, num.length - 1)) {
						num = num.substr(0, num.length-1);
						//若末位与倒二位不相等则取最后一次输入的运算符
					} else if(['+','-'].indexOf(num.substring(num.length - 2)) !== -1){
						num = num.substr(0, num.length-2) + val.toString();
					}
					//查找运算符是否为2个，若为两个则自动计算
					if(num.split('').filter(i => i == '+').length + num.split('').filter(i => i == '-').length === 2) {
						const operator = num.substring(num.length - 1)
						num = evaluate(num.substr(0, num.length - 1)) + operator
					}
				}
				this.num = num
			},
			calculate: function() {
				this.num = evaluate(this.num)
			},
			save() {
				this.$emit('confirm', {
					value:this.num,
					date: this.checkDate
					},
				);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

// .u-picker-header .date {
// 	height: 400rpx;
// 	    border-bottom: 1rpx solid #f5f6f8;
// }
	.box {
		background: #f3f3f3;
	}

	.remark {
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0 20rpx 0 25rpx;
		font-weight: 200;

		.title {
			font-size: 20rpx;
			flex: 1
		}

		input {
			margin-right: 50rpx;
			flex: 4
		}

		.count {
			font-weight: 200;
			font-size: 50rpx;
			flex: 2;
			text-align: right;
		}
	}

	.u-keyboard {
		position: relative;
		z-index: 1003;
		display: flex;

	}

	.u-keyboard-grids {
		@include vue-flex;
		flex-wrap: wrap;
		width: 75%;
	}

	.u-keyboard-tools {
		width: 25%;
		display: flex;
		flex-direction: column;

		view {
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			font-weight: 200;
			font-size: 40rpx;
			color: #333;
		}
		.today {
			font-size: 25rpx;
		}
		.save {
			background: #f9db61;
		}
	}

	.u-keyboard-grids-item {
		flex: 0 0 33.3333333333%;
		text-align: center;
		font-size: 40rpx;
		color: #333;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		height: 110rpx;
		font-weight: 200;
	}

	.u-bg-gray {
		background-color: #f3f3f3;
	}

	.u-keyboard-back {
		font-size: 36rpx;
	}

	.u-keyboard-hover {
		background-color: #e7e6eb;
	}

	.u-border-bottom:after,
	.u-border-left:after,
	.u-border-right:after,
	.u-border-top-bottom:after,
	.u-border-top:after,
	.u-border:after {
		border-color: #c6c6c6;
	}
</style>
