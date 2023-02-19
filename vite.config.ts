import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: false,
    proxy: {
      '/api-auth': {
        target: "https://test.gnzs.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-auth/, ''),
      },
      '/amocrm': {
        target: `https://d6757be6f1100.amocrm.ru`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/amocrm/, ''),
      },
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/index.scss";`
      }
    }
  }
})
