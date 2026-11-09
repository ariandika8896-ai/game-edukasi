export interface QuizQuestion {
  id: number
  prompt: string
  illustrationType:
    | 'house'
    | 'circle_items'
    | 'rectangle_items'
    | 'triangle'
    | 'window'
    | 'quadrilateral'
    | 'circle_radius'
    | 'castle_tower'
    | 'l2_square_vertices'
    | 'l2_rectangle_sides'
    | 'l2_no_vertex_shapes'
    | 'l2_triangle_properties'
    | 'l2_quadrilateral_definition'
    | 'l3_wall_clock'
    | 'l3_house_roof'
    | 'l3_ceramic_tile'
    | 'l3_door_rectangle'
    | 'l3_bicycle_wheel'
  options: {
    id: string
    label: string
    icon?: string
    isCorrect: boolean
  }[]
  explanation: string
}

export const WORLD_QUIZZES: Record<number, QuizQuestion[]> = {
  // ================= DUNIA 1: PULAU BENTUK =================
  1: [
    {
      id: 1,
      prompt: 'Benda di bawah ini (atap rumah) berbentuk apa?',
      illustrationType: 'house',
      options: [
        { id: 'a', label: 'Segitiga', icon: '🔺', isCorrect: true },
        { id: 'b', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'c', label: 'Persegi Panjang', icon: '🟩', isCorrect: false },
        { id: 'd', label: 'Lingkaran', icon: '🔴', isCorrect: false },
      ],
      explanation: 'Atap rumah memiliki 3 sisi dan 3 sudut lancip, jadi berbentuk Segitiga!',
    },
    {
      id: 2,
      prompt: 'Manakah benda yang berbentuk lingkaran?',
      illustrationType: 'circle_items',
      options: [
        { id: 'a', label: 'Bola Sepak', icon: '⚽', isCorrect: true },
        { id: 'b', label: 'Tenda Kemah', icon: '⛺', isCorrect: false },
        { id: 'c', label: 'Buku Cerita', icon: '📘', isCorrect: false },
        { id: 'd', label: 'Papan Tulis', icon: '📋', isCorrect: false },
      ],
      explanation: 'Bola sepak berbentuk lingkaran (bundar) dan tidak memiliki titik sudut!',
    },
    {
      id: 3,
      prompt: 'Pilih benda yang berbentuk persegi panjang!',
      illustrationType: 'rectangle_items',
      options: [
        { id: 'a', label: 'Pintu', icon: '🚪', isCorrect: true },
        { id: 'b', label: 'Potongan Keju', icon: '🧀', isCorrect: false },
        { id: 'c', label: 'Roda Sepeda', icon: '🚲', isCorrect: false },
        { id: 'd', label: 'Piramida Pasir', icon: '🔺', isCorrect: false },
      ],
      explanation: 'Pintu memiliki 2 pasang sisi sejajar yang sama panjang (persegi panjang)!',
    },
    {
      id: 4,
      prompt: 'Berapa banyak sisi yang dimiliki oleh segitiga?',
      illustrationType: 'triangle',
      options: [
        { id: 'a', label: '3 Sisi', icon: '3️⃣', isCorrect: true },
        { id: 'b', label: '4 Sisi', icon: '4️⃣', isCorrect: false },
        { id: 'c', label: '5 Sisi', icon: '5️⃣', isCorrect: false },
        { id: 'd', label: '6 Sisi', icon: '6️⃣', isCorrect: false },
      ],
      explanation: 'Sesuai namanya, Segitiga selalu memiliki 3 sisi dan 3 titik sudut!',
    },
    {
      id: 5,
      prompt: 'Bentuk bangun datar apa yang tepat untuk jendela ini?',
      illustrationType: 'window',
      options: [
        { id: 'a', label: 'Lingkaran', icon: '⭕', isCorrect: false },
        { id: 'b', label: 'Persegi', icon: '🟩', isCorrect: true },
        { id: 'c', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'd', label: 'Persegi Panjang', icon: '▭', isCorrect: false },
      ],
      explanation: 'Jendela ini memiliki 4 sisi sama panjang dan 4 sudut siku-siku 90°, jadi berbentuk Persegi!',
    },
  ],

  // ================= DUNIA 2: HUTAN SEGI EMPAT =================
  2: [
    {
      id: 6,
      prompt: 'Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku adalah...',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: 'Persegi', icon: '🟦', isCorrect: true },
        { id: 'b', label: 'Jajar Genjang', icon: '▱', isCorrect: false },
        { id: 'c', label: 'Trapesium', icon: '⏢', isCorrect: false },
        { id: 'd', label: 'Segitiga', icon: '🔺', isCorrect: false },
      ],
      explanation: 'Persegi memiliki 4 sisi yang semuanya sama panjang dan 4 sudut siku-siku (90°)!',
    },
    {
      id: 7,
      prompt: 'Berapa banyak sudut yang dimiliki oleh bangun jajar genjang?',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: '4 Sudut', icon: '4️⃣', isCorrect: true },
        { id: 'b', label: '3 Sudut', icon: '3️⃣', isCorrect: false },
        { id: 'c', label: '5 Sudut', icon: '5️⃣', isCorrect: false },
        { id: 'd', label: '6 Sudut', icon: '6️⃣', isCorrect: false },
      ],
      explanation: 'Jajar genjang adalah bangun segi empat, sehingga memiliki 4 sudut dan 4 sisi!',
    },
    {
      id: 8,
      prompt: 'Bangun datar segi empat yang memiliki tepat sepasang sisi sejajar adalah...',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: 'Trapesium', icon: '⏢', isCorrect: true },
        { id: 'b', label: 'Persegi Panjang', icon: '▭', isCorrect: false },
        { id: 'c', label: 'Belah Ketupat', icon: '💠', isCorrect: false },
        { id: 'd', label: 'Lingkaran', icon: '⚪', isCorrect: false },
      ],
      explanation: 'Trapesium memiliki tepat 1 pasang sisi sejajar (sisi atas dan sisi alas)!',
    },
    {
      id: 9,
      prompt: 'Belah ketupat memiliki berapa banyak sisi yang sama panjang?',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: '4 Sisi', icon: '4️⃣', isCorrect: true },
        { id: 'b', label: '2 Sisi', icon: '2️⃣', isCorrect: false },
        { id: 'c', label: '3 Sisi', icon: '3️⃣', isCorrect: false },
        { id: 'd', label: '5 Sisi', icon: '5️⃣', isCorrect: false },
      ],
      explanation: 'Semua 4 sisi pada belah ketupat sama panjang!',
    },
    {
      id: 10,
      prompt: 'Layang-layang memiliki berapa pasang sisi yang sama panjang?',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: '2 Pasang', icon: '🪁', isCorrect: true },
        { id: 'b', label: '1 Pasang', icon: '1️⃣', isCorrect: false },
        { id: 'c', label: '3 Pasang', icon: '3️⃣', isCorrect: false },
        { id: 'd', label: '4 Pasang', icon: '4️⃣', isCorrect: false },
      ],
      explanation: 'Layang-layang memiliki 2 pasang sisi yang berdekatan sama panjang!',
    },
  ],

  // ================= DUNIA 3: PEGUNUNGAN SEGITIGA =================
  3: [
    {
      id: 11,
      prompt: 'Segitiga yang ketiga sisinya sama panjang disebut...',
      illustrationType: 'triangle',
      options: [
        { id: 'a', label: 'Segitiga Sama Sisi', icon: '📐', isCorrect: true },
        { id: 'b', label: 'Segitiga Sama Kaki', icon: '🔺', isCorrect: false },
        { id: 'c', label: 'Segitiga Siku-siku', icon: '📐', isCorrect: false },
        { id: 'd', label: 'Segitiga Sembarang', icon: '🔺', isCorrect: false },
      ],
      explanation: 'Segitiga sama sisi memiliki 3 sisi sama panjang dan 3 sudut sama besar (60°)!',
    },
    {
      id: 12,
      prompt: 'Berapa besar sudut siku-siku pada segitiga siku-siku?',
      illustrationType: 'triangle',
      options: [
        { id: 'a', label: '90° (Tegak Lurus)', icon: '📐', isCorrect: true },
        { id: 'b', label: '60°', icon: '6️⃣', isCorrect: false },
        { id: 'c', label: '45°', icon: '4️⃣', isCorrect: false },
        { id: 'd', label: '180°', icon: '1️⃣', isCorrect: false },
      ],
      explanation: 'Sudut siku-siku selalu berukuran tepat 90°!',
    },
    {
      id: 13,
      prompt: 'Jika segitiga sama sisi memiliki sisi 5 cm, berapa kelilingnya?',
      illustrationType: 'triangle',
      options: [
        { id: 'a', label: '15 cm (5 + 5 + 5)', icon: '📏', isCorrect: true },
        { id: 'b', label: '10 cm', icon: '📏', isCorrect: false },
        { id: 'c', label: '20 cm', icon: '📏', isCorrect: false },
        { id: 'd', label: '25 cm', icon: '📏', isCorrect: false },
      ],
      explanation: 'Keliling segitiga = sisi + sisi + sisi = 5 + 5 + 5 = 15 cm!',
    },
    {
      id: 14,
      prompt: 'Segitiga yang memiliki 2 sisi sama panjang disebut...',
      illustrationType: 'triangle',
      options: [
        { id: 'a', label: 'Segitiga Sama Kaki', icon: '🔺', isCorrect: true },
        { id: 'b', label: 'Segitiga Sama Sisi', icon: '📐', isCorrect: false },
        { id: 'c', label: 'Segitiga Sembarang', icon: '🔺', isCorrect: false },
        { id: 'd', label: 'Segi Empat', icon: '🟦', isCorrect: false },
      ],
      explanation: 'Segitiga sama kaki memiliki 2 sisi (kaki) yang sama panjang!',
    },
    {
      id: 15,
      prompt: 'Berapa jumlah seluruh sudut di dalam segitiga?',
      illustrationType: 'triangle',
      options: [
        { id: 'a', label: '180°', icon: '🎯', isCorrect: true },
        { id: 'b', label: '360°', icon: '⭕', isCorrect: false },
        { id: 'c', label: '90°', icon: '📐', isCorrect: false },
        { id: 'd', label: '100°', icon: '💯', isCorrect: false },
      ],
      explanation: 'Jumlah ketiga sudut di dalam segitiga apa pun selalu tepat 180°!',
    },
  ],

  // ================= DUNIA 4: DANAU LINGKARAN =================
  4: [
    {
      id: 16,
      prompt: 'Garis lurus dari titik pusat ke tepi lingkaran disebut...',
      illustrationType: 'circle_radius',
      options: [
        { id: 'a', label: 'Jari-jari (r)', icon: '🔘', isCorrect: true },
        { id: 'b', label: 'Diameter (d)', icon: '⭕', isCorrect: false },
        { id: 'c', label: 'Tali Busur', icon: '〰️', isCorrect: false },
        { id: 'd', label: 'Sudut', icon: '📐', isCorrect: false },
      ],
      explanation: 'Jari-jari (radius/r) adalah jarak dari titik pusat lingkaran ke garis lengkung tepi!',
    },
    {
      id: 17,
      prompt: 'Jika jari-jari lingkaran adalah 7 cm, berapa panjang diameternya?',
      illustrationType: 'circle_radius',
      options: [
        { id: 'a', label: '14 cm (2 × r)', icon: '📏', isCorrect: true },
        { id: 'b', label: '7 cm', icon: '📏', isCorrect: false },
        { id: 'c', label: '21 cm', icon: '📏', isCorrect: false },
        { id: 'd', label: '28 cm', icon: '📏', isCorrect: false },
      ],
      explanation: 'Diameter adalah 2 kali panjang jari-jari: d = 2 × 7 = 14 cm!',
    },
    {
      id: 18,
      prompt: 'Berapa banyak titik sudut yang dimiliki oleh bangun lingkaran?',
      illustrationType: 'circle_items',
      options: [
        { id: 'a', label: '0 Titik Sudut', icon: '0️⃣', isCorrect: true },
        { id: 'b', label: '1 Titik Sudut', icon: '1️⃣', isCorrect: false },
        { id: 'c', label: '2 Titik Sudut', icon: '2️⃣', isCorrect: false },
        { id: 'd', label: 'Tak Terhingga', icon: '♾️', isCorrect: false },
      ],
      explanation: 'Lingkaran hanya memiliki 1 sisi lengkung tertutup dan tidak memiliki titik sudut sama sekali (0)!',
    },
    {
      id: 19,
      prompt: 'Garis tengah yang membagi lingkaran menjadi dua sama besar adalah...',
      illustrationType: 'circle_radius',
      options: [
        { id: 'a', label: 'Diameter (d)', icon: '⭕', isCorrect: true },
        { id: 'b', label: 'Jari-jari (r)', icon: '🔘', isCorrect: false },
        { id: 'c', label: 'Apotema', icon: '📏', isCorrect: false },
        { id: 'd', label: 'Sudut Keliling', icon: '📐', isCorrect: false },
      ],
      explanation: 'Diameter melewati titik pusat lingkaran dan membagi lingkaran menjadi 2 bagian simetris!',
    },
    {
      id: 20,
      prompt: 'Benda di kehidupan sehari-hari yang berbentuk lingkaran sempurna adalah...',
      illustrationType: 'circle_items',
      options: [
        { id: 'a', label: 'Uang Koin Logam', icon: '🪙', isCorrect: true },
        { id: 'b', label: 'Papan Tulis', icon: '📋', isCorrect: false },
        { id: 'c', label: 'Buku Tulis', icon: '📖', isCorrect: false },
        { id: 'd', label: 'Layar Ponsel', icon: '📱', isCorrect: false },
      ],
      explanation: 'Uang koin logam memiliki bentuk lingkaran sempurna!',
    },
  ],

  // ================= DUNIA 5: KASTIL GEOMETRI =================
  5: [
    {
      id: 21,
      prompt: 'Kombinasi bangun datar apa yang membentuk menara kastil beratap lancip?',
      illustrationType: 'castle_tower',
      options: [
        { id: 'a', label: 'Persegi Panjang & Segitiga', icon: '🏰', isCorrect: true },
        { id: 'b', label: 'Lingkaran & Lingkaran', icon: '⚪', isCorrect: false },
        { id: 'c', label: 'Trapesium & Persegi', icon: '⏢', isCorrect: false },
        { id: 'd', label: 'Hanya Persegi', icon: '🟦', isCorrect: false },
      ],
      explanation: 'Dinding menara berbentuk persegi panjang/silinder, dan atapnya berbentuk segitiga/kerucut!',
    },
    {
      id: 22,
      prompt: 'Rumus untuk menghitung keliling sebuah persegi dengan sisi (s) adalah...',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: '4 × s', icon: '📐', isCorrect: true },
        { id: 'b', label: 's × s', icon: '📏', isCorrect: false },
        { id: 'c', label: '2 × (p + l)', icon: '▭', isCorrect: false },
        { id: 'd', label: '3 × s', icon: '🔺', isCorrect: false },
      ],
      explanation: 'Keliling persegi adalah penjumlahan keempat sisinya: s + s + s + s = 4 × s!',
    },
    {
      id: 23,
      prompt: 'Berapa banyak sisi yang dimiliki oleh gabungan 2 segitiga yang membentuk jajar genjang?',
      illustrationType: 'quadrilateral',
      options: [
        { id: 'a', label: '4 Sisi', icon: '4️⃣', isCorrect: true },
        { id: 'b', label: '6 Sisi', icon: '6️⃣', isCorrect: false },
        { id: 'c', label: '5 Sisi', icon: '5️⃣', isCorrect: false },
        { id: 'd', label: '3 Sisi', icon: '3️⃣', isCorrect: false },
      ],
      explanation: 'Jajar genjang adalah bangun segi empat, sehingga memiliki 4 sisi luar!',
    },
    {
      id: 24,
      prompt: 'Manakah bangun datar berikut yang TIDAK memiliki titik sudut?',
      illustrationType: 'circle_items',
      options: [
        { id: 'a', label: 'Lingkaran', icon: '⭕', isCorrect: true },
        { id: 'b', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'c', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'd', label: 'Trapesium', icon: '⏢', isCorrect: false },
      ],
      explanation: 'Lingkaran dibatasi oleh garis lengkung tertutup tanpa pertemuan garis lurus (0 sudut)!',
    },
    {
      id: 25,
      prompt: 'Tantangan Bos: Sebuah ruangan kastil persegi panjang berukuran panjang 8m dan lebar 5m. Kelilingnya adalah...',
      illustrationType: 'castle_tower',
      options: [
        { id: 'a', label: '26 meter (2 × (8 + 5))', icon: '🏆', isCorrect: true },
        { id: 'b', label: '40 meter', icon: '📏', isCorrect: false },
        { id: 'c', label: '13 meter', icon: '📏', isCorrect: false },
        { id: 'd', label: '30 meter', icon: '📏', isCorrect: false },
      ],
      explanation: 'Keliling persegi panjang = 2 × (panjang + lebar) = 2 × (8 + 5) = 2 × 13 = 26 meter!',
    },
  ],
}

