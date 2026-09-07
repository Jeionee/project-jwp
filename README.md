<div align="center">
📊 Dashboard Kepegawaian & Sistem CRUD
<p align="center"><b>Visualisasi data dan manajemen sistem pegawai.</b></p>

</div>

---
## 🌟 Tentang Proyek
Proyek ini adalah sistem informasi manajemen data pegawai *full-stack* yang memisahkan arsitektur *client* dan *server*. Aplikasi ini menampilkan antarmuka modern yang bersih dengan judul "Dashboard Kepegawaian". Sistem ini dilengkapi dengan visualisasi data melalui grafik batang (*bar charts*) dan terhubung dengan basis data terpusat berbasis SQL.

---

## ✨ Fitur Utama
- **📊 Dashboard Statistik Interaktif**: Menampilkan visualisasi data berupa grafik batang untuk:
  - **Komposisi Gender**: Perbandingan jumlah Laki-laki dan Perempuan.
  - **Pendidikan Terakhir**: Distribusi lulusan SMA/SMK, D3, S1, S2.
  - **Distribusi Usia**: Dikelompokkan menjadi <25, 25-30, 31-40, >40 tahun.
- **📈 Kartu KPI (Ringkasan Metrik)**: Menampilkan angka metrik secara cepat yang meliputi "Total Pegawai", "Laki-laki", "Perempuan", dan "Rata-rata Usia".
- **📋 Direktori Pegawai**: Tabel daftar pegawai yang menampilkan kolom ID, Nama, Gender, Pendidikan, dan Usia.
- **⚙️ Manajemen Data**: Terdapat tombol "Kelola Pegawai" untuk mengakses fitur pengelolaan data. 
- **🔌 Arsitektur Full-Stack**: 
  - Aplikasi dibagi menjadi direktori `client` untuk antarmuka pengguna dan direktori `server` untuk *backend API*.
  - Terdapat *routing* khusus untuk entitas pegawai pada *backend* (`server/routes/pegawai.js`).
  - Penyimpanan data menggunakan basis data SQL (`database/db_dashboard.sql`).

---

## 🛠️ Struktur Proyek
Proyek ini menggunakan struktur direktori berikut[cite: 3]:

- `client/`: Berisi kode *frontend* dengan konfigurasi dari *build tool* Vite (`vite.config.js`).
- `server/`: Berisi kode *backend* Node.js, konfigurasi koneksi *database* (`db.js`), dan *routing* aplikasi.
- `database/`: Berisi berkas SQL (`db_dashboard.sql`) untuk inisialisasi basis data.

---
## 🚀 Cara Menjalankan Proyek
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
