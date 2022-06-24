import axios from '../request.js';

export function addToCart(data) {
    return axios({
        url: "/cart",
        method: "post",
        data
      })
}

export function getCart(){
    return axios({
        url: "/cart",
        method: "get",
      })
}

export function updateCart(data) {
  return axios({
      url: "/cart",
      method: "put",
      data
    })
}

export function removeItemFromCart(data){
    return axios({
        url: "/cart/",
        method: "DELETE",
        data
      })
}