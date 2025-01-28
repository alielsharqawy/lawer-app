import axios from "axios";

const BASE_URL = "https://law-office.al-mosa.com/api";

const filesApi = {
  fetchAttachments: async (token) => {
    const response = await axios.get(`${BASE_URL}/attachments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.attachments;
  },
  fetchAttachmentDetails: async (token, customerId, caseId, attachmentId) => {
    const response = await axios.get(
      `${BASE_URL}/customer/${customerId}/case/${caseId}/attachment/${attachmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  deleteAttachment: async (token, customerId, caseId, attachmentId) => {
    await axios.delete(
      `${BASE_URL}/customer/${customerId}/case/${caseId}/attachment/${attachmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  updateAttachment: async (
    token,
    customerId,
    caseId,
    attachmentId,
    updatedData
  ) => {
    await axios.post(
      `${BASE_URL}/customer/${customerId}/case/${caseId}/update-attachment/${attachmentId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default filesApi;
