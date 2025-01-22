import React from "react";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ isOpen, links }) => (
  <aside
    className={`fixed top-0 right-0 w-65 h-full bg-white shadow-lg transform ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-300 overflow-y-auto no-scrollbar`}
  >
    <ul className="space-y-4 p-6 text-blue-800">
      {links.map(({ name, path, icon }, index) => (
        <li key={index}>
          <a
            href={path}
            className="flex items-center gap-5 px-4 py-3 text-blue-800 font-medium hover:bg-gray-100 hover:shadow-lg rounded-md"
          >
            {icon}
            <span>{name}</span>
          </a>
        </li>
      ))}
      <li>
        <LogoutButton />
      </li>
    </ul>
  </aside>
);

export default Sidebar;
