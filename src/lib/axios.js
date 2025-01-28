import axiosInstance from "axios";

const axios = axiosInstance.create({
  withCredentials: true
});

axios.interceptors.request.use(config => {
    config.headers.authorization = JSON.parse(localStorage.getItem('token'))//token แนบไผกับ header และไปส่งไปที่server อีกที
    return config
})

export default axios;