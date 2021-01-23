import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'empty'
      },
      component: () => import('./pages/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'empty'
      },
      component: () => import('./pages/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Detail.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Planning.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Record.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Profile.vue')
    },
    {
      path: '*',
      name: 'page-not-found',
      meta: {
        layout: 'empty'
      },
      component: () => import('./pages/PageNotFound.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      meta: {
        layout: 'main'
      },
      component: () => import('./pages/Posts.vue')
    },
  ]
})
