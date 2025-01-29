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
}) => (
  <div className="bg-gray-50 shadow-xl rounded-lg max-w-md">
    <h3 className="text-xl font-medium mb-2  bg-blue-500 p-3 text-white rounded-t-lg">
      {caseData.customer_name}
    </h3>
    <table className="w-full text-gray-700 mb-2">
      <tbody>
        <tr>
          <td className="text-gray-600 mb-1 text-bold text-lg">رقم الدعوى :</td>
          <td className="px-5">{caseData.case_number}</td>
        </tr>
        <tr>
          <td className="text-gray-600 mb-1 text-bold text-lg">فئة الدعوى :</td>
          <td className="px-5">{caseData.case_category}</td>
        </tr>
        <tr>
          <td className="text-gray-600 mb- text-bold text-lg">الهاتف :</td>
          <td className="px-5">{caseData.customer_phone}</td>
        </tr>
      </tbody>
    </table>
    <div className="flex flex-wrap gap-2 mt-4 p-3">
      {[
        {
          action: onDetails,
          color: "blue",
          icon: FaInfoCircle,
          label: "تفاصيل",
        },
        { action: onEdit, color: "yellow", icon: FaEdit, label: "تعديل" },
        { action: onDelete, color: "red", icon: FaTrash, label: "حذف" },
        { action: onPayment, color: "green", icon: FaMoneyBill, label: "دفع" },
        {
          action: onSession,
          color: "indigo",
          icon: FaPlusCircle,
          label: "جلسة",
        },
        {
          action: onAttachment,
          color: "purple",
          icon: FaPaperclip,
          label: "مرفق",
        },
        {
          action: onExpenses,
          color: "teal",
          icon: FaFileInvoiceDollar,
          label: "المصاريف",
        },
        {
          action: onNewExpense,
          color: "orange",
          icon: FaPlusCircle,
          label: "مصاريف جديدة",
        },
      ].map((btn, index) => (
        <button
          key={index}
          onClick={btn.action}
          className={`flex items-center gap-2 bg-${btn.color}-500 text-white px-4 py-2 rounded hover:bg-${btn.color}-600`}
        >
          <btn.icon /> {btn.label}
        </button>
      ))}
    </div>
  </div>
);

export default CaseCard;
