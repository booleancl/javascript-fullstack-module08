import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    products: []
  },
  mutations: {
    SET_USER(store,user){
      store.user = user
    },
    SET_PRODUCTS(store,products){
      store.products = products
    }
  },
  actions: {
    setUser({ commit }, user){
      commit('SET_USER', user)
    },
    async getProducts({commit}){
      try {
        const response = await axios.get('/api/products')
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
