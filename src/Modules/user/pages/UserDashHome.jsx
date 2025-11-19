import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { linksUser } from "../data/text";

const AdminDashHome = () => {
  const [openDropdown, setOpenDropdown] = useState({});
  const location = useLocation();

  const toggleDropdown = (section) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full px-4 py-6 flex flex-col gap-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-inner min-h-screen lg:min-h-0 lg:h-full lg:sticky lg:top-0">
      {/* Logo Section */}
      <div className="flex lg:flex-col justify-between lg:justify-center items-center lg:items-start">
        <Link to="/" className="flex items-center gap-2">
          <img
            alt="logoSidebar"
            src="/logo192.png"
            className="w-10 h-10 object-contain"
          />
        </Link>
        <span className="hidden lg:block text-lg font-bold mt-10 text-gray-700 tracking-wide">
          Dashboard
        </span>
      </div>

      {/* Navigation Section */}
      <div className="w-full flex flex-col gap-2">
        {linksUser.map((item, index) =>
          item.type === "link" ? (
            <Link
              key={index}
              to={item.path}
              className={`py-2.5 px-4 font-poppins text-sm lg:text-base rounded-lg transition-all duration-300 flex items-center gap-3
                ${
                  location.pathname === item.path
                    ? "bg-primary text-white shadow-md scale-[1.02]"
                    : "text-gray-700 hover:bg-primary-50 hover:text-primary"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </Link>
          ) : (
            <div
              key={index}
              className="flex flex-col gap-1 border-b border-gray-100 pb-1"
            >
              <button
                onClick={() => toggleDropdown(item.section)}
                className={`flex justify-between items-center w-full py-2.5 px-4 font-poppins text-sm lg:text-base rounded-lg transition-all duration-300
                  ${
                    item.items?.some(
                      (subItem) => location.pathname === subItem.path
                    )
                      ? "bg-primary-50 text-primary font-medium"
                      : "text-gray-700 hover:bg-primary-50 hover:text-primary"
                  }`}
              >
                <span className="flex items-center gap-3 truncate">
                  <span className="text-lg">{item.icon}</span>
                  {item.section}
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    openDropdown[item.section] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {openDropdown[item.section] ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </span>
              </button>

              {/* Dropdown Items */}
              <div
                className={`flex flex-col gap-1 pl-8 overflow-hidden transition-all duration-300 ${
                  openDropdown[item.section] ? "max-h-60" : "max-h-0"
                }`}
              >
                {item.items.map((subItem, subIdx) => (
                  <Link
                    key={subIdx}
                    to={subItem.path}
                    className={`py-2 px-3 font-poppins text-sm rounded-md flex items-center gap-2 transition-all duration-300
                      ${
                        location.pathname === subItem.path
                          ? "bg-primary-100 text-primary font-medium"
                          : "text-gray-600 hover:bg-primary-50 hover:text-primary"
                      }`}
                  >
                    <GoDotFill size={10}  />
                    <span className="truncate ">{subItem.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashHome;
