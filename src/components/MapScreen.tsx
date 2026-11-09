import { useState, useRef } from 'react'
import bgPeta from '../assets/bg-peta.jpg'
import { ParticleCanvas } from './ParticleCanvas'
import {
  ModalWorldInfo,
  ModalKoleksiBentuk,
  type WorldData,
} from './MapModals'
import { ALL_LEVELS } from '../data/levelsData'
import { type PlayerProgress } from '../data/gameState'
import { sounds } from '../soundEngine'

interface MapScreenProps {
  playerProgress: PlayerProgress
  onBackToHome: () => void
  onSelectLevel: (levelNumber: number) => void
  onOpenProfile: () => void
  onOpenShop: () => void
  onOpenSettings: () => void
  onOpenDailyMission: () => void
  showToast: (text: string) => void
  onNavClick: (tab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil') => void
}

const WORLDS_DATA: Record<number, WorldData> = {
  1: {
    number: 1,
    title: 'Pulau Bentuk',
    subtitle: 'Mengenal bentuk dasar',
    themeColor: '#22c55e',
    levelsCount: 3,
    completedCount: 0,
    description: 'Pelajari dasar-dasar bentuk geometris seperti segitiga, lingkaran, dan persegi bersama Tria!',
  },
  2: {
    number: 2,
    title: 'Hutan Segi Empat',
    subtitle: 'Sisi, sudut dan jenis-jenisnya',
    themeColor: '#a855f7',
    levelsCount: 3,
    completedCount: 0,
    description: 'Jelajahi hutan misterius penuh dengan jajar genjang, belah ketupat, trapesium, dan persegi panjang.',
  },
  3: {
    number: 3,
    title: 'Pegunungan Segitiga',
    subtitle: 'Jenis segitiga dan sudut',
    themeColor: '#0284c7',
    levelsCount: 3,
    completedCount: 0,
    description: 'Mendaki puncak bersalju untuk menyelidiki segitiga sama sisi, sama kaki, dan siku-siku.',
  },
  4: {
    number: 4,
    title: 'Danau Lingkaran',
    subtitle: 'Jari-jari, diameter dan luas',
    themeColor: '#f59e0b',
    levelsCount: 3,
    completedCount: 0,
    description: 'Mengukur garis jari-jari (r) dan diameter (d) pada danau melingkar yang indah.',
  },
  5: {
    number: 5,
    title: 'Kastil Geometri',
    subtitle: 'Gabungan bentuk dan luas',
    themeColor: '#ef4444',
    levelsCount: 3,
    completedCount: 0,
    description: 'Pertempuran puncak di kastil utama! Menggabungkan berbagai bangun datar dan memecahkan teka-teki.',
  },
}

// Coordinate mappings for EXACTLY 15 levels: 5 islands x 3 levels each
const LEVEL_COORDINATES: Record<number, { left: string; top: string; world: number }> = {
  // Pulau 1: Pulau Bentuk (Level 1, 2, 3)
  1: { left: '15.5%', top: '27.2%', world: 1 },
  2: { left: '30%', top: '27.2%', world: 1 },
  3: { left: '41.8%', top: '28%', world: 1 },

  // Pulau 2: Hutan Segi Empat (Level 4, 5, 6)
  4: { left: '66%', top: '34.2%', world: 2 },
  5: { left: '74.5%', top: '36%', world: 2 },
  6: { left: '84.5%', top: '36.5%', world: 2 },

  // Pulau 3: Pegunungan Segitiga (Level 7, 8, 9)
  7: { left: '17.8%', top: '53.2%', world: 3 },
  8: { left: '29.8%', top: '53.2%', world: 3 },
  9: { left: '42%', top: '54.2%', world: 3 },

  // Pulau 4: Danau Lingkaran (Level 10, 11, 12)
  10: { left: '67.2%', top: '61.5%', world: 4 },
  11: { left: '77.8%', top: '62.8%', world: 4 },
  12: { left: '88.8%', top: '61.8%', world: 4 },

  // Pulau 5: Kastil Geometri (Level 13, 14, 15)
  13: { left: '41%', top: '79.6%', world: 5 },
  14: { left: '50.2%', top: '79.9%', world: 5 },
  15: { left: '59.8%', top: '79.6%', world: 5 },
}

// Decorative terrain patches to cleanly blend out the extra bottom-row AI nodes from the original artwork
const UNUSED_SPOTS: { left: string; top: string; type: 'forest' | 'mountain' | 'lake' | 'castle' }[] = [
  // Pulau 2 (Hutan Segi Empat)
  { left: '62.2%', top: '39.2%', type: 'forest' },
  { left: '75.5%', top: '40.6%', type: 'forest' },
  { left: '88.5%', top: '40.6%', type: 'forest' },

  // Pulau 3 (Pegunungan Segitiga)
  { left: '19.2%', top: '58.8%', type: 'mountain' },
  { left: '29.2%', top: '58.8%', type: 'mountain' },
  { left: '39.5%', top: '58.8%', type: 'mountain' },

  // Pulau 4 (Danau Lingkaran)
  { left: '70.2%', top: '65.8%', type: 'lake' },
  { left: '80.8%', top: '66.2%', type: 'lake' },
  { left: '90.8%', top: '65.2%', type: 'lake' },

  // Pulau 5 (Kastil Geometri)
  { left: '42%', top: '84.4%', type: 'castle' },
  { left: '51.2%', top: '84.6%', type: 'castle' },
  { left: '60.8%', top: '84.4%', type: 'castle' },
]

export function MapScreen({
  playerProgress,
  onBackToHome,
  onSelectLevel,
  onOpenProfile,
  onOpenShop,
  onOpenSettings,
  onOpenDailyMission,
  showToast,
  onNavClick,
}: MapScreenProps) {
  const [selectedWorld, setSelectedWorld] = useState<WorldData | null>(null)
  const [isChestOpen, setIsChestOpen] = useState(false)
  const [triaQuote, setTriaQuote] = useState('Ayo Rizki! Kita mulai petualangan di Pulau Bentuk!')
  const [showTriaSpeech, setShowTriaSpeech] = useState(false)
  const [isTriaJumping, setIsTriaJumping] = useState(false)

  const speechTimerRef = useRef<number | null>(null)

  const handleLevelClick = (levelNumber: number) => {
    sounds.playClick()
    const isUnlocked =
      levelNumber <= playerProgress.unlockedLevel ||
      Boolean(playerProgress.completedLevels[levelNumber])

    if (isUnlocked) {
      onSelectLevel(levelNumber)
    } else {
      sounds.playBoing()
      showToast(`🔒 Level ${levelNumber} masih terkunci! Selesaikan Level ${levelNumber - 1} terlebih dahulu.`)
    }
  }

  const handleWorldClick = (worldNumber: number) => {
    sounds.playClick()
    const world = WORLDS_DATA[worldNumber]
    if (world) {
      const startLvl = (worldNumber - 1) * 3 + 1
      let count = 0
      for (let i = startLvl; i < startLvl + 3; i++) {
        if (playerProgress.completedLevels[i]) count++
      }
      setSelectedWorld({
        ...world,
        completedCount: count,
      })
    }
  }

  const handleTriaMapClick = () => {
    sounds.playChirp()
    setIsTriaJumping(true)
    setTimeout(() => setIsTriaJumping(false), 260)

    const cur = Math.min(15, playerProgress.unlockedLevel)
    const quotes = [
      `Ayo Rizki! Kita lanjutkan Level ${cur}!`,
      'Lihat Hutan Segi Empat di sebelah sana, penuh misteri!',
      'Pegunungan Segitiga memiliki tantangan sudut yang seru!',
      'Kastil Geometri di bawah adalah tujuan akhir kita!',
      'Jangan lupa buka Koleksi Bentuk di peti harta karun!',
    ]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setTriaQuote(randomQuote)
    setShowTriaSpeech(true)

    if (speechTimerRef.current) clearTimeout(speechTimerRef.current)
    speechTimerRef.current = window.setTimeout(() => {
      setShowTriaSpeech(false)
    }, 3800)
  }

  const renderLevelNode = (lvlNum: number) => {
    const coords = LEVEL_COORDINATES[lvlNum]
    if (!coords) return null

    const levelData = ALL_LEVELS.find((l) => l.levelNumber === lvlNum)
    const titleStr = levelData?.title || `Level ${lvlNum}`
    const isCompleted = Boolean(playerProgress.completedLevels[lvlNum])
    const isCurrent = lvlNum === playerProgress.unlockedLevel
    const isLocked = lvlNum > playerProgress.unlockedLevel && !isCompleted
    const starsEarned = playerProgress.completedLevels[lvlNum]?.stars || 0

    let nodeClass = 'level-node-hotspot'
    if (isCompleted) nodeClass += ' node-active-gold'
    else if (isCurrent) nodeClass += ' node-active-current'
    else if (isLocked) nodeClass += ' node-locked'

    return (
      <div
        key={lvlNum}
        className={nodeClass}
        style={{ left: coords.left, top: coords.top }}
        onClick={(e) => {
          e.stopPropagation()
          handleLevelClick(lvlNum)
        }}
        title={`Level ${lvlNum}: ${titleStr} ${
          isCompleted
            ? `(Selesai ⭐${starsEarned}/3)`
            : isCurrent
            ? '(Level Aktif - Klik untuk Mulai!)'
            : '(Terkunci 🔒)'
        }`}
      >
        {/* Solid Circular Button Disc (Covers background number cleanly) */}
        <div className={`node-button-disc ${isCompleted ? 'disc-gold' : isCurrent ? 'disc-active' : 'disc-locked'}`}>
          {isLocked ? (
            <span className="node-lock-icon">🔒</span>
          ) : (
            <span className="node-level-num">{lvlNum}</span>
          )}
        </div>

        {/* Outer Glow Ring Effects */}
        {isCompleted && (
          <div className="level-glow-ring gold" />
        )}
        {isCurrent && (
          <div className="level-glow-ring blue pulse">
            <span className="node-active-arrow">▼</span>
          </div>
        )}
        {isLocked && (
          <div className="level-glow-ring locked" />
        )}

        {/* 3-Star Rating Display ONLY and ALWAYS underneath the button */}
        <div className={`node-stars-badge ${isCompleted ? 'has-stars' : 'empty-stars'}`}>
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= starsEarned
            return (
              <span
                key={starIdx}
                className={`node-star-item ${isEarned ? 'earned' : 'empty'}`}
                title={isEarned ? 'Bintang Diperoleh' : 'Belum Diperoleh'}
              >
                ★
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="game-screen-wrapper">
      {/* 100% Authentic Map Art Background */}
      <img src={bgPeta} alt="Peta Petualangan Bangun Datar" className="art-background" />

      {/* Ambient Sparkles */}
      <ParticleCanvas />

      {/* Clean foliage cover to remove stars painted on bg-peta.jpg above Level 1 and 2 */}
      <div className="island1-stars-cover" title="Hutan Pulau Bentuk" />

      {/* Decorative terrain patches covering the extra unused spots on Islands 2 - 5 */}
      {UNUSED_SPOTS.map((spot, idx) => (
        <div
          key={`unused-${idx}`}
          className={`unused-node-patch patch-${spot.type}`}
          style={{ left: spot.left, top: spot.top }}
        />
      ))}

      {/* Map Interactive Hotspots Layer */}
      <div className="game-ui-layer">
        {/* Back Button (<) at Top Left -> returns to Beranda */}
        <div
          className="map-back-btn"
          onClick={() => {
            sounds.playClick()
            onBackToHome()
          }}
          title="Kembali ke Beranda"
        >
          <div className="hotspot-ring" />
        </div>

        {/* Top Bar Hotspots */}
        <div className="hotspot-pill profile-pill-hotspot" onClick={onOpenProfile} title="Profil Siswa" />
        <div className="hotspot-pill star-pill-hotspot" onClick={onOpenShop} title="Bintang Emas" />
        <div className="hotspot-pill diamond-pill-hotspot" onClick={onOpenShop} title="Berlian" />
        <div className="hotspot-pill settings-hotspot" onClick={onOpenSettings} title="Pengaturan" />
        <div className="hotspot-pill mission-card-hotspot" onClick={onOpenDailyMission} title="Misi Hari Ini" />

        {/* Title Banner ("Peta Petualangan") */}
        <div
          className="map-title-banner-hotspot"
          onClick={() => {
            sounds.playFanfare()
            showToast('🗺️ Peta Petualangan: Jelajahi 5 Dunia Bangun Datar!')
          }}
          title="Peta Petualangan"
        />

        {/* ================================================================
            WORLD BANNERS (1 - 5)
            ================================================================ */}
        <div
          className="world-banner-hotspot world-1-banner"
          onClick={() => handleWorldClick(1)}
          title="Dunia 1: Pulau Bentuk (Level 1 - 3)"
        />
        <div
          className="world-banner-hotspot world-2-banner"
          onClick={() => handleWorldClick(2)}
          title="Dunia 2: Hutan Segi Empat (Level 4 - 6)"
        />
        <div
          className="world-banner-hotspot world-3-banner"
          onClick={() => handleWorldClick(3)}
          title="Dunia 3: Pegunungan Segitiga (Level 7 - 9)"
        />
        <div
          className="world-banner-hotspot world-4-banner"
          onClick={() => handleWorldClick(4)}
          title="Dunia 4: Danau Lingkaran (Level 10 - 12)"
        />
        <div
          className="world-banner-hotspot world-5-banner"
          onClick={() => handleWorldClick(5)}
          title="Dunia 5: Kastil Geometri (Level 13 - 15)"
        />

        {/* ================================================================
            EXACTLY 15 LEVEL NODES (5 WORLDS x 3 LEVELS EACH)
            ================================================================ */}
        {Object.keys(LEVEL_COORDINATES).map((lvlStr) => renderLevelNode(Number(lvlStr)))}

        {/* Mascot Tria on Island 1 */}
        <div
          className={`tria-map-hotspot ${isTriaJumping ? 'jumping' : ''}`}
          onClick={handleTriaMapClick}
          title="Ketuk Tria si Segitiga!"
        >
          <div className={`speech-bubble ${showTriaSpeech ? 'active' : ''}`} style={{ bottom: '90%', left: '40%' }}>
            {triaQuote}
          </div>
        </div>

        {/* Airship Easter Egg */}
        <div
          className="airship-hotspot"
          onClick={() => {
            sounds.playChirp()
            showToast('🎈 Kapal Udara Petualang melintasi langit!')
          }}
          title="Kapal Udara"
        />

        {/* Koleksi Bentuk (Bottom-Left Treasure Chest Card) */}
        <div
          className="koleksi-bentuk-hotspot"
          onClick={() => {
            sounds.playSuccess()
            setIsChestOpen(true)
          }}
          title={`Koleksi Bentuk (${playerProgress.collectedShapesCount}/24 Terbuka)`}
        >
          <div className="koleksi-ring" />
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="bottom-nav-overlay">
          <div
            className="nav-hotspot-item"
            onClick={() => onNavClick('beranda')}
            title="Menu Beranda"
          />

          <div
            className="nav-hotspot-item active"
            onClick={() => onNavClick('peta')}
            title="Menu Peta (Aktif)"
          >
            <div className="nav-active-pill" />
          </div>

          <div
            className="nav-hotspot-item"
            onClick={() => onNavClick('prestasi')}
            title="Prestasi & Trofi"
          />

          <div
            className="nav-hotspot-item"
            onClick={() => onNavClick('materi')}
            title="Materi Belajar"
          />

          <div
            className="nav-hotspot-item"
            onClick={() => onNavClick('profil')}
            title="Profil Siswa"
          />
        </nav>
      </div>

      {/* Map Modals */}
      <ModalWorldInfo
        isOpen={Boolean(selectedWorld)}
        onClose={() => setSelectedWorld(null)}
        showToast={showToast}
        world={selectedWorld}
      />

      <ModalKoleksiBentuk
        isOpen={isChestOpen}
        onClose={() => setIsChestOpen(false)}
        showToast={showToast}
      />
    </div>
  )
}
