import { getAllProducts } from "../../api/product/product.js";

export default {
    namespaced: true,
    state() {
        return {
            products:[],
        }
    },
    mutations: {
        SET_PRODUCTS(state, payload){
            state.products = payload;
        }
    },
    actions: {
        fetchProducts(context){
            return new Promise((resolve, reject) => {
                getAllProducts()
                  .then((response) => {
                    return response.data.data.data;
                  })
                  .then((data) => {
                   
                    context.commit('SET_PRODUCTS', data)
                    resolve(data);
                  })
                  .catch((data, error) => {
                   
                    reject(error);
                  });
              });
        },
    },
    getters: {
        products(state){
            return state.products;
        }
    }
}