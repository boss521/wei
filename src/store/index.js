import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from '../store/actions'
import mutations from '../store/mutations'

export default new Vuex.Store({
  state: {
    loginAccess: sessionStorage.getItem('loginAccess')
  },
  mutations,
  actions
})
