import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from '@/store'
import uCharts from 'js_sdk/u-charts/u-charts/u-charts.js';
//uview封装vuex
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

Vue.config.productionTip = false

Vue.prototype.$uCharts = uCharts

App.mpType = 'app'

Vue.use(uView);
const app = new Vue({
	store,
	...App
})
app.$mount()
