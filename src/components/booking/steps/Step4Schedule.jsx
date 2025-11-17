export default function Step4Schedule({
  rentalPeriod,
  startDate, endDate, startTime, endTime,
  setStartDate, setEndDate, setStartTime, setEndTime,
  CustomTimePicker
}) {
  const formatDate = (d) =>
    !d ? "" : new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  const getTodayDate = () => new Date().toISOString().split("T")[0]

  const DateInput = ({ value, onChange, label, min }) => (
    <div className="date-input-container">
      <label className="date-label">{label}</label>
      <div className="date-input-wrapper">
        <span className="date-icon">📅</span>
        <input type="date" value={value} onChange={(e) => onChange(e.target.value)} min={min || getTodayDate()} className="date-input" />
      </div>
      {value && <p className="date-helper">{formatDate(value)}</p>}
    </div>
  )

  const Header = ({ icon, title, desc, tone }) => (
    <div className={`schedule-info ${tone}`}>
      <div className="schedule-header"><span className="schedule-icon">{icon}</span><span className="schedule-title">{title}</span></div>
      <p className="schedule-description">{desc}</p>
    </div>
  )

  return (
    <div className="card" data-aos="fade-left" data-aos-delay="400">
      <div className="card-header">
        <div className="card-title"><div className="title-icon clock">🕐</div>Schedule Your Gaming Session</div>
        <p className="card-subtitle">Set up your gaming schedule based on your selected plan</p>
      </div>

      <div className="card-content">
        {rentalPeriod === "hourly" && (
          <div className="scheduling-section">
            <Header icon="" title="Hourly Session" desc="Select your gaming date and time duration" tone="hourly" />
            <div className="schedule-grid">
              <DateInput value={startDate} onChange={setStartDate} label="Select Date" />
              <CustomTimePicker value={startTime} onChange={setStartTime} label="Start Time" />
              <CustomTimePicker value={endTime} onChange={setEndTime} label="End Time" />
            </div>
          </div>
        )}

        {rentalPeriod === "daily" && (
          <div className="scheduling-section">
            <Header icon="🏆" title="Daily Package" desc="Choose your gaming period and daily gaming hours" tone="daily" />
            <div className="schedule-grid">
              <DateInput value={startDate} onChange={setStartDate} label="Start Date" />
              <DateInput value={endDate} onChange={setEndDate} label="End Date" min={startDate || getTodayDate()} />
            </div>
            <div className="schedule-grid">
              <CustomTimePicker value={startTime} onChange={setStartTime} label="Daily Start Time" helperText="Console delivered daily at this time" />
              <CustomTimePicker value={endTime} onChange={setEndTime} label="Daily End Time" helperText="Console picked up daily at this time" />
            </div>
          </div>
        )}

        {rentalPeriod === "weekly" && (
          <div className="scheduling-section">
            <Header icon="⚔️" title="Weekly Package" desc="Set your weekly gaming schedule with flexible hours" tone="weekly" />
            <div className="schedule-grid">
              <DateInput value={startDate} onChange={setStartDate} label="Start Date" />
              <DateInput value={endDate} onChange={setEndDate} label="End Date" min={startDate || getTodayDate()} />
            </div>
            <div className="schedule-grid">
              <CustomTimePicker value={startTime} onChange={setStartTime} label="Weekly Start Time" helperText="Console delivered weekly at this time" />
              <CustomTimePicker value={endTime} onChange={setEndTime} label="Weekly End Time" helperText="Console picked up weekly at this time" />
            </div>
          </div>
        )}

        {rentalPeriod === "monthly" && (
          <div className="scheduling-section">
            <Header icon="👑" title="Monthly Package" desc="Ultimate gaming experience with flexible daily hours" tone="monthly" />
            <div className="schedule-grid">
              <DateInput value={startDate} onChange={setStartDate} label="Start Date" />
              <DateInput value={endDate} onChange={setEndDate} label="End Date" min={startDate || getTodayDate()} />
            </div>
            <div className="schedule-grid">
              <CustomTimePicker value={startTime} onChange={setStartTime} label="Preferred Start Time" helperText="Your preferred daily gaming start time" />
              <CustomTimePicker value={endTime} onChange={setEndTime} label="Preferred End Time" helperText="Your preferred daily gaming end time" />
            </div>

            <div className="monthly-benefits" data-aos="fade-up" data-aos-delay="300">
              <div className="benefits-header"><span className="benefits-icon">👑</span><span className="benefits-title">Monthly Benefits</span></div>
              <ul className="benefits-list">
                <li>• Console stays with you for the entire period</li>
                <li>• Flexible daily gaming hours</li>
                <li>• Free game swaps during the month</li>
                <li>• Priority customer support</li>
              </ul>
            </div>
          </div>
        )}

        <div className="operating-hours" data-aos="fade-up" data-aos-delay="200">
          <div className="hours-header"><span className="hours-icon">🕐</span><span className="hours-title">Operating Hours</span></div>
          <p className="hours-text">We deliver between 10:00 AM - 11:00 PM daily</p>
        </div>
      </div>
    </div>
  )
}
