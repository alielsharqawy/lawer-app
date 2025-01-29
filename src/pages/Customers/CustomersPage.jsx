import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../../api/customers";
import { FaTrash, FaEdit, FaInfoCircle, FaPlus } from "react-icons/fa";

const Customers = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await getAllCustomers();
      setClients(response.data);
      Swal.close();
    } catch (error) {
      Swal.fire("Error", "Failed to fetch clients.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف!",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCustomer(id);
          setClients((prev) => prev.filter((client) => client.id !== id));
          Swal.fire("تم الحذف!", "تم حذف العميل بنجاح.", "success");
        } catch (error) {
          Swal.fire("خطأ", "فشل في حذف العميل.", "error");
        }
      }
    });
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleShowDetails = (client) => {
    setSelectedClient(client);
    setIsShowModalOpen(true);
  };

  const handleSaveEdit = async () => {
    Swal.fire({
      title: "جاري الحفظ...",
      text: "يرجى الانتظار أثناء حفظ التعديلات.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await updateCustomer(selectedClient.id, selectedClient);
      setClients((prev) =>
        prev.map((client) =>
          client.id === selectedClient.id ? selectedClient : client
        )
      );
      Swal.fire("تم الحفظ", "تم تعديل بيانات العميل بنجاح", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      Swal.fire("خطأ", error.message || "فشل في تحديث بيانات العميل.", "error");
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          العملاء
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="ابحث من خلال الاسم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full sm:max-w-md"
          />
          <Link
            to="/dashboard/add-client"
            className="p-3 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            اضافة عميل جديد <FaPlus />
          </Link>
        </div>

        {/* Clients List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-4 shadow-md rounded-lg"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  <strong> الاسم : </strong> {client.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  <strong>البريد الاكتروني :</strong> {client.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>الهاتف :</strong> {client.phone}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    className="flex flex-wrap justify-center items-center gap-3 px-4 py-2 bg-gray-500 text-white rounded-lg"
                    onClick={() => handleShowDetails(client)}
                  >
                    تفاصيل <FaInfoCircle />
                  </button>
                  <button
                    className="flex flex-wrap justify-center items-center gap-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => handleEdit(client)}
                  >
                    تعديل البيانات <FaEdit />
                  </button>
                  <button
                    className="flex flex-wrap justify-center items-center gap-3 px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => handleDelete(client.id)}
                  >
                    حذف العميل <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              No clients found.
            </p>
          )}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && selectedClient && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
              <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                تعديل بيانات العميل
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* اسم العميل */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    اسم العميل
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.name}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.email}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                {/* رقم الهوية */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    رقم الهوية/السجل التجاري
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.ID_number}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        ID_number: e.target.value,
                      })
                    }
                  />
                </div>

                {/* رقم الهاتف */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.phone}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                {/* العنوان */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.address}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                {/* الجنسية */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الجنسية
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.nationality}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        nationality: e.target.value,
                      })
                    }
                  />
                </div>

                {/* اسم الشركة */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    اسم الشركة (إن وجد)
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    value={selectedClient.company_name}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        company_name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* ملاحظات */}
                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    ملاحظات إضافية
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    rows="3"
                    value={selectedClient.notes}
                    onChange={(e) =>
                      setSelectedClient({
                        ...selectedClient,
                        notes: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              {/* أزرار */}
              <div className="text-center mt-6 flex justify-center gap-3">
                <button
                  className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition mr-2"
                  onClick={handleSaveEdit}
                >
                  حفظ التعديلات
                </button>
                <button
                  className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Show Modal */}
        {isShowModalOpen && selectedClient && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                بيانات العميل
              </h2>
              <table className="table-auto w-full text-gray-700 border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      اسم العميل:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.name}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      البريد الإلكتروني:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.email}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      رقم الهوية/السجل التجاري:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.ID_number}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      رقم الهاتف:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.phone}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      العنوان:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.address}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      الجنسية:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.nationality}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-semibold text-right">
                      اسم الشركة (إن وجد):
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.company_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-right">
                      ملاحظات إضافية:
                    </td>
                    <td className="px-4 py-2 text-left">
                      {selectedClient.notes}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center mt-6">
                <button
                  className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
                  onClick={() => setIsShowModalOpen(false)}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
