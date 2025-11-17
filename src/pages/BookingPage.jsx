// src/pages/BookingPage.jsx
"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import AOS from "aos"
import { api } from "../lib/api" // use shared axios instance (baseURL http://localhost:5000)
import "aos/dist/aos.css"
import "../components/BookingPage.css"

import HeroHeader from "../components/booking/HeroHeader"
import SummaryPanel from "../components/booking/SummaryPanel"

import Step1ChooseWeapon from "../components/booking/steps/Step1ChooseWeapon"
import Step2SelectGames from "../components/booking/steps/Step2SelectGames"
import Step3BattlePlan from "../components/booking/steps/Step3BattlePlan"
import Step4Schedule from "../components/booking/steps/Step4Schedule"

// ==================== PRICING TABLES ====================
const HOURLY_STANDARD = {
  1: { 1: 150, 2: 280, 3: 400, 4: 500, 5: 600, 6: 700 },
  2: { 1: 200, 2: 370, 3: 520, 4: 650, 5: 780, 6: 900 },
  3: { 1: 250, 2: 460, 3: 640, 4: 800, 5: 960, 6: 1100 },
  4: { 1: 300, 2: 550, 3: 750, 4: 950, 5: 1140, 6: 1300 },
}

const HOURLY_MEMBER = {
  1: { 1: 120, 2: 225, 3: 320, 4: 400, 5: 480, 6: 560 },
  2: { 1: 160, 2: 295, 3: 415, 4: 520, 5: 620, 6: 720 },
  3: { 1: 200, 2: 370, 3: 510, 4: 640, 5: 770, 6: 880 },
  4: { 1: 240, 2: 440, 3: 600, 4: 760, 5: 910, 6: 1040 },
}

const DAILY_STANDARD = {
  1: { 1: 950, 2: 1490, 3: 1920, 4: 2250, 5: 2480, 6: 2700, 7: 2750 },
  2: { 1: 1100, 2: 1650, 3: 2090, 4: 2420, 5: 2640, 6: 2860, 7: 2970 },
  3: { 1: 1370, 2: 1920, 3: 2360, 4: 2690, 5: 2910, 6: 3130, 7: 3300 },
  4: { 1: 1650, 2: 2300, 3: 2950, 4: 3080, 5: 3300, 6: 3520, 7: 3740 },
}

const DAILY_MEMBER = {
  1: { 1: 849, 2: 1339, 3: 1739, 4: 2049, 5: 2249, 6: 2449, 7: 2499 },
  2: { 1: 999, 2: 1599, 3: 1899, 4: 2199, 5: 2399, 6: 2599, 7: 2699 },
  3: { 1: 1269, 2: 1379, 3: 2159, 4: 2549, 5: 2649, 6: 2829, 7: 2999 },
  4: { 1: 1499, 2: 2099, 3: 2499, 4: 2799, 5: 2999, 6: 3199, 7: 3399 },
}

function toISO(dateStr, timeStr, tz = "Asia/Kolkata") {
  const [y, m, d] = dateStr.split("-").map(Number)
  const [hh, mm] = timeStr.split(":").map(Number)
  const dt = new Date(y, m - 1, d, hh, mm, 0, 0)
  return dt.toISOString()
}

