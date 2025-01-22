import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaHome, FaUserFriends,FaBalanceScale } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";
import { FaCalendarAlt } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { FaFileAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const sidebarLinks = [
    { name: "الرئيسية", path: "/", icon: <FaHome /> },
    { name: "العملاء", path: "/clients", icon: <FaUserFriends /> },
    { name: "العملاء", path: "/clients", icon: <FaUserFriends /> },
    { name: "أنواع العملاء", path: "/clients", icon: <FaUsersGear /> },
    { name: "اضافة عميل", path: "/clients", icon: <TiUserAdd /> },
    { name: "أنواع القضايا", path: "/cases", icon: <FaBalanceScale /> },
    { name: "اضافة قضية", path: "/clients", icon: <IoAddCircleOutline /> },
    { name: "الجلسات", path: "/add", icon: <FaCalendarAlt /> },
    { name: "المدفوعات", path: "/add", icon: <GiTwoCoins /> },
    { name: "تقارير المدفوعات", path: "/add", icon: <FaFileAlt /> },
    { name: "الصور والملفات", path: "/add", icon: <FaImage /> },
    { name: "المصروفات", path: "/add", icon: <FaWallet /> },
    { name: "إضافة مصروف", path: "/add", icon: <IoAddCircleOutline /> },
    { name: "إضافة تصنيف مصاريف", path: "/add", icon: <IoAddCircleOutline /> },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} links={sidebarLinks} />
      <div className="flex-1">
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleFullscreen={toggleFullscreen}
        />
        <main className="p-4">{/* Content here */}</main>
      </div>
    </div>
  );
};

export default Dashboard;
