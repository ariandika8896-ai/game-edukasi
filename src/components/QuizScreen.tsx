import { useState, useMemo } from 'react'
import { sounds } from '../soundEngine'
import { getQuizForLevel, type QuizQuestion } from '../data/quizData'

interface QuizScreenProps {
  levelNumber?: number
  onPause: () => void
  onFinishQuiz: (finalScore: number, correctCount: number) => void
}

export function QuizScreen({ levelNumber = 1, onPause, onFinishQuiz }: QuizScreenProps) {
  const questions: QuizQuestion[] = useMemo(() => getQuizForLevel(levelNumber), [levelNumber])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQ = questions[currentIdx] || questions[0]

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return
    setSelectedOption(optId)
    setIsAnswered(true)

    const opt = currentQ.options.find((o) => o.id === optId)
    if (opt?.isCorrect) {
      sounds.playSuccess()
      setScore((s) => s + 100)
      setCorrectCount((c) => c + 1)
    } else {
      sounds.playBoing()
      setShowExplanation(true)
    }
  }

  const handleNextQuestion = () => {
    sounds.playClick()
    setShowExplanation(false)
    setSelectedOption(null)
    setIsAnswered(false)

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1)
    } else {
      // Calculate final score: 100 poin per jawaban benar + 60 bonus koin & eksplorasi
      const finalScore = score + 60
      sounds.playFanfare()
      onFinishQuiz(finalScore, correctCount)
    }
  }

  return (
    <div className="game-screen-wrapper quiz-screen">
      {/* Dynamic Background */}
      <div className="quiz-backdrop" />

      {/* Screen 4 UI Overlay */}
      <div className="game-ui-layer">
        {/* Top Header Bar */}
        <div className="quiz-top-bar">
          <button className="hud-circle-btn" onClick={onPause} title="Jeda">
            ⏸️
          </button>

          <div className="quiz-progress-pill">
            <span className="quiz-progress-text">
              {currentIdx + 1}/{questions.length}
            </span>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="quiz-card">
          <div className="quiz-prompt-text">{currentQ.prompt}</div>

          {/* Question Illustration Graphic */}
          <div className="quiz-illustration-wrap">
            {currentQ.illustrationType === 'house' && (
              <div className="house-illustration">
                <div className="roof-triangle" />
                <div className="house-body">
                  <div className="house-window" />
                  <div className="house-door" />
                </div>
              </div>
            )}

            {currentQ.illustrationType === 'circle_items' && (
              <div className="items-row-illustration">
                <span className="item-icon">⚽</span>
                <span className="item-icon">⏰</span>
                <span className="item-icon">🪙</span>
              </div>
            )}

            {currentQ.illustrationType === 'rectangle_items' && (
              <div className="items-row-illustration">
                <span className="item-icon" title="Kursi">🪑</span>
                <span className="item-icon" title="Pintu">🚪</span>
                <span className="item-icon" title="Buku">📚</span>
              </div>
            )}

            {currentQ.illustrationType === 'triangle' && (
              <div className="triangle-shape-illustration">
                <div className="big-yellow-triangle" />
              </div>
            )}

            {currentQ.illustrationType === 'window' && (
              <div className="window-illustration">
                <div className="window-frame">
                  <div className="pane" />
                  <div className="pane" />
                  <div className="pane" />
                  <div className="pane" />
                </div>
              </div>
            )}

            {currentQ.illustrationType === 'quadrilateral' && (
              <div className="items-row-illustration">
                <span className="item-icon">🟦</span>
                <span className="item-icon">▭</span>
                <span className="item-icon">💠</span>
              </div>
            )}

            {currentQ.illustrationType === 'circle_radius' && (
              <div className="items-row-illustration">
                <span className="item-icon">🔘</span>
                <span className="item-icon">⭕</span>
                <span className="item-icon">📏</span>
              </div>
            )}

            {currentQ.illustrationType === 'castle_tower' && (
              <div className="items-row-illustration">
                <span className="item-icon">🏰</span>
                <span className="item-icon">📐</span>
                <span className="item-icon">🏆</span>
              </div>
            )}

            {/* ================= LEVEL 2 ILLUSTRATIONS ================= */}
            {currentQ.illustrationType === 'l2_square_vertices' && (
              <div className="l2-square-vertices-wrap">
                <svg width="150" height="108" viewBox="0 0 150 110" className="quiz-svg">
                  <rect x="35" y="16" width="76" height="76" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
                  <circle cx="35" cy="16" r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="35" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">1</text>
                  
                  <circle cx="111" cy="16" r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="111" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">2</text>

                  <circle cx="111" cy="92" r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="111" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">3</text>

                  <circle cx="35" cy="92" r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="35" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">4</text>
                </svg>
                <div className="illustration-subtag">Persegi • 4 Titik Sudut Merah</div>
              </div>
            )}

            {currentQ.illustrationType === 'l2_rectangle_sides' && (
              <div className="l2-rectangle-sides-wrap">
                <svg width="190" height="108" viewBox="0 0 190 110" className="quiz-svg">
                  <rect x="28" y="22" width="134" height="62" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
                  {/* Side Labels */}
                  <rect x="70" y="6" width="50" height="16" rx="8" fill="#047857" />
                  <text x="95" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">Sisi 1 ➔</text>
                  
                  <rect x="154" y="44" width="34" height="16" rx="8" fill="#047857" />
                  <text x="171" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">Sisi 2</text>

                  <rect x="70" y="86" width="50" height="16" rx="8" fill="#047857" />
                  <text x="95" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">Sisi 3 ➔</text>

                  <rect x="2" y="44" width="34" height="16" rx="8" fill="#047857" />
                  <text x="19" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">Sisi 4</text>
                </svg>
                <div className="illustration-subtag">Persegi Panjang • 4 Sisi Lurus</div>
              </div>
            )}

            {currentQ.illustrationType === 'l2_no_vertex_shapes' && (
              <div className="shapes-comparison-grid">
                <div className="shape-mini-card">
                  <div className="shape-box square-box">4 Sudut</div>
                  <span>Persegi</span>
                </div>
                <div className="shape-mini-card">
                  <div className="shape-box tri-box">3 Sudut</div>
                  <span>Segitiga</span>
                </div>
                <div className="shape-mini-card">
                  <div className="shape-box rect-box">4 Sudut</div>
                  <span>P. Panjang</span>
                </div>
                <div className="shape-mini-card highlight-card">
                  <div className="shape-box circle-box">0 Sudut ✨</div>
                  <span>Lingkaran</span>
                </div>
              </div>
            )}

            {currentQ.illustrationType === 'l2_triangle_properties' && (
              <div className="l2-triangle-wrap">
                <svg width="150" height="108" viewBox="0 0 150 110" className="quiz-svg">
                  <polygon points="75,16 135,94 15,94" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
                  <circle cx="75" cy="16" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="75" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">1</text>

                  <circle cx="135" cy="94" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="135" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">2</text>

                  <circle cx="15" cy="94" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="15" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">3</text>
                  
                  <text x="36" y="52" fill="#78350F" fontSize="10" fontWeight="800">Sisi 1</text>
                  <text x="96" y="52" fill="#78350F" fontSize="10" fontWeight="800">Sisi 2</text>
                  <text x="75" y="106" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="800">Sisi 3</text>
                </svg>
                <div className="illustration-subtag">3 Sisi & 3 Titik Sudut = Segitiga!</div>
              </div>
            )}

            {currentQ.illustrationType === 'l2_quadrilateral_definition' && (
              <div className="quad-showcase-wrap">
                <div className="quad-shapes-row">
                  <div className="quad-shape-item quad-square" title="Persegi">
                    <span className="quad-badge">4 Sisi</span>
                  </div>
                  <div className="quad-shape-item quad-rect" title="Persegi Panjang">
                    <span className="quad-badge">4 Sisi</span>
                  </div>
                  <div className="quad-shape-item quad-rhombus" title="Belah Ketupat">
                    <span className="quad-badge">4 Sisi</span>
                  </div>
                </div>
                <div className="illustration-subtag">Semua memiliki 4 sisi & 4 sudut = Segi Empat</div>
              </div>
            )}

            {/* ================= LEVEL 3 ILLUSTRATIONS ================= */}
            {currentQ.illustrationType === 'l3_wall_clock' && (
              <div className="l3-clock-wrap">
                <svg width="85" height="85" viewBox="0 0 100 100" className="quiz-svg">
                  <circle cx="50" cy="50" r="46" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
                  <circle cx="50" cy="50" r="39" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                  <text x="50" y="23" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="800">12</text>
                  <text x="80" y="53" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="800">3</text>
                  <text x="50" y="82" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="800">6</text>
                  <text x="20" y="53" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="800">9</text>
                  <line x1="50" y1="50" x2="50" y2="28" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                  <line x1="50" y1="50" x2="68" y2="44" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="3.5" fill="#DC2626" />
                </svg>
                <div className="items-row-illustration mini">
                  <span className="item-icon" title="Jam Dinding">⏰</span>
                  <span className="item-icon" title="Koin">🪙</span>
                  <span className="item-icon" title="Roda">🛞</span>
                </div>
                <div className="illustration-subtag">Jam Dinding Bundar • Bentuk Lingkaran</div>
              </div>
            )}

            {currentQ.illustrationType === 'l3_house_roof' && (
              <div className="l3-house-wrap">
                <svg width="150" height="96" viewBox="0 0 150 96" className="quiz-svg">
                  <polygon points="75,8 135,48 15,48" fill="#EF4444" stroke="#F59E0B" strokeWidth="3" strokeLinejoin="round" />
                  <rect x="34" y="48" width="82" height="38" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
                  <rect x="44" y="56" width="16" height="16" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                  <rect x="76" y="56" width="16" height="30" fill="#92400E" rx="2" />
                  <rect x="50" y="20" width="50" height="16" rx="8" fill="#F59E0B" />
                  <text x="75" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">▲ Segitiga</text>
                </svg>
                <div className="illustration-subtag">Atap Rumah Memiliki 3 Sisi (Segitiga)</div>
              </div>
            )}

            {currentQ.illustrationType === 'l3_ceramic_tile' && (
              <div className="l3-tile-wrap">
                <svg width="110" height="96" viewBox="0 0 110 96" className="quiz-svg">
                  <rect x="18" y="8" width="74" height="74" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
                  <rect x="37" y="27" width="36" height="36" fill="#38BDF8" opacity="0.35" transform="rotate(45 55 45)" />
                  <circle cx="55" cy="45" r="10" fill="#0284C7" opacity="0.4" />
                  <path d="M 26 16 L 26 23 L 19 23" fill="none" stroke="#0369A1" strokeWidth="1.8" />
                  <path d="M 84 16 L 84 23 L 91 23" fill="none" stroke="#0369A1" strokeWidth="1.8" />
                  <path d="M 26 74 L 26 67 L 19 67" fill="none" stroke="#0369A1" strokeWidth="1.8" />
                  <path d="M 84 74 L 84 67 L 91 67" fill="none" stroke="#0369A1" strokeWidth="1.8" />
                  <line x1="55" y1="5" x2="55" y2="11" stroke="#EF4444" strokeWidth="2" />
                  <line x1="89" y1="45" x2="95" y2="45" stroke="#EF4444" strokeWidth="2" />
                  <line x1="55" y1="79" x2="55" y2="85" stroke="#EF4444" strokeWidth="2" />
                  <line x1="15" y1="45" x2="21" y2="45" stroke="#EF4444" strokeWidth="2" />
                </svg>
                <div className="illustration-subtag">Ubin 4 Sisi Sama & 4 Sudut Siku-Siku (Persegi)</div>
              </div>
            )}

            {currentQ.illustrationType === 'l3_door_rectangle' && (
              <div className="l3-door-wrap">
                <svg width="150" height="96" viewBox="0 0 150 96" className="quiz-svg">
                  <rect x="48" y="8" width="54" height="82" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
                  <rect x="54" y="14" width="42" height="31" rx="2" fill="#D97706" />
                  <rect x="54" y="50" width="42" height="33" rx="2" fill="#D97706" />
                  <circle cx="89" cy="51" r="3" fill="#FDE047" stroke="#854D0E" strokeWidth="1" />
                  <text x="75" y="7" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="800">▲ Sisi 1</text>
                  <text x="115" y="52" fill="#DC2626" fontSize="8" fontWeight="800">Sisi 2 ▶</text>
                  <text x="75" y="95" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="800">▼ Sisi 3</text>
                  <text x="12" y="52" fill="#DC2626" fontSize="8" fontWeight="800">◀ Sisi 4</text>
                </svg>
                <div className="illustration-subtag">Pintu Memiliki 4 Sisi (Persegi Panjang)</div>
              </div>
            )}

            {currentQ.illustrationType === 'l3_bicycle_wheel' && (
              <div className="l3-wheel-wrap">
                <svg width="90" height="90" viewBox="0 0 100 100" className="quiz-svg">
                  <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
                  <circle cx="50" cy="50" r="36" fill="#F8FAFC" />
                  <g stroke="#94A3B8" strokeWidth="1.2">
                    <line x1="50" y1="14" x2="50" y2="86" />
                    <line x1="14" y1="50" x2="86" y2="50" />
                    <line x1="24" y1="24" x2="76" y2="76" />
                    <line x1="24" y1="76" x2="76" y2="24" />
                    <line x1="17" y1="36" x2="83" y2="64" />
                    <line x1="17" y1="64" x2="83" y2="36" />
                    <line x1="36" y1="17" x2="64" y2="83" />
                    <line x1="64" y1="17" x2="36" y2="83" />
                  </g>
                  <circle cx="50" cy="50" r="8" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="3" fill="#F59E0B" />
                </svg>
                <div className="illustration-subtag">Roda Sepeda Bulat • Bentuk Lingkaran</div>
              </div>
            )}
          </div>

          {/* Multiple Choice Options List */}
          <div className="quiz-options-list">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id
              let btnClass = 'quiz-option-btn'
              if (isAnswered) {
                if (opt.isCorrect) btnClass += ' correct'
                else if (isSelected && !opt.isCorrect) btnClass += ' wrong'
              }

              return (
                <button
                  key={opt.id}
                  className={btnClass}
                  onClick={() => handleSelectOption(opt.id)}
                >
                  <span className="option-badge-icon">{opt.icon}</span>
                  <span className="option-label">{opt.label}</span>
                  {isAnswered && opt.isCorrect && <span className="option-checkmark">✓</span>}
                </button>
              )
            })}
          </div>

          {/* Explanation Banner */}
          {showExplanation && (
            <div className="quiz-explanation-banner">
              <strong>💡 Penjelasan:</strong> {currentQ.explanation}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button className="quiz-next-btn" onClick={handleNextQuestion}>
              {currentIdx + 1 < questions.length ? 'Soal Berikutnya ➔' : 'Lihat Hasil Level! 🎉'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
