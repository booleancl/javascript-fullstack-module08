import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(store,user){
      store.user = user
    }
  },
  actions: {
    setUser({ commit }, user){
      commit('SET_USER', user)
    }
  },
  modules: {
  }
})
