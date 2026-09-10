-- ============================================
-- DATABASE: db_dashboard
-- Jalankan di phpMyAdmin XAMPP
-- ============================================

CREATE DATABASE IF NOT EXISTS db_dashboard
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_dashboard;

-- Drop tabel lama jika ada
DROP TABLE IF EXISTS pegawai;

-- Tabel Pegawai (schema baru)
CREATE TABLE pegawai (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)                          NOT NULL,
  gender     ENUM('Laki-laki', 'Perempuan')        NOT NULL,
  education  ENUM('SMA/SMK', 'D3', 'S1', 'S2')    NOT NULL,
  age        INT                                    NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Data dummy
INSERT INTO pegawai (name, gender, education, age) VALUES
('Budi Santoso',    'Laki-laki', 'S1',      28),
('Siti Aminah',     'Perempuan', 'D3',      24),
('Reins Orlando',   'Laki-laki', 'S1',      22),
('Resti Anggraini', 'Perempuan', 'SMA/SMK', 21),
('Andi Wijaya',     'Laki-laki', 'S2',      35),
('Dewi Lestari',    'Perempuan', 'S1',      30),
('Hendra Gunawan',  'Laki-laki', 'D3',      27),
('Maya Putri',      'Perempuan', 'S2',      32);

-- Tabel Users (untuk login)
CREATE TABLE IF NOT EXISTS users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50)  NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Akun default: admin / admin123
INSERT IGNORE INTO users (username, password) VALUES ('admin', 'admin123');
