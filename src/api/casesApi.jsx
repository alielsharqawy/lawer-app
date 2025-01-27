import axios from "axios";
import Swal from "sweetalert2";

/**
 * Unified API request handler
 * @param {string} url - The API endpoint.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} [data=null] - Request body for POST/PUT methods.
 * @param {object} [headers={}] - Additional request headers.
 * @param {function} [navigate] - Optional navigate function for redirecting.
 * @returns {Promise<object>} - API response data.
 */
const apiRequest = async (url, method, data = null, headers = {}, navigate) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  } catch (error) {
    console.error("API request failed:", error);

    let errorMessage = "حدث خطأ غير متوقع أثناء تنفيذ العملية.";
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate && navigate("/SignUp");
        return;
      }
      errorMessage = error.response.data.message || "حدث خطأ غير متوقع.";
    } else if (error.request) {
      errorMessage =
        "لا يمكن الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.";
    }

    Swal.fire({
      icon: "error",
      title: "فشل في العملية",
      text: errorMessage,
      confirmButtonText: "موافق",
      rtl: true,
    });
    throw new Error(errorMessage);
  }
};

/**
 * Fetch all case categories.
 */
export const fetchCaseCategories = (navigate) =>
  apiRequest(
    "https://law-office.al-mosa.com/api/case-categories",
    "get",
    null,
    {},
    navigate
  );

/**
 * Fetch all customers.
 */
export const fetchCustomers = (navigate) =>
  apiRequest(
    "https://law-office.al-mosa.com/api/customers",
    "get",
    null,
    {},
    navigate
  );

/**
 
 * Fetch all cases.
 */
export const fetchCases = (navigate) =>
  apiRequest(
    "https://law-office.al-mosa.com/api/cases",
    "get",
    null,
    {},
    navigate
  );

/**
 * Fetch details of a specific case.
 */
export const fetchCaseDetails = (customerId, caseId, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}`,
    "get",
    null,
    {},
    navigate
  );

/**
 * Delete a specific case.
 */
export const deleteCase = (customerId, caseId, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}`,
    "delete",
    null,
    {},
    navigate
  );

/**
 * Update details of a specific case.
 */
export const updateCase = (customerId, caseId, data, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/update-case/${caseId}`,
    "post",
    data,
    {},
    navigate
  );

/**
 * Add a payment for a specific case.
 */
export const addPayment = (customerId, caseId, data, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}/store-payment`,
    "post",
    data,
    {},
    navigate
  );

/**
 * Fetch expenses for a specific case.
 */
export const fetchCaseExpenses = (customerId, caseId, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}/case-expenses`,
    "get",
    null,
    {},
    navigate
  );

/**
 * Add an expense to a specific case.
 */
export const addCaseExpense = (customerId, caseId, data, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}/store-expense`,
    "post",
    data,
    {},
    navigate
  );

/**
 * Update an expense for a specific case.
 */
export const updateCaseExpense = (
  customerId,
  caseId,
  expenseId,
  data,
  navigate
) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}/update-expense/${expenseId}`,
    "post",
    data,
    {},
    navigate
  );

/**
 * Delete an expense for a specific case.
 */
export const deleteCaseExpense = (customerId, caseId, expenseId, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/case/${caseId}/expense/${expenseId}`,
    "delete",
    null,
    {},
    navigate
  );

//  Add a new case for a customer.
export const addCase = (customerId, caseData, navigate) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/customer/${customerId}/store-case`,
    "post",
    caseData,
    {},
    navigate
  );
