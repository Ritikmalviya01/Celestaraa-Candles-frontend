import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { TiThMenu } from "react-icons/ti";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Search from "../components/Search";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { logout } from "../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import BASE_URL from "../utils/Base_url.js";
import logo from "../assets/candle-logo.png"

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("Location - ", location);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const navItems = ["About", "Search-candles", "Help", "Contact", "Blogs"];

  const Logout = async () => {
    try {
      // Start logout request
      const response = await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        { withCredentials: true } // Important if using cookie-based sessions
      );

      if (response.status === 200) {
        alert("Logout successful");

        // Optionally clear local auth state if using Redux
        dispatch(logout());

        // Navigate to homepage after logout
        navigate("/");

        // Close popup if open
        setIsUserPopupOpen(false);
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert(
        "Logout error: " +
        (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };



  return (
    <header className=" sticky shadow-2xl top-0 py-2.5 px-6 flex justify-center flex-col bg-bg z-50">
      <div className="container p-2 mx-auto items-center  flex justify-between text-neutral-400">
        {!(
          location.pathname.startsWith("/user") ||
          location.pathname.startsWith("/admin")
        ) && (
            <Link to="/">
              <div className="h-full">
                <div className="h-full flex justify-center items-center ">
                  <img

                    alt="Logo"
                    src={logo}
                    className="hidden lg:block w-60"
                  />
                  <img width={170} height={45} alt="Logo" src={logo} className="lg:hidden" />
                </div>
              </div>
            </Link>
          )}

        <div className="search hidden lg:block">
          <Search />
        </div>
        <div className="login flex items-center gap-5">
          <Link className="h-5" to="/cart">
            <button className="lg:hidden h-5">
              <FaCartShopping size={20} />
            </button>
          </Link>

          <button
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className="hidden lg:block"
          >
            {isDesktopOpen ? <X size={20} /> : <TiThMenu size={20} />}
          </button>
          {isDesktopOpen && (
            <div className="absolute top-full left-0 w-full text-center z-100 bg-primary/80 shadow-sm hidden lg:block">
              <div className="flex flex-col px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item}
                    to={`/${item}`}
                    className={({ isActive }) =>
                      `block capitalize transition-colors duration-300 hover:text-primary3 ${isActive ? "font-semibold" : "text-primary1"
                      }`
                    }
                    onClick={() => setIsDesktopOpen(false)}
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            </div>
          )}

          <div className=" flex items-center gap-6   ">
            <Link to="/cart">
              <button className="hidden lg:block">
                <FaCartShopping size={20} />
              </button>
            </Link>
            {/* <Link to="/user">
              <button className="hidden lg:block">
                <FaUserAlt size={20} />
              </button>
            </Link> */}
            {/* 👤 User Icon */}
            <div className="relative">
              <button onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}>
                <FaUserAlt size={20} />
              </button>

              {/* User Popup */}
              {isUserPopupOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm font-semibold text-gray-700">
                        {user?.name || "User"}
                      </div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                      <button
                        onClick={() => {
                          navigate("/user");
                          setIsUserPopupOpen(false);
                        }}
                        className="mt-2 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/80 transition"
                      >
                        Dashboard
                      </button>
                     

                      <button
                        onClick={Logout}
                        className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/80 transition"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/login");
                          setIsUserPopupOpen(false);
                        }}
                        className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/80 transition"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/signup");
                          setIsUserPopupOpen(false);
                        }}
                        className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/80 transition"
                      >
                        Signup
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden"
            >
              {isMobileOpen ? <X size={22} /> : <TiThMenu size={22} />}
            </button>
            {isMobileOpen && (
              <div className="absolute top-full left-0 w-full text-center z-100 bg-primary/40 shadow-sm  lg:hidden">
                <div className="flex flex-col px-6 py-4 space-y-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item}
                      to={`/${item}`}
                      className={({ isActive }) =>
                        `block capitalize transition-colors duration-300 hover:text-primary3 ${isActive ? "font-semibold" : "text-primary1"
                        }`
                      }
                      onClick={() => setIsMobileOpen(false)} // close on click
                    >
                      {item}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
