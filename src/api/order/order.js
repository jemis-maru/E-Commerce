import axios from '../request.js';

export function addOrder(data) {
    return axios({
        url: "/order",
        method: "post",
        data
      })
}

export function cancelOrder(data) {
    return axios({
        url: "/order",
        method: "put",
        data
      })
}

export function getOrders(){
    return axios({
        url: "/order",
        method: "get",
      })
}

export function returnOrder(data){
  return axios({
      url: "/order",
      method: "DELETE",
      data
    })
}