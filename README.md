# Game Edukasi: Petualangan Bangun Datar 🎮

Proyek game edukasi matematika interaktif untuk siswa sekolah dasar berbasis **React + TypeScript + Vite**.

Aplikasi ini mencakup seluruh siklus alur gameplay (*game loop*) lengkap sesuai lembar spesifikasi:
1. **Menu Beranda (Home Screen)**
2. **Peta Petualangan 5 Dunia (World Map)**
3. **1. Peta Pulau Bentuk (Dunia 1 Map View)**
4. **2. Detail Level (Gerbang Pulau Bentuk - Briefing & Tujuan)**
5. **3. Eksplorasi & Kumpulkan (Mini-Game Platformer Fisika)**
6. **4. Soal / Tantangan (Kuis Bangun Datar 5 Soal Interaktif)**
7. **5. Hasil Level (Victory Screen - Skor, Bintang, Koin & XP)**

---

## 🎯 Detail Alur Gameplay (5 Layar Utama)

### 1. Peta Dunia (Pulau Bentuk)
- Menampilkan 6 node level di Pulau Bentuk (Level 1 selesai ⭐⭐⭐, Level 2 siap dimainkan, Level 3-6 terkunci 🔒).
- Maskot Tria si Segitiga berjalan di jalan setapak.
- Kartu **"Hadiah Dunia"** dengan progres koleksi bentuk `1/6`.

### 2. Detail Level (Gerbang Pulau Bentuk)
- Rincian tujuan: *"Mengenali persegi, segitiga, persegi panjang, dan lingkaran."*
- Target bintang ⭐⭐⭐.
- Badge meta: ⏱️ **3-5 menit** | 🎯 **3 tantangan**.
- Maskot Tria melambaikan tangan di jembatan kastil.
- Tombol emas besar **"Mulai"** untuk masuk ke tahap eksplorasi.

### 3. Eksplorasi & Kumpulkan (Platformer Interaktif)
- Kontrol karakter Tria dengan tombol virtual (`◀`, `▶`, `▲ Jump`) atau keyboard (`A`/`D`/`Space` atau Tombol Panah).
- Melompat di pulau-pulau melayang untuk mengumpulkan koin emas 🟡 (+10 poin) dan bangun datar (🔺 Segitiga, 🟦 Persegi, 🔴 Lingkaran).
- Penghitung bentuk dinamis: `3/5` -> `5/5`.
- Mencapai bendera finish 🚩 mengantarkan pemain ke tahap kuis soal!

### 4. Soal / Tantangan (5 Soal Kuis Interaktif)
- **Soal 1**: Identifikasi bentuk rumah (atap segitiga, jendela persegi).
- **Soal 2**: Menemukan benda berbentuk lingkaran (bola sepak, jam dinding).
- **Soal 3**: Menemukan benda berbentuk persegi panjang (meja, pintu, buku).
- **Soal 4**: Menghitung sisi segitiga (`3 sisi`).
- **Soal 5**: Menentukan bangun datar untuk jendela kayu (`persegi`).
- Setiap jawaban benar memberikan +100 poin & suara kemenangan; jawaban salah menampilkan penjelasan edukatif tanpa hukuman permanen.

### 5. Hasil Level (Victory Screen)
- Perayaan dengan confetti dan 3 Bintang Emas bercahaya ⭐⭐⭐.
- Banner merah: **"Level Selesai!"**
- Ringkasan statistik:
  - ⭐ **Skor Akhir: 460**
  - 🟡 **Koin: +46**
  - 🔮 **XP: +100**
  - 📝 **Jawaban: 5 benar / 5**
- Tombol **"Lanjutkan"** (membuka Level 2 di peta) dan **"🔄 Ulangi"** (mengulang eksplorasi).

---

## 📖 Ringkasan Rule & Scoring (Tersedia via Tombol "📖 Rule")
- **Soal per level**: 5 soal
- **Jawaban benar**: +100 poin
- **Jawaban salah**: 0 poin (ada penjelasan & coba lagi)
- **Bonus eksplorasi**: +10 poin / collectible
- **Bonus tanpa petunjuk**: +50 poin
- **Bintang**: 1 - 3 bintang berdasarkan skor akhir
- **XP**: +100 XP setelah level selesai
- **Koin**: Hadiah untuk aksesori karakter
- **Nyawa**: Tidak ada hukuman permanen (*respawn* di checkpoint)

---

## 🚀 Cara Menjalankan

Buka terminal pada folder `c:\Users\ari\Dev\pemrograman-mobile\game-edukasi`:

```bash
npm run dev
```

Buka URL lokal [**http://localhost:5173**](http://localhost:5173) di browser Anda. Gunakan dropdown di toolbar atas untuk berpindah cepat ke layar mana saja yang ingin diuji!
