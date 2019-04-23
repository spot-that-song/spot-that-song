import Vue from 'vue'
import Vuex from 'vuex'
import db from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    UserId: '',
    userEmail: '',
    rooms: []
  },
  mutations: {
    login(state, payload) {
      if (payload) {
        const { uid, email } = payload
        state.UserId = uid
        state.userEmail = email
      }
      state.isLoggedIn = true
    },
    logout(state, payload) {
      state.isLoggedIn = false
    },
    getRooms(state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    getRooms({ commit }) {
      db
        .collection('rooms')
        .get()
        .then((allRooms) => {
          let rooms = []
          allRooms.forEach((room) => {
            rooms.push({
              id: room.id,
              ...room.data()
            })
          })
          commit('getRooms', rooms)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
