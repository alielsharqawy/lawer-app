import axios from "axios";

const API_BASE_URL = "https://law-office.al-mosa.com/api";
const getToken = () => localStorage.getItem("token");

{/* categories page api*/ }
// get all customers
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

//  update customers
export const updateCustomer = async (id, customerData) => {
  try {
    if (!id || !customerData) {
      throw new Error("Customer ID and data are required.");
    }
    const response = await axios.post(
      `${API_BASE_URL}/update-customer/${id}`,
      customerData,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to update customer.");
    }
    return response.data; 
  } catch (error) {
    console.error("Error updating customer:", error.response || error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An error occurred while updating the customer.");
  }
};
  
// delete customer
export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/customer/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to delete customer.");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error.response || error);
    throw error;
  }
};


// Function to fetch customer categories (add user page)
export const getCustomerCategories = async (token) => {
  return axios.get(`${API_BASE_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addCustomer = async (customerData, token) => {
  return axios.post(`${API_BASE_URL}/store-customer`, customerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// categories type page api
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

// add category type
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

// delete category
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
