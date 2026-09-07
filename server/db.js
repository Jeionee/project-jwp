import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Buat connection pool (lebih efisien dari single connection)
const pool = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'db_dashboard',
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  waitForConnections: true,
  connectionLimit:    10,
});

// Test koneksi saat server start
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL terhubung ke database:', process.env.DB_NAME || 'db_dashboard');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Gagal koneksi MySQL:', err.message);
    process.exit(1);
  });

export default pool;
