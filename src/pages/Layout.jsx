import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
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

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "الرئيسية", path: "/dashboard", icon: <FaHome /> },
    { name: "العملاء", path: "/dashboard/clients", icon: <FaUserFriends /> },
    {
      name: "أنواع العملاء",
      path: "/dashboard/clients-types",
      icon: <FaCog />,
    },
    { name: "إضافة عميل", path: "/dashboard/add-client", icon: <TiUserAdd /> },
    {
      name: "أنواع القضايا",
      path: "/dashboard/case-types",
      icon: <FaBalanceScale />,
    },
    {
      name: "إضافة قضية",
      path: "/dashboard/add-case",
      icon: <IoAddCircleOutline />,
    },
    { name: "الجلسات", path: "/dashboard/sessions", icon: <FaCalendarAlt /> },
    { name: "المدفوعات", path: "/dashboard/payments", icon: <GiTwoCoins /> },
    {
      name: "تقارير المدفوعات",
      path: "/dashboard/payment-reports",
      icon: <FaFileAlt />,
    },
    { name: "الصور والملفات", path: "/dashboard/files", icon: <FaImage /> },
    { name: "المصروفات", path: "/dashboard/expenses", icon: <FaWallet /> },
    {
      name: "إضافة مصروف",
      path: "/dashboard/add-expense",
      icon: <IoAddCircleOutline />,
    },
    {
      name: "إضافة تصنيف مصاريف",
      path: "/dashboard/add-expense-category",
      icon: <IoAddCircleOutline />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} links={sidebarLinks} />

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
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
