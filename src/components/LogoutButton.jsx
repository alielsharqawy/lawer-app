import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-6 px-4 py-3  text-blue-800 font-medium hover:bg-gray-100 hover:shadow-lg rounded-md w-full"
    >
      <FaSignOutAlt />
      <span>تسجيل الخروج</span>
    </button>
  );
};

export default LogoutButton;
