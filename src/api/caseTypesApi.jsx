import axios from "axios";
import Swal from "sweetalert2";

const apiRequest = async (url, method, data = null, headers = {}, token) => {
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
    let errorMessage = "حدث خطأ غير متوقع.";

    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      errorMessage = "لا يمكن الاتصال بالخادم. يرجى المحاولة لاحقاً.";
    }

    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

export const fetchCaseTypes = (token) =>
  apiRequest(
    "https://law-office.al-mosa.com/api/case-categories",
    "get",
    null,
    {},
    token
  );

export const addCaseType = (data, token) =>
  apiRequest(
    "https://law-office.al-mosa.com/api/case-category",
    "post",
    data,
    {},
    token
  );

export const deleteCaseType = (id, token) =>
  apiRequest(
    `https://law-office.al-mosa.com/api/case-category/${id}`,
    "delete",
    null,
    {},
    token
  );
