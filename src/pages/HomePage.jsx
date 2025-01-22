import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { FaCalendarAlt, FaFolderOpen, FaUsers, FaWallet } from "react-icons/fa";

const HomePage = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = [
    "أهلا ومرحبا بك في برنامج المحامي",
    "نحن هنا في خدمتك ومساعدتك في كل ما يخص القضايا القانونية",
    "تسهيل إدارة قضاياك ومواعيدك بكل سهولة",
    "توفير الوقت والجهد للوصول إلى المعلومات بكل سهولة",
    "ابدأ الآن واستمتع بتجربة فريدة",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === textArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // تغيير النص كل 3 ثوانٍ

    return () => clearInterval(interval); // تنظيف التايمر عند إزالة الكومبوننت
  }, []);

  const cards = [
    "الجلسات",
    "القضايا",
    "العملاء",
    "المصروفات",
    "العقود",
    "المدفوع",
  ];

  const quickLinks = [
    { title: "الجلسات", icon: <FaCalendarAlt /> },
    { title: "القضايا", icon: <FaFolderOpen /> },
    { title: "العملاء", icon: <FaUsers /> },
    { title: "المصروفات", icon: <FaWallet /> },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-blue-800 text-white text-center py-4 rounded-lg text-2xl font-semibold">
        {textArray[currentTextIndex]}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <Card key={i} title={card} value="0" />
          ))}
        </div>
        <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-4">
          <div className="text-center text-blue-800 font-semibold mb-4">
            عرض الأسبوع
          </div>
          <div className="flex justify-between mb-4">
            <button className="text-blue-800">&lt;&lt;</button>
            <span>يناير 2025</span>
            <button className="text-blue-800">&gt;&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => (
              <button
                key={i}
                className="py-1 text-center border rounded hover:bg-blue-100"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map(({ title, icon }, i) => (
            <Card key={i} title={title} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
