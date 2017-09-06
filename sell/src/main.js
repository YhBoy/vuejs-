// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import sellers from './components/sellers/sellers'

//Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter({
	linkActiveClass : 'active',
	mode: 'history',
	routes : [
		{
			path : '/goods',
			component : goods
		},
		{
			path : '/ratings',
			component : ratings
		},
		{
			path : '/sellers',
			component : sellers
		},
		{
			path : '/',
			component : goods
		}
	]
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})











