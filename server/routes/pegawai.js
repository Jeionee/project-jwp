import express from 'express';
import pool from '../db.js';

const router = express.Router();

const VALID_GENDER = ['Laki-laki', 'Perempuan'];
const VALID_EDU    = ['SMA/SMK', 'D3', 'S1', 'S2'];

// ─── GET semua pegawai ───────────────────────
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pegawai ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET satu pegawai ────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pegawai WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Pegawai tidak ditemukan.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST tambah pegawai ─────────────────────
router.post('/', async (req, res) => {
  const { name, gender, education, age } = req.body;

  // Validasi
  if (!name || !gender || !education || !age) {
    return res.status(422).json({ success: false, message: 'Semua field wajib diisi.' });
  }
  if (!VALID_GENDER.includes(gender)) {
    return res.status(422).json({ success: false, message: 'Nilai gender tidak valid.' });
  }
  if (!VALID_EDU.includes(education)) {
    return res.status(422).json({ success: false, message: 'Nilai pendidikan tidak valid.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO pegawai (name, gender, education, age) VALUES (?, ?, ?, ?)',
      [name.trim(), gender, education, parseInt(age)]
    );
    res.status(201).json({ success: true, message: 'Pegawai berhasil ditambahkan.', data: { id: result.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PUT update pegawai ──────────────────────
router.put('/:id', async (req, res) => {
  const { name, gender, education, age } = req.body;
  const { id } = req.params;

  if (!name || !gender || !education || !age) {
    return res.status(422).json({ success: false, message: 'Semua field wajib diisi.' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE pegawai SET name=?, gender=?, education=?, age=? WHERE id=?',
      [name.trim(), gender, education, parseInt(age), id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Pegawai tidak ditemukan.' });
    }
    res.json({ success: true, message: 'Data berhasil diperbarui.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE hapus pegawai ────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM pegawai WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Pegawai tidak ditemukan.' });
    }
    res.json({ success: true, message: 'Pegawai berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
