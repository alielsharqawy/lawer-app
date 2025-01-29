import React from "react";
import {
  FaInfoCircle,
  FaEdit,
  FaTrash,
  FaMoneyBill,
  FaPaperclip,
  FaFileInvoiceDollar,
  FaPlusCircle,
} from "react-icons/fa";

const CaseCard = ({
  caseData,
  onDetails,
  onDelete,
  onPayment,
  onSession,
  onAttachment,
  onEdit,
  onExpenses,
  onNewExpense,
}) => {
  const buttons = [
    {
      action: onDetails,
      color: "bg-blue-500",
      hover: "hover:bg-blue-600",
      icon: FaInfoCircle,
      label: "تفاصيل",
    },
    {
      action: onEdit,
      color: "bg-yellow-500",
      hover: "hover:bg-yellow-600",
      icon: FaEdit,
      label: "تعديل",
    },
    {
      action: onDelete,
      color: "bg-red-500",
      hover: "hover:bg-red-600",
      icon: FaTrash,
      label: "حذف",
    },
    {
      action: onPayment,
      color: "bg-green-500",
      hover: "hover:bg-green-600",
      icon: FaMoneyBill,
      label: "دفع",
    },
    {
      action: onSession,
      color: "bg-indigo-500",
      hover: "hover:bg-indigo-600",
      icon: FaPlusCircle,
      label: "جلسة",
    },
    {
      action: onAttachment,
      color: "bg-purple-500",
      hover: "hover:bg-purple-600",
      icon: FaPaperclip,
      label: "مرفق",
    },
    {
      action: onExpenses,
      color: "bg-teal-500",
      hover: "hover:bg-teal-600",
      icon: FaFileInvoiceDollar,
      label: "المصاريف",
    },
    {
      action: onNewExpense,
      color: "bg-orange-500",
      hover: "hover:bg-orange-600",
      icon: FaPlusCircle,
      label: "مصاريف جديدة",
    },
  ];

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg max-w-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 text-center font-bold text-lg">
        {caseData.customer_name}
      </div>

      {/* Case Details */}
      <div className="p-4">
        <table className="w-full text-gray-700">
          <tbody>
            <tr>
              <td className="font-semibold text-gray-600">رقم الدعوى:</td>
              <td className="px-4">{caseData.case_number}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-600">فئة الدعوى:</td>
              <td className="px-4">{caseData.case_category}</td>
            </tr>
            <tr>
              <td className="font-semibold text-gray-600">الهاتف:</td>
              <td className="px-4">{caseData.customer_phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 p-4 bg-gray-100">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            className={`flex items-center justify-center gap-2 ${btn.color} text-white px-3 py-2 rounded-md transition duration-300 ${btn.hover}`}
          >
            <btn.icon className="text-lg" /> {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CaseCard;
