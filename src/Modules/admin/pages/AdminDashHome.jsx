import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import logo from "../../../assets/candle-logo.png"
// import logoSidebar from "../../../assets/logoSidebar.png";
import { linksAdmin } from "../data/text";

const AdminDashHome = () => {
  const [openDropdown, setOpenDropdown] = useState({});
  const location = useLocation();
console.log("nothingd")
  const toggleDropdown = (section) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  return (
    <div className="w-full lg:px-4 lg:py-6 bg-bg flex flex-col gap-6">
      <div className="hidden lg:block">
        <Link to={"/"}>
          <img src={logo} alt="logoSidebar" />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2">
        {linksAdmin.map((item, index) =>
          item.type === "link" ? (
            <Link
              key={index}
              to={item.path}
              className={`py-2 px-4 font-poppins text-sm lg:text-base rounded transition-all duration-200 flex items-center gap-2 ${
                location.pathname === item.path
                  ? "bg-primary-50 text-primary-color "
                  : "text-text-color hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ) : (
            <div key={index} className="flex flex-col gap-2">
              <Link
                to={item.path}
                onClick={() => toggleDropdown(item.section)}
                className={`flex justify-between items-center w-full py-2 px-4 font-poppins text-sm lg:text-base text-left ${
                  item.items?.some(
                    (subItem) => location.pathname === subItem.path
                  )
                    ? "bg-gray-50 text-primary-color "
                    : "text-text-color hover:bg-gray-100"
                } rounded transition-all duration-200`}
              >
                <span className="flex items-center gap-2 ">
                  {item.icon}
                  {item.section}
                </span>
                {openDropdown[item.section] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </Link>
              {openDropdown[item.section] && (
                <div className="flex flex-col gap-2">
                  {item.items.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      to={subItem.path}
                      className={`py-2 px-4 font-poppins text-sm lg:text-base rounded transition-all duration-200 flex items-center gap-2 ${
                        location.pathname === subItem.path
                          ? "bg-primary-50 text-primary-color "
                          : "text-text-color hover:bg-gray-100"
                      }`}
                    >
                      <GoDotFill size={12} />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashHome;
