import Vue from "vue"
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
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
    component: () => import('../pages/layout/index'),
    children: [{
      path: '',
      meta: {
        requiresAuth: true
      },
      component: () => import('../pages/allUserList/index')
    }, {
      path: 'addNewUser',
      meta: {
        requiresAuth: true
      },
      component: () => import('../pages/addNewUser/index')
    }]
  }, {
    path: '*',
    redirect: '/'
  }]
})
