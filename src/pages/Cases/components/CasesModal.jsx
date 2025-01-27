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
      <div className={`bg-white rounded-lg shadow-lg w-full ${modalSize}`}>
        <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
