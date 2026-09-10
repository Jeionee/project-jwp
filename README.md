<div align="center">
📊 Dashboard & Sistem CRUD Manajemen Pegawai

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
</div>

---

🌟 Tentang Proyek

Aplikasi web **full-stack** ini dirancang untuk mempermudah manajemen data pegawai. Dengan mengusung arsitektur *client-server* yang terpisah, aplikasi ini memadukan **Frontend modern** (Vite + Tailwind CSS) dan **Backend yang tangguh** (Express.js + MySQL). Selain fitur **CRUD (Create, Read, Update, Delete)** yang interaktif, sistem ini dilengkapi dengan **Dashboard Visualisasi Data** berbasis metrik dan grafik untuk memberikan ringkasan informasi kepegawaian secara cepat dan akurat.

---

✨ Fitur Utama

- **📊 Dashboard Statistik Interaktif** — Visualisasi data menggunakan *bar charts* dinamis (Chart.js) untuk memantau komposisi gender, distribusi pendidikan (SMA/SMK, D3, S1, S2), dan kelompok usia pegawai.
- **📈 Kartu KPI (Key Performance Indicator)** — Ringkasan metrik instan yang menampilkan Total Pegawai, perbandingan Laki-laki & Perempuan, serta Rata-rata Usia.
- **📋 Sistem CRUD & Direktori Lengkap** — Tabel daftar pegawai terpusat dengan fitur tambah, edit, dan hapus data melalui *modal form* interaktif tanpa perpindahan halaman.
- **🔍 Pencarian & Filter Real-time** — Temukan data pegawai berdasarkan nama atau filter gender secara instan.
- **🔔 Toast Notification & Validasi** — Memberikan *feedback* visual yang elegan setiap kali pengguna melakukan aksi (berhasil/gagal) dan dilengkapi perlindungan validasi data sisi server.

---

🛠️ Teknologi yang Digunakan

| Kategori | Teknologi | Kegunaan |
|---|---|---|
| **Frontend** | HTML5, JS (ES6+) | Struktur dan logika interaksi antarmuka pengguna |
| **Styling** | Tailwind CSS | Framework CSS *utility-first* untuk desain responsif |
| **Visualisasi**| Chart.js (^4.4.3) | Rendering grafik statistik interaktif |
| **Build Tool** | Vite (^5.3.4) | *Development server* yang sangat cepat & *module bundler* |
| **Backend** | Node.js, Express.js | Runtime JavaScript & Framework HTTP untuk REST API |
| **Database** | MySQL (XAMPP) | Penyimpanan data persisten |
| **Driver** | mysql2 (^3.10.1) | Koneksi MySQL berbasis Promise |

---

📁 Struktur Proyek

Aplikasi dibagi menjadi dua direktori utama: `client` untuk antarmuka pengguna dan `server` untuk *backend API*.

```
project-jwp/
│
├── 📂 client/                    # Frontend (Antarmuka Pengguna)
│   ├── index.html                # Halaman Dashboard utama
│   ├── pegawai.html              # Halaman CRUD Manajemen Pegawai
│   ├── vite.config.js            # Konfigurasi Vite
│   └── 📂 src/
│       ├── main.js               # Logika dashboard (KPI, charts, tabel preview)
│       └── pegawai.js            # Logika CRUD (tambah, edit, hapus, filter)
│
├── 📂 server/                    # Backend (REST API)
│   ├── index.js                  # Entry point server (middleware & route)
│   ├── db.js                     # Konfigurasi connection pool MySQL
│   ├── .env                      # Kredensial environment variables
│   └── 📂 routes/
│       └── pegawai.js            # Route handler API CRUD pegawai
│
└── 📂 database/
    └── db_dashboard.sql          # Script inisialisasi tabel & data dummy
```
---

🧩 Penjelasan Kode Program

### `client/src/main.js` — Logika Halaman Dashboard

| Fungsi | Deskripsi |
|---|---|
| `fetchData()` | Memanggil `GET /api/pegawai`, mengembalikan array data pegawai |
| `renderKPIs(data)` | Menghitung total, jumlah per gender, rata-rata usia; merender 4 kartu KPI ke DOM |
| `renderPreview(data)` | Mengambil 5 data teratas (`slice(0,5)`) dan merender tabel preview di dashboard |
| `renderCharts(data)` | Mengelompokkan data ke objek `genderCount`, `eduCount`, `ageCount`; membuat 3 bar chart Chart.js |
| `init()` | Fungsi entry point: memanggil `fetchData()` lalu meneruskan hasilnya ke semua fungsi render |

### `client/src/pegawai.js` — Logika Halaman CRUD

| Fungsi | Deskripsi |
|---|---|
| `load()` | Fetch semua data dari API, simpan ke `allData[]`, panggil `renderKPIs()` dan `renderTable()` |
| `renderKPIs()` | Hitung dan tampilkan statistik singkat (total, laki-laki, perempuan) |
| `renderTable(data)` | Render baris tabel dari array; pasang event delegation untuk tombol Edit & Hapus |
| `applyFilter()` | Filter `allData` berdasarkan nilai `searchInput` (nama) dan `filterGender` (dropdown) |
| `openModal(title)` | Tampilkan modal form dengan judul dinamis (Tambah / Edit Data Pegawai) |
| `closeModal()` | Sembunyikan modal form |
| `openEdit(id)` | Fetch data pegawai by ID dari API, isi form, buka modal mode Edit |
| `openHapus(id)` | Simpan ID ke `deleteTargetId`, tampilkan modal konfirmasi hapus |
| `toast(msg, type)` | Tampilkan notifikasi pop-up selama 3,5 detik (hijau = sukses, merah = error) |

### `server/routes/pegawai.js` — REST API Route Handler

| Route | Method | Logika |
|---|---|---|
| `/` | GET | `SELECT * FROM pegawai ORDER BY created_at DESC` |
| `/:id` | GET | `SELECT * WHERE id = ?` — kembalikan 404 jika tidak ada |
| `/` | POST | Validasi field & enum → `INSERT INTO pegawai` |
| `/:id` | PUT | Validasi field → `UPDATE pegawai SET ... WHERE id = ?` |
| `/:id` | DELETE | `DELETE FROM pegawai WHERE id = ?` — 404 jika `affectedRows = 0` |

### `server/db.js` — Koneksi Database

Membuat **connection pool** MySQL menggunakan `mysql2/promise`. Pool memungkinkan reuse koneksi antar request (maksimal 10 koneksi). Kredensial dibaca dari `.env` via `dotenv`. Saat server start, dilakukan test koneksi untuk memverifikasi database tersedia.

### `server/index.js` — Entry Point Server

Mengatur middleware global (`cors` dan `express.json()`), mendaftarkan route `/api/pegawai`, menyediakan endpoint health check `/`, dan menjalankan HTTP server pada port dari `.env`.

---

## ⚙️ Konfigurasi Environment

File: `server/.env`

```env
# Konfigurasi Database MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db_dashboard
DB_USER=root
DB_PASS=           # Kosongkan jika MySQL XAMPP tidak menggunakan password

# Port Express server
PORT=3000
```

---

🔧 Troubleshooting

| Masalah | Penyebab | Solusi |
|---|---|---|
| `❌ Gagal koneksi MySQL` | MySQL XAMPP tidak berjalan | Buka XAMPP, klik **Start** pada MySQL |
| `❌ Gagal koneksi MySQL` | Password MySQL salah | Edit `DB_PASS` di `server/.env` |
| Data tidak muncul di browser | Server Express belum berjalan | Jalankan `node index.js` di folder `server` |
| Toast error "Gagal terhubung ke server" | Backend mati atau port salah | Pastikan server berjalan di port 3000 |
| Port 3000 sudah dipakai | Konflik port dengan aplikasi lain | Ganti nilai `PORT` di `server/.env` |
| Port 5173 sudah dipakai | Konflik port | Vite akan otomatis pindah ke port berikutnya |

---

Karena proyek ini menggunakan arsitektur *client-server*, Anda perlu menjalankan kedua sisi secara bersamaan.

### 1. Persiapan Basis Data (Database)
- Lakukan impor berkas `database/db_dashboard.sql` ke dalam sistem manajemen basis data SQL Anda (misal: MySQL/MariaDB).
### 2. Menjalankan Server (Backend)
1. Buka terminal dan masuk ke direktori `server`.
   ```bash
   cd server
   node index.js
### 3. Menjalankan Frontend
1. Buka terminal yang baru dan masuk ke direktori `client`.
   ```bash
   cd client
   npm run dev
