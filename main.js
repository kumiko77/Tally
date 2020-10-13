import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from '@/store'

let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView);
const app = new Vue({
	store,
	...App
})
app.$mount()
