import { createStore } from 'vuex';
import productModule from './product/products.js';
import cartModule from './cart/cart.js';
import userModule from './user/user.js';
import createPersistedState from 'vuex-persistedstate';


const store = createStore({
  plugins: [
    createPersistedState({
      storage:window.localStorage
    })
  ],
  modules:{
    products: productModule,
    cart: cartModule,
    user: userModule
  }
})

export default store;