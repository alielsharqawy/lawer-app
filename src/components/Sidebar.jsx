import React from "react";
import {
  FaHome,
  FaUserFriends,
  FaBalanceScale,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileInvoice,
  FaImage,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen, links, onLogout }) => {
  return (
    <aside
      className={`fixed top-20 right-0 w-64 h-full bg-white text-blue-900 shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <ul className="mt-4 space-y-4 px-4">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.path}
              className="flex items-center text-2xl px-4 py-2 hover:bg-black hover:text-white transition-all rounded-lg"
            >
              {link.icon && <span className="mr-3">{link.icon}</span>}
              {link.name}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={onLogout}
            className="flex items-center text-2xl px-4 py-2 w-full hover:bg-black hover:text-white transition-all rounded-lg"
          >
            <FaSignOutAlt className="mr-3" />
            تسجيل الخروج
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
