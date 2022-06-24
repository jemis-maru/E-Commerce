import axios from '../request'

export function getAllOrders(){
    return axios({
        url:'/order', // add url
        method:'get'  
    })
}