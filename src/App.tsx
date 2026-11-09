import { useState, useRef } from 'react'
import './App.css'
import bgBeranda from './assets/bg-beranda.jpg'
import { ParticleCanvas } from './components/ParticleCanvas'
import { MapScreen } from './components/MapScreen'
import { LevelDetailScreen } from './components/LevelDetailScreen'
import { ExplorationScreen } from './components/ExplorationScreen'
import { QuizScreen } from './components/QuizScreen'
import { ResultScreen } from './components/ResultScreen'
import { RuleGuideModal } from './components/RuleGuideModal'
import { type LevelInfo } from './data/levelsData'
import {
  loadPlayerProgress,
  completeLevelAndAdvance,
  type PlayerProgress,
} from './data/gameState'
import {
  ModalPetualangan,
  ModalMisi,
  ModalProfil,
  ModalToko,
  ModalEnsiklopedia,
  ModalPengaturan,
} from './components/Modals'
import { sounds } from './soundEngine'

const TRIA_QUOTES = [
  'Halo Rizki! Aku Tria si Segitiga! Aku punya 3 sisi dan 3 sudut sama besar!',
  'Ayo lanjutkan petualangan kita ke Level 4! Pasti seru!',
  'Tahukah kamu? Segitiga adalah bentuk paling kokoh dalam arsitektur!',
  'Lihat kastil di bukit itu! Ada tantangan bangun datar menanti kita!',
  "Tekan tombol 'Mulai Petualangan' untuk mulai beraksi!",
  'Jumlah seluruh sudut di dalam segitiga selalu 180° lho!',
]

const ENEMY_QUOTES = [
  "🔴 Lingkaran: 'Aku tak punya sudut dan hanya punya 1 sisi lengkung! Hati-hati!'",
  "🟦 Persegi: 'Keempat sisiku sama panjang dan 4 sudutku tegak lurus 90°!'",
  "🟣 Prisma Ungu: 'Bentukku tajam dan berani! Ayo kita adu ketelitian!'",
]

type GameScreen =
  | 'beranda'
  | 'peta' // Menu Peta Petualangan 5 Pulau
  | 'detail-level' // Detail Level (Briefing & Sasaran Belajar)
  | 'eksplorasi' // TAHAP 1: Game Petualangan (Platformer + 3 Bintang Nyawa + Capai Bendera)
  | 'soal' // TAHAP 2: Soal / Kuis Interaktif (Sesuai Materi Dunia/Level)
  | 'hasil-level' // TAHAP 3: Hasil Level (Skor Akhir, Bintang, Koin, XP, Sisa Nyawa)

function App() {
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>(loadPlayerProgress)
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('beranda')
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [toastText, setToastText] = useState<string | null>(null)
  const [triaQuote, setTriaQuote] = useState(TRIA_QUOTES[0])
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  // Scores, currency, and gameplay state across all 3 stages
  const [levelScore, setLevelScore] = useState(460)
  const [correctAnswers, setCorrectAnswers] = useState(5)
  const [playerLives, setPlayerLives] = useState(3)
  const [collectedCoins, setCollectedCoins] = useState(46)

  const toastTimerRef = useRef<number | null>(null)
  const quoteIndexRef = useRef(0)
  const enemyIndexRef = useRef(0)
  const speechBubbleTimerRef = useRef<number | null>(null)

  const showToast = (text: string, duration = 2400) => {
    setToastText(text)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => {
      setToastText(null)
    }, duration)
  }

  const handleToggleSound = () => {
    const active = sounds.toggleMute()
    setIsMuted(!active)
    showToast(active ? '🔊 Efek suara aktif!' : '🔇 Suara dimatikan')
  }

  const handleTriaClick = () => {
    sounds.playChirp()
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 260)

    const nextQuote = TRIA_QUOTES[quoteIndexRef.current % TRIA_QUOTES.length]
    quoteIndexRef.current += 1
    setTriaQuote(nextQuote)
    setShowSpeechBubble(true)

    if (speechBubbleTimerRef.current) clearTimeout(speechBubbleTimerRef.current)
    speechBubbleTimerRef.current = window.setTimeout(() => {
      setShowSpeechBubble(false)
    }, 4200)
  }

  const handleShapesClick = () => {
    sounds.playBoing()
    const nextEnemy = ENEMY_QUOTES[enemyIndexRef.current % ENEMY_QUOTES.length]
    enemyIndexRef.current += 1
    showToast(nextEnemy, 3200)
  }

  const handleNavClick = (tab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil') => {
    sounds.playClick()
    if (tab === 'beranda') {
      setCurrentScreen('beranda')
      showToast('🏠 Menu Beranda')
    } else if (tab === 'peta') {
      setCurrentScreen('peta')
      showToast('🗺️ Membuka Peta Petualangan')
    } else if (tab === 'profil') {
      setActiveModal('profil')
    } else {
      const labels: Record<string, string> = {
        prestasi: 'Prestasi & Trofi 🏆',
        materi: 'Materi Bangun Datar 📖',
      }
      showToast(`Fitur ${labels[tab]} siap dikembangkan di tahap berikutnya!`)
    }
  }

  const handleSelectLevelFromMap = (lvlNum: number) => {
    sounds.playClick()
    setSelectedLevelId(lvlNum)
    setCurrentScreen('detail-level')
    showToast(`📍 Membuka Level ${lvlNum}`)
  }

  return (
    <div className="desktop-wrapper">
      {/* Top Utility Controls Bar */}
      <header className="top-control-bar">
        <div className="app-brand-info">
          <span className="brand-dot" />
          <span>
            {currentScreen === 'beranda'
              ? 'Petualangan Bangun Datar • Menu Beranda'
              : currentScreen === 'peta'
              ? 'Petualangan Bangun Datar • Peta Petualangan (5 Dunia)'
              : currentScreen === 'detail-level'
              ? `Petualangan Bangun Datar • Level ${selectedLevelId}: Detail Level`
              : currentScreen === 'eksplorasi'
              ? `Petualangan Bangun Datar • Level ${selectedLevelId}: Tahap 1 - Petualangan`
              : currentScreen === 'soal'
              ? `Petualangan Bangun Datar • Level ${selectedLevelId}: Tahap 2 - Soal Kuis`
              : currentScreen === 'hasil-level'
              ? `Petualangan Bangun Datar • Level ${selectedLevelId}: Tahap 3 - Hasil Level`
              : `Petualangan Bangun Datar • Level ${selectedLevelId}`}
          </span>
        </div>

        <div className="toolbar-actions">
          <button
            className={`tool-btn ${currentScreen === 'beranda' ? 'active' : ''}`}
            onClick={() => handleNavClick('beranda')}
            title="Ke Menu Beranda"
          >
            🏠 Beranda
          </button>

          <button
            className={`tool-btn ${currentScreen === 'peta' ? 'active' : ''}`}
            onClick={() => handleNavClick('peta')}
            title="Ke Peta Petualangan"
          >
            🗺️ Peta
          </button>

          <button
            className={`tool-btn ${currentScreen === 'eksplorasi' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick()
              setCurrentScreen('eksplorasi')
            }}
            title="Tahap 1: Game Petualangan"
          >
            🎮 Tahap 1
          </button>

          <button
            className={`tool-btn ${currentScreen === 'soal' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick()
              setCurrentScreen('soal')
            }}
            title="Tahap 2: Soal / Kuis"
          >
            📝 Tahap 2
          </button>

          <button
            className={`tool-btn ${currentScreen === 'hasil-level' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick()
              setCurrentScreen('hasil-level')
            }}
            title="Tahap 3: Hasil Level"
          >
            🏆 Tahap 3
          </button>

          <button
            className="tool-btn"
            onClick={() => {
              sounds.playClick()
              setIsRuleModalOpen(true)
            }}
            title="Lihat Panduan Rule & Contoh Soal"
          >
            📖 Rule
          </button>

          <button
            className={`tool-btn ${!isMuted ? 'active' : ''}`}
            onClick={handleToggleSound}
            title="Nyalakan / Matikan Efek Suara"
          >
            {!isMuted ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {/* Smartphone Container Mockup Frame */}
      <main className="phone-mockup">
        <div className="screen-container">
          {/* ==========================================================
              1. PETA PETUALANGAN (GAMBAR PERTAMA - 5 DUNIA / PULAU)
              ========================================================== */}
          {currentScreen === 'peta' && (
            <MapScreen
              playerProgress={playerProgress}
              onBackToHome={() => handleNavClick('beranda')}
              onSelectLevel={handleSelectLevelFromMap}
              onOpenProfile={() => setActiveModal('profil')}
              onOpenShop={() => setActiveModal('toko')}
              onOpenSettings={() => setActiveModal('pengaturan')}
              onOpenDailyMission={() => setActiveModal('misi')}
              showToast={showToast}
              onNavClick={handleNavClick}
            />
          )}

          {/* ==========================================================
              TAHAP B. DETAIL LEVEL (GAMBAR KEDUA - SCREEN 2)
              ========================================================== */}
          {currentScreen === 'detail-level' && (
            <LevelDetailScreen
              key={selectedLevelId}
              initialLevelId={selectedLevelId}
              playerProgress={playerProgress}
              onBack={() => setCurrentScreen('peta')}
              onStart={(level: LevelInfo) => {
                setSelectedLevelId(level.levelNumber)
                setPlayerLives(3)
                setCollectedCoins(level.coinsReward || 46)
                setLevelScore(0)
                setCorrectAnswers(0)
                showToast(`🚀 Memulai Level ${level.levelNumber}: ${level.title}!`)
                setCurrentScreen('eksplorasi')
              }}
              showToast={showToast}
            />
          )}

          {/* ==========================================================
              BERANDA (HOME SCREEN)
              ========================================================== */}
          {currentScreen === 'beranda' && (
            <div className="game-screen-wrapper">
              <img
                src={bgBeranda}
                alt="Petualangan Bangun Datar Beranda"
                className="art-background"
              />
              <ParticleCanvas />

              <div className="game-ui-layer">
                {/* Profile, Stars, Diamond, Settings */}
                <div
                  className="hotspot-pill profile-pill-hotspot"
                  onClick={() => setActiveModal('profil')}
                  title="Profil Siswa"
                >
                  <div className="hotspot-ring" />
                </div>
                <div
                  className="hotspot-pill star-pill-hotspot"
                  onClick={() => setActiveModal('toko')}
                  title="Bintang"
                >
                  <div className="hotspot-ring star-ring" />
                </div>
                <div
                  className="hotspot-pill diamond-pill-hotspot"
                  onClick={() => setActiveModal('toko')}
                  title="Berlian"
                >
                  <div className="hotspot-ring diamond-ring" />
                </div>
                <div
                  className="hotspot-pill settings-hotspot"
                  onClick={() => setActiveModal('pengaturan')}
                  title="Pengaturan"
                >
                  <div className="hotspot-ring" />
                </div>

                {/* Daily Mission */}
                <div
                  className="hotspot-pill mission-card-hotspot"
                  onClick={() => setActiveModal('misi')}
                  title="Misi Hari Ini"
                >
                  <div className="hotspot-ring mission-ring" />
                  <span className="mission-pulse-badge">1/3 Selesai</span>
                </div>

                {/* Big Mulai Petualangan Button (Directly opens Peta Level screen) */}
                <div
                  className="play-button-overlay"
                  onClick={() => {
                    sounds.playFanfare()
                    handleNavClick('peta')
                  }}
                  title="Mulai Petualangan Sekarang! (Buka Peta Level)"
                >
                  <div className="play-button-hotspot" />
                  <div className="shimmer-sweep" />
                </div>

                {/* Signpost */}
                <div
                  className="signpost-hotspot"
                  onClick={() => setActiveModal('ensiklopedia')}
                  title="Kenali Bangun Datar"
                >
                </div>

                {/* Mascot Tria */}
                <div
                  className={`character-hotspot ${isJumping ? 'jumping' : ''}`}
                  onClick={handleTriaClick}
                  title="Ketuk Tria si Segitiga!"
                >
                  <div className={`speech-bubble ${showSpeechBubble ? 'active' : ''}`}>
                    {triaQuote}
                  </div>
                </div>

                {/* Shapes in river */}
                <div
                  className="shapes-group-hotspot"
                  onClick={handleShapesClick}
                  title="Ketuk teman-teman bangun datar di sungai!"
                />

                {/* Bottom Navigation */}
                <nav className="bottom-nav-overlay">
                  <div
                    className="nav-hotspot-item active"
                    onClick={() => handleNavClick('beranda')}
                    title="Menu Beranda"
                  >
                    <div className="nav-active-pill" />
                  </div>
                  <div
                    className="nav-hotspot-item"
                    onClick={() => handleNavClick('peta')}
                    title="Peta Level"
                  />
                  <div
                    className="nav-hotspot-item"
                    onClick={() => handleNavClick('prestasi')}
                    title="Prestasi"
                  />
                  <div
                    className="nav-hotspot-item"
                    onClick={() => handleNavClick('materi')}
                    title="Materi"
                  />
                  <div
                    className="nav-hotspot-item"
                    onClick={() => handleNavClick('profil')}
                    title="Profil"
                  />
                </nav>
              </div>
            </div>
          )}

          {/* ==========================================================
              TAHAP 1: GAME PETUALANGAN (PLATFORMER + 3 NYAWA BINTANG + BENDERA)
              Setelah pemain mencapai bendera, sistem otomatis berpindah ke Tahap 2: Soal / Kuis.
              Jangan langsung menampilkan Hasil Level di sini!
              ========================================================== */}
          {currentScreen === 'eksplorasi' && (
            <ExplorationScreen
              key={selectedLevelId}
              levelNumber={selectedLevelId}
              onPause={() => showToast('⏸️ Permainan dijeda')}
              onBackToMap={() => {
                showToast('🗺️ Kembali ke Peta Petualangan')
                setCurrentScreen('peta')
              }}
              onCompleteExploration={(coins, _shapes, remainingLives) => {
                // Simpan sisa nyawa dan koin yang diperoleh dari eksplorasi
                setPlayerLives(remainingLives)
                setCollectedCoins(coins)
                showToast(
                  `🚩 Bendera Tercapai! Sisa: ${remainingLives} ⭐ nyawa. Otomatis lanjut ke Kuis Soal!`,
                  2400
                )
                // OTOMATIS BERPINDAH KE TAHAP 2: SOAL / KUIS
                setCurrentScreen('soal')
              }}
            />
          )}

          {/* ==========================================================
              TAHAP 2: SOAL / KUIS (SESUAI MATERI DUNIA / LEVEL)
              Pemain harus mengerjakan seluruh soal sebelum masuk ke Hasil Level.
              ========================================================== */}
          {currentScreen === 'soal' && (
            <QuizScreen
              key={selectedLevelId}
              levelNumber={selectedLevelId}
              onPause={() => showToast('⏸️ Kuis dijeda')}
              onFinishQuiz={(score, correct) => {
                // Simpan skor dan jumlah jawaban benar
                setLevelScore(score)
                setCorrectAnswers(correct)
                showToast('🎉 Seluruh Soal Selesai! Menampilkan Hasil Level...', 2000)
                // SETELAH SEMUA SOAL SELESAI, BARU MASUK KE TAHAP 3: HASIL LEVEL
                setCurrentScreen('hasil-level')
              }}
            />
          )}

          {/* ==========================================================
              TAHAP 3: HASIL LEVEL (VICTORY SCREEN + SKOR, KOIN, XP, JAWABAN, SISA NYAWA)
              Hanya ditampilkan setelah Tahap 1 dan Tahap 2 selesai.
              ========================================================== */}
          {currentScreen === 'hasil-level' && (
            <ResultScreen
              score={levelScore}
              coinsEarned={collectedCoins}
              xpEarned={100}
              correctCount={correctAnswers}
              totalQuestions={5}
              remainingLives={playerLives}
              onContinue={() => {
                const starsEarned = playerLives >= 3 ? 3 : playerLives >= 2 ? 2 : 1
                const updated = completeLevelAndAdvance(
                  selectedLevelId,
                  starsEarned,
                  levelScore,
                  collectedCoins,
                  100,
                  playerProgress
                )
                setPlayerProgress(updated)
                if (selectedLevelId >= 15) {
                  showToast(
                    `🏆 Selamat! Seluruh 15 Level Petualangan Telah Berhasil Diselesaikan!`,
                    4500
                  )
                } else {
                  showToast(
                    `🎉 Level ${selectedLevelId} Selesai! Level ${updated.unlockedLevel} Terbuka di Peta!`,
                    3600
                  )
                }
                setCurrentScreen('peta')
              }}
              onReplay={() => {
                sounds.playClick()
                setPlayerLives(3)
                showToast(`🔄 Mengulang Level ${selectedLevelId} dari Tahap Permainan Petualangan...`)
                setCurrentScreen('eksplorasi')
              }}
            />
          )}

          {/* Toast Notification */}
          <div className={`game-toast ${toastText ? 'show' : ''}`}>
            {toastText}
          </div>
        </div>
      </main>

      {/* Shared Modals */}
      <ModalPetualangan
        isOpen={activeModal === 'petualangan'}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
      />

      <ModalMisi
        isOpen={activeModal === 'misi'}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
        openOtherModal={(name) => {
          if (name === 'petualangan') {
            handleNavClick('peta')
          } else {
            setActiveModal(name)
          }
        }}
      />

      <ModalProfil
        isOpen={activeModal === 'profil'}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
      />

      <ModalToko
        isOpen={activeModal === 'toko'}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
      />

      <ModalEnsiklopedia
        isOpen={activeModal === 'ensiklopedia'}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
      />

      <ModalPengaturan
        isOpen={activeModal === 'pengaturan'}
        onClose={() => setActiveModal(null)}
        showToast={showToast}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Rule & Scoring Guide Modal */}
      <RuleGuideModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
      />
    </div>
  )
}

export default App
