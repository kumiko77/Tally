import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from '@/store'
import uCharts from 'js_sdk/u-charts/u-charts/u-charts.js';
import request from 'common/util/request.js'
import tool from '@/common/util/toolset.js'
//uview封装vuex
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

//请求云函数封装
Vue.prototype.$uniCloud = request
Vue.config.productionTip = false

Vue.prototype.$uCharts = uCharts
Vue.prototype.$tool = tool
App.mpType = 'app'

Vue.use(uView);
const app = new Vue({
	store,
	...App
})
app.$mount()
