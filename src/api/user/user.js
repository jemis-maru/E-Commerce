import axios from '../request.js';

export function getAllUsers(){
    return axios({
        url: "/users",
        method: "get",
      })
}

export function addUser(data) {
    return axios({
        url: "/users",
        method: "post",
        data
      })
}

export function getUser(id) {
  return axios({
      url: "/users/" + id,
      method: "get",
    })
}

export function updateUser(data, id) {
  return axios({
      url: "/users/"+id,
      method: "put",
      data
    })
}

export function verifyUser(data) {
  return axios({
      url: "/users/verifyotp",
      method: "post",
      data
    })
}

export function resendOtp(data) {
  return axios({
      url: "/users/resendotp",
      method: "post",
      data
    })
}

export function resetUserPassword(data){
  return axios({
    url:"/forgot-password",
    method:'post',
    data
  })
}