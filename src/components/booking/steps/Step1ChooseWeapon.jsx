export default function Step1ChooseWeapon({ playstationTypes, selectedConsole, onSelectConsole }) {
  return (
    <div className="card" data-aos="fade-right" data-aos-delay="100">
      <div className="card-header">
        <div className="card-title">
          <div className="title-icon gamepad">🎮</div>
          Choose Your Weapon
          {selectedConsole && <span className="sparkle">✨</span>}
        </div>
      </div>
      <div className="card-content">
        <div className="console-grid">
          {playstationTypes.map((ps, index) => (
            <div
              key={ps.id}
              className={`console-card ${selectedConsole === ps.id ? "selected" : ""}`}
              onClick={() => onSelectConsole(ps.id, ps.name)}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              {ps.popular && <div className="popular-badge">Most Popular</div>}
              <div className="console-content">
                <div className="console-icon">{ps.icon}</div>
                <h3 className="console-name">{ps.name}</h3>
                <p className="console-subtitle">{ps.subtitle}</p>
                <div className="console-price">₹{ps.price}/hr</div>
                <div className="console-features">
                  {ps.features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-star"></span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
