import Vue from 'vue'
import store from '@/store';
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: async (to, from, next) => {
      try {
        await store.dispatch('auth/authenticate');
        next('/schools');
      } catch (error) {
        next();
      }
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/account/Register.vue')
  },
  {
    path: '/schools',
    name: 'Schools',
    component: () => import('@/views/main/Schools.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/main/Create.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('@/views/main/Join.vue')
  },
  {
    path: '/school/:id',
    name: 'School',
    component: () => import('@/views/main/School.vue')
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: () => import('@/views/main/Forum.vue')
  },
  {
    path: '/postquestion/:id',
    name: 'PostQuestion',
    component: () => import('@/views/main/PostQuestion.vue')
  },
  {
    path: '/question/:schoolid/:id',
    name: 'Question',
    component: () => import('@/views/main/Question.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
