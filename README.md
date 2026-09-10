<div align="center">

# 📊 Dashboard & Sistem CRUD Manajemen Pegawai

<p align="center"><b>Uji Kompetensi Keahlian — Proyek Jaringan Web & Pemrograman</b></p>

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

## 🌟 Tentang Proyek

Aplikasi web **full-stack** untuk manajemen data pegawai dengan fitur **CRUD (Create, Read, Update, Delete)** interaktif dan **Dashboard Visualisasi Data** berbasis grafik batang. Aplikasi menggunakan arsitektur client-server terpisah: frontend Vite + Tailwind CSS berkomunikasi dengan backend Express.js yang terhubung ke database MySQL.

---

## ✨ Fitur Utama

- **📊 Dashboard Statistik Interaktif** — Grafik batang dinamis (Chart.js) untuk:
  - Komposisi gender pegawai (Laki-laki & Perempuan)
  - Distribusi pendidikan terakhir (SMA/SMK, D3, S1, S2)
  - Pengelompokan kategori usia pegawai
- **📈 Kartu KPI Ringkasan** — Total pegawai, jumlah per gender, rata-rata usia
- **📝 Sistem CRUD Lengkap** — Tambah, edit, dan hapus pegawai via modal form interaktif
- **🔍 Pencarian & Filter Real-time** — Cari nama dan filter gender secara instan
- **🔔 Toast Notification** — Feedback visual untuk setiap aksi (berhasil/gagal)
- **🔒 Validasi Server-side** — Validasi input sebelum data disimpan ke database

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi | Versi | Fungsi |
|---|---|---|---|
| Frontend | HTML5 | — | Struktur halaman web |
| Frontend | Vanilla JavaScript ES6+ | — | Logika UI & interaksi pengguna |
| Styling | Tailwind CSS | CDN | Framework CSS utility-first |
| Library Grafik | Chart.js | ^4.4.3 | Visualisasi grafik batang interaktif |
| Build Tool | Vite | ^5.3.4 | Dev server & module bundler |
| Backend | Node.js | — | Runtime JavaScript sisi server |
| Backend | Express.js | ^4.19.2 | HTTP framework & routing REST API |
| Database Driver | mysql2 | ^3.10.1 | Koneksi MySQL berbasis Promise |
| Middleware | CORS | ^2.8.5 | Mengizinkan request lintas origin |
| Konfigurasi | dotenv | ^16.4.5 | Manajemen environment variable |
| Database | MySQL via XAMPP | — | Penyimpanan data persisten |

---

## 📁 Struktur Folder

```
project-jwp/
│
├── 📂 client/                    # Frontend (Vite)
│   ├── index.html                # Halaman Dashboard utama
│   ├── pegawai.html              # Halaman CRUD Manajemen Pegawai
│   ├── vite.config.js            # Konfigurasi Vite (proxy API & multi-page)
│   ├── package.json              # Dependensi frontend
│   └── 📂 src/
│       ├── main.js               # Logika dashboard (KPI, charts, tabel preview)
│       └── pegawai.js            # Logika CRUD (load, tambah, edit, hapus, filter)
│
├── 📂 server/                    # Backend (Express.js)
│   ├── index.js                  # Entry point — middleware & route utama
│   ├── db.js                     # Konfigurasi connection pool MySQL
│   ├── .env                      # Kredensial database & port server
│   ├── package.json              # Dependensi backend
│   └── 📂 routes/
│       └── pegawai.js            # Route handler API CRUD pegawai
│
├── 📂 database/
│   └── db_dashboard.sql          # Script SQL (buat DB, tabel, data dummy)
│
├── .gitignore
└── README.md
```

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat

Pastikan software berikut sudah terinstal di komputer Anda:

- **Node.js** (v18 atau lebih baru) — [Download](https://nodejs.org)
- **XAMPP** (for MySQL) — [Download](https://www.apachefriends.org)
- **Git** — [Download](https://git-scm.com)

---

### Langkah 1 — Clone Repository

```bash
git clone https://github.com/Jeionee/project-jwp.git
cd project-jwp
```

---

### Langkah 2 — Setup Database (MySQL via XAMPP)

1. Buka **XAMPP Control Panel**, klik **Start** pada `Apache` dan `MySQL`
2. Buka browser, akses `http://localhost/phpmyadmin`
3. Klik tab **SQL**, salin seluruh isi file `database/db_dashboard.sql`, tempel ke kolom SQL, lalu klik **Go**

Script akan otomatis:
- Membuat database `db_dashboard`
- Membuat tabel `pegawai`
- Memasukkan 8 data dummy awal

---

### Langkah 3 — Konfigurasi Environment Backend

Edit file `server/.env` sesuai konfigurasi MySQL Anda:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db_dashboard
DB_USER=root
DB_PASS=        # Kosongkan jika MySQL XAMPP tanpa password
PORT=3000
```

---

### Langkah 4 — Jalankan Backend (Server Express)

```bash
cd server
npm install
node index.js
```

Output jika berhasil:

```
✅ MySQL terhubung ke database: db_dashboard
🚀 Server berjalan di http://localhost:3000
📋 API Pegawai: http://localhost:3000/api/pegawai
```

---

### Langkah 5 — Jalankan Frontend (Client Vite)

Buka terminal **baru** (jangan tutup terminal server):

```bash
cd client
npm install
npm run dev
```

Output jika berhasil:

```
  VITE v5.x.x  ready in ... ms
  ➜  Local:   http://localhost:5173/
```

---

### Langkah 6 — Akses Aplikasi di Browser

| Halaman | URL |
|---|---|
| 📊 Dashboard | `http://localhost:5173/` |
| 👥 Manajemen Pegawai | `http://localhost:5173/pegawai.html` |

---

## 📡 Dokumentasi API

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Deskripsi | Status Sukses |
|---|---|---|---|
| `GET` | `/api/pegawai` | Ambil semua data pegawai | 200 OK |
| `GET` | `/api/pegawai/:id` | Ambil satu pegawai berdasarkan ID | 200 OK |
| `POST` | `/api/pegawai` | Tambah pegawai baru | 201 Created |
| `PUT` | `/api/pegawai/:id` | Update data pegawai berdasarkan ID | 200 OK |
| `DELETE` | `/api/pegawai/:id` | Hapus pegawai berdasarkan ID | 200 OK |

---

#### `GET /api/pegawai` — Ambil semua pegawai

**Response sukses (`200 OK`):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Budi Santoso",
      "gender": "Laki-laki",
      "education": "S1",
      "age": 28,
      "created_at": "2026-09-10T10:00:00.000Z"
    }
  ]
}
```

---

#### `GET /api/pegawai/:id` — Ambil satu pegawai

**Response sukses (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "gender": "Laki-laki",
    "education": "S1",
    "age": 28,
    "created_at": "2026-09-10T10:00:00.000Z"
  }
}
```

**Response gagal (`404 Not Found`):**

```json
{ "success": false, "message": "Pegawai tidak ditemukan." }
```

---

#### `POST /api/pegawai` — Tambah pegawai baru

**Request Body:**

```json
{
  "name": "Nama Lengkap",
  "gender": "Laki-laki",
  "education": "S1",
  "age": 25
}
```

> Nilai valid: `gender` → `"Laki-laki"` atau `"Perempuan"` | `education` → `"SMA/SMK"`, `"D3"`, `"S1"`, `"S2"`

**Response sukses (`201 Created`):**

```json
{
  "success": true,
  "message": "Pegawai berhasil ditambahkan.",
  "data": { "id": 9 }
}
```

**Response gagal validasi (`422`):**

```json
{ "success": false, "message": "Semua field wajib diisi." }
```

---

#### `PUT /api/pegawai/:id` — Update pegawai

**Request Body:** sama seperti POST

**Response sukses (`200 OK`):**

```json
{ "success": true, "message": "Data berhasil diperbarui." }
```

---

#### `DELETE /api/pegawai/:id` — Hapus pegawai

**Response sukses (`200 OK`):**

```json
{ "success": true, "message": "Pegawai berhasil dihapus." }
```

---

## 🗄️ Skema Database

**Database:** `db_dashboard` | **Engine:** InnoDB | **Charset:** utf8mb4

### Tabel `pegawai`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `INT AUTO_INCREMENT PRIMARY KEY` | Identitas unik pegawai |
| `name` | `VARCHAR(100) NOT NULL` | Nama lengkap pegawai |
| `gender` | `ENUM('Laki-laki','Perempuan') NOT NULL` | Jenis kelamin |
| `education` | `ENUM('SMA/SMK','D3','S1','S2') NOT NULL` | Pendidikan terakhir |
| `age` | `INT NOT NULL` | Usia dalam tahun |
| `created_at` | `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` | Waktu data dibuat (otomatis) |

---

## 🧩 Penjelasan Kode Program

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

## 🔧 Troubleshooting

| Masalah | Penyebab | Solusi |
|---|---|---|
| `❌ Gagal koneksi MySQL` | MySQL XAMPP tidak berjalan | Buka XAMPP, klik **Start** pada MySQL |
| `❌ Gagal koneksi MySQL` | Password MySQL salah | Edit `DB_PASS` di `server/.env` |
| Data tidak muncul di browser | Server Express belum berjalan | Jalankan `node index.js` di folder `server` |
| Toast error "Gagal terhubung ke server" | Backend mati atau port salah | Pastikan server berjalan di port 3000 |
| Port 3000 sudah dipakai | Konflik port dengan aplikasi lain | Ganti nilai `PORT` di `server/.env` |
| Port 5173 sudah dipakai | Konflik port | Vite akan otomatis pindah ke port berikutnya |

---

<div align="center">
<p>Dibuat untuk keperluan <b>Uji Kompetensi Keahlian (UKK)</b></p>
</div>
