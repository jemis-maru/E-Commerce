import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Category from '../views/Category.vue';
import SelectedProduct from '../views/SelectedProduct.vue';
import Cart from '../views/Cart.vue';
import PastOrders from '../views/PastOrders.vue';
import store from '../store/index';
const routes = [
  {
    path: '/seller',
    name: 'Seller',
    component: () => import('../views/seller/TheDashboard.vue'),
    beforeEnter: (to, from, next) => {
      if( store.state.user.token && store.state.user.role == 'SELLER'){
        next()
      }
      else{
        if(store.state.user.role == 'ADMIN'){
          next({name: 'AdminUsers'})
        }
        else{
          next("/")
        }
      }
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'product',
        name: 'SellerProduct',
        component: () => import('../views/seller/SellerProduct.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/seller/SellerOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'sellerProfile',
        name: 'sellerProfile',
        component: () => import('../views/seller/Profile/TheProfile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('../views/seller/auth/TheLogin.vue'),
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/TheDashboard.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if( store.state.user.token && store.state.user.role == 'ADMIN'){
        next()
      }
      else{
        if(store.state.user.role == 'SELLER'){
          next({name:'SellerProduct'})
        }
        else{
          next("/")
        }
      }
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/AdminDashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../views/admin/AdminUser.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'sellers',
        name: 'AdminSellers',
        component: () => import('../views/admin/AdminSeller.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/AdminProduct.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/admin/AdminOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/AdminCategory.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'brands',
        name: 'AdminBrands',
        component: () => import('../views/admin/AdminBrands.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'complaints',
        name: 'AdminComplaints',
        component: () => import('../views/admin/AdminComplaint.vue'),
        meta: { requiresAuth: true },
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false 
    },
    children: [
      {
        path: '/about',
        name: 'About',
        meta: { requiresAuth: false },
        component: About
      },
      {
        path: '/seller/registration',
        name: 'SellerReristration',
        meta: { requiresAuth: false },
        component: () => import('../views/seller/Register.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: Category,
        meta: { requiresAuth: false },
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true },
        beforeEnter (to, from, next) {
          if( !store.state.user.token){
            next({ name: 'Login',query: { redirect: this.$route.fullPath } })
          }
          else{
            next()
          }
        },
      },
      {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: { requiresAuth: false },
        children: [
          {
            path: ':productId',
            component: SelectedProduct,
            meta: { requiresAuth: false },
            props: true,
          },
        ],
      },
      {
        path: '/pastOrder',
        name: 'PastOrders',
        component: PastOrders,
        meta: { requiresAuth: true },
      },
      {
        path: '/login',
        name: 'Login',
        meta: { requiresAuth: false },
        component: () => import('../views/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        meta: { requiresAuth: false },
        component: () => import('../views/Register.vue')
      },
      {
        path: '/reset-pass',
        name: 'ResetPass',
        meta: { requiresAuth: false },
        component: () => import('../views/ResetPass.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/complaint',
        name: 'Complaint',
        component: () => import('../views/Complaint.vue'),
        meta: { requiresAuth: true },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  // if(to.meta.requiresAuth || to.name == 'Login')
  if(to.meta.requiresAuth || to.name == 'Login'){
    if(!store.state.user.token && to.name != 'Login'){
      next({name:"Login",query: { redirect: this.$route.fullPath }})
    }
    else if(store.state.user.token && store.state.user.role === 'ADMIN'){
      if(to.name == 'Login'){next({name: 'AdminUsers'})}
      else { next()}
    }
    else if(store.state.user.token && to.name == 'Login' && store.state.user.role === 'SELLER')
    {
      next({name:'SellerProduct'})
    }
    else if(store.state.user.token && to.name == 'Login'){
        next({name: 'Home'})
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
