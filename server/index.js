import express   from 'express';
import cors      from 'cors';
import dotenv    from 'dotenv';
import pegawaiRoutes from './routes/pegawai.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────
app.use(cors());                        // Izinkan request dari Vite (localhost:5173)
app.use(express.json());                // Parse body JSON

// ── Routes ─────────────────────────────────
app.use('/api/pegawai', pegawaiRoutes);

// Root endpoint (health check)
app.get('/', (req, res) => {
  res.json({ message: '✅ Server berjalan!', endpoints: ['/api/pegawai'] });
});

// ── Start Server ────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 API Pegawai: http://localhost:${PORT}/api/pegawai`);
});
