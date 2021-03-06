import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import firebase from 'firebase'
import RoomStatus from './views/RoomStatus.vue'
import quiz from './components/quiz.vue'

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
            path: '/quiz/:RoomID',
            name: 'quiz',
            component: Quiz
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'lobby/:RoomID',
                    name: 'Lobby',
                    component: RoomStatus
                }
            ]
        },
        // {
        //     path: '/quiz',
        //     name: 'Quiz',
        //     component: Quiz
        // }
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