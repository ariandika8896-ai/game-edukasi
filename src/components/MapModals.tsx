import { sounds } from '../soundEngine'
import iconChest from '../assets/icon-chest.png'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  showToast: (text: string) => void
}

export interface LevelData {
  number: number
  title: string
  world: string
  status: 'completed' | 'current' | 'locked'
  stars: number
  score?: number
  rewardStars?: number
  rewardDiamonds?: number
  description: string
}

// 1. Modal Detail Level
export function ModalLevelDetail({
  isOpen,
  onClose,
  showToast,
  level,
}: ModalProps & { level: LevelData | null }) {
  if (!isOpen || !level) return null

  const handleStart = () => {
    sounds.playFanfare()
    onClose()
    showToast(`🚀 Memulai Level ${level.number}: ${level.title}!`)
  }

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">{level.status === 'locked' ? '🔒' : '🗺️'}</span>
            <span className="modal-title">Level {level.number} • {level.world}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1e3a8a' }}>
              {level.title}
            </h3>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, fontWeight: 600 }}>
              {level.description}
            </p>

            {level.status === 'completed' && (
              <div style={{ margin: '12px 0' }}>
                <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
                <div style={{ fontSize: 12, color: '#059669', fontWeight: 800, marginTop: 4 }}>
                  Nilai Sempurna: {level.score ?? 100} / 100
                </div>
              </div>
            )}

            {level.status === 'current' && (
              <div style={{ margin: '12px 0' }}>
                <div style={{ fontSize: 22, color: '#94a3b8', letterSpacing: 4 }}>☆☆☆</div>
                <div style={{ fontSize: 12, color: '#0284c7', fontWeight: 800, marginTop: 4 }}>
                  Tantangan Terbuka! Target: 3 Bintang
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: '#d97706', fontWeight: 700 }}>
                    +{level.rewardStars ?? 30} ⭐ Bintang
                  </span>
                  <span style={{ fontSize: 11, color: '#0284c7', fontWeight: 700 }}>
                    +{level.rewardDiamonds ?? 5} 💎 Berlian
                  </span>
                </div>
              </div>
            )}

            {level.status === 'locked' && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 14,
                  padding: 12,
                  margin: '12px 0',
                }}
              >
                <div style={{ fontSize: 24 }}>🔒</div>
                <div style={{ fontSize: 12, color: '#dc2626', fontWeight: 700, marginTop: 4 }}>
                  Level Masih Terkunci
                </div>
                <p style={{ fontSize: 11, color: '#7f1d1d', marginTop: 2 }}>
                  Selesaikan level sebelumnya terlebih dahulu untuk membuka jalur ke level ini!
                </p>
              </div>
            )}
          </div>

          {level.status !== 'locked' ? (
            <button className="modal-primary-btn" onClick={handleStart}>
              {level.status === 'completed' ? '🔁 Mainkan Ulang' : '▶️ Mulai Main Sekarang!'}
            </button>
          ) : (
            <button
              className="modal-primary-btn"
              style={{ background: '#94a3b8', color: '#fff' }}
              onClick={onClose}
            >
              Mengerti
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// 2. Modal Informasi Dunia
export interface WorldData {
  number: number
  title: string
  subtitle: string
  themeColor: string
  levelsCount: number
  completedCount: number
  description: string
}

export function ModalWorldInfo({
  isOpen,
  onClose,
  world,
}: ModalProps & { world: WorldData | null }) {
  if (!isOpen || !world) return null

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-header"
          style={{
            background: `linear-gradient(135deg, ${world.themeColor} 0%, #0f172a 100%)`,
          }}
        >
          <div className="modal-title-wrap">
            <span className="modal-icon">🏝️</span>
            <span className="modal-title">
              Dunia {world.number}: {world.title}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div style={{ textAlign: 'center', padding: '6px 0' }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1e3a8a' }}>
              {world.subtitle}
            </h4>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>
              {world.description}
            </p>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                fontWeight: 700,
                color: '#334155',
                marginBottom: 6,
              }}
            >
              <span>Kemajuan Dunia</span>
              <span>
                {world.completedCount} / {world.levelsCount} Level
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 8,
                background: '#e2e8f0',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(world.completedCount / world.levelsCount) * 100}%`,
                  height: '100%',
                  background: world.themeColor,
                }}
              />
            </div>
          </div>

          <button className="modal-primary-btn" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

// 3. Modal Koleksi Bangun Datar
const COLLECTED_SHAPES = [
  { name: 'Segitiga Sama Sisi', icon: '🔺', unlocked: true, desc: '3 sisi sama panjang, 3 sudut 60°' },
  { name: 'Segitiga Siku-siku', icon: '📐', unlocked: true, desc: '1 sudut siku-siku 90° (Pythagoras)' },
  { name: 'Segitiga Sama Kaki', icon: '🔺', unlocked: true, desc: '2 sisi sama panjang & 2 sudut sama' },
  { name: 'Persegi', icon: '🟦', unlocked: true, desc: '4 sisi sama panjang, 4 sudut 90°' },
  { name: 'Persegi Panjang', icon: '▭', unlocked: true, desc: '2 pasang sisi sejajar & sama panjang' },
  { name: 'Lingkaran', icon: '🔴', unlocked: true, desc: '1 sisi lengkung, simetri tak hingga' },
  { name: 'Jajar Genjang', icon: '▱', unlocked: true, desc: 'Sisi berhadapan sejajar dan sama' },
  { name: 'Belah Ketupat', icon: '🔶', unlocked: true, desc: '4 sisi sama panjang, diagonal tegak lurus' },
  { name: 'Layang-layang', icon: '🪁', unlocked: false, desc: 'Buka di Hutan Segi Empat' },
  { name: 'Trapesium', icon: '⏢', unlocked: false, desc: 'Buka di Pegunungan Segitiga' },
  { name: 'Segi Lima', icon: '⬟', unlocked: false, desc: 'Buka di Danau Lingkaran' },
  { name: 'Segi Enam', icon: '⬡', unlocked: false, desc: 'Buka di Kastil Geometri' },
]

export function ModalKoleksiBentuk({ isOpen, onClose, showToast }: ModalProps) {
  if (!isOpen) return null

  const handleCardClick = (shape: typeof COLLECTED_SHAPES[0]) => {
    if (shape.unlocked) {
      sounds.playSuccess()
      showToast(`${shape.icon} ${shape.name}: ${shape.desc}`)
    } else {
      sounds.playBoing()
      showToast(`🔒 ${shape.name} masih terkunci! ${shape.desc}`)
    }
  }

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <img src={iconChest} alt="Chest" style={{ width: 24, height: 24, marginRight: 4 }} />
            <span className="modal-title">Koleksi Bentuk (8 / 24)</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body" style={{ maxHeight: 420 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#eff6ff',
              padding: '8px 12px',
              borderRadius: 14,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1e3a8a' }}>
              Album Koleksi Bangun Datar
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                background: '#0284c7',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              8 / 24 Terbuka
            </span>
          </div>

          <div className="shape-card-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {COLLECTED_SHAPES.map((shape, idx) => (
              <div
                key={idx}
                className="shape-card"
                style={{
                  opacity: shape.unlocked ? 1 : 0.65,
                  background: shape.unlocked ? '#f0f9ff' : '#f1f5f9',
                  borderColor: shape.unlocked ? '#bae6fd' : '#cbd5e1',
                }}
                onClick={() => handleCardClick(shape)}
              >
                <div className="shape-card-icon">{shape.unlocked ? shape.icon : '🔒'}</div>
                <div
                  className="shape-card-title"
                  style={{ color: shape.unlocked ? '#0369a1' : '#64748b' }}
                >
                  {shape.name}
                </div>
                <div className="shape-card-desc">{shape.desc}</div>
              </div>
            ))}
          </div>

          <button className="modal-primary-btn" onClick={onClose}>
            Tutup Album
          </button>
        </div>
      </div>
    </div>
  )
}
