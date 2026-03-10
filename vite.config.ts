import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'react' }), tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.opnhuatuankiet.io.vn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // /api/products -> /products
      },
    },
  },
})
