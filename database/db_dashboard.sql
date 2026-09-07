-- ============================================
-- DATABASE: db_dashboard
-- Jalankan di phpMyAdmin atau MySQL terminal
-- ============================================

CREATE DATABASE IF NOT EXISTS db_dashboard
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_dashboard;

-- Tabel Pegawai
CREATE TABLE IF NOT EXISTS pegawai (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nama          VARCHAR(100)                        NOT NULL,
  jabatan       VARCHAR(100)                        NOT NULL,
  departemen    VARCHAR(100)                        NOT NULL,
  email         VARCHAR(150)                        NOT NULL UNIQUE,
  telepon       VARCHAR(20)                         NOT NULL,
  tanggal_masuk DATE                                NOT NULL,
  status        ENUM('Aktif', 'Nonaktif')           NOT NULL DEFAULT 'Aktif',
  created_at    TIMESTAMP                           DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Data dummy untuk testing
INSERT INTO pegawai (nama, jabatan, departemen, email, telepon, tanggal_masuk, status) VALUES
('Budi Santoso',    'Software Engineer',  'IT',        'budi@company.com',    '08111111111', '2022-01-10', 'Aktif'),
('Siti Rahayu',     'HR Manager',         'HRD',       'siti@company.com',    '08222222222', '2021-06-15', 'Aktif'),
('Andi Wijaya',     'UI/UX Designer',     'IT',        'andi@company.com',    '08333333333', '2023-03-01', 'Aktif'),
('Dewi Lestari',    'Finance Analyst',    'Keuangan',  'dewi@company.com',    '08444444444', '2020-09-20', 'Aktif'),
('Rudi Hartono',    'Backend Developer',  'IT',        'rudi@company.com',    '08555555555', '2022-07-05', 'Nonaktif'),
('Maya Putri',      'Marketing Manager',  'Marketing', 'maya@company.com',    '08666666666', '2021-11-30', 'Aktif'),
('Hendra Gunawan',  'Data Analyst',       'IT',        'hendra@company.com',  '08777777777', '2023-01-15', 'Aktif'),
('Indah Permata',   'Admin Officer',      'Umum',      'indah@company.com',   '08888888888', '2019-04-10', 'Aktif');
