import axios from "./request";
export function fetchSeller(id) {
    return axios({
        url: "/users/"+id,
        method: "get",
        
      })
  }
export function changeDetailSeller(data, id) {
    return axios({
        url: "/users/"+id,
        method: "put",
        data
      })
  }