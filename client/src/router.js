import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            component: Home
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

// FIREBASE AUTH
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) next({ path: '/login' })
    else next()
})

export default router