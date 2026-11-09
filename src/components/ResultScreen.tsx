import { useEffect } from 'react'
import triaPlayerImg from '../assets/tria-player.png'
import { ParticleCanvas } from './ParticleCanvas'
import { sounds } from '../soundEngine'

interface ResultScreenProps {
  score?: number
  coinsEarned?: number
  xpEarned?: number
  correctCount?: number
  totalQuestions?: number
  remainingLives?: number
  onContinue: () => void
  onReplay: () => void
}

export function ResultScreen({
  score = 460,
  coinsEarned = 46,
  xpEarned = 100,
  correctCount = 5,
  totalQuestions = 5,
  remainingLives = 3,
  onContinue,
  onReplay,
}: ResultScreenProps) {
  useEffect(() => {
    sounds.playFanfare()
  }, [])

  return (
    <div className="game-screen-wrapper result-screen">
      {/* Dedicated Standalone Sky & Hill Backdrop */}
      <div className="result-backdrop">
        <div className="result-sunburst" />
        <div className="result-cloud cloud-top-left" />
        <div className="result-cloud cloud-top-right" />
        <div className="result-distant-castle" />
        <div className="result-rolling-hills" />
      </div>

      {/* Confetti & Particle Celebration */}
      <ParticleCanvas />

      {/* Screen 5 UI Overlay */}
      <div className="game-ui-layer result-ui-layer">
        {/* A. Bagian Atas: 3 Bintang + Banner Level Selesai + Karakter Utama Tria */}
        <div className="result-header-group">
          {/* 3 3D Glowing Stars in arch reflecting remaining lives / achievement */}
          <div className="result-stars-row" title={`Sisa Nyawa Pemain: ${remainingLives} dari 3 Bintang`}>
            <div className={`result-star star-side star-left ${remainingLives >= 2 ? 'earned' : 'lost'}`}>
              {remainingLives >= 2 ? '⭐' : '☆'}
            </div>
            <div className={`result-star star-center ${remainingLives >= 1 ? 'earned' : 'lost'}`}>
              {remainingLives >= 1 ? '⭐' : '☆'}
            </div>
            <div className={`result-star star-side star-right ${remainingLives >= 3 ? 'earned' : 'lost'}`}>
              {remainingLives >= 3 ? '⭐' : '☆'}
            </div>
          </div>

          {/* Ribbon Banner "Level Selesai!" */}
          <div className="result-ribbon-banner">
            <span className="ribbon-tail left-tail" />
            <span className="ribbon-text">Level Selesai!</span>
            <span className="ribbon-tail right-tail" />
          </div>

          {/* Celebrating Tria Mascot */}
          <div className="result-mascot-container">
            <div className="result-sun-glow" />
            <img
              src={triaPlayerImg}
              alt="Tria Merayakan Kemenangan"
              className="result-tria-mascot"
            />
          </div>
        </div>

        {/* B. Panel Hasil Permainan */}
        <div className="result-stats-card">
          <div className="stats-grid-2x2">
            <div className="stat-cell">
              <span className="stat-icon star-icon">⭐</span>
              <span className="stat-label">Skor</span>
              <strong className="stat-val">{score}</strong>
            </div>

            <div className="stat-cell">
              <span className="stat-icon coin-icon">🪙</span>
              <span className="stat-label">Koin</span>
              <strong className="stat-val">+{coinsEarned}</strong>
            </div>

            <div className="stat-cell">
              <span className="stat-badge-xp blue-xp">XP</span>
              <span className="stat-label">XP</span>
              <strong className="stat-val">+{xpEarned}</strong>
            </div>

            <div className="stat-cell">
              <span className="stat-badge-xp purple-xp">XP</span>
              <span className="stat-label">Bonus</span>
              <strong className="stat-val">+100</strong>
            </div>
          </div>

          {/* Sisa Nyawa Pemain (Indikator Pencapaian Nyawa Bintang) */}
          <div className="stats-lives-row" title="Informasi Jumlah Nyawa Bintang yang Tersisa">
            <span className="lives-row-icon">⭐</span>
            <span className="lives-row-title">Sisa Nyawa:</span>
            <div className="lives-row-badge">
              {[1, 2, 3].map((starNum) => (
                <span
                  key={starNum}
                  className={`life-star-badge ${starNum <= remainingLives ? 'active' : 'empty'}`}
                >
                  {starNum <= remainingLives ? '⭐' : '☆'}
                </span>
              ))}
              <span className="lives-badge-text">
                {remainingLives} / 3 Bintang
              </span>
            </div>
          </div>

          {/* Jawaban Benar Badge */}
          <div className="stats-answers-row">
            <span className="answers-icon">📋</span>
            <span className="answers-title">Jawaban:</span>
            <div className="answers-badge">
              <span className="badge-check">✓</span>
              <span className="badge-text">
                {correctCount} benar / {totalQuestions}
              </span>
            </div>
          </div>
        </div>

        {/* C. Tombol Navigasi: Lanjutkan & Ulangi */}
        <div className="result-actions-column">
          <button
            className="result-btn continue-green-btn"
            onClick={() => {
              sounds.playSuccess()
              onContinue()
            }}
          >
            Lanjutkan
          </button>

          <button
            className="result-btn replay-white-btn"
            onClick={() => {
              sounds.playClick()
              onReplay()
            }}
          >
            <span className="replay-icon">🔄</span> Ulangi
          </button>
        </div>
      </div>
    </div>
  )
}
