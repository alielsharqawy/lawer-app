import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaBars, FaExpand, FaGavel } from "react-icons/fa"; // Importing React Icons

const Navbar = ({ toggleSidebar, toggleFullscreen }) => {
  const { user } = useContext(UserContext); // Access UserContext

  return (
    <nav className="bg-white shadow-lg text-blue-600 flex items-center justify-between p-5">
      {/* Sidebar Toggle */}
      <button onClick={toggleSidebar} className="text-2xl">
        <FaBars className="text-3xl" />
      </button>

      {/* Welcome Text */}
      <h2 className="text-lg font-bold">مرحباً {user.name || "ضيف"}</h2>

      {/* Fullscreen and Gavel Icon */}
      <div className="flex gap-4">
        <button onClick={toggleFullscreen} className="text-2xl">
          <FaExpand className="text-3xl" />
        </button>
        <FaGavel className="text-4xl" />
      </div>
    </nav>
  );
};

export default Navbar;
