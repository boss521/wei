import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import qs from 'qs'


// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://wei.betterman.top';
// axios.defaults.baseURL = 'http://192.168.0.106:8082';
axios.defaults.headers.post['Content-Type'] = 'application/json';

router.beforeEach((to, from, next) => {
  // to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if (to.path === '/login') {// 如果即将进入登录路由，则直接放行
    next()
  } else {// 进入的不是登录路由
    if (to.meta.requiresAuth && !sessionStorage.getItem('loginAccess')) {
      next({path: '/login'})
    } else {// 下一跳路由需要登录验证，并且还未登录，则路由定向到 登录路由
      next()
    }
  }// 如果不需要登录验证，或者已经登录成功，则直接放行
})

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
