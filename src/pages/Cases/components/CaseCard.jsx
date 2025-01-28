import React from "react";

const CaseCard = ({
  caseData,
  onDetails,
  onDelete,
  onPayment,
  onSession,
  onAttachment,
  onEdit,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h3 className="text-xl font-bold mb-2">{caseData.customer_name}</h3>
    <p className="text-gray-700 mb-1">رقم الدعوى: {caseData.case_number}</p>
    <p className="text-gray-700 mb-1">فئة الدعوى: {caseData.case_category}</p>
    <p className="text-gray-700 mb-1">الهاتف: {caseData.customer_phone}</p>
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={onDetails}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        تفاصيل
      </button>
      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        تعديل
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        حذف
      </button>
    </div>
  </div>
);

export default CaseCard;

