import axios from './request';
//seller

export function getAllOrders(){
    return axios({
        url:"/order",
        method:"GET",
    })
}

export function changeOrderStatus(data){
    return axios({
        url:'/order',
        method:'PUT',
        data
    })
}