import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ─── POST login ──────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(422).json({ success: false, message: 'Username dan password wajib diisi.' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, username FROM users WHERE username = ? AND password = ?',
      [username.trim(), password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Username atau password salah.' });
    }

    res.json({ success: true, message: 'Login berhasil.', data: { username: rows[0].username } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
