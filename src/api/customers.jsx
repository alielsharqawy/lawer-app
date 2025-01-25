import axios from "axios";

const API_BASE_URL = "https://law-office.al-mosa.com/api";

// Utility function to retrieve the token
const getToken = () => localStorage.getItem("token");

// العملاء
export const getAllCustomers = async () => {
  try {
    return axios.get(`${API_BASE_URL}/customers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error fetching customers:", error.response || error);
    throw error;
  }
};

export const addCustomer = async (customerData) => {
  try {
    return axios.post(`${API_BASE_URL}/store-customer`, customerData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error adding customer:", error.response || error);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    return axios.post(`${API_BASE_URL}/update-customer/${id}`, customerData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error updating customer:", error.response || error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    return axios.delete(`${API_BASE_URL}/customer/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error deleting customer:", error.response || error);
    throw error;
  }
};

// فئات العملاء
export const getAllCategories = async () => {
  try {
    return axios.get(`${API_BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error fetching categories:", error.response || error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    return axios.post(`${API_BASE_URL}/category`, categoryData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error adding category:", error.response || error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    return axios.delete(`${API_BASE_URL}/category/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error deleting category:", error.response || error);
    throw error;
  }
};
