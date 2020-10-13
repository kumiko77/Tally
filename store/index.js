import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		vuex_tabbar: [{
				iconPath: "../../../static/icon/tabbar_detail_n@3x.png",
				selectedIconPath: "../../../static/icon/tabbar_detail_s@3x.png",
				text: '明细',
				pagePath: '/pages/detail/index'
			},{
				iconPath: "../../../static/icon/tabbar_chart_n@3x.png",
				selectedIconPath: "../../../static/icon/tabbar_chart_s@3x.png",
				text: '图表',
				pagePath: '/pages/chart/index'
			},{
				iconPath: "../../../static/icon/tabbar_add_n@3x.png",
				selectedIconPath: "../../../static/icon/tabbar_add_h@3x.png",
				text: '记账',
				midButton: true,
				pagePath: '/pages/add/index'
			},{
				iconPath: "../../../static/icon/tabbar_discover_n@3x.png",
				selectedIconPath: "../../../static/icon/tabbar_discover_s@3x.png",
				text: '社区',
				pagePath: '/pages/community/index'
			},{
				iconPath: "../../../static/icon/tabbar_mine_n@3x.png",
				selectedIconPath: "../../../static/icon/tabbar_mine_s@3x.png",
				text: '我的',
				pagePath: '/pages/me/index'
			},
		]
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
