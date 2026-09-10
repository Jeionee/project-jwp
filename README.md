<div align="center">
  <h1>📊 Dashboard & Sistem CRUD Manajemen Pegawai</h1>
  <p>Aplikasi web modern berbasis full-stack untuk pendataan pegawai, autentikasi pengguna, dan visualisasi data kepegawaian.</p>

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

Aplikasi web **full-stack** ini dirancang untuk mempermudah pengelolaan data pegawai secara terstruktur dan efisien. Dengan arsitektur *client-server* terpisah, aplikasi memadukan antarmuka **Frontend modern** (Vite + Tailwind CSS bernuansa hijau muda yang bersih) dan **Backend yang tangguh** (Express.js + MySQL). 

Selain fitur **CRUD (Create, Read, Update, Delete)** data pegawai, aplikasi ini dilengkapi dengan sistem **Autentikasi (Login & Registrasi)**, **Hak Akses Berbasis Peran (*Role-Based Access*)**, serta **Dashboard Visualisasi Data** interaktif berbasis Chart.js.

---

## ✨ Fitur Utama

- **🔐 Autentikasi & Registrasi Pengguna**
  - Registrasi mandiri akun pegawai baru dengan validasi form (panjang password dan konfirmasi).
  - Login pengguna dengan toggle lihat/sembunyikan password.
  - Pengaman rute (*Auth Guard*): otomatis dialihkan ke login jika belum terautentikasi.
- **🛡️ Hak Akses Berbasis Peran (*Role-Based Access*)**
  - **Pegawai**: Akses melihat statistik dashboard, melihat daftar pegawai, dan menambahkan data pegawai baru.
  - **Administrator**: Hak akses penuh (melihat, menambah, mengedit, dan menghapus data) dengan proteksi modal verifikasi akun admin saat ingin mengelola data.
- **📊 Dashboard Statistik Interaktif**
  - Visualisasi grafik batang dinamis menggunakan **Chart.js** untuk komposisi jenis kelamin, jenjang pendidikan, dan distribusi kelompok usia.
- **📈 Kartu Indikator Utama (KPI)**
  - Kartu metrik minimalis yang menampilkan Total Pegawai, Staf Laki-laki, Staf Perempuan, dan Rata-rata Usia.
- **📋 Manajemen Data Pegawai (CRUD)**
  - Tabel data terpusat dilengkapi fitur tambah, edit, dan hapus melalui modal popup responsif tanpa reload halaman.
- **🔍 Pencarian & Filter Real-time**
  - Cari pegawai berdasarkan nama secara instan dan filter berdasarkan jenis kelamin.
- **🔔 Notifikasi Toast & Validasi Terpadu**
  - Pesan umpan balik visual (sukses/gagal) dan validasi data baik di sisi klien maupun sisi server.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi | Kegunaan |
|---|---|---|
| **Frontend** | HTML5, JavaScript (ES6+) | Struktur halaman dan logika interaksi antarmuka |
| **Styling** | Tailwind CSS | Framework utilitas CSS untuk tata letak bersih dan responsif |
| **Visualisasi**| Chart.js (^4.4.3) | Rendering visual grafik batang statistik interaktif |
| **Build Tool** | Vite (^5.3.4) | Local development server cepat & bundler multi-page |
| **Backend** | Node.js, Express.js | Runtime JavaScript & Framework REST API HTTP |
| **Database** | MySQL (XAMPP) | Penyimpanan data persisten tabel pegawai & akun users |
| **Driver DB** | mysql2 (^3.10.1) | Koneksi database MySQL berbasis Connection Pool & Promise |

---

## 📁 Struktur Proyek

Struktur folder dan berkas proyek ditata secara modular agar rapi dan mudah dikelola:

```
project-jwp/
│
├── 📂 client/                          # Frontend (Antarmuka Pengguna Vite)
│   ├── index.html                      # Halaman utama Dashboard (KPI, grafik statistik, ringkasan)
│   ├── pegawai.html                    # Halaman Direktori & Manajemen Data Pegawai (CRUD)
│   ├── login.html                      # Halaman Masuk (Login) sistem
│   ├── register.html                   # Halaman Pendaftaran Akun Pegawai baru
│   ├── vite.config.js                  # Konfigurasi multi-page app & proxy server /api
│   ├── package.json                    # Dependensi frontend (Vite, Chart.js)
│   └── 📂 src/                         # Modul Logika JavaScript Klien
│       ├── main.js                     # Logika dashboard (fetch data, render KPI, grafik, preview)
│       ├── pegawai.js                  # Logika halaman data pegawai (CRUD, filter, modal)
│       ├── login.js                    # Logika submit login, toggle password, & session storage
│       └── register.js                 # Logika pendaftaran akun baru & validasi form
│
├── 📂 server/                          # Backend (REST API Express.js)
│   ├── index.js                        # Entry point server, konfigurasi middleware, & registrasi router
│   ├── db.js                           # Konfigurasi connection pool database MySQL
│   ├── .env                            # Konfigurasi environment (port & kredensial database)
│   ├── package.json                    # Dependensi backend (Express, mysql2, cors, dotenv)
│   └── 📂 routes/                      # Route Handler Endpoint REST API
│       ├── auth.js                     # Endpoint login (/login) & registrasi (/register)
│       └── pegawai.js                  # Endpoint CRUD data pegawai (/api/pegawai)
│
├── 📂 database/
│   └── db_dashboard.sql                # Script skema tabel pegawai, users, & data awal
│
├── .gitignore                          # Daftar berkas/folder yang diabaikan oleh Git
└── README.md                           # Dokumentasi lengkap proyek
```

---

## 🧩 Penjelasan Modul & Kode Program

### 🌐 Sisi Klien (Frontend)

| File | Deskripsi & Fungsi Utama |
|---|---|
| [`client/index.html`](file:///c:/Users/LENOVO/Documents/project-jwp/client/index.html) | Halaman beranda dashboard eksekutif: menampilkan kartu KPI, 3 canvas Chart.js, tabel preview 5 entri terbaru, dan modal verifikasi admin. |
| [`client/pegawai.html`](file:///c:/Users/LENOVO/Documents/project-jwp/client/pegawai.html) | Halaman direktori pegawai: tabel master, toolbar pencarian & filter, tombol tambah pegawai, modal form tambah/edit, serta modal konfirmasi hapus. |
| [`client/login.html`](file:///c:/Users/LENOVO/Documents/project-jwp/client/login.html) | Antarmuka formulir masuk dengan desain kartu terpusat bernuansa hijau muda segar dan proteksi auth guard. |
| [`client/register.html`](file:///c:/Users/LENOVO/Documents/project-jwp/client/register.html) | Antarmuka pendaftaran akun baru untuk staf pegawai. |
| [`client/src/main.js`](file:///c:/Users/LENOVO/Documents/project-jwp/client/src/main.js) | `fetchData()` mengambil data pegawai, `renderKPIs()` merender kartu total staf & rasio, `renderCharts()` menginisialisasi 3 bar chart, dan `renderPreview()` merender tabel ringkasan. |
| [`client/src/pegawai.js`](file:///c:/Users/LENOVO/Documents/project-jwp/client/src/pegawai.js) | Menangani operasi CRUD, membedakan aksi untuk Admin vs Pegawai biasa (RBAC), memfilter pencarian nama/gender, mengelola modal form & hapus, serta notifikasi toast. |
| [`client/src/login.js`](file:///c:/Users/LENOVO/Documents/project-jwp/client/src/login.js) | Menghandle submit login ke `/api/auth/login`, validasi input, toggle visibilitas password, dan menyimpan sesi ke `localStorage`. |
| [`client/src/register.js`](file:///c:/Users/LENOVO/Documents/project-jwp/client/src/register.js) | Menghandle submit registrasi ke `/api/auth/register`, validasi kecocokan password, dan pengalihan otomatis ke login. |

### ⚙️ Sisi Server (Backend)

| File | Deskripsi & Fungsi Utama |
|---|---|
| [`server/index.js`](file:///c:/Users/LENOVO/Documents/project-jwp/server/index.js) | Entry point backend: menerapkan middleware `cors()` dan `express.json()`, mendaftarkan route `/api/pegawai` dan `/api/auth`, serta menjalankan server HTTP pada port yang ditentukan. |
| [`server/db.js`](file:///c:/Users/LENOVO/Documents/project-jwp/server/db.js) | Membuat connection pool MySQL menggunakan `mysql2/promise` untuk efisiensi koneksi konkuren dan menguji konektivitas database saat inisialisasi. |
| [`server/routes/auth.js`](file:///c:/Users/LENOVO/Documents/project-jwp/server/routes/auth.js) | Endpoint autentikasi: verifikasi login kredensial pengguna dan pembuatan akun user baru dengan validasi username unik. |
| [`server/routes/pegawai.js`](file:///c:/Users/LENOVO/Documents/project-jwp/server/routes/pegawai.js) | Endpoint data pegawai: menyediakan operasi RESTful lengkap (`GET`, `POST`, `PUT`, `DELETE`) dengan sanitasi input data. |

---

## 📡 Daftar Endpoint REST API

### 1. Autentikasi (`/api/auth`)
- `POST /api/auth/login` — Verifikasi username & password. Mengembalikan data akun dan role (`admin` / `user`).
- `POST /api/auth/register` — Mendaftarkan akun pegawai baru dengan role default `user`.

### 2. Data Pegawai (`/api/pegawai`)
- `GET /api/pegawai` — Mengambil seluruh daftar data pegawai (diurutkan dari yang terbaru).
- `GET /api/pegawai/:id` — Mengambil detail satu data pegawai berdasarkan ID.
- `POST /api/pegawai` — Menambahkan data pegawai baru (nama, gender, usia, pendidikan).
- `PUT /api/pegawai/:id` — Memperbarui data pegawai yang sudah ada.
- `DELETE /api/pegawai/:id` — Menghapus data pegawai dari database.

---

## ⚙️ Konfigurasi Environment & Akun Default

### Berkas Konfigurasi: `server/.env`
```env
# Konfigurasi Database MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db_dashboard
DB_USER=root
DB_PASS=           # Kosongkan jika MySQL XAMPP Anda default tanpa password

# Port Server Express
PORT=3000
```

### Akun Bawaan (Default):
| Role | Username | Password | Keterangan Hak Akses |
|---|---|---|---|
| **Administrator** | `admin` | `admin123` | Hak penuh (Lihat, Tambah, Edit, Hapus) |
| **Pegawai** | *(Daftar via Register)* | *(Sesuai registrasi)* | Hak dasar (Lihat, Tambah data) |

---

## 🚀 Panduan Menjalankan Aplikasi

Aplikasi menggunakan arsitektur *client-server*, sehingga frontend dan backend dijalankan secara bersamaan.

### 1. Persiapan Database
1. Buka kontrol panel **XAMPP** dan klik **Start** pada modul **MySQL** & **Apache**.
2. Buka browser dan akses **phpMyAdmin** (`http://localhost/phpmyadmin`).
3. Impor berkas [`database/db_dashboard.sql`](file:///c:/Users/LENOVO/Documents/project-jwp/database/db_dashboard.sql). Database `db_dashboard` serta tabel `pegawai` dan `users` akan otomatis dibuat.

### 2. Menjalankan Backend (Server)
Buka terminal dan jalankan:
```bash
cd server
npm install
node index.js
```
*Server REST API akan berjalan di: `http://localhost:3000`*

### 3. Menjalankan Frontend (Client)
Buka terminal baru dan jalankan:
```bash
cd client
npm install
npm run dev
```
*Aplikasi frontend dapat diakses di: `http://localhost:5173`*

---

## 🔧 Panduan Pemecahan Masalah (Troubleshooting)

| Gejala Masalah | Penyebab | Solusi |
|---|---|---|
| `❌ Gagal koneksi MySQL` | Modul MySQL di XAMPP belum aktif | Buka XAMPP Control Panel lalu klik **Start** pada MySQL |
| `❌ Table 'db_dashboard.users' doesn't exist` | SQL skema terbaru belum diimpor | Jalankan ulang script `database/db_dashboard.sql` di phpMyAdmin |
| Teks "Gagal terhubung ke server" | Server Express belum menyala | Buka terminal di folder `server` dan jalankan `node index.js` |
| `EADDRINUSE: address already in use :::3000` | Port 3000 sedang digunakan aplikasi lain | Ubah nilai `PORT` di `server/.env` atau hentikan proses yang memakai port 3000 |
| Login gagal padahal password benar | Database belum memiliki user admin | Pastikan data dummy `admin` pada `db_dashboard.sql` sudah ter-insert |

---
