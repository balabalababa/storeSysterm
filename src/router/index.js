import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect:'/login'
},{
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    component: () => import( /* webpackChunkName: "about" */ '../views/admin.vue'),
    children: [{
        path: 'order',
        name: 'Order',
        component: () => import('../views/order')
      },
      {
        path: 'refund',
        name: 'Refund',
        component: () => import('../views/refuned')
      },
      {
        path: 'consume',
        name: 'consume',
        component: () => import('../views/consume')
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('../views/brand')
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('../views/product')
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('../views/edit'),
      },
      {
        path: 'supply',
        name: 'supply',
        component: () => import('../views/supply'),
      },
      {
        path: 'homeImg',
        name: 'homeImg',
        component: () => import('../views/homeImg'),
      }
    ]
  },

]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router