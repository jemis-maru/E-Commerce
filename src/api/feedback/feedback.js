import axios from '../request.js';

export function addFeedback(data) {
    return axios({
        url: "/feedback",
        method: "post",
        data
      })
}

export function getFeedback(data) {
    return axios({
        url: "/feedback/get",
        method: "post",
        data
      })
}