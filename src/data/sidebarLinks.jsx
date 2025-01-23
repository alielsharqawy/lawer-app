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

export const links = [
  { name: "الرئيسية", path: "/dashboard", icon: <FaHome /> },
  { name: "العملاء", path: "/dashboard/clients", icon: <FaUserFriends /> },
  { name: "أنواع العملاء", path: "/dashboard/clients-types", icon: <FaCog /> },
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
