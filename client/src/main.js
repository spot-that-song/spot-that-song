import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import './stylus/main.styl'
import router from './router'
import firebase from 'firebase'
import config from './firebase'

firebase.initializeApp(config);

Vue.config.productionTip = false

// FIREBASE AUTH
let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})