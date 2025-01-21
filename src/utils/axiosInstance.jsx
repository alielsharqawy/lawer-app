import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://law-office.al-mosa.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
