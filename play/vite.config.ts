import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'test-ui': path.resolve(__dirname, '../packages/test-ui'),
      '@test-ui/components': path.resolve(__dirname, '../packages/components'),
      '@test-ui/utils': path.resolve(__dirname, '../packages/utils'),
    }
  }
})
