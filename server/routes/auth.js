import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ─── POST /login ──────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ success: false, message: 'Username dan password wajib diisi.' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, name, username, role FROM users WHERE username = ? AND password = ?',
      [username.trim(), password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }

    const user = rows[0];
    res.json({
      success: true,
      message: 'Login berhasil.',
      data: { id: user.id, name: user.name, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /register ───────────────────────────
router.post('/register', async (req, res) => {
  const { name, username, password, confirmPassword } = req.body;

  // Validasi field wajib
  if (!name || !username || !password || !confirmPassword) {
    return res.status(422).json({ success: false, message: 'Semua field wajib diisi.' });
  }

  // Validasi panjang password
  if (password.length < 6) {
    return res.status(422).json({ success: false, message: 'Password minimal 6 karakter.' });
  }

  // Validasi konfirmasi password
  if (password !== confirmPassword) {
    return res.status(422).json({ success: false, message: 'Konfirmasi password tidak cocok.' });
  }

  try {
    // Cek username sudah dipakai
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username.trim()]
    );
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Username sudah digunakan, pilih yang lain.' });
    }

    // Simpan user baru dengan role 'user'
    await pool.query(
      'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)',
      [name.trim(), username.trim(), password, 'user']
    );

    res.status(201).json({ success: true, message: 'Akun berhasil dibuat! Silakan login.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
