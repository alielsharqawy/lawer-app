import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import {
  FaCalendarAlt,
  FaFolderOpen,
  FaUsers,
  FaWallet,
  FaFileContract,
  FaMoneyBillWave,
} from "react-icons/fa";

const HomePage = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [dataCounts, setDataCounts] = useState({
    sessions: 0,
    cases: 0,
    clients: 0,
    expenses: 0,
    contracts: 0,
    payments: 0,
  });

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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // ✅ جلب البيانات من API
    fetch("https://law-office.al-mosa.com/api/")
      .then((response) => response.json())
      .then((data) => {
        setDataCounts({
          sessions: data.sessions_count || 0, // عدد الجلسات
          cases: data.cases_count || 0, // عدد القضايا
          clients: data.clients_count || 0, // عدد العملاء
          expenses: data.expenses_count || 0, // عدد المصروفات
          contracts: data.contracts_count || 0, // عدد العقود
          payments: data.payments_count || 0, // عدد المدفوعات
        });
      })
      .catch((error) => console.error("خطأ في جلب البيانات:", error));
  }, []);

  const cards = [
    {
      title: "الجلسات",
      icon: <FaCalendarAlt />,
      path: "/dashboard/sessions",
      value: dataCounts.sessions,
    },
    {
      title: "القضايا",
      icon: <FaFolderOpen />,
      path: "/dashboard/cases",
      value: dataCounts.cases,
    },
    {
      title: "العملاء",
      icon: <FaUsers />,
      path: "/dashboard/clients",
      value: dataCounts.clients,
    },
    {
      title: "المصروفات",
      icon: <FaWallet />,
      path: "/dashboard/expenses",
      value: dataCounts.expenses,
    },
    {
      title: "العقود",
      icon: <FaFileContract />,
      path: "/dashboard/contracts",
      value: dataCounts.contracts,
    },
    {
      title: "المدفوع",
      icon: <FaMoneyBillWave />,
      path: "/dashboard/payments",
      value: dataCounts.payments,
    },
  ];

  const quickLinks = [
    { title: "الجلسات", icon: <FaCalendarAlt />, path: "/dashboard/sessions" },
    { title: "القضايا", icon: <FaFolderOpen />, path: "/dashboard/cases" },
    { title: "العملاء", icon: <FaUsers />, path: "/dashboard/clients" },
    { title: "المصروفات", icon: <FaWallet />, path: "/dashboard/expenses" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* ✅ ترويسة الصفحة */}
      <div className="bg-blue-800 text-white text-center py-4 rounded-lg text-2xl font-semibold">
        {textArray[currentTextIndex]}
      </div>

      {/* ✅ قسم الكروت مع البيانات الفعلية */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map(({ title, icon, path, value }, i) => (
            <Link key={i} to={path}>
              <Card title={title} icon={icon} value={value} />
            </Link>
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

      {/* ✅ روابط سريعة */}
      <div>
        <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map(({ title, icon, path }, i) => (
            <Link key={i} to={path}>
              <Card title={title} icon={icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
