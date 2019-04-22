import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    login(state, payload) {
      state.isLoggedIn = true
    },
    logout(state, payload) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login({ commit }) {
      commit('login')
    }
  }
})
