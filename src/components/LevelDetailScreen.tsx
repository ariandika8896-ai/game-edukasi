import { useState, useEffect } from 'react'
import { ALL_LEVELS, type LevelInfo } from '../data/levelsData'
import { type PlayerProgress } from '../data/gameState'
import { sounds } from '../soundEngine'
import triaCastleIllustration from '../assets/tria-castle-illustration.png'

interface LevelDetailScreenProps {
  initialLevelId?: number
  playerProgress?: PlayerProgress
  onBack: () => void
  onStart: (level: LevelInfo) => void
  showToast: (text: string) => void
}

export function LevelDetailScreen({
  initialLevelId = 1,
  playerProgress,
  onBack,
  onStart,
  showToast,
}: LevelDetailScreenProps) {
  const [levelIndex, setLevelIndex] = useState(
    Math.max(0, Math.min(ALL_LEVELS.length - 1, initialLevelId - 1))
  )
  const [showLevelPicker, setShowLevelPicker] = useState(false)

  // Keep levelIndex in sync with initialLevelId
  useEffect(() => {
    setLevelIndex(Math.max(0, Math.min(ALL_LEVELS.length - 1, initialLevelId - 1)))
  }, [initialLevelId])

  const currentLevel = ALL_LEVELS[levelIndex]
  const currentLevelStars =
    playerProgress?.completedLevels[currentLevel.levelNumber]?.stars ??
    currentLevel.starsEarned ??
    0

  const handlePrevLevel = () => {
    if (levelIndex > 0) {
      sounds.playClick()
      setLevelIndex(levelIndex - 1)
    } else {
      sounds.playBoing()
      showToast('Ini adalah level pertama!')
    }
  }

  const handleNextLevel = () => {
    if (levelIndex < ALL_LEVELS.length - 1) {
      sounds.playClick()
      setLevelIndex(levelIndex + 1)
    } else {
      sounds.playBoing()
      showToast('Ini adalah level terakhir!')
    }
  }

  const handleStart = () => {
    sounds.playFanfare()
    onStart(currentLevel)
  }

  return (
    <div className="game-screen-wrapper level-detail-view">
      {/* Background Sky and Castle Landscape */}
      <div className="level-screen-backdrop">
        <div className="backdrop-sky" />
        <div className="backdrop-mountains" />
        <div className="backdrop-ground" />
      </div>

      {/* Main Clean Vertical Container (No Overlapping Components) */}
      <div className="level-detail-layout">
        {/* 1. TOP HEADER BAR */}
        <header className="level-detail-header">
          {/* Back Button (<) */}
          <button
            className="level-back-circle-btn"
            onClick={() => {
              sounds.playClick()
              onBack()
            }}
            title="Kembali ke Beranda"
          >
            ‹
          </button>

          {/* Level Switcher Pill & Picker */}
          <button
            className="level-selector-badge"
            onClick={() => {
              sounds.playClick()
              setShowLevelPicker(!showLevelPicker)
            }}
            title="Pilih Level (1 - 15)"
          >
            <span>Level {currentLevel.levelNumber} dari {ALL_LEVELS.length}</span>
            <span className="selector-arrow">▼</span>
          </button>

          {/* Currency Pills */}
          <div className="level-currency-group">
            <div className="currency-bubble star-bubble">
              <span className="bubble-icon">⭐</span>
              <span className="bubble-val">{currentLevelStars}</span>
            </div>
            <div className="currency-bubble coin-bubble">
              <span className="bubble-icon">🟡</span>
              <span className="bubble-val">0</span>
            </div>
          </div>
        </header>

        {/* 2. SIGNBOARD & TITLE WITH CLEAN NAVIGATION ARROWS */}
        <div className="level-signboard-wrapper">
          <button
            className={`nav-arrow-btn prev-btn ${levelIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrevLevel}
            disabled={levelIndex === 0}
            title="Level Sebelumnya"
          >
            ◀
          </button>

          <div className="wooden-board-composite">
            <div className="wooden-ribbon-left" />
            <div className="wooden-board-center">
              <span className="level-number-text">Level {currentLevel.levelNumber}</span>
            </div>
            <div className="wooden-ribbon-right" />

            <div className="blue-subtitle-ribbon">
              <span>{currentLevel.title}</span>
            </div>
          </div>

          <button
            className={`nav-arrow-btn next-btn ${levelIndex === ALL_LEVELS.length - 1 ? 'disabled' : ''}`}
            onClick={handleNextLevel}
            disabled={levelIndex === ALL_LEVELS.length - 1}
            title="Level Selanjutnya"
          >
            ▶
          </button>
        </div>

        {/* 3. WHITE OBJECTIVE CARD */}
        <div className="level-objective-card">
          <div className="objective-label">Tujuan:</div>
          <p className="objective-desc">{currentLevel.tujuan}</p>
        </div>

        {/* 4. STAR RATING TARGET */}
        <div className="level-stars-target-row">
          {Array.from({ length: currentLevel.totalStars }).map((_, idx) => (
            <span
              key={idx}
              className={`target-star ${idx < currentLevelStars ? 'earned' : 'empty'}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* 5. META INFO PILL (Time & Challenges) */}
        <div className="level-meta-capsule">
          <div className="meta-capsule-item">
            <span className="meta-icon-bubble time-bubble">⏱️</span>
            <span className="meta-capsule-text">{currentLevel.estimatedTime}</span>
          </div>

          <div className="meta-capsule-divider" />

          <div className="meta-capsule-item">
            <span className="meta-icon-bubble challenge-bubble">🎯</span>
            <span className="meta-capsule-text">{currentLevel.challengesCount} tantangan</span>
          </div>
        </div>

        {/* 6. CHARACTER & CASTLE STAGE SCENE (Authentic 3D Artwork) */}
        <div className="level-character-stage">
          <div
            className="tria-castle-art-wrapper"
            onClick={() => {
              sounds.playChirp()
              showToast(`Tria: "Ayo kita jelajahi ${currentLevel.title}!"`)
            }}
            title="Tria si Segitiga menuju Kastil"
          >
            <img
              src={triaCastleIllustration}
              alt="Tria Menuju Kastil Geometri"
              className="tria-castle-img"
            />
            <div className="tria-mini-speech-badge">Ayo Mulai! ✨</div>
          </div>
        </div>

        {/* 7. BIG GOLDEN "MULAI" ACTION BUTTON */}
        <div className="level-action-bottom">
          <button className="level-mulai-button" onClick={handleStart} title="Mulai Level!">
            <span>Mulai</span>
          </button>
        </div>
      </div>

      {/* QUICK LEVEL SELECTOR DRAWER (Level 1 - 30) */}
      {showLevelPicker && (
        <div className="modal-backdrop open" onClick={() => setShowLevelPicker(false)}>
          <div className="game-modal-card level-picker-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-icon">🗺️</span>
                <span className="modal-title">Pilih Level (1 - 15)</span>
              </div>
              <button className="modal-close-btn" onClick={() => setShowLevelPicker(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: 380, padding: 12 }}>
              <div className="level-grid-container">
                {ALL_LEVELS.map((lvl, idx) => (
                  <button
                    key={lvl.id}
                    className={`level-picker-node ${idx === levelIndex ? 'active' : ''} ${lvl.status}`}
                    onClick={() => {
                      sounds.playClick()
                      setLevelIndex(idx)
                      setShowLevelPicker(false)
                      showToast(`Memilih Level ${lvl.levelNumber}: ${lvl.title}`)
                    }}
                  >
                    <span className="picker-num">{lvl.levelNumber}</span>
                    <span className="picker-world">{lvl.worldName.split(' ')[0]}</span>
                    {lvl.starsEarned > 0 && <span className="picker-stars">⭐</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