function convert24HourTo12Hour(time24) {
  if (!time24) return ""
  const [hoursRaw, minutes] = time24.split(":").map(Number)
  const period = hoursRaw >= 12 ? "PM" : "AM"
  const hours = hoursRaw % 12 || 12
  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`
}

function convert12HourTo24Hour(hours, minutes, period) {
  if (!hours || !minutes) return ""
  let hours24 = parseInt(hours, 10)

  if (period === "PM" && hours24 < 12) {
    hours24 += 12
  } else if (period === "AM" && hours24 === 12) {
    hours24 = 0
  }

  return `${hours24.toString().padStart(2, "0")}:${minutes.padStart(2, "0")}`
}

function calculateEndDateTime(startDate, startTime, planType, duration) {
  if (!startDate || !startTime || !duration) return { endDate: "", endTime: "" }

  const [hours, minutes] = startTime.split(":").map(Number)
  const [year, month, day] = startDate.split("-").map(Number)

  const startDateTime = new Date(year, month - 1, day, hours, minutes)
  const endDateTime = new Date(startDateTime)

  if (planType === "hourly") {
    endDateTime.setHours(startDateTime.getHours() + duration)
  } else {
    endDateTime.setDate(startDateTime.getDate() + duration)
  }

  const endDate = `${endDateTime.getFullYear()}-${String(endDateTime.getMonth() + 1).padStart(2, "0")}-${String(
    endDateTime.getDate()
  ).padStart(2, "0")}`
  const endTime = `${String(endDateTime.getHours()).padStart(2, "0")}:${String(endDateTime.getMinutes()).padStart(2, "0")}`

  return { endDate, endTime }
}

const InputField = ({ label, icon, type = "text", value, onChange, placeholder, required, field, autoComplete }) => (
  <div className="input-group">
    <label className="input-label">
      <span className="label-icon">{icon}</span>
      {label} {required && "*"}
    </label>
    <input
      className="contact-input"
      type={type}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      inputMode={type === "tel" ? "tel" : undefined}
    />
  </div>
)

const TextAreaField = ({ label, icon, value, onChange, placeholder, required, field, rows = 3 }) => (
  <div className="input-group full-width">
    <label className="input-label">
      <span className="label-icon">{icon}</span>
      {label} {required && "*"}
    </label>
    <textarea
      className="contact-textarea"
      rows={rows}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  </div>
)

const MobileResponsiveTimePicker = ({ onTimeChange }) => {
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [period, setPeriod] = useState("AM")
  const [isHourMenuOpen, setIsHourMenuOpen] = useState(false)
  const [isMinuteMenuOpen, setIsMinuteMenuOpen] = useState(false)

  // Generate arrays of hours and minutes for selection
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  // Common minute selections
  const commonMinutes = ["00", "15", "30", "45"]

  const handleHourChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value === "" || (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 12)) {
      setHour(value)
    }
  }

  const handleMinuteChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value === "" || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 59)) {
      setMinute(value.padStart(2, "0"))
    }
  }

  const selectHour = (h) => {
    setHour(h)
    setIsHourMenuOpen(false)
  }

  const selectMinute = (m) => {
    setMinute(m)
    setIsMinuteMenuOpen(false)
  }

  useEffect(() => {
    if (hour && minute) {
      const time24 = convert12HourTo24Hour(hour, minute, period)
      onTimeChange(time24)
    }
  }, [hour, minute, period, onTimeChange])

  return (
    <div className="time-picker-container" style={{ marginBottom: "20px" }}>
      {/* Display of selected time */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          background: "linear-gradient(to right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9))",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          border: "1px solid #374151",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#10b981",
            }}
          >
            ⏰
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "2px",
            }}
          >
            <div
              onClick={() => setIsHourMenuOpen(!isHourMenuOpen)}
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#fff",
                cursor: "pointer",
                background: "rgba(31, 41, 55, 0.6)",
                padding: "6px 12px",
                borderRadius: "8px",
                minWidth: "46px",
                textAlign: "center",
                position: "relative",
              }}
            >
              {hour || "--"}
            </div>
            <span style={{ color: "#fff", fontSize: "26px", fontWeight: "700" }}>:</span>
            <div
              onClick={() => setIsMinuteMenuOpen(!isMinuteMenuOpen)}
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#fff",
                cursor: "pointer",
                background: "rgba(31, 41, 55, 0.6)",
                padding: "6px 12px",
                borderRadius: "8px",
                minWidth: "46px",
                textAlign: "center",
                position: "relative",
              }}
            >
              {minute || "--"}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #4b5563",
          }}
        >
          <button
            onClick={() => setPeriod("AM")}
            style={{
              padding: "8px 16px",
              background: period === "AM" ? "#10b981" : "rgba(31, 41, 55, 0.6)",
              color: period === "AM" ? "#fff" : "#d1d5db",
              border: "none",
              cursor: "pointer",
              fontWeight: period === "AM" ? "700" : "500",
              fontSize: "16px",
              transition: "all 0.2s",
            }}
          >
            AM
          </button>
          <button
            onClick={() => setPeriod("PM")}
            style={{
              padding: "8px 16px",
              background: period === "PM" ? "#10b981" : "rgba(31, 41, 55, 0.6)",
              color: period === "PM" ? "#fff" : "#d1d5db",
              border: "none",
              cursor: "pointer",
              fontWeight: period === "PM" ? "700" : "500",
              fontSize: "16px",
              transition: "all 0.2s",
            }}
          >
            PM
          </button>
        </div>
      </div>

      {/* Hour Selector Dropdown */}
      {isHourMenuOpen && (
        <div
          style={{
            position: "relative",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              background: "#1f2937",
              borderRadius: "12px",
              border: "1px solid #374151",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#d1d5db",
                marginBottom: "8px",
              }}
            >
              Select Hour
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
              }}
            >
              {hours.map((h) => (
                <button
                  key={h}
                  onClick={() => selectHour(h)}
                  style={{
                    padding: "10px 0",
                    background: hour === h ? "#10b981" : "#374151",
                    color: hour === h ? "#fff" : "#d1d5db",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: hour === h ? "700" : "500",
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                }}
              >
                Or enter manually:
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#374151",
                  borderRadius: "6px",
                  padding: "4px 8px",
                }}
              >
                <input
                  type="text"
                  value={hour}
                  onChange={handleHourChange}
                  placeholder="1-12"
                  maxLength={2}
                  style={{
                    width: "40px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "16px",
                    textAlign: "center",
                    padding: "8px 4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minute Selector Dropdown */}
      {isMinuteMenuOpen && (
        <div
          style={{
            position: "relative",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              background: "#1f2937",
              borderRadius: "12px",
              border: "1px solid #374151",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#d1d5db",
                marginBottom: "8px",
              }}
            >
              Common Minutes
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
              }}
            >
              {commonMinutes.map((m) => (
                <button
                  key={m}
                  onClick={() => selectMinute(m)}
                  style={{
                    padding: "10px 0",
                    background: minute === m ? "#10b981" : "#374151",
                    color: minute === m ? "#fff" : "#d1d5db",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: minute === m ? "700" : "500",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: "12px",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#d1d5db",
              }}
            >
              All Minutes
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "8px",
                maxHeight: "150px",
                overflowY: "auto",
                padding: "4px",
              }}
            >
              {minutes.map((m) => (
                <button
                  key={m}
                  onClick={() => selectMinute(m)}
                  style={{
                    padding: "8px 0",
                    background: minute === m ? "#10b981" : "#374151",
                    color: minute === m ? "#fff" : "#d1d5db",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: minute === m ? "700" : "500",
                    fontSize: "13px",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                }}
              >
                Or enter manually:
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#374151",
                  borderRadius: "6px",
                  padding: "4px 8px",
                }}
              >
                <input
                  type="text"
                  value={minute}
                  onChange={handleMinuteChange}
                  placeholder="0-59"
                  maxLength={2}
                  style={{
                    width: "40px",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "16px",
                    textAlign: "center",
                    padding: "8px 4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Presets */}
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#9ca3af",
            marginBottom: "8px",
          }}
        >
          Quick Time Selections
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "8px",
          }}
        >
          {[
            { time: "9:00 AM", label: "9:00 AM" },
            { time: "12:00 PM", label: "Noon" },
            { time: "3:00 PM", label: "3:00 PM" },
            { time: "6:00 PM", label: "6:00 PM" },
            { time: "9:00 PM", label: "9:00 PM" },
          ].map((preset) => {
            const [presetHour, presetMinute] = preset.time.split(":")
            const presetPeriod = preset.time.includes("AM") ? "AM" : "PM"
            const hourVal = presetHour.padStart(2, "0")
            const minuteVal = presetMinute.split(" ")[0].padStart(2, "0")

            return (
              <button
                key={preset.time}
                onClick={() => {
                  setHour(parseInt(hourVal, 10).toString())
                  setMinute(minuteVal)
                  setPeriod(presetPeriod)
                }}
                style={{
                  padding: "10px",
                  background: "#374151",
                  color: "#e5e7eb",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Display */}
      {hour && minute && (
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid #10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#10b981", fontWeight: "600" }}>✓</span>
          <span style={{ color: "#d1d5db" }}>Selected time:</span>
          <span style={{ color: "#fff", fontWeight: "700" }}>{`${hour}:${minute} ${period}`}</span>
        </div>
      )}
    </div>
  )
}

const BookingPage = () => {
  // Core state
  const [selectedConsole, setSelectedConsole] = useState("")
  const [selectedGames, setSelectedGames] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const [planType, setPlanType] = useState("hourly")
  const [duration, setDuration] = useState(1)
  const [controllers, setControllers] = useState(1)
  const [isMember, setIsMember] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [checked, setChecked] = useState(false)

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  // Identity verification state
  const [aadhaarImage, setAadhaarImage] = useState(null)
  const [aadhaarImagePreview, setAadhaarImagePreview] = useState("")
  const [personWithAadhaarImage, setPersonWithAadhaarImage] = useState(null)
  const [personImagePreview, setPersonImagePreview] = useState("")
  const [aadhaarVerified, setAadhaarVerified] = useState(false)
  const [personVerified, setPersonVerified] = useState(false)
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false)
  const [isVerifyingPerson, setIsVerifyingPerson] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStream, setCameraStream] = useState(null)
  const [AdharImg, setAdharImg] = useState(null)
  const [verificationErrors, setVerificationErrors] = useState({})

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      disable: "phone",
    })
  }, [])

  useEffect(() => {
    return () => {
      if (cameraStream) cameraStream.getTracks().forEach((t) => t.stop())
    }
  }, [cameraStream])

  // Calculate end date/time based on start date/time and duration
  useEffect(() => {
    if (startDate && startTime && duration > 0) {
      const { endDate: calculatedEndDate, endTime: calculatedEndTime } = calculateEndDateTime(
        startDate,
        startTime,
        planType,
        duration
      )
      setEndDate(calculatedEndDate)
      setEndTime(calculatedEndTime)
    }
  }, [startDate, startTime, duration, planType])

  // Data
  const playstationTypes = [
    {
      id: "ps5",
      name: "PlayStation 5",
      subtitle: "Premium Gaming Console",
      price: 150,
      features: ["4K Ultra HD Gaming", "Hardware Ray Tracing", "Ultra-High Speed SSD"],
      popular: true,
      icon: "🎮",
    },
    {
      id: "ps4",
      name: "PlayStation 4",
      subtitle: "Reliable Gaming System",
      price: 90,
      features: ["Full HD Resolution", "Share Play Technology", "Remote Play Support"],
      icon: "🎯",
    },
  ]

  const gameCategories = [
    {
      category: "Action & Adventure",
      icon: "⚔️",
      games: [
        { id: "spiderman", name: "Spider-Man: Miles Morales", rating: 4.9 },
        { id: "god-of-war", name: "God of War", rating: 4.8 },
        { id: "uncharted", name: "Uncharted 4: A Thief's End", rating: 4.7 },
        { id: "tlou", name: "The Last of Us Part II", rating: 4.6 },
      ],
    },
    {
      category: "Sports & Racing",
      icon: "🏆",
      games: [
        { id: "fifa24", name: "EA Sports FC 24", rating: 4.5 },
        { id: "gt7", name: "Gran Turismo 7", rating: 4.7 },
        { id: "f1-23", name: "F1 23", rating: 4.4 },
        { id: "nba2k24", name: "NBA 2K24", rating: 4.3 },
      ],
    },
    {
      category: "Competitive Gaming",
      icon: "🎯",
      games: [
        { id: "fortnite", name: "Fortnite", rating: 4.2 },
        { id: "apex", name: "Apex Legends", rating: 4.4 },
        { id: "cod-warzone", name: "Call of Duty: Warzone", rating: 4.3 },
        { id: "pubg", name: "PUBG: Battlegrounds", rating: 4.1 },
      ],
    },
    {
      category: "Multiplayer Experiences",
      icon: "⚡",
      games: [
        { id: "cod-mw", name: "Call of Duty: Modern Warfare", rating: 4.6 },
        { id: "overwatch", name: "Overwatch 2", rating: 4.2 },
        { id: "rocket-league", name: "Rocket League", rating: 4.5 },
        { id: "minecraft", name: "Minecraft", rating: 4.8 },
      ],
    },
  ]

  const steps = [
    { id: 1, name: "Your Details", icon: "🧾" },
    { id: 2, name: "Select Console", icon: "🎮" },
    { id: 3, name: "Choose Games", icon: "🎯" },
    { id: 4, name: "Battle Plan", icon: "🚀" },
    { id: 5, name: "Schedule", icon: "🕐" },
    { id: 6, name: "Review", icon: "📋" },
  ]

  const selectedConsoleData = playstationTypes.find((ps) => ps.id === selectedConsole)

  const calculatePrice = () => {
    if (!controllers || !duration) return 0

    const priceTable = planType === "hourly" ? (isMember ? HOURLY_MEMBER : HOURLY_STANDARD) : isMember ? DAILY_MEMBER : DAILY_STANDARD

    const price = priceTable[controllers]?.[duration] || 0
    return price
  }

  const total = calculatePrice()

  const formatDate = (dateString) =>
    !dateString
      ? ""
      : new Date(dateString).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })

  const detailsComplete = () => {
    const { name, email, phone, address } = contactInfo
    const phoneDigits = (phone || "").replace(/\D/g, "")
    return (
      name.trim() &&
      email.trim() &&
      email.includes("@") &&
      phoneDigits.length >= 10 &&
      address.trim() &&
      (aadhaarVerified || !!aadhaarImage) &&
      (personVerified || !!personWithAadhaarImage)
    )
  }

  useEffect(() => {
    const advance = (cond, from, to, delay = 500) => {
      if (currentStep === from && cond) setTimeout(() => setCurrentStep(to), delay)
    }
    advance(detailsComplete(), 1, 2)
    advance(!!selectedConsole, 2, 3)
    advance(selectedGames.length > 0, 3, 4)
    advance(controllers > 0 && duration > 0, 4, 5)
    advance(startDate && startTime, 5, 6)
  }, [
    currentStep,
    contactInfo,
    aadhaarVerified,
    personVerified,
    selectedConsole,
    selectedGames.length,
    controllers,
    duration,
    startDate,
    startTime,
  ])

  const onSelectConsole = (id, name) => {
    setSelectedConsole(id)
    toast.success(`${name} selected successfully`, { icon: "✅" })
  }

  const onToggleGame = (gameId) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter((id) => id !== gameId))
      toast.info("Game removed from selection", { icon: "🎮" })
    } else if (selectedGames.length < 5) {
      setSelectedGames([...selectedGames, gameId])
      toast.success("Game added to your collection", { icon: "✅" })
    } else {
      toast.warning("Maximum 5 games per rental", { icon: "⚠️" })
    }
  }

  const onClearGames = () => {
    setSelectedGames([])
    toast.info("Game selection cleared", { icon: "🔄" })
  }

  const onChangeContact = (field, value) => setContactInfo((prev) => ({ ...prev, [field]: value }))

  // ==================== BALANCED AADHAAR VERIFICATION (from original code) ====================
  const verifyAadhaarCard = async (imageFile) => {
    setIsVerifyingAadhaar(true)
    setVerificationErrors((prev) => ({ ...prev, aadhaar: null }))

    try {
      // Simulate AI verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const fileName = imageFile.name.toLowerCase()
      const validFormats = ["jpg", "jpeg", "png"]
      const fileExtension = fileName.split(".").pop()

      if (!validFormats.includes(fileExtension)) {
        throw new Error("Please upload a valid image format (JPG, PNG)")
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error("Image size should be less than 5MB")
      }

      if (imageFile.size < 50 * 1024) {
        throw new Error("Image file is too small. Please upload a clear, high-quality image.")
      }

      // Create image element to analyze
      const img = new Image()
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      await new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // Check if image is too dark or too bright
          let totalBrightness = 0
          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
            totalBrightness += brightness
          }
          const avgBrightness = totalBrightness / (data.length / 4)

          if (avgBrightness < 30) {
            reject(new Error("Image is too dark. Please take a photo in better lighting."))
            return
          }

          if (avgBrightness > 240) {
            reject(new Error("Image is overexposed. Please avoid direct flash or bright light."))
            return
          }

          // Check image dimensions
          const aspectRatio = img.width / img.height
          if (aspectRatio < 1.4 || aspectRatio > 1.8) {
            reject(new Error("Image doesn't appear to be an Aadhaar card. Please ensure the entire card is visible."))
            return
          }

          if (img.width < 400 || img.height < 250) {
            reject(new Error("Image resolution is too low. Please upload a clearer image."))
            return
          }

          resolve()
        }

        img.onerror = () => {
          reject(new Error("Invalid image file. Please try uploading a different image."))
        }

        img.src = URL.createObjectURL(imageFile)
      })

      // Simulate text detection
      const mockTextDetection = () => {
        const suspiciousNames = ["screenshot", "meme", "photo", "selfie", "random"]
        const hasSuspiciousName = suspiciousNames.some((name) => fileName.includes(name))

        if (hasSuspiciousName) {
          throw new Error("This doesn't appear to be an Aadhaar card image. Please upload your actual Aadhaar card.")
        }

        const hasAadhaarIndicators = Math.random() > 0.3
        if (!hasAadhaarIndicators) {
          throw new Error("Could not detect Aadhaar card text. Please ensure the card is clearly visible and not blurred.")
        }

        return true
      }

      mockTextDetection()

      setAadhaarVerified(true)
      toast.success("✅ Aadhaar card verified successfully!")
    } catch (error) {
      setVerificationErrors((prev) => ({ ...prev, aadhaar: error.message }))
      setAadhaarVerified(false)
      toast.error(`❌ ${error.message}`)
    } finally {
      setIsVerifyingAadhaar(false)
    }
  }

  const verifyPersonWithAadhaar = async (imageFile) => {
    setIsVerifyingPerson(true)
    setVerificationErrors((prev) => ({ ...prev, person: null }))

    try {
      // Simulate AI verification process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      if (imageFile.size > 10 * 1024 * 1024) {
        throw new Error("Image size should be less than 10MB")
      }

      if (imageFile.size < 100 * 1024) {
        throw new Error("Image file is too small. Please capture a clearer photo.")
      }

      const img = new Image()
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      await new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          let totalBrightness = 0
          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
            totalBrightness += brightness
          }
          const avgBrightness = totalBrightness / (data.length / 4)

          if (avgBrightness < 40) {
            reject(new Error("Photo is too dark. Please take the photo in better lighting."))
            return
          }

          if (avgBrightness > 230) {
            reject(new Error("Photo is overexposed. Please avoid direct flash."))
            return
          }

          const aspectRatio = img.width / img.height
          if (aspectRatio > 1.5) {
            reject(
              new Error(
                "Image appears to be landscape. Please take a portrait photo showing yourself with the Aadhaar card."
              )
            )
            return
          }

          if (img.width < 300 || img.height < 300) {
            reject(new Error("Image resolution is too low. Please capture a clearer photo."))
            return
          }

          resolve()
        }

        img.onerror = () => {
          reject(new Error("Invalid image file. Please try capturing the photo again."))
        }

        img.src = URL.createObjectURL(imageFile)
      })

      // Simulate AI detection
      const mockPersonDocumentDetection = () => {
        if (!aadhaarVerified) {
          throw new Error("Please verify your Aadhaar card first before taking the verification photo.")
        }

        const faceDetected = Math.random() > 0.2
        if (!faceDetected) {
          throw new Error("Could not detect a clear face in the image. Please ensure your face is visible and well-lit.")
        }

        const documentInHands = Math.random() > 0.25
        if (!documentInHands) {
          throw new Error("Could not detect Aadhaar card in your hands. Please hold the card clearly visible in the photo.")
        }

        const faceMatches = Math.random() > 0.15
        if (!faceMatches) {
          throw new Error("Identity verification failed. Please ensure you are holding your own Aadhaar card.")
        }

        return true
      }

      mockPersonDocumentDetection()

      setPersonVerified(true)
      toast.success("✅ Identity verification completed successfully!")
    } catch (error) {
      setVerificationErrors((prev) => ({ ...prev, person: error.message }))
      setPersonVerified(false)
      toast.error(`❌ ${error.message}`)
    } finally {
      setIsVerifyingPerson(false)
    }
  }

  const handleAadhaarImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAadhaarImage(file)
    setAdharImg(file)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setAadhaarImagePreview(ev.target.result)
      verifyAadhaarCard(file)
    }
    reader.readAsDataURL(file)
  }

  const handlePersonImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPersonWithAadhaarImage(file)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPersonImagePreview(ev.target.result)
      verifyPersonWithAadhaar(file)
    }
    reader.readAsDataURL(file)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
      })
      setCameraStream(stream)
      setShowCamera(true)
      toast.info("Position your face and Aadhaar card in frame")
    } catch {
      toast.error("❌ Camera access denied. Please allow camera permission or upload an image.")
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop())
    }
    setCameraStream(null)
    setShowCamera(false)
  }

  const capturePhoto = () => {
    const video = document.getElementById("camera-video")
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0)
    canvas.toBlob(
      async (blob) => {
        const file = new File([blob], "person-with-aadhaar.jpg", { type: "image/jpeg" })
        setPersonWithAadhaarImage(file)
        setPersonImagePreview(canvas.toDataURL("image/jpeg", 0.8))
        await verifyPersonWithAadhaar(file)
        stopCamera()
      },
      "image/jpeg",
      0.8
    )
  }

  // Submit
  const handleBooking = async (e) => {
    e.preventDefault()

    if (!detailsComplete()) {
      toast.error("Complete Your Details & Verification first", { icon: "🧾" })
      return
    }
    if (!selectedConsole || !controllers || !duration || !startDate || !startTime) {
      toast.error("Please complete all booking details", { icon: "⚠️" })
      return
    }
    if (!checked) {
      toast.error("Please accept Terms & Conditions", { icon: "📋" })
      return
    }

    let BookingAdmin
    try {
      BookingAdmin = JSON.parse(localStorage.getItem("user"))?._id
    } catch {
      BookingAdmin = null
    }
    if (!BookingAdmin) {
      toast.error("You must be logged in to book", { icon: "🔐" })
      return
    }

    const payload = new FormData()
    payload.append("selectedConsole", selectedConsole)
    payload.append("selectedGames", JSON.stringify(selectedGames))
    payload.append("planType", planType)
    payload.append("duration", duration)
    payload.append("controllers", controllers)
    payload.append("isMember", isMember)
    payload.append("totalPrice", total)
    payload.append("total", total) // server ignores but harmless
    payload.append("rentalPeriod", planType)
    payload.append("startAt", toISO(startDate, startTime))
    payload.append("endAt", toISO(endDate, endTime))
    payload.append("endTime", convert24HourTo12Hour(endTime))
    payload.append("startTime", convert24HourTo12Hour(startTime))
    payload.append("contactInfo", JSON.stringify(contactInfo))
    payload.append("BookingAdmin", BookingAdmin)
    payload.append("tz", "Asia/Kolkata")
    if (AdharImg) payload.append("AdharImg", AdharImg)
    if (personWithAadhaarImage) payload.append("PersonWithAdharImg", personWithAadhaarImage)

    setIsLoading(true)
    setShowConfetti(true)

    try {
      const userid = JSON.parse(localStorage.getItem("user"))._id
      const { data } = await api.post(`/api/bookings`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      await api.post(`/user/update_user/${userid}`, { address: contactInfo.address })

      if (!data.ok) throw new Error(data?.message || "Booking failed")
      toast.success(`🎉 Booking confirmed! Code: ${data.booking.bookingCode}`)
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Booking failed. Please try again.", { icon: "❌" })
    } finally {
      setIsLoading(false)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  return (
    <main className="booking-page" style={{ background: "transparent" }}>
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <HeroHeader steps={steps} currentStep={currentStep} />
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="content-grid">
          <div className="main-column">
            {/* Step 1: Your Details & Verification */}
            <section className="card" data-aos="fade-up" data-aos-delay="80">
              <div className="card-header">
                <div className="card-title">
                  <div className="title-icon contact">🧾</div>
                  Your Details & Verification
                  {detailsComplete() && <span className="sparkle">✨</span>}
                </div>
                <p className="card-subtitle">We'll use this info for delivery and security. Verification is quick and secure.</p>
              </div>

              <div className="card-content">
                <div className="details-grid">
                  <InputField
                    field="name"
                    label="Full Name"
                    icon="👤"
                    value={contactInfo.name}
                    onChange={onChangeContact}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                  />
                  <InputField
                    field="phone"
                    label="Phone Number"
                    icon="📱"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={onChangeContact}
                    placeholder="Enter your phone number"
                    required
                    autoComplete="tel"
                  />
                  <InputField
                    field="email"
                    label="Email Address"
                    icon="📧"
                    type="email"
                    value={contactInfo.email}
                    onChange={onChangeContact}
                    placeholder="Enter your email address"
                    required
                    autoComplete="email"
                  />
                  <TextAreaField
                    field="address"
                    label="Delivery Address"
                    icon="🏠"
                    value={contactInfo.address}
                    onChange={onChangeContact}
                    placeholder="Complete address for delivery"
                    required
                    rows={3}
                  />
                </div>

                {/* Identity Verification Section */}
                <div className="verification-section" data-aos="fade-up" data-aos-delay="200" style={{ marginTop: "24px" }}>
                  <div className="verification-header">
                    <span className="verification-icon">🆔</span>
                    <span className="verification-title">Identity Verification</span>
                    <span className="required-badge">Required</span>
                  </div>
                  <p className="verification-subtitle">
                    For security purposes, please upload your Aadhaar card and take a verification photo
                  </p>

                  {/* Aadhaar Card Upload */}
                  <div className="verification-item" style={{ marginTop: "20px" }}>
                    <div className="verification-item-header">
                      <span className="item-icon">📄</span>
                      <span className="item-title">Aadhaar Card Image</span>
                      {aadhaarVerified && <span className="verified-badge">✅ Verified</span>}
                    </div>

                    <div className="verification-requirements">
                      <p className="requirements-title">📋 Requirements:</p>
                      <ul className="requirements-list">
                        <li>• Clear, high-quality image</li>
                        <li>• All text readable</li>
                        <li>• No blur or glare</li>
                        <li>• 50KB - 5MB file size</li>
                      </ul>
                    </div>

                    <div className="upload-section">
                      <input
                        type="file"
                        id="aadhaar-upload"
                        accept="image/*"
                        onChange={handleAadhaarImageUpload}
                        className="file-input"
                        style={{ display: "none" }}
                      />

                      {!aadhaarImagePreview ? (
                        <label htmlFor="aadhaar-upload" className="upload-area">
                          <div className="upload-content">
                            <span className="upload-icon">📁</span>
                            <span className="upload-text">Click to upload Aadhaar card</span>
                            <span className="upload-hint">JPG, PNG • 50KB - 5MB</span>
                          </div>
                        </label>
                      ) : (
                        <div className="image-preview-container">
                          <img src={aadhaarImagePreview} alt="Aadhaar Preview" className="image-preview" />
                          <div className="image-overlay">
                            {isVerifyingAadhaar ? (
                              <div className="verification-status verifying">
                                <div className="spinner-small"></div>
                                <span>Analyzing...</span>
                              </div>
                            ) : aadhaarVerified ? (
                              <div className="verification-status verified">
                                <span className="status-icon">✅</span>
                                <span>Verified</span>
                              </div>
                            ) : (
                              <div className="verification-status failed">
                                <span className="status-icon">❌</span>
                                <span>Failed</span>
                              </div>
                            )}
                          </div>
                          <button
                            className="retake-btn"
                            onClick={() => {
                              setAadhaarImage(null)
                              setAdharImg(null)
                              setAadhaarImagePreview("")
                              setAadhaarVerified(false)
                              setVerificationErrors((prev) => ({ ...prev, aadhaar: null }))
                            }}
                          >
                            🔄 Upload New
                          </button>
                        </div>
                      )}

                      {verificationErrors.aadhaar && (
                        <div className="error-message">
                          <span className="error-icon">⚠️</span>
                          {verificationErrors.aadhaar}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Person with Aadhaar Photo */}
                  <div className="verification-item" style={{ marginTop: "24px" }}>
                    <div className="verification-item-header">
                      <span className="item-icon">📸</span>
                      <span className="item-title">Verification Photo</span>
                      {personVerified && <span className="verified-badge">✅ Verified</span>}
                    </div>

                    <div className="verification-requirements">
                      <p className="requirements-title">📋 Requirements:</p>
                      <ul className="requirements-list">
                        <li>• Hold Aadhaar card visible</li>
                        <li>• Face clearly visible</li>
                        <li>• Good lighting</li>
                        <li>• Both you and card in frame</li>
                      </ul>
                    </div>

                    <p className="verification-instruction">📸 Take a selfie while holding your Aadhaar card</p>

                    <div className="camera-section">
                      {!showCamera && !personImagePreview && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <button className="camera-btn" onClick={startCamera}>
                            <span className="camera-icon">📷</span>
                            Open Camera
                          </button>

                          <div style={{ textAlign: "center", color: "#6b7280", fontSize: "14px", margin: "8px 0" }}>OR</div>

                          <label htmlFor="person-upload" className="upload-area" style={{ cursor: "pointer", margin: 0 }}>
                            <input
                              type="file"
                              id="person-upload"
                              accept="image/*"
                              onChange={handlePersonImageUpload}
                              style={{ display: "none" }}
                            />
                            <div className="upload-content">
                              <span className="upload-icon">📁</span>
                              <span className="upload-text">Upload Image</span>
                              <span className="upload-hint">JPG, PNG • 100KB - 10MB</span>
                            </div>
                          </label>
                        </div>
                      )}

                      {showCamera && (
                        <div className="camera-container">
                          <video
                            id="camera-video"
                            autoPlay
                            playsInline
                            ref={(video) => {
                              if (video && cameraStream) {
                                video.srcObject = cameraStream
                              }
                            }}
                            className="camera-video"
                          />
                          <div className="camera-overlay">
                            <div className="camera-guide">
                              <div className="guide-frame"></div>
                              <p className="guide-text">Hold Aadhaar card visible</p>
                              <p className="guide-subtext">Face and card both visible</p>
                            </div>
                          </div>
                          <div className="camera-controls">
                            <button className="capture-btn" onClick={capturePhoto}>
                              <span className="capture-icon">📸</span>
                              Capture
                            </button>
                            <button className="cancel-btn" onClick={stopCamera}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {personImagePreview && !showCamera && (
                        <div className="image-preview-container">
                          <img src={personImagePreview} alt="Person with Aadhaar" className="image-preview" />
                          <div className="image-overlay">
                            {isVerifyingPerson ? (
                              <div className="verification-status verifying">
                                <div className="spinner-small"></div>
                                <span>Verifying...</span>
                              </div>
                            ) : personVerified ? (
                              <div className="verification-status verified">
                                <span className="status-icon">✅</span>
                                <span>Verified</span>
                              </div>
                            ) : (
                              <div className="verification-status failed">
                                <span className="status-icon">❌</span>
                                <span>Failed</span>
                              </div>
                            )}
                          </div>
                          <button
                            className="retake-btn"
                            onClick={() => {
                              setPersonWithAadhaarImage(null)
                              setPersonImagePreview("")
                              setPersonVerified(false)
                              setVerificationErrors((prev) => ({ ...prev, person: null }))
                            }}
                          >
                            🔄 Retake/Reupload
                          </button>
                        </div>
                      )}

                      {verificationErrors.person && (
                        <div className="error-message">
                          <span className="error-icon">⚠️</span>
                          {verificationErrors.person}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verification Status Summary */}
                  {(aadhaarVerified || personVerified) && (
                    <div className="verification-summary" data-aos="fade-up" data-aos-delay="300" style={{ marginTop: "20px" }}>
                      <div className="summary-header">
                        <span className="summary-icon">🛡️</span>
                        <span className="summary-title">Verification Status</span>
                      </div>
                      <div className="verification-checklist">
                        <div className={`checklist-item ${aadhaarVerified ? "completed" : "pending"}`}>
                          <span className="check-icon">{aadhaarVerified ? "✅" : "⏳"}</span>
                          <span className="check-text">Aadhaar Verified</span>
                        </div>
                        <div className={`checklist-item ${personVerified ? "completed" : "pending"}`}>
                          <span className="check-icon">{personVerified ? "✅" : "⏳"}</span>
                          <span className="check-text">Identity Verified</span>
                        </div>
                      </div>
                      {aadhaarVerified && personVerified && (
                        <div className="verification-complete">
                          <span className="complete-icon">🎉</span>
                          <span className="complete-text">Verification completed!</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="privacy-note" style={{ marginTop: "20px" }}>
                  <span className="lock">🔒</span>
                  Your info is encrypted and used only for booking and delivery.
                </div>
              </div>
            </section>

            {/* Step 2: Select Console */}
            <section className="card" data-aos="fade-up" data-aos-delay="140">
              <Step1ChooseWeapon
                playstationTypes={playstationTypes}
                selectedConsole={selectedConsole}
                onSelectConsole={onSelectConsole}
              />
            </section>

            {/* Step 3: Choose Games */}
            <section className="card" data-aos="fade-up" data-aos-delay="180">
              <Step2SelectGames
                gameCategories={gameCategories}
                selectedGames={selectedGames}
                onToggleGame={onToggleGame}
                onClearGames={onClearGames}
              />
            </section>

            {/* Step 4: Battle Plan */}
            <section className="card" data-aos="fade-up" data-aos-delay="220">
              <div className="card-header">
                <div className="card-title">
                  <div className="title-icon plan">🚀</div>
                  Choose Your Battle Plan
                  {controllers > 0 && duration > 0 && <span className="sparkle">✨</span>}
                </div>
                <p className="card-subtitle">Select rental type, duration, and controllers</p>
              </div>

              <div className="card-content">
                {/* Plan Type Toggle */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}
                  >
                    Rental Type
                  </label>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => {
                        setPlanType("hourly")
                        setDuration(1)
                      }}
                      style={{
                        flex: 1,
                        padding: "16px",
                        borderRadius: "12px",
                        border: planType === "hourly" ? "2px solid #10b981" : "2px solid #374151",
                        background: planType === "hourly" ? "rgba(16, 185, 129, 0.1)" : "#1f2937",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      ⏱️ Hourly Plan
                    </button>
                    <button
                      onClick={() => {
                        setPlanType("daily")
                        setDuration(1)
                      }}
                      style={{
                        flex: 1,
                        padding: "16px",
                        borderRadius: "12px",
                        border: planType === "daily" ? "2px solid #10b981" : "2px solid #374151",
                        background: planType === "daily" ? "rgba(16, 185, 129, 0.1)" : "#1f2937",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      📅 Daily Plan
                    </button>
                  </div>
                </div>

                {/* Member Toggle */}
                <div style={{ marginBottom: "24px", padding: "16px", background: "#1f2937", borderRadius: "12px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isMember}
                      onChange={(e) => setIsMember(e.target.checked)}
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#10b981" }}>👑 I'm a Member (Get 20% OFF!)</span>
                  </label>
                </div>

                {/* Controllers Selection */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}
                  >
                    Number of Controllers
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setControllers(num)}
                        style={{
                          padding: "16px",
                          borderRadius: "12px",
                          border: controllers === num ? "2px solid #10b981" : "2px solid #374151",
                          background: controllers === num ? "rgba(16, 185, 129, 0.1)" : "#1f2937",
                          color: "#fff",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          fontSize: "18px",
                          fontWeight: "700",
                        }}
                      >
                        {num} 🎮
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}
                  >
                    Duration ({planType === "hourly" ? "Hours" : "Days"})
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: "12px" }}>
                    {(planType === "hourly" ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7]).map((num) => (
                      <button
                        key={num}
                        onClick={() => setDuration(num)}
                        style={{
                          padding: "16px",
                          borderRadius: "12px",
                          border: duration === num ? "2px solid #10b981" : "2px solid #374151",
                          background: duration === num ? "rgba(16, 185, 129, 0.1)" : "#1f2937",
                          color: "#fff",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        {num} {planType === "hourly" ? "hr" : "day"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                {controllers > 0 && duration > 0 && (
                  <div
                    style={{
                      padding: "20px",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
                      borderRadius: "12px",
                      border: "2px solid #10b981",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "8px" }}>Total Price</div>
                    <div style={{ fontSize: "36px", fontWeight: "700", color: "#10b981" }}>₹{total}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
                      {controllers} Controller{controllers > 1 ? "s" : ""} • {duration} {planType === "hourly" ? "Hour" : "Day"}
                      {duration > 1 ? "s" : ""}
                      {isMember && " • Member Pricing Applied 👑"}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Step 5: Schedule */}
            <section className="card" data-aos="fade-up" data-aos-delay="260">
              <div className="card-header">
                <div className="card-title">
                  <div className="title-icon schedule">🕐</div>
                  Schedule Your Gaming Session
                  {startDate && startTime && <span className="sparkle">✨</span>}
                </div>
                <p className="card-subtitle">Pick your preferred start date and time</p>
              </div>

              <div className="card-content">
                {/* Date Selection */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    className="schedule-label"
                    style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}
                  >
                    <span className="label-icon" style={{ marginRight: "8px" }}>
                      📅
                    </span>
                    Start Date*
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="date-input"
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "2px solid #374151",
                      background: "#1f2937",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  />
                </div>

                {/* Time Picker */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}>
                    <span style={{ marginRight: "8px" }}>⏰</span>
                    Start Time*
                  </label>

                  <MobileResponsiveTimePicker onTimeChange={setStartTime} />
                </div>

                {startDate && startTime && (
                  <div
                    className="calculated-end-time"
                    style={{
                      marginTop: "20px",
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05))",
                      border: "1px solid #10b981",
                    }}
                  >
                    <p style={{ fontSize: "15px", color: "#d1d5db", marginBottom: "12px" }}>
                      <span style={{ marginRight: "8px", color: "#10b981", fontSize: "16px" }}>✅</span>
                      Your session will end:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "12px 16px",
                        background: "#1f2937",
                        borderRadius: "10px",
                        border: "1px solid #374151",
                      }}
                    >
                      <div style={{ marginBottom: "12px" }}>
                        <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>End Date:</p>
                        <p style={{ fontSize: "15px", fontWeight: "600", color: "#e5e7eb" }}>{formatDate(endDate)}</p>
                      </div>
                      <div
                        style={{
                          height: "1px",
                          width: "100%",
                          background: "#374151",
                          margin: "4px 0 12px 0",
                        }}
                      ></div>
                      <div>
                        <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>End Time:</p>
                        <p style={{ fontSize: "18px", fontWeight: "600", color: "#10b981" }}>{convert24HourTo12Hour(endTime)}</p>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "12px",
                        padding: "8px 12px",
                        background: "rgba(16, 185, 129, 0.1)",
                        borderRadius: "8px",
                        fontSize: "13px",
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>ℹ️</span>
                      Based on your {planType} plan for {duration} {planType === "hourly" ? "hour" : "day"}
                      {duration > 1 ? "s" : ""}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Summary / Review */}
          <aside className="summary-column" data-aos="fade-left" data-aos-delay="120">
            <div className="summary-panel" style={{ top: "100px" }}>
              <SummaryPanel
                selectedConsoleData={selectedConsoleData}
                selectedPeriodData={{
                  name: planType === "hourly" ? "Hourly Plan" : "Daily Plan",
                  duration: `${duration} ${planType === "hourly" ? "Hour" : "Day"}${duration > 1 ? "s" : ""}`,
                  description: `${controllers} Controller${controllers > 1 ? "s" : ""}${isMember ? " • Member" : ""}`,
                }}
                startDate={startDate}
                endDate={endDate}
                startTime={startTime}
                endTime={endTime}
                contactInfo={contactInfo}
                selectedGames={selectedGames}
                gameCategories={gameCategories}
                total={total}
                isLoading={isLoading}
                handleBooking={handleBooking}
                formatDate={formatDate}
                checked={checked}
                setChecked={setChecked}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
        </div>
      )}
    </main>
  )
}
export default BookingPage