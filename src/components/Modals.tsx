import { useState } from 'react'
import { sounds } from '../soundEngine'

// Asset imports
import avatarRizki from '../assets/avatar-rizki.png'
import iconStar from '../assets/icon-star-orig.png'
import iconDiamond from '../assets/icon-diamond-orig.png'
import iconMission from '../assets/icon-mission-orig.png'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  showToast: (text: string) => void
  openOtherModal?: (modalName: string) => void
}

// 1. Modal Petualangan
export function ModalPetualangan({ isOpen, onClose, showToast }: ModalProps) {
  if (!isOpen) return null

  const handleStart = () => {
    sounds.playFanfare()
    onClose()
    showToast('🚀 Memulai Level 3: Sisi & Sudut Segitiga!')
  }

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">🏰</span>
            <span className="modal-title">Lembah Segitiga - Bab 1</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
            Ayo berpetualang bersama <strong>Tria si Segitiga</strong>! Temukan rahasia bentuk dan kumpulkan semua bintang emas di bukit kastil.
          </p>

          <div className="quest-item" style={{ border: '2px solid #38bdf8', background: '#f0f9ff' }}>
            <div className="quest-badge">
              <img src={iconStar} alt="Star" style={{ width: 26, height: 26 }} />
            </div>
            <div className="quest-details">
              <div className="quest-name" style={{ color: '#0369a1' }}>
                Level 3: Sisi & Sudut Segitiga
              </div>
              <div className="quest-reward">Hadiah Level: +30 ⭐ & +5 💎</div>
            </div>
          </div>

          <button className="modal-primary-btn" onClick={handleStart}>
            ▶️ Mainkan Sekarang!
          </button>
        </div>
      </div>
    </div>
  )
}

// 2. Modal Misi Harian
export function ModalMisi({ isOpen, onClose, showToast, openOtherModal }: ModalProps) {
  const [claimed, setClaimed] = useState(false)
  if (!isOpen) return null

  const handleClaim = () => {
    sounds.playSuccess()
    setClaimed(true)
    showToast('🎉 Hadiah berhasil diklaim: +20 Bintang ⭐')
  }

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <img src={iconMission} alt="Mission" style={{ width: 24, height: 24, marginRight: 4 }} />
            <span className="modal-title">Misi Hari Ini</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Misi 1 */}
          <div className="quest-item">
            <div className="quest-badge">🎯</div>
            <div className="quest-details">
              <div className="quest-name">Selesaikan 3 level sempurna</div>
              <div className="quest-reward">Progress: 1/3 selesai</div>
            </div>
            <button
              className="quest-btn"
              style={{ background: '#0284c7' }}
              onClick={() => {
                onClose()
                openOtherModal?.('petualangan')
              }}
            >
              Lanjut
            </button>
          </div>

          {/* Misi 2 */}
          <div className="quest-item">
            <div className="quest-badge">
              <img src={iconStar} alt="Star" style={{ width: 24, height: 24 }} />
            </div>
            <div className="quest-details">
              <div className="quest-name">Kumpulkan 20 Bintang Emas</div>
              <div className="quest-reward">
                {claimed ? 'Sudah Diklaim ✓' : 'Status: Siap Diklaim! (+20 ⭐)'}
              </div>
            </div>
            <button
              className="quest-btn"
              style={{ background: claimed ? '#64748b' : '#3CD070' }}
              disabled={claimed}
              onClick={handleClaim}
            >
              {claimed ? 'Diklaim ✓' : 'Klaim'}
            </button>
          </div>

          {/* Misi 3 */}
          <div className="quest-item">
            <div className="quest-badge">📐</div>
            <div className="quest-details">
              <div className="quest-name">Kenali sifat-sifat Segitiga</div>
              <div className="quest-reward">Hadiah: +15 ⭐</div>
            </div>
            <button
              className="quest-btn"
              style={{ background: '#e2e8f0', color: '#475569' }}
              onClick={() => {
                onClose()
                openOtherModal?.('ensiklopedia')
              }}
            >
              Buka
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. Modal Profil Siswa
export function ModalProfil({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">🎓</span>
            <span className="modal-title">Kartu Pelajar Siswa</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: '#eff6ff',
              padding: 12,
              borderRadius: 16,
            }}
          >
            <img
              src={avatarRizki}
              alt="Avatar Rizki"
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                border: '3px solid #38bdf8',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              }}
            />
            <div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#1e3a8a' }}>Rizki</h4>
              <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                Siswa Kelas 3 SD • Petualang Cilik
              </p>
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: 12,
              borderRadius: 16,
              border: '1px solid #e2e8f0',
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
              <span>Level 3 (Penjelajah Segitiga)</span>
              <span>180 / 300 EXP (60%)</span>
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
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                  boxShadow: '0 0 6px #4ade80',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div
              style={{
                flex: 1,
                background: '#fef9c3',
                border: '1.5px solid #fde047',
                padding: 10,
                borderRadius: 16,
                textAlign: 'center',
              }}
            >
              <img src={iconStar} alt="Star" style={{ width: 24, height: 24 }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#854d0e' }}>120</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#a16207' }}>Bintang</div>
            </div>
            <div
              style={{
                flex: 1,
                background: '#e0f2fe',
                border: '1.5px solid #7dd3fc',
                padding: 10,
                borderRadius: 16,
                textAlign: 'center',
              }}
            >
              <img src={iconDiamond} alt="Diamond" style={{ width: 24, height: 24 }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0369a1' }}>45</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0284c7' }}>Berlian</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. Modal Toko Hadiah
export function ModalToko({ isOpen, onClose, showToast }: ModalProps) {
  const [crownBought, setCrownBought] = useState(false)
  const [bootsBought, setBootsBought] = useState(false)
  if (!isOpen) return null

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">🛍️</span>
            <span className="modal-title">Toko Bintang & Hadiah</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
            Tukarkan Bintang ⭐ dan Berlian 💎 hasil belajarmu dengan kostum & skin petualang baru!
          </p>

          <div className="quest-item">
            <div className="quest-badge">🎒</div>
            <div className="quest-details">
              <div className="quest-name">Ransel Petualang Biru</div>
              <div className="quest-reward">Harga: 50 ⭐ (Sedang Dipakai Tria)</div>
            </div>
            <button className="quest-btn" style={{ background: '#64748b' }} disabled>
              Dipakai
            </button>
          </div>

          <div className="quest-item">
            <div className="quest-badge">👑</div>
            <div className="quest-details">
              <div className="quest-name">Mahkota Emas Juara</div>
              <div className="quest-reward">Harga: 100 ⭐</div>
            </div>
            <button
              className="quest-btn"
              style={{ background: crownBought ? '#64748b' : '#3CD070' }}
              disabled={crownBought}
              onClick={() => {
                sounds.playCoin()
                setCrownBought(true)
                showToast('👑 Mahkota Emas berhasil dibeli!')
              }}
            >
              {crownBought ? 'Dimiliki ✓' : 'Beli'}
            </button>
          </div>

          <div className="quest-item">
            <div className="quest-badge">🥾</div>
            <div className="quest-details">
              <div className="quest-name">Sepatu Hiking Cepat</div>
              <div className="quest-reward">Harga: 30 💎</div>
            </div>
            <button
              className="quest-btn"
              style={{ background: bootsBought ? '#64748b' : '#3CD070' }}
              disabled={bootsBought}
              onClick={() => {
                sounds.playDiamond()
                setBootsBought(true)
                showToast('🥾 Sepatu Hiking Cepat berhasil dibeli!')
              }}
            >
              {bootsBought ? 'Dimiliki ✓' : 'Beli'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. Modal Ensiklopedia Bangun Datar
export function ModalEnsiklopedia({ isOpen, onClose, showToast }: ModalProps) {
  if (!isOpen) return null

  const handleShapeClick = (name: string, tip: string) => {
    sounds.playSuccess()
    showToast(`${name}: ${tip}`)
  }

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">📐</span>
            <span className="modal-title">Kenali Bangun Datar</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
            Ketuk kartu bangun datar untuk mempelajari sifat-sifatnya:
          </p>

          <div className="shape-card-grid">
            <div
              className="shape-card"
              onClick={() => handleShapeClick('🔺 Segitiga', '3 sisi & 3 sudut (total 180°)')}
            >
              <div className="shape-card-icon">🔺</div>
              <div className="shape-card-title">Segitiga</div>
              <div className="shape-card-desc">3 sisi & 3 sudut. Total sudut = 180°.</div>
            </div>

            <div
              className="shape-card"
              onClick={() => handleShapeClick('🟦 Persegi', '4 sisi sama panjang, 4 sudut 90°')}
            >
              <div className="shape-card-icon">🟦</div>
              <div className="shape-card-title">Persegi</div>
              <div className="shape-card-desc">4 sisi sama panjang, 4 sudut siku-siku 90°.</div>
            </div>

            <div
              className="shape-card"
              onClick={() => handleShapeClick('▭ Persegi Panjang', '2 pasang sisi sejajar sama panjang')}
            >
              <div className="shape-card-icon">▭</div>
              <div className="shape-card-title">Persegi Panjang</div>
              <div className="shape-card-desc">2 pasang sisi sejajar sama panjang.</div>
            </div>

            <div
              className="shape-card"
              onClick={() => handleShapeClick('🔴 Lingkaran', '1 sisi lengkung, simetri tak hingga')}
            >
              <div className="shape-card-icon">🔴</div>
              <div className="shape-card-title">Lingkaran</div>
              <div className="shape-card-desc">1 sisi lengkung, simetri tak berujung.</div>
            </div>
          </div>

          <button className="modal-primary-btn" onClick={onClose}>
            👍 Aku Sudah Paham!
          </button>
        </div>
      </div>
    </div>
  )
}

// 6. Modal Pengaturan
export function ModalPengaturan({
  isOpen,
  onClose,
  isMuted,
  onToggleSound,
}: ModalProps & { isMuted: boolean; onToggleSound: () => void }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">⚙️</span>
            <span className="modal-title">Pengaturan Game</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              background: '#f8fafc',
              borderRadius: 14,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
              🔊 Efek Suara (SFX)
            </span>
            <input
              type="checkbox"
              checked={!isMuted}
              onChange={onToggleSound}
              style={{ width: 20, height: 20, cursor: 'pointer' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              background: '#f8fafc',
              borderRadius: 14,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
              🎵 Musik Suasana
            </span>
            <input
              type="checkbox"
              defaultChecked
              style={{ width: 20, height: 20, cursor: 'pointer' }}
            />
          </div>

          <div
            style={{
              padding: 10,
              background: '#f1f5f9',
              borderRadius: 14,
              fontSize: 11,
              color: '#64748b',
              lineHeight: 1.4,
            }}
          >
            <strong>Petualangan Bangun Datar</strong>
            <br />
            Game Edukasi Matematika Interaktif Siswa SD.
            <br />
            Fokus: Menu Beranda (Home Screen) 100% Identik.
          </div>

          <button className="modal-primary-btn" onClick={onClose}>
            Simpan & Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
