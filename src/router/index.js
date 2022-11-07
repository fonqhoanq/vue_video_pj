import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '../components/NavBar.vue'
import SignIn from '../views/Auth/SignIn.vue'
import SignUp from '../views/Auth/SignUp.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
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
