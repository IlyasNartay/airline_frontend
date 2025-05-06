  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import tailwindcss from '@tailwindcss/vite'

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [vue(),tailwindcss(),],
    server: {
    proxy: {
      '/api': {
        target: 'https://airline-system-pbjy.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
