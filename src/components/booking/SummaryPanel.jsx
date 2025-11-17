import { useMemo } from "react";

export default function SummaryPanel({
  selectedConsoleData,
  selectedPeriodData,
  startDate, endDate, startTime, endTime,
  contactInfo,
  selectedGames, gameCategories,
  total, isLoading,
  handleBooking,
  formatDate,
  checked,
  setChecked,
}) {
  const convert24To12 = (time24) => {
    if (!time24) return "";
    const [hRaw, m] = time24.split(":").map(Number);
    const period = hRaw >= 12 ? "PM" : "AM";
    const h = hRaw % 12 || 12;
    return `${h}:${String(m).padStart(2, "0")} ${period}`;
    // If your startTime/endTime might already be "h:mm AM/PM" then you can guard/skip.
  };

  const flatGames = useMemo(() => gameCategories.flatMap((c) => c.games), [gameCategories]);

  return (
    <div className="summary-card" data-aos="fade-left" data-aos-delay="500">
      <div className="summary-header">
        <div className="summary-title">
          <span className="summary-icon">🏆</span>
          Battle Summary
        </div>
      </div>

      <div className="summary-content">
        {/* Console */}
        {selectedConsoleData && (
          <div className="summary-item" data-aos="fade-up" data-aos-delay="100">
            <div className="item-header">
              <div className="item-icon">🎮</div>
              <div className="item-info">
                <div className="item-name">{selectedConsoleData.name}</div>
                <div className="item-subtitle">{selectedConsoleData.subtitle}</div>
              </div>
            </div>
            <div className="item-price">₹{selectedConsoleData.price}/hr</div>
          </div>
        )}

        {/* Plan */}
        {selectedPeriodData && (
          <div className="summary-item" data-aos="fade-up" data-aos-delay="200">
            <div className="plan-summary">
              <div className="plan-summary-header">
                <span className="plan-summary-name">{selectedPeriodData.name}</span>
                {selectedPeriodData.discount && (
                  <div className="discount-badge small">-{selectedPeriodData.discount}%</div>
                )}
              </div>
              <div className="plan-summary-description">{selectedPeriodData.description}</div>
            </div>
          </div>
        )}

        {/* Schedule */}
        {(startDate || endDate || startTime || endTime) && (
          <div className="summary-item" data-aos="fade-up" data-aos-delay="300">
            <div className="schedule-summary">
              <div className="schedule-summary-header">
                <span className="schedule-icon">📅</span> Schedule
              </div>
              {startDate && (
                <div className="schedule-row">
                  <span className="schedule-label">Start Date</span>
                  <span className="schedule-value">{formatDate(startDate)}</span>
                </div>
              )}
              {endDate && (
                <div className="schedule-row">
                  <span className="schedule-label">End Date</span>
                  <span className="schedule-value">{formatDate(endDate)}</span>
                </div>
              )}
              {startTime && (
                <div className="schedule-row">
                  <span className="schedule-label">Start Time</span>
                  <span className="schedule-value">{convert24To12(startTime)}</span>
                </div>
              )}
              {endTime && (
                <div className="schedule-row">
                  <span className="schedule-label">End Time</span>
                  <span className="schedule-value">{convert24To12(endTime)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact */}
        {(contactInfo?.name || contactInfo?.email || contactInfo?.phone) && (
          <div className="summary-item" data-aos="fade-up" data-aos-delay="350">
            <div className="contact-summary">
              <div className="contact-summary-header">
                <span className="contact-icon">📝</span> Contact Details
              </div>
              {contactInfo?.name && (
                <div className="contact-row"><span className="contact-label">Name</span><span className="contact-value">{contactInfo.name}</span></div>
              )}
              {contactInfo?.email && (
                <div className="contact-row"><span className="contact-label">Email</span><span className="contact-value">{contactInfo.email}</span></div>
              )}
              {contactInfo?.phone && (
                <div className="contact-row"><span className="contact-label">Phone</span><span className="contact-value">{contactInfo.phone}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Games */}
        {selectedGames?.length > 0 && (
          <div className="summary-item" data-aos="fade-up" data-aos-delay="400">
            <div className="games-summary">
              <div className="games-summary-header">
                <span className="games-icon">🎯</span>
                Game Arsenal ({selectedGames.length})
              </div>
              <div className="games-list">
                {selectedGames.map((gameId) => {
                  const game = flatGames.find((g) => g.id === gameId);
                  return (
                    <div key={gameId} className="game-summary-item">
                      <span className="game-summary-name">{game?.name}</span>
                      <div className="game-summary-rating">
                        <span className="rating-star">⭐</span>
                        <span className="rating-value">{game?.rating}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="price-breakdown" data-aos="zoom-in" data-aos-delay="500">
          <div className="price-header">
            <span className="price-label">Total Score</span>
            <span className="price-value">₹{total}</span>
          </div>
          {selectedPeriodData?.discount && (
            <div className="savings-text">
              🎉 You save {selectedPeriodData.discount}% with {selectedPeriodData.name}!
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="flex flex-col items-start space-y-4 p-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="peer hidden"
            />
            <span
              className={`w-6 h-6 rounded-md border-2 flex check items-center justify-center transition-colors duration-300
                ${checked ? "bg-orange-500 border-orange-500" : "border-orange-500"}
              `}
            >
              {checked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-white text-sm select-none">
              I agree to the <a href="/terms" className="text-orange-400 underline cursor-pointer">Terms & Conditions</a>
            </span>
          </label>
          <p className="text-white text-xs leading-relaxed">
            By selecting this checkbox, you acknowledge that you have read and agreed
            to the <span className="text-orange-400 font-medium">Terms & Conditions</span>.
          </p>
        </div>

        {/* Submit */}
        <form onSubmit={handleBooking} encType="multipart/form-data">
          <button
            className={`booking-btn ${isLoading ? "disabled" : ""}`}
            disabled={isLoading}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {isLoading ? (
              <div className="loading-content">
                <div className="spinner"></div> Processing...
              </div>
            ) : (
              <>
                <span className="btn-icon">⚡</span>
                START GAMING - ₹{total}
              </>
            )}
          </button>
        </form>

        <p className="footer-text">🎮 Ready to dominate? Let's make it happen!</p>
      </div>
    </div>
  );
}