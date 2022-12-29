import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import SignIn from '../views/Auth/SignIn.vue'
import SignUp from '../views/Auth/SignUp.vue'
import UploadVideo from '../views/Singer/UploadVideo.vue'
import DashBoard from '../views/Singer/DashBoard.vue'
import IndexDashBoard from '../views/Singer/Index.vue'
import SingerSignUp from '../views/Auth/SingerSignUp.vue'
// import StudioNavBar from '../components/StudioNavBar.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/singer/signup',
    name: 'SingerSignUp',
    component: SingerSignUp
  },
  {
    path: '/studio',
    component: IndexDashBoard,
    children: [
      {
        path: '',
        name: 'DashBoard',
        component: DashBoard
      },
    ],
  },
  {
    path: '/uploadvideo',
    name: 'UploadVideo',
    component: UploadVideo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else if (
    to.matched.some((record) => record.meta.requiresVisitor) &&
    loggedIn
  ) {
    next('/')
  } else {
    next()
  }
})
export default router
