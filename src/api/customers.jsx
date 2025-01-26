import axios from "axios";

const API_BASE_URL = "https://law-office.al-mosa.com/api";

// Utility function to retrieve the token
const getToken = () => localStorage.getItem("token");

// categories page api
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

export const updateCustomer = async (id, customerData) => {
  try {
    // تحقق من البيانات قبل الإرسال
    if (!id || !customerData) {
      throw new Error("Customer ID and data are required.");
    }

    // إرسال الطلب إلى API
    const response = await axios.post(
      `${API_BASE_URL}/update-customer/${id}`,
      customerData,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );

    // تحقق من استجابة الـ API
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to update customer.");
    }

    return response.data; // إرجاع البيانات المستلمة
  } catch (error) {
    // طباعة الخطأ في وحدة التحكم
    console.error("Error updating customer:", error.response || error);

    // إذا كانت رسالة خطأ من الخادم، اعرضها
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // رسالة عامة إذا لم تتوفر رسالة خطأ محددة
    throw new Error("An error occurred while updating the customer.");
  }
};
 
export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/customer/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    // تحقق من استجابة الـ API
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
