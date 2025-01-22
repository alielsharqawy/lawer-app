import React from "react";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ isOpen, links }) => {
  return (
    <aside
      className={`fixed pb-10 top-20 right-0 w-70 h-full bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 overflow-y-scroll no-scrollbar`}
    >
      <ul className="space-y-4 px-4 py-6 ">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.path}
              className="flex items-center gap-6 px-4 py-3 text-blue-800 font-medium hover:bg-gray-100 hover:shadow-lg rounded-md"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          </li>
        ))}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
