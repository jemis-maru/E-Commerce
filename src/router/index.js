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
    beforeEnter (to, from, next) {
      if( !store.state.user.token || !store.state.user.role == 'SELLER'){
        next({ name: 'Login' })
      }
      else{
        
        next()
      }
    },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/seller/SellerProduct.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/seller/SellerOrder.vue')
      },
      {
        path: 'sellerProfile',
        name: 'sellerProfile',
        component: () => import('../views/seller/Profile/TheProfile.vue')
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('../views/seller/auth/TheLogin.vue')
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/TheDashboard.vue'),
    beforeEnter (to, from, next) {
      if( !store.state.user.token || !store.state.user.role == 'ADMIN'){
        next({ name: 'Login' })
      }
      else{
        
        next()
      }
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/AdminDashboard.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../views/admin/AdminUser.vue')
      },
      {
        path: 'sellers',
        name: 'AdminSellers',
        component: () => import('../views/admin/AdminSeller.vue')
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/AdminProduct.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/admin/AdminOrder.vue')
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/AdminCategory.vue')
      },
      {
        path: 'brands',
        name: 'AdminBrands',
        component: () => import('../views/admin/AdminBrands.vue')
      },
      {
        path: 'complaints',
        name: 'AdminComplaints',
        component: () => import('../views/admin/AdminComplaint.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/seller/registration',
        name: 'SellerReristration',
        component: () => import('../views/seller/Register.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: Category,
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        beforeEnter (to, from, next) {
          if( !store.state.user.token){
            next({ name: 'Login' })
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
        children: [
          {
            path: ':productId',
            component: SelectedProduct,
            props: true,
          },
        ],
      },
      {
        path: '/pastOrder',
        name: 'PastOrders',
        component: PastOrders,
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
      },
      {
        path: '/reset-pass',
        name: 'ResetPass',
        component: () => import('../views/ResetPass.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
      },
      {
        path: '/complaint',
        name: 'Complaint',
        component: () => import('../views/Complaint.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
