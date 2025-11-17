"use client"

import { useState } from "react"
import "./CustomTimePicker.css"

const CustomTimePicker = ({ value, onChange, label, helperText }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hour, setHour] = useState(value ? Number.parseInt(value.split(":")[0]) : 10)
  const [minute, setMinute] = useState(value ? Number.parseInt(value.split(":")[1]) : 0)
  const [period, setPeriod] = useState(value ? (Number.parseInt(value.split(":")[0]) >= 12 ? "PM" : "AM") : "AM")

  const formatTime = (h, m, p) => {
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h
    return `${displayHour}:${m.toString().padStart(2, "0")} ${p}`
  }

  const formatTime24 = (h, m, p) => {
    let hour24 = h
    if (p === "PM" && h !== 12) hour24 = h + 12
    if (p === "AM" && h === 12) hour24 = 0
    return `${hour24.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
  }

  const handleTimeChange = (newHour, newMinute, newPeriod) => {
    setHour(newHour)
    setMinute(newMinute)
    setPeriod(newPeriod)
    onChange(formatTime24(newHour, newMinute, newPeriod))
  }

  const adjustHour = (increment) => {
    let newHour = hour
    if (increment) {
      newHour = hour === 12 ? 1 : hour + 1
    } else {
      newHour = hour === 1 ? 12 : hour - 1
    }
    handleTimeChange(newHour, minute, period)
  }

  const adjustMinute = (increment) => {
    let newMinute = minute
    if (increment) {
      newMinute = minute === 45 ? 0 : minute + 15
    } else {
      newMinute = minute === 0 ? 45 : minute - 15
    }
    handleTimeChange(hour, newMinute, period)
  }

  const togglePeriod = () => {
    const newPeriod = period === "AM" ? "PM" : "AM"
    handleTimeChange(hour, minute, newPeriod)
  }

  return (
    <div className="time-picker-container">
      <label className="time-picker-label">{label}</label>
      <div className="time-picker-wrapper">
        <button className="time-picker-trigger" onClick={() => setIsOpen(!isOpen)} type="button">
          <span className="time-icon">🕐</span>
          {value ? formatTime(hour, minute, period) : <span className="placeholder">Select time</span>}
        </button>

        {isOpen && (
          <>
            <div className="time-picker-backdrop" onClick={() => setIsOpen(false)} />
            <div className="time-picker-dropdown">
              <div className="time-picker-content">
                <div className="time-selectors">
                  {/* Hour Selector */}
                  <div className="time-selector">
                    <button className="time-adjust-btn" onClick={() => adjustHour(true)} type="button">
                      ▲
                    </button>
                    <div className="time-display">{hour.toString().padStart(2, "0")}</div>
                    <button className="time-adjust-btn" onClick={() => adjustHour(false)} type="button">
                      ▼
                    </button>
                  </div>

                  <div className="time-separator">:</div>

                  {/* Minute Selector */}
                  <div className="time-selector">
                    <button className="time-adjust-btn" onClick={() => adjustMinute(true)} type="button">
                      ▲
                    </button>
                    <div className="time-display">{minute.toString().padStart(2, "0")}</div>
                    <button className="time-adjust-btn" onClick={() => adjustMinute(false)} type="button">
                      ▼
                    </button>
                  </div>

                  {/* AM/PM Selector */}
                  <div className="period-selector">
                    <button
                      className={`period-btn ${period === "AM" ? "active" : ""}`}
                      onClick={togglePeriod}
                      type="button"
                    >
                      AM
                    </button>
                    <button
                      className={`period-btn ${period === "PM" ? "active" : ""}`}
                      onClick={togglePeriod}
                      type="button"
                    >
                      PM
                    </button>
                  </div>
                </div>

                <div className="time-picker-actions">
                  <button className="time-action-btn cancel" onClick={() => setIsOpen(false)} type="button">
                    Cancel
                  </button>
                  <button className="time-action-btn confirm" onClick={() => setIsOpen(false)} type="button">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {helperText && <p className="time-picker-helper">{helperText}</p>}
    </div>
  )
}

export default CustomTimePicker
