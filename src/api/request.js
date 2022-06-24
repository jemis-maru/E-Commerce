import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://1c9d-103-240-35-190.in.ngrok.io",
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = Cookies.get("token");
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
