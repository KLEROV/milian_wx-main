import App from './App'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
import api from 'api/api.js';
Vue.prototype.$api=api;
App.mpType = 'app'
const app = new Vue({
	...App
})

app.$mount()
// #endif 
wx.onAppRoute((res)=>{
	// console.log(res,121212);
})
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