export const LEVEL_QUIZZES: Record<number, QuizQuestion[]> = {
  // ================= LEVEL 1: PULAU BENTUK =================
  1: WORLD_QUIZZES[1],

  // ================= LEVEL 2: LEMBAH BENTUK =================
  // Materi pembelajaran: Mengenal sisi dan titik sudut bangun datar
  2: [
    {
      id: 101,
      prompt: 'Berapa jumlah titik sudut yang dimiliki bangun persegi?',
      illustrationType: 'l2_square_vertices',
      options: [
        { id: 'a', label: '2', icon: '2️⃣', isCorrect: false },
        { id: 'b', label: '3', icon: '3️⃣', isCorrect: false },
        { id: 'c', label: '4', icon: '4️⃣', isCorrect: true },
        { id: 'd', label: '5', icon: '5️⃣', isCorrect: false },
      ],
      explanation: 'Bangun persegi memiliki 4 titik sudut siku-siku (90°) pada setiap sudut pertemuannya.',
    },
    {
      id: 102,
      prompt: 'Berapa jumlah sisi yang dimiliki bangun persegi panjang?',
      illustrationType: 'l2_rectangle_sides',
      options: [
        { id: 'a', label: '2', icon: '2️⃣', isCorrect: false },
        { id: 'b', label: '3', icon: '3️⃣', isCorrect: false },
        { id: 'c', label: '4', icon: '4️⃣', isCorrect: true },
        { id: 'd', label: '5', icon: '5️⃣', isCorrect: false },
      ],
      explanation: 'Bangun persegi panjang memiliki 4 sisi: 2 sisi panjang sejajar dan 2 sisi pendek sejajar.',
    },
    {
      id: 103,
      prompt: 'Bangun datar manakah yang tidak memiliki titik sudut?',
      illustrationType: 'l2_no_vertex_shapes',
      options: [
        { id: 'a', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'b', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'c', label: 'Persegi panjang', icon: '▭', isCorrect: false },
        { id: 'd', label: 'Lingkaran', icon: '🔴', isCorrect: true },
      ],
      explanation: 'Lingkaran dibatasi oleh satu kurva lengkung tertutup tanpa ada sudut lancip, sehingga tidak memiliki titik sudut (0).',
    },
    {
      id: 104,
      prompt: 'Jika sebuah bangun memiliki 3 sisi dan 3 titik sudut, bangun apakah itu?',
      illustrationType: 'l2_triangle_properties',
      options: [
        { id: 'a', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'b', label: 'Segitiga', icon: '🔺', isCorrect: true },
        { id: 'c', label: 'Lingkaran', icon: '🔴', isCorrect: false },
        { id: 'd', label: 'Persegi panjang', icon: '▭', isCorrect: false },
      ],
      explanation: 'Bangun yang memiliki 3 sisi lurus dan 3 titik sudut dinamakan Segitiga.',
    },
    {
      id: 105,
      prompt: 'Bangun datar yang memiliki empat sisi dan empat titik sudut disebut ....',
      illustrationType: 'l2_quadrilateral_definition',
      options: [
        { id: 'a', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'b', label: 'Lingkaran', icon: '🔴', isCorrect: false },
        { id: 'c', label: 'Segi empat', icon: '🔲', isCorrect: true },
        { id: 'd', label: 'Oval', icon: '🥚', isCorrect: false },
      ],
      explanation: 'Segi empat adalah sebutan umum untuk semua bangun datar yang dibatasi 4 sisi dan memiliki 4 titik sudut.',
    },
  ],

  // ================= LEVEL 3: HUTAN BENTUK =================
  // Materi pembelajaran: Mengenali bentuk bangun datar dalam kehidupan sehari-hari
  3: [
    {
      id: 201,
      prompt: 'Jam dinding berbentuk bulat menyerupai bangun datar apa?',
      illustrationType: 'l3_wall_clock',
      options: [
        { id: 'a', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'b', label: 'Lingkaran', icon: '🔴', isCorrect: true },
        { id: 'c', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'd', label: 'Persegi panjang', icon: '▭', isCorrect: false },
      ],
      explanation: 'Jam dinding bulat memiliki garis tepi melingkar bundar tanpa titik sudut, menyerupai bangun datar lingkaran.',
    },
    {
      id: 202,
      prompt: 'Atap rumah pada gambar menyerupai bentuk apa?',
      illustrationType: 'l3_house_roof',
      options: [
        { id: 'a', label: 'Lingkaran', icon: '🔴', isCorrect: false },
        { id: 'b', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'c', label: 'Segitiga', icon: '🔺', isCorrect: true },
        { id: 'd', label: 'Persegi panjang', icon: '▭', isCorrect: false },
      ],
      explanation: 'Atap rumah memiliki 3 sisi yang membentuk segitiga untuk membantu air hujan mengalir dengan mudah.',
    },
    {
      id: 203,
      prompt: 'Ubin dengan empat sisi sama panjang dan empat sudut siku-siku menyerupai bentuk apa?',
      illustrationType: 'l3_ceramic_tile',
      options: [
        { id: 'a', label: 'Persegi', icon: '🟦', isCorrect: true },
        { id: 'b', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'c', label: 'Lingkaran', icon: '🔴', isCorrect: false },
        { id: 'd', label: 'Trapesium', icon: '⏢', isCorrect: false },
      ],
      explanation: 'Ubin keramik lantai dengan 4 sisi sama panjang dan sudut tegak siku-siku 90° adalah contoh nyata bangun persegi.',
    },
    {
      id: 204,
      prompt: 'Pintu berbentuk persegi panjang memiliki berapa sisi?',
      illustrationType: 'l3_door_rectangle',
      options: [
        { id: 'a', label: '2', icon: '2️⃣', isCorrect: false },
        { id: 'b', label: '3', icon: '3️⃣', isCorrect: false },
        { id: 'c', label: '4', icon: '4️⃣', isCorrect: true },
        { id: 'd', label: '5', icon: '5️⃣', isCorrect: false },
      ],
      explanation: 'Pintu berbentuk persegi panjang memiliki 4 sisi luar: sisi atas, bawah, kiri, dan kanan.',
    },
    {
      id: 205,
      prompt: 'Roda sepeda jika dilihat dari samping menyerupai bangun datar apa?',
      illustrationType: 'l3_bicycle_wheel',
      options: [
        { id: 'a', label: 'Persegi', icon: '🟦', isCorrect: false },
        { id: 'b', label: 'Lingkaran', icon: '🔴', isCorrect: true },
        { id: 'c', label: 'Segitiga', icon: '🔺', isCorrect: false },
        { id: 'd', label: 'Persegi panjang', icon: '▭', isCorrect: false },
      ],
      explanation: 'Roda sepeda dari samping berbentuk bundar mulus sempurna dan berputar mengelilingi porosnya, menyerupai lingkaran.',
    },
  ],
}

export function getQuizForLevel(levelNumber: number): QuizQuestion[] {
  if (LEVEL_QUIZZES[levelNumber]) {
    return LEVEL_QUIZZES[levelNumber]
  }
  // 5 Worlds with 3 levels each:
  if (levelNumber <= 3) return WORLD_QUIZZES[1] // Pulau 1: Level 1-3
  if (levelNumber <= 6) return WORLD_QUIZZES[2] // Pulau 2: Level 4-6
  if (levelNumber <= 9) return WORLD_QUIZZES[3] // Pulau 3: Level 7-9
  if (levelNumber <= 12) return WORLD_QUIZZES[4] // Pulau 4: Level 10-12
  return WORLD_QUIZZES[5] // Pulau 5: Level 13-15
}
