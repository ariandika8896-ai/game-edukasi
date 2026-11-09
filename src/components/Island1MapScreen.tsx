import bgPeta from '../assets/bg-peta.jpg'
import { ParticleCanvas } from './ParticleCanvas'
import { sounds } from '../soundEngine'

interface Island1MapScreenProps {
  onBackToMap: () => void
  onSelectLevel: (levelNum: number) => void
  onOpenProfile: () => void
  onOpenShop: () => void
  onOpenSettings: () => void
  onOpenDailyMission: () => void
  showToast: (text: string) => void
  onNavClick: (tab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil') => void
}

export function Island1MapScreen({
  onBackToMap,
  onSelectLevel,
  onOpenProfile,
  onOpenShop,
  onOpenSettings,
  onOpenDailyMission,
  showToast,
  onNavClick,
}: Island1MapScreenProps) {
  return (
    <div className="game-screen-wrapper">
      {/* Background artwork */}
      <img src={bgPeta} alt="Pulau Bentuk" className="art-background" />

      {/* Ambient Sparkles */}
      <ParticleCanvas />

      {/* Screen 1 UI Overlay */}
      <div className="game-ui-layer">
        {/* Back Button (<) */}
        <div
          className="map-back-btn"
          onClick={() => {
            sounds.playClick()
            onBackToMap()
          }}
          title="Kembali ke Peta Dunia"
        >
          <div className="hotspot-ring" />
        </div>

        {/* Top Bar Hotspots */}
        <div className="hotspot-pill profile-pill-hotspot" onClick={onOpenProfile} title="Profil Siswa" />
        <div className="hotspot-pill star-pill-hotspot" onClick={onOpenShop} title="Bintang Emas" />
        <div className="hotspot-pill diamond-pill-hotspot" onClick={onOpenShop} title="Berlian" />
        <div className="hotspot-pill settings-hotspot" onClick={onOpenSettings} title="Pengaturan" />
        <div className="hotspot-pill mission-card-hotspot" onClick={onOpenDailyMission} title="Misi Hari Ini" />

        {/* Wooden Banner: Pulau Bentuk */}
        <div
          className="world-banner-hotspot world-1-banner"
          style={{ transform: 'scale(1.08)' }}
          onClick={() => {
            sounds.playSuccess()
            showToast('🏝️ Dunia 1: Pulau Bentuk - Mengenali bentuk dasar')
          }}
          title="Pulau Bentuk"
        />

        {/* Level 1 Node (Completed ⭐⭐⭐) */}
        <div
          className="level-node-hotspot node-active-gold"
          style={{ left: '11%', top: '25.5%' }}
          onClick={() => {
            sounds.playClick()
            onSelectLevel(1)
          }}
          title="Level 1: Gerbang Pulau Bentuk (Selesai ⭐⭐⭐)"
        >
          <div className="level-glow-ring gold" />
        </div>

        {/* Level 2 Node (Current Active) */}
        <div
          className="level-node-hotspot node-active-current"
          style={{ left: '25.5%', top: '25.5%' }}
          onClick={() => {
            sounds.playClick()
            onSelectLevel(2)
          }}
          title="Level 2: Mengenal Segitiga & Sudut (Siap Dimainkan)"
        >
          <div className="level-glow-ring blue pulse" />
        </div>

        {/* Level 3 Node (Locked) */}
        <div
          className="level-node-hotspot node-locked"
          style={{ left: '37.5%', top: '26.2%' }}
          onClick={() => {
            sounds.playBoing()
            showToast('🔒 Level 3 masih terkunci! Selesaikan Level 2 terlebih dahulu.')
          }}
          title="Level 3: Ujian Segitiga (Terkunci 🔒)"
        />

        {/* Level 4 Node (Locked) */}
        <div
          className="level-node-hotspot node-locked"
          style={{ left: '12%', top: '34%' }}
          onClick={() => {
            sounds.playBoing()
            showToast('🔒 Level 4 masih terkunci!')
          }}
          title="Level 4 (Terkunci 🔒)"
        />

        {/* Level 5 Node (Locked) */}
        <div
          className="level-node-hotspot node-locked"
          style={{ left: '24%', top: '35%' }}
          onClick={() => {
            sounds.playBoing()
            showToast('🔒 Level 5 masih terkunci!')
          }}
          title="Level 5 (Terkunci 🔒)"
        />

        {/* Level 6 Node (Locked) */}
        <div
          className="level-node-hotspot node-locked"
          style={{ left: '36%', top: '34.5%' }}
          onClick={() => {
            sounds.playBoing()
            showToast('🔒 Level 6 masih terkunci!')
          }}
          title="Level 6 (Terkunci 🔒)"
        />

        {/* Bottom Card: "Hadiah Dunia" (Progress 1/6) */}
        <div className="hadiah-dunia-card" onClick={() => showToast('🎁 Kumpulkan semua bentuk di Pulau Bentuk untuk hadiah spesial!')}>
          <div className="hadiah-dunia-header">
            <span className="hadiah-dunia-title">Hadiah Dunia</span>
            <span className="hadiah-dunia-count">1/6</span>
          </div>
          <div className="hadiah-dunia-shapes">
            <span className="shape-mini-badge unlocked" title="Segitiga Terbuka">🔺</span>
            <span className="shape-mini-badge locked" title="Persegi Terkunci">🟦</span>
            <span className="shape-mini-badge locked" title="Lingkaran Terkunci">🔴</span>
            <div className="hadiah-bar-wrap">
              <div className="hadiah-bar-fill" style={{ width: '16.6%' }} />
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="bottom-nav-overlay">
          <div className="nav-hotspot-item" onClick={() => onNavClick('beranda')} title="Menu Beranda" />
          <div className="nav-hotspot-item active" onClick={() => onNavClick('peta')} title="Menu Peta (Aktif)">
            <div className="nav-active-pill" />
          </div>
          <div className="nav-hotspot-item" onClick={() => onNavClick('prestasi')} title="Prestasi" />
          <div className="nav-hotspot-item" onClick={() => onNavClick('materi')} title="Materi" />
          <div className="nav-hotspot-item" onClick={() => onNavClick('profil')} title="Profil" />
        </nav>
      </div>
    </div>
  )
}
