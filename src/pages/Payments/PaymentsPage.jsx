import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Payments = () => {
  const [cases, setCases] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [initialCasesLoading, setInitialCasesLoading] = useState(true);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = cases.filter((caseItem) =>
        caseItem.customer_name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCases(filtered);
    } else {
      setFilteredCases(cases);
    }
  };

  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("خطأ", "يرجى تسجيل الدخول أولاً.", "error", { rtl: true });
        return;
      }
      Swal.fire({
        title: "جاري تحميل القضايا...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        rtl: true,
      });
      try {
        const response = await axios.get(
          "https://law-office.al-mosa.com/api/cases",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCases(response.data.cases);
        setFilteredCases(response.data.cases);
      } catch (error) {
        Swal.fire("خطأ", "حدث خطأ أثناء تحميل القضايا.", "error", {
          rtl: true,
        });
      } finally {
        Swal.close();
        setInitialCasesLoading(false);
      }
    };
    fetchCases();
  }, []);

  const fetchPayments = async (caseItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("خطأ", "يرجى تسجيل الدخول أولاً.", "error", { rtl: true });
      return;
    }
    Swal.fire({
      title: "جاري تحميل المدفوعات...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      rtl: true,
    });
    try {
      const response = await axios.get(
        `https://law-office.al-mosa.com/api/customer/${caseItem.customer_id}/case/${caseItem.case_id}/payments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPayments(response.data.payments);
    } catch (error) {
      Swal.fire("خطأ", "حدث خطأ أثناء تحميل المدفوعات.", "error", {
        rtl: true,
      });
    } finally {
      Swal.close();
    }
  };

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
    fetchPayments(caseItem);
  };

  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPayment(null);
  };

  if (initialCasesLoading) return null;

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="mb-6">
        <input
          type="text"
          placeholder="ابحث باسم العميل"
          className="w-full p-3 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {filteredCases.map((caseItem) => (
          <div
            key={caseItem.case_id}
            className={`p-4 border rounded shadow cursor-pointer ${
              selectedCase?.case_id === caseItem.case_id
                ? "border-blue-500"
                : ""
            }`}
            onClick={() => handleCaseSelect(caseItem)}
          >
            <h3 className="text-lg font-bold">{caseItem.case_number}</h3>
            <p className="text-gray-700">{caseItem.customer_name}</p>
          </div>
        ))}
      </div>

      {selectedCase && (
        <div>
          <h4 className="text-lg font-semibold mb-4">تفاصيل المدفوعات</h4>
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">عنوان الدفع</th>
                <th className="border px-4 py-2">المبلغ</th>
                <th className="border px-4 py-2">التاريخ</th>
                <th className="border px-4 py-2">طريقة الدفع</th>
                <th className="border px-4 py-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{payment.title}</td>
                  <td className="border px-4 py-2">{payment.amount}</td>
                  <td className="border px-4 py-2">
                    {new Date(payment.date).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="border px-4 py-2">{payment.method}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                      onClick={() => handleOpenModal(payment)}
                    >
                      تفاصيل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPayment && (
              <>
                <h3 className="text-lg font-bold mb-4">تفاصيل الدفع</h3>
                <p>العنوان: {selectedPayment.title}</p>
                <p>المبلغ: {selectedPayment.amount}</p>
                <p>
                  التاريخ:{" "}
                  {new Date(selectedPayment.date).toLocaleDateString("ar-EG")}
                </p>
                <p>طريقة الدفع: {selectedPayment.method}</p>
                <button
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  إغلاق
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
