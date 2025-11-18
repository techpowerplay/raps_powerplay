// src/App.jsx
import React, { Suspense, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import BookingPage from "./pages/BookingPage";
import PrivateRoute from "./components/PrivateRoute";

// Animated / Auth components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

import UpdateProfile from "./components/UpdateProfile";

// ❗ FIXED: MUST include exact case + ".jsx"
import Showadhar from "./components/Showadhar.jsx";

import ForgotPassEmail from "./components/ForgotPassEmail";
import ForgotPassPage from "./components/ForgotPassPage";

import { AuthContext } from "./context/AuthContext";

// ---------- Route Wrappers ----------
const LoginRoute = () => {
  const navigate = useNavigate();
  return (
    <Login
      onBack={() => navigate("/booking")}
      onSwitchToSignUp={() => navigate("/signup")}
    />
  );
};

const SignupRoute = () => {
  const navigate = useNavigate();
  return (
    <Signup
      onBack={() => navigate("/booking")}
      onSwitchToLogin={() => navigate("/login")}
    />
  );
};

const DashboardRoute = () => <Dashboard />;

// ---------- Main App Component ----------
const App = () => {
  const { profile } = useContext(AuthContext);

  return (
    <div className="bg-white overflow-x-hidden [background:linear-gradient(181deg,rgba(0,0,0,1)_0%,rgba(74,40,0,1)_100%)] min-h-screen">
      <ToastContainer position="top-right" newestOnTop />
      <Navbar />

      <div className="px-0 pt-[80px]">
        <Suspense fallback={<div className="p-6 text-white">Loading…</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Dashboard />} />

            <Route path="/forgotPassEmail" element={<ForgotPassEmail />} />
            <Route path="/forgotPassPage/:email" element={<ForgotPassPage />} />

            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/showadhar/:AdharImg" element={<Showadhar />} />

            {/* Auth Pages */}
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/signup" element={<SignupRoute />} />

            {/* Protect booking */}
            <Route
              path="/booking"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />

            {/* Optional: protect dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardRoute />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default App;
