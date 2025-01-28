import React from "react";

const FileCard = ({
  attachment,
  onViewDetails,
  onEdit,
  onDelete,
  getFileIconClass,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <i
          className={`${getFileIconClass(
            attachment["file type"]
          )} text-2xl text-blue-500`}
        ></i>
        <h5 className="ml-3 text-lg font-bold text-gray-700">
          {attachment.title}
        </h5>
      </div>
      <div className="text-gray-600">
        <p>
          <span className="font-semibold">رقم القضية:</span>{" "}
          {attachment.case_number}
        </p>
        <p>
          <span className="font-semibold">العميل:</span>{" "}
          {attachment.customer_name}
        </p>
        <p>
          <span className="font-semibold">نوع الملف:</span>{" "}
          {attachment["file type"]}
        </p>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          onClick={() => onViewDetails(attachment)}
        >
          تفاصيل
        </button>
        <button
          className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
          onClick={() => onEdit(attachment)}
        >
          تعديل
        </button>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          onClick={() => onDelete(attachment.attachment_id)}
        >
          مسح
        </button>
      </div>
    </div>
  );
};

export default FileCard;
