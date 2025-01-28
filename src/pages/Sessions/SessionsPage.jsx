import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = "https://law-office.al-mosa.com/api";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSessionData, setEditSessionData] = useState(null);
  const [editSessionForm, setEditSessionForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    Swal.fire({
      title: "جاري تحميل الجلسات...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const response = await api.get("/sessions");
          setSessions([...response.data.sessions].reverse());
        } catch (err) {
          Swal.fire("خطأ!", "فشل تحميل الجلسات.", "error");
        } finally {
          Swal.close();
          setLoading(false);
        }
      },
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) =>
      session.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sessions, searchTerm]);

  const handleDeleteSession = async (session) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(
            `/customer/${session.customer_id}/case/${session.case_id}/session/${session.session_id}`
          );
          setSessions(
            sessions.filter((s) => s.session_id !== session.session_id)
          );
          Swal.fire("تم الحذف!", "تم حذف الجلسة بنجاح.", "success");
        } catch (err) {
          Swal.fire("خطأ!", "فشل حذف الجلسة.", "error");
        }
      }
    });
  };

  const handleEditSession = (session) => {
    setEditSessionData(session);
    setEditSessionForm({
      title: session.title,
      description: session.description,
      date: session.date,
    });
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleEditSessionInputChange = (e) => {
    const { name, value } = e.target;
    setEditSessionForm({ ...editSessionForm, [name]: value });
  };

  const handleUpdateSession = async () => {
    Swal.fire({
      title: "جاري تحديث الجلسة...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          await api.post(
            `/customer/${editSessionData.customer_id}/case/${editSessionData.case_id}/update-session/${editSessionData.session_id}`,
            editSessionForm
          );
          const updatedSessions = sessions.map((session) =>
            session.session_id === editSessionData.session_id
              ? { ...session, ...editSessionForm }
              : session
          );
          setSessions(updatedSessions);
          handleCloseEditModal();
          Swal.fire("تم التحديث!", "تم تحديث الجلسة بنجاح.", "success");
        } catch (error) {
          Swal.fire("خطأ!", "فشل تحديث الجلسة.", "error");
        } finally {
          Swal.close();
        }
      },
    });
  };

  const handleShowDetails = (session) => {
    setSelectedSession(session);
    setIsEditModalOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditSessionData(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">إدارة الجلسات</h2>
        <input
          type="text"
          className="border border-blue-400 rounded-lg p-2 w-64 focus:outline-blue-500"
          placeholder="ابحث عن جلسة..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSessions.map((session) => (
          <div
            key={session.session_id}
            className="p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {session.title}
            </h3>
            <p className="text-sm text-gray-600">
              رقم القضية: {session.case_number}
            </p>
            <p className="text-sm text-gray-600">
              تاريخ الجلسة: {session.date}
            </p>
            <p className="text-sm text-gray-600">
              ملخص الجلسة: {session.description}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => handleShowDetails(session)}
              >
                تفاصيل
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                onClick={() => handleEditSession(session)}
              >
                تعديل
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => handleDeleteSession(session)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Details */}
      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">تفاصيل الجلسة</h3>
            <p>عنوان الجلسة: {selectedSession.title}</p>
            <p>تاريخ الجلسة: {selectedSession.date}</p>
            <p>ملخص الجلسة: {selectedSession.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleCloseModal}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Modal for Editing */}
      {isEditModalOpen && editSessionData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">تعديل الجلسة</h3>
            <input
              type="text"
              className="w-full p-2 border mb-4"
              name="title"
              value={editSessionForm.title}
              onChange={handleEditSessionInputChange}
              placeholder="عنوان الجلسة"
            />
            <input
              type="date"
              className="w-full p-2 border mb-4"
              name="date"
              value={editSessionForm.date}
              onChange={handleEditSessionInputChange}
            />
            <textarea
              className="w-full p-2 border mb-4"
              name="description"
              value={editSessionForm.description}
              onChange={handleEditSessionInputChange}
              placeholder="ملخص الجلسة"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                onClick={handleCloseEditModal}
              >
                إغلاق
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleUpdateSession}
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
