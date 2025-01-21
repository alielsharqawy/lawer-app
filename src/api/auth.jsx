import axios from "../utils/axiosInstance";

export const register = async (data) => {
  return axios.post("/register", data);
};

export const login = async (data) => {
  return axios.post("/login", data);
};
