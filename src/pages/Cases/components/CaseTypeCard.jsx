import React from "react";
import { MdDelete } from "react-icons/md";

const CaseTypeCard = ({ caseType, onDelete }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    {/* Case Type Name */}
    <h3 className="text-lg font-bold text-gray-800 break-words w-full sm:w-auto text-center sm:text-left">
      {caseType.name}
    </h3>

    {/* Delete Button */}
    <button
      onClick={onDelete}
      className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      <MdDelete size={20} />
    </button>
  </div>
);

export default CaseTypeCard;
