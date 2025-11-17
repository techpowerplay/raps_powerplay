export default function Step3BattlePlan({ rentalPlans, rentalPeriod, onSelectPlan }) {
  return (
    <div className="card" data-aos="fade-right" data-aos-delay="300">
      <div className="card-header">
        <div className="card-title">
          <div className="title-icon rocket">🚀</div>
          Choose Your Battle Plan
          {rentalPeriod && <span className="arrow">➡️</span>}
        </div>
      </div>
      <div className="card-content">
        <div className="rental-plans-grid">
          {rentalPlans.map((plan, i) => (
            <div
              key={plan.id}
              className={`rental-plan ${rentalPeriod === plan.id ? "selected" : ""}`}
              onClick={() => onSelectPlan(plan.id, plan.name)}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-content">
                <div className="plan-header">
                  <div className={`plan-icon ${plan.color}`}>{plan.icon}</div>
                  <div className="plan-info">
                    <div className="plan-name-row">
                      <h3 className="plan-name">{plan.name}</h3>
                      {plan.discount && <div className="discount-badge">{plan.discount}% OFF</div>}
                    </div>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-duration">{plan.duration} Plan</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
