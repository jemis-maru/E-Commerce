import axios from '../request'

export function getAllPendingProducts(){
    return axios({
        url:'/product/?status=false',
        method:'GET'
    })
}

export function getAllApprovedProducts(){
    return axios({
        url:'/product/?status=true&count=50',
        method:'GET'
    })
}

export function rejectPendingProduct(data){
    return axios({
        url:'/product/false',
        method:'put',
        data
    })
}

export function approveProduct(data){
    return axios({
        url:'/product/true',
        method:'put',
        data
    })
}