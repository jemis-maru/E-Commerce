import axios from "axios";
// import Cookies from "js-cookie";
import store from "../store/index"
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    // const token = Cookies.get("token");
    const token = store.state.user.token
    if (token) {
      request.headers["Authorization"] = "Bearer " + token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default axiosInstance;
