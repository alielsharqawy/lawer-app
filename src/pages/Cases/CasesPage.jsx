import React, { useState, useEffect } from "react";
import { fetchCases, deleteCase, fetchCaseDetails } from "../../api/casesApi";
import CaseCard from "./components/CaseCard";
import Modal from "./components/CasesModal";

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCases();
      setCases(data.cases);
    };
    fetchData();
  }, []);

  const handleDetails = async (customerId, caseId) => {
    try {
      const details = await fetchCaseDetails(customerId, caseId);
      setSelectedCase(details);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching case details:", error);
    }
  };

  const handleDelete = async (caseId) => {
    await deleteCase(caseId);
    setCases((prevCases) => prevCases.filter((c) => c.id !== caseId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">القضايا</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((caseData) => (
          <CaseCard
            key={caseData.id}
            caseData={caseData}
            onDetails={() => handleDetails(caseData.customer_id, caseData.id)}
            onDelete={() => handleDelete(caseData.id)}
          />
        ))}
      </div>
      <Modal
        isOpen={showDetailsModal}
        title="تفاصيل القضية"
        onClose={() => setShowDetailsModal(false)}
      >
        {selectedCase ? (
          <div className="p-4 text-right">
            <h3 className="font-bold text-lg mb-4">معلومات القضية:</h3>
            <p>
              <strong>رقم القضية:</strong> {selectedCase.case.case_number}
            </p>
            <p>
              <strong>عنوان القضية:</strong> {selectedCase.case.case_title}
            </p>
            <p>
              <strong>اسم المحكمة:</strong> {selectedCase.case.court_name}
            </p>
            <p>
              <strong>اسم القاضي:</strong> {selectedCase.case.judge_name}
            </p>
            <p>
              <strong>نوع الخصم:</strong> {selectedCase.case.opponent_type}
            </p>
            <p>
              <strong>اسم الخصم:</strong> {selectedCase.case.opponent_name}
            </p>
            <p>
              <strong>عنوان الخصم:</strong> {selectedCase.case.opponent_address}
            </p>
            <p>
              <strong>هاتف الخصم:</strong> {selectedCase.case.opponent_phone}
            </p>
            <p>
              <strong>جنسية الخصم:</strong> {selectedCase.case.opponent_nation}
            </p>

            <h3 className="font-bold text-lg mt-4 mb-4">معلومات العميل:</h3>
            <p>
              <strong>اسم العميل:</strong> {selectedCase.customer.name}
            </p>
            <p>
              <strong>عنوان العميل:</strong> {selectedCase.customer.address}
            </p>
            <p>
              <strong>البريد الإلكتروني:</strong> {selectedCase.customer.email}
            </p>
            <p>
              <strong>رقم الهوية:</strong> {selectedCase.customer.ID_number}
            </p>
            <p>
              <strong>هاتف العميل:</strong> {selectedCase.customer.phone}
            </p>

            <h3 className="font-bold text-lg mt-4 mb-4">معلومات إضافية:</h3>
            <p>
              <strong>أتعاب المحاماة:</strong>{" "}
              {selectedCase.case.contract_price}
            </p>
            <p>
              <strong>المبلغ المسدد:</strong> {selectedCase.paid_amount}
            </p>
            <p>
              <strong>المبلغ المتبقي:</strong> {selectedCase.remaining_amount}
            </p>
            <p>
              <strong>الملاحظات:</strong> {selectedCase.case.notes}
            </p>
          </div>
        ) : (
          <p>جارٍ تحميل التفاصيل...</p>
        )}
      </Modal>
    </div>
  );
};

export default CasesPage;
