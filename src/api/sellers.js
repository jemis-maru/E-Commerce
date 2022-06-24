import axios from './request.js';

export function getApprovedSellers(){
    return axios({
        url: "/sellers?status=APPROVED",
        method: "get",
      })
}


export function getPendingSellers(){
  return axios({
      url: "/sellers?status=PENDING",
      method: "get",
    })
}