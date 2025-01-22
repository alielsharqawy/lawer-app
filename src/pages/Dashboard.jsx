import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HomePage from "./HomePage";
import {
  FaHome,
  FaUserFriends,
  FaBalanceScale,
  FaCog,
  FaCalendarAlt,
  FaFileAlt,
  FaImage,
  FaWallet,
} from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { GiTwoCoins } from "react-icons/gi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "الرئيسية", path: "/", icon: <FaHome /> },
    { name: "العملاء", path: "/clients", icon: <FaUserFriends /> },
    { name: "أنواع العملاء", path: "/clients-types", icon: <FaCog /> },
    { name: "إضافة عميل", path: "/add-client", icon: <TiUserAdd /> },
    { name: "أنواع القضايا", path: "/case-types", icon: <FaBalanceScale /> },
    { name: "إضافة قضية", path: "/add-case", icon: <IoAddCircleOutline /> },
    { name: "الجلسات", path: "/sessions", icon: <FaCalendarAlt /> },
    { name: "المدفوعات", path: "/payments", icon: <GiTwoCoins /> },
    { name: "تقارير المدفوعات", path: "/payment-reports", icon: <FaFileAlt /> },
    { name: "الصور والملفات", path: "/files", icon: <FaImage /> },
    { name: "المصروفات", path: "/expenses", icon: <FaWallet /> },
    { name: "إضافة مصروف", path: "/add-expense", icon: <IoAddCircleOutline /> },
    {
      name: "إضافة تصنيف مصاريف",
      path: "/add-expense-category",
      icon: <IoAddCircleOutline />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "mr-64" : "mr-0"
        }`}
      >
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          toggleFullscreen={() =>
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.documentElement.requestFullscreen()
          }
        />
        <HomePage />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} links={sidebarLinks} />
    </div>
  );
};

export default Dashboard;
