// src/pages/login.jsx
"use client"

import { useState, useContext } from "react"
import "../components/Login.css"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import { api } from "../lib/api"

const Login = ({ onSwitchToSignUp, onBack }) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (name === "email") {
      value = value.replace(/[^a-zA-Z0-9@._-]/g, "")
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post("/user/login", formData)
      login(data)
      if (data.success) {
        navigate("/booking")
        toast.success("Login successful")
      } else {
        toast.error(data.message || "Invalid credentials")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-animated-background">
        <div className="login-bg-circle login-bg-circle-1"></div>
        <div className="login-bg-circle login-bg-circle-2"></div>
        <div className="login-bg-circle login-bg-circle-3"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <button className="login-back-btn" onClick={onBack}>
            <span>←</span> Back to Booking
          </button>

          <div className="login-header">
            <div className="login-logo">
              <span className="login-logo-text">Raps Powerplay</span>
            </div>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to continue your gaming journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <div className="login-input-wrapper">
                <span className="login-input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "login-input error" : "login-input"}
                />
              </div>
              {errors.email && <span className="login-error-text">{errors.email}</span>}
            </div>

            <div className="login-form-group">
              <div className="login-input-wrapper">
                <span className="login-input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "login-input error" : "login-input"}
                />
                <button type="button" className="login-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <span className="login-error-text">{errors.password}</span>}
            </div>

            <div className="login-forgot-password">
              <Link to={"/forgotPassEmail"}>
                <button type="button" className="login-link-btn">
                  Forgot Password? 🔑
                </button>
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <div className="login-loading-content">
                  <div className="login-spinner"></div>
                  Signing In...
                </div>
              ) : (
                <>
                  <span className="login-btn-icon">🎮</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?
              <button onClick={onSwitchToSignUp} className="login-link-btn">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login