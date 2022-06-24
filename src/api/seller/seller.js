import axios from '../request.js';

export function addSeller(data) {
    return axios({
        url: "/sellers",
        method: "post",
        data
      })
}