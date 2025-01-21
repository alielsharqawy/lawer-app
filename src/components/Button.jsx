import React from "react";

function Button({ children, type = "button", className, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
