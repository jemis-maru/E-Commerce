import axios from '../request.js'

export function addAddress(data) {
    return axios({
        url: "/address",
        method: "post",
        data
      })
}

export function getAllAddress() {
  return axios({
      url: "/address",
      method: "get",
    })
}

export function getAddress(id) {
  return axios({
      url: "/address/" + id,
      method: "get",
    })
}

export function updateAddress(data, id) {
  return axios({
      url: "/address/"+id,
      method: "put",
      data
    })
}