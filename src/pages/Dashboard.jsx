// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

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

  const cards = [
    { title: "الجلسات", value: "0" },
    { title: "القضايا", value: "0" },
    { title: "العملاء", value: "0" },
    { title: "المصروفات", value: "0" },
  ];

  const sidebarLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "العملاء", path: "/clients" },
    { name: "القضايا", path: "/cases" },
    { name: "المصروفات", path: "/expenses" },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} links={sidebarLinks} />
      <div className="flex-1">
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleFullscreen={toggleFullscreen}
        />
        <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} value={card.value} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
