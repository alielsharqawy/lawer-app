import axios from "axios";

const API_URL = "https://law-office.al-mosa.com/api";

// Login Request
export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

// Register Request
export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};

// ForgotPassword Request
export const forgotPassword = async (data) => {
  return axios.post(`${API_URL}/forgot-password`, data);
};

// ResetPassword Request
export const resetPassword = async (data) => {
  return axios.post(`${API_URL}/reset-password`, data);
};