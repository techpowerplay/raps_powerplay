export default function HeroHeader({ steps, currentStep }) {
  return (
    <div className="hero-section" data-aos="fade-up" data-aos-delay="200">
      <h1 className="hero-title">GAME ON!</h1>
      <p className="hero-subtitle">Configure your ultimate gaming experience</p>

      <div className="progress-steps" data-aos="fade-up" data-aos-delay="400">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div className={`step-circle ${currentStep >= step.id ? "active" : ""}`}>
                <span className="step-icon">{step.icon}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line ${currentStep > step.id ? "active" : ""}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
