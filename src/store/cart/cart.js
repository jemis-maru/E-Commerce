import { getCart } from "../../api/cart/cart.js";

const state = {
    products: [],
}
const mutations = {
    SET_PRODUCTS(state, payload){
        state.products = payload
    },
    RESET_PRODUCTS(state){
        state.products = []
    }
}
const actions = {
    fetchProducts(context){
        return new Promise((resolve, reject) => {
            getCart()
              .then((response) => {
                return response.data.data;
              })
              .then((data) => {
                context.commit('SET_PRODUCTS', data);
                resolve(data);
              })
              .catch((data, error) => {
                reject(error);
              });
          });
    }
}
const getters = {
    products(state){
        return state.products;
    },
    cartCount(state){
        return state.products.length;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}