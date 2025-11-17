// src/components/Navbar.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import "../style.css";
import { api, assetURL } from "../lib/api";
import Profile from "./Profile";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, setprofile, update, user, profile } = useContext(AuthContext);
  const [userdp, setUserdp] = useState("");
  const profileimge = useRef(null);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => setIsSidebarOpen(false), [location.pathname]);

  // Close on ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setIsSidebarOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    { path: "/booking", label: "Booking" },
    { path: "/admin", label: "Admin" },
  ];

  const linkClass = ({ isActive }) =>
    `text-white font-medium text-base no-underline transition ${
      isActive ? "text-orange-400" : "hover:text-orange-400"
    }`;

  async function getUser() {
    if (!token) return;
    try {
      const { data } = await api.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserdp(data?.user?.DP || "");
    } catch (err) {
      console.warn("GetUser failed:", err?.response?.status, err?.message);
    }
  }

  // Fetch user on token/update changes (avoid depending on userdp to prevent loops)
  useEffect(() => {
    getUser();
  }, [update, token]);

  const avatarUrl = userdp ? (userdp.startsWith("http") ? userdp : assetURL(userdp)) : "";

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full relative top-0 left-0 z-20 bg-transparent backdrop-blur-md py-4"
      >
        <div className="relative flex items-center justify-center px-4 sm:px-10 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link to="/" className="absolute left-4 sm:left-10 flex items-center gap-2 top-0">
            <img src={logo} alt="Logo" className="h-12  sm:h-16 w-auto object-contain drop-shadow-md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className=" flex nav md:ml-0 relative ml-[200px] items-center gap-8 mt-5">
            {navLinks.map(({ path, label }) => (
              <motion.div key={path} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                {label !== "Admin" ? (
                  <NavLink to={path} className={linkClass}>
                    {label}
                  </NavLink>
                ) : user?.IsAdmin ? (
                  <NavLink to={path} className={linkClass}>
                    {label}
                  </NavLink>
                ) : null}
              </motion.div>
            ))}
          </nav>

          {/* User profile */}
          <div className="mycont flex  absolute right-[30px] items-center justify-center gap-4">
            {token && avatarUrl ? (
              <img
                ref={profileimge}
                src={avatarUrl}
                onClick={() => {
                  setprofile(true);
                }}
                alt="logo"
                className="border-5 w-[60px] user-img  cursor-pointer h-[60px] rounded-full"
              />
            ) : null}
          </div>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setIsSidebarOpen(true)}
            src={assets.menu_icon}
            className="menu w-10 cursor-pointer absolute right-4 mb-6 sm:mb-0"
            alt="Menu"
          />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 text-white z-[60] p-6 flex flex-col gap-2"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-6 py-4 hover:text-orange-500 transition text-left"
              >
                <img src={assets.dropdown_icon} className="h-5 w-5 rotate-180 object-contain" alt="Back" />
                <span className="text-lg font-medium">Back</span>
              </button>

              {/* Mobile Nav Links */}
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `py-3 pl-6 border-t text-lg no-underline transition ${
                      isActive ? "text-orange-400" : "text-white hover:text-orange-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className=" absolute px-3 py-2 rounded-md bottom-0 w-[90%]  flex items-center  justify-between bg-[#0C101A]">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="logo"
                    className="font-bold user-img1  w-[70px] h-[70px] rounded-full "
                  />
                ) : (
                  <div className="w-[70px] h-[70px] rounded-full bg-gray-700" />
                )}
                <motion.button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setprofile(true);
                  }}
                  type="button"
                  className="custom-button    py-4  bg-[#e87d0e] text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:bg-[#d68000]"
                >
                  Profile
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {profile ? <Profile userdp={userdp} profileimge={profileimge} /> : null}
    </>
  );
};

export default Navbar;