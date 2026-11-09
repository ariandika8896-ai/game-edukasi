interface RuleGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RuleGuideModal({ isOpen, onClose }: RuleGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="game-modal-card rule-guide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">📖</span>
            <span className="modal-title">Panduan Rule & Contoh Soal</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: 440 }}>
          {/* Ringkasan Rule & Scoring */}
          <div className="guide-section">
            <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0369a1', marginBottom: 8 }}>
              🎯 Ringkasan Rule & Scoring
            </h4>
            <div className="rule-table">
              <div className="rule-row">
                <span>📝 Soal per level</span>
                <strong>5 soal</strong>
              </div>
              <div className="rule-row">
                <span>✅ Jawaban benar</span>
                <strong style={{ color: '#16a34a' }}>+100 poin</strong>
              </div>
              <div className="rule-row">
                <span>❌ Jawaban salah</span>
                <strong style={{ color: '#dc2626' }}>0 poin (ada penjelasan & coba lagi)</strong>
              </div>
              <div className="rule-row">
                <span>🔺 Bonus eksplorasi</span>
                <strong style={{ color: '#0284c7' }}>+10 poin / collectible</strong>
              </div>
              <div className="rule-row">
                <span>⭐ Bonus tanpa petunjuk</span>
                <strong style={{ color: '#d97706' }}>+50 poin</strong>
              </div>
              <div className="rule-row">
                <span>⭐ Bintang</span>
                <strong>1 - 3 bintang (berdasarkan skor akhir)</strong>
              </div>
              <div className="rule-row">
                <span>🔮 XP</span>
                <strong style={{ color: '#7c3aed' }}>+100 XP setelah level selesai</strong>
              </div>
              <div className="rule-row">
                <span>🟡 Koin</span>
                <strong>Hadiah untuk aksesori karakter</strong>
              </div>
              <div className="rule-row">
                <span>❤️ Nyawa</span>
                <strong>Tidak ada hukuman permanen (respawn)</strong>
              </div>
            </div>
          </div>

          {/* Contoh Soal di Pulau Bentuk */}
          <div className="guide-section" style={{ marginTop: 12 }}>
            <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0369a1', marginBottom: 8 }}>
              💡 4 Tipe Soal di Pulau Bentuk
            </h4>
            <div className="rule-types-grid">
              <div className="rule-type-card">
                <strong>1. Identifikasi bentuk</strong>
                <p>Menebak nama bangun datar dari benda sehari-hari (misal: bola ⚽ = lingkaran).</p>
              </div>
              <div className="rule-type-card">
                <strong>2. Klasifikasi bentuk</strong>
                <p>Memilih semua benda yang memiliki bentuk sama (misal: meja, pintu, buku = persegi panjang).</p>
              </div>
              <div className="rule-type-card">
                <strong>3. Ciri-ciri bentuk</strong>
                <p>Menghitung jumlah sisi, sudut, dan simetri pada segitiga atau persegi.</p>
              </div>
              <div className="rule-type-card">
                <strong>4. Penerapan dalam kehidupan</strong>
                <p>Menentukan bentuk geometri yang tepat untuk jendela atau atap rumah.</p>
              </div>
            </div>
          </div>

          <button className="modal-primary-btn" onClick={onClose} style={{ marginTop: 10 }}>
            Tutup Panduan 👍
          </button>
        </div>
      </div>
    </div>
  )
}
