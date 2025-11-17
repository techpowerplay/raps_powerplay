import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Keep /api and also proxy /user and /Images to the backend
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
      '/user': { target: 'http://localhost:5000', changeOrigin: true },
      '/Images': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
})

// // my-app/vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // port: 5173, // optional (default)
//     proxy: {
//       // These proxies are optional if you use absolute URLs via API_URL,
//       // but handy if you ever switch to relative paths like /api, /user, /Images
//       '/api': { target: 'http://localhost:5000', changeOrigin: true },
//       '/user': { target: 'http://localhost:5000', changeOrigin: true },
//       '/Images': { target: 'http://localhost:5000', changeOrigin: true },
//     },
//   },
// });