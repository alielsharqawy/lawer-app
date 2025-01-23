import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useFullscreen } from "../context/FullscreenContext";
import { FaBars, FaExpand, FaGavel } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(UserContext); // الحصول على اسم المستخدم
  const { toggleFullscreen } = useFullscreen();

  return (
    <nav className="bg-white shadow-lg text-primary flex items-center justify-between px-8 py-5">
      <button onClick={toggleSidebar} className="text-2xl">
        <FaBars />
      </button>
      <h2 className="text-lg font-semibold">مرحباً يا {user?.name || "ضيف"}</h2>
      <div className="flex gap-4">
        <button onClick={toggleFullscreen} className="text-2xl">
          <FaExpand />
        </button>
        <FaGavel className="text-3xl" />
      </div>
    </nav>
  );
};

export default Navbar;
