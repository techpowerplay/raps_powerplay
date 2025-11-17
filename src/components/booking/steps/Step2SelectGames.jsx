export default function Step2SelectGames({ gameCategories, selectedGames, onToggleGame, onClearGames }) {
  return (
    <div className="card" data-aos="fade-left" data-aos-delay="200">
      <div className="card-header">
        <div className="card-title">
          <div className="title-icon target">🎯</div>
          Select Your Games
          {selectedGames.length > 0 && <div className="games-badge">{selectedGames.length} selected</div>}
        </div>
        <p className="card-subtitle">Choose up to 5 games for your session</p>
      </div>
      <div className="card-content">
        <div className="games-section">
          {gameCategories.map((category, ci) => (
            <div key={category.category} className="game-category" data-aos="fade-up" data-aos-delay={ci * 100}>
              <div className="category-header"><span className="category-icon">{category.icon}</span>{category.category}</div>
              <div className="games-grid">
                {category.games.map((game, gi) => {
                  const selected = selectedGames.includes(game.id)
                  const disabled = !selected && selectedGames.length >= 5
                  return (
                    <div
                      key={game.id}
                      className={`game-card ${selected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
                      onClick={() => onToggleGame(game.id)}
                      data-aos="zoom-in"
                      data-aos-delay={gi * 50}
                    >
                      <div className="game-checkbox">
                        <input type="checkbox" checked={selected} onChange={() => {}} disabled={disabled} />
                      </div>
                      <div className="game-info">
                        <div className="game-name">{game.name}</div>
                        <div className="game-rating"><span className="rating-star">⭐</span>{game.rating}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedGames.length > 0 && (
          <div className="selected-games-summary" data-aos="fade-up" data-aos-delay="300">
            <div className="summary-content">
              <span className="summary-text">Selected Games: {selectedGames.length}/5</span>
              <button className="clear-btn" onClick={onClearGames}>Clear All</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
