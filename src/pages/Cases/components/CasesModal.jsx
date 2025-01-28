import React from "react";

const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  modalSize = "max-w-3xl",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header */}
        <div className="bg-blue-600 text-white py-3 px-6 rounded-t-lg text-center">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-center gap-4 bg-gray-100 rounded-b-lg">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

