import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('../pages/login/index')
  }, {
    path: '/login',
    component: () => import('../pages/login/index')
  }, {
    path: '/layout',
    meta: {
      requiresAuth: true
    },
    component: () => import('../pages/layout/index')
  }, {
    path: '*',
    redirect: '/'
  }]
})
