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
    { name: "الرئيسية", icon: <FaHome /> },
    { name: "العملاء", icon: <FaUserFriends /> },
    { name: "أنواع العملاء", icon: <FaCog /> },
    { name: "إضافة عميل", icon: <TiUserAdd /> },
    { name: "أنواع القضايا", icon: <FaBalanceScale /> },
    { name: "إضافة قضية", icon: <IoAddCircleOutline /> },
    { name: "الجلسات", icon: <FaCalendarAlt /> },
    { name: "المدفوعات", icon: <GiTwoCoins /> },
    { name: "تقارير المدفوعات", icon: <FaFileAlt /> },
    { name: "الصور والملفات", icon: <FaImage /> },
    { name: "المصروفات", icon: <FaWallet /> },
    { name: "إضافة مصروف", icon: <IoAddCircleOutline /> },
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
