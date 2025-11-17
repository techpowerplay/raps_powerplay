// src/pages/signup.jsx
"use client"

import { useState } from "react"
import "../components/Signup.css"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { api } from "../lib/api"

const SignUp = ({ onSwitchToLogin, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: "", color: "", feedback: "" })

  const checkPasswordStrength = (password) => {
    let score = 0
    const feedback = []

    if (password.length >= 8) score += 1
    else feedback.push("at least 8 characters")

    if (/[a-z]/.test(password)) score += 1
    else feedback.push("lowercase letters")

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("uppercase letters")

    if (/[0-9]/.test(password)) score += 1
    else feedback.push("numbers")

    if (/[^A-Za-z0-9]/.test(password)) score += 1
    else feedback.push("special characters (!@#$%^&*)")

    const strengthLevels = [
      { text: "Very Weak", color: "#ef4444" },
      { text: "Weak", color: "#f97316" },
      { text: "Fair", color: "#eab308" },
      { text: "Good", color: "#22c55e" },
      { text: "Strong", color: "#10b981" },
    ]

    return {
      score,
      text: password ? strengthLevels[score]?.text || "Very Strong" : "",
      color: password ? strengthLevels[score]?.color || "#00cb11ff" : "",
      feedback: feedback.length > 0 ? `Add: ${feedback.join(", ")}` : "Password is strong!",
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target

    if (name === "name") {
      value = value.replace(/[^a-zA-Z\s]/g, "")
    } else if (name === "phone") {
      value = value.replace(/[^0-9]/g, "").slice(0, 10)
    } else if (name === "email") {
      value = value.replace(/[^a-zA-Z0-9@._-]/g, "")
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "password") {
      const strength = checkPasswordStrength(value)
      setPasswordStrength(strength)
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak. Please create a stronger password"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  async function checkUserExists(email) {
    try {
      if (!email) return false
      const { data } = await api.get(`/user/UserExistOrNot/${encodeURIComponent(email)}`)
      return Array.isArray(data) && data.length > 0
    } catch {
      return false
    }
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
      const exists = await checkUserExists(formData.email)
      if (exists) {
        toast.error("User already exists")
        return
      }

      const { data } = await api.post("/user/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      if (data?.success) {
        toast.success("Sign up successful! Please sign in.")
        navigate("/login")
      } else {
        toast.error(data?.message || "Sign up failed")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      {/* Animated Background */}
      <div className="signup-animated-background">
        <div className="signup-bg-circle signup-bg-circle-1"></div>
        <div className="signup-bg-circle signup-bg-circle-2"></div>
        <div className="signup-bg-circle signup-bg-circle-3"></div>
      </div>

      <div className="signup-container">
        <div className="signup-card">
          <button className="signup-back-btn" onClick={onBack}>
            <span>←</span> Back to Booking
          </button>

          <div className="signup-header">
            <div className="signup-logo">
              <span className="signup-logo-text">Raps Powerplay</span>
            </div>
            <h2 className="signup-title">Create Account</h2>
            <p className="signup-subtitle">Join the ultimate gaming experience</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <div className="signup-input-wrapper">
                <span className="signup-input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name (letters only)"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "signup-input error" : "signup-input"}
                  maxLength="50"
                />
              </div>
              {errors.name && <span className="signup-error-text">{errors.name}</span>}
            </div>

            <div className="signup-form-group">
              <div className="signup-input-wrapper">
                <span className="signup-input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "signup-input error" : "signup-input"}
                />
              </div>
              {errors.email && <span className="signup-error-text">{errors.email}</span>}
            </div>

            <div className="signup-form-group">
              <div className="signup-input-wrapper">
                <span className="signup-input-icon">📱</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10 digits)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "signup-input error" : "signup-input"}
                  maxLength="10"
                />
              </div>
              {errors.phone && <span className="signup-error-text">{errors.phone}</span>}
            </div>

            <div className="signup-form-group">
              <div className="signup-input-wrapper">
                <span className="signup-input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "signup-input error" : "signup-input"}
                />
                <button type="button" className="signup-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {formData.password && (
                <div className="signup-password-strength">
                  <div className="signup-strength-bar">
                    <div
                      className="signup-strength-fill"
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    ></div>
                  </div>
                  <div className="signup-strength-text" style={{ color: passwordStrength.color }}>
                    {passwordStrength.text}
                  </div>
                  <div className="signup-strength-feedback">{passwordStrength.feedback}</div>
                </div>
              )}
              {errors.password && <span className="signup-error-text">{errors.password}</span>}
            </div>

            <div className="signup-form-group">
              <div className="signup-input-wrapper">
                <span className="signup-input-icon">🔐</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "signup-input error" : "signup-input"}
                />
                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="signup-error-text">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? (
                <div className="signup-loading-content">
                  <div className="signup-spinner"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  <span className="signup-btn-icon">🚀</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account?
              <button onClick={onSwitchToLogin} className="signup-link-btn">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp