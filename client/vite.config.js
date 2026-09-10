import { defineConfig } from 'vite';

export default defineConfig({
  // Multi-page app: daftarkan semua halaman HTML
  build: {
    rollupOptions: {
      input: {
        main:     'index.html',
        pegawai:  'pegawai.html',
        login:    'login.html',
        register: 'register.html',
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Semua request ke /api diteruskan ke Express server
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
