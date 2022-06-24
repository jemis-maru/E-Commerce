import axios from './request.js'

export function addComplaint(data) {
    return axios({
        url: "/complaint",
        method: "post",
        data
      })
}