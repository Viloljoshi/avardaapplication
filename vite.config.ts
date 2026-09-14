import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from https://viloljoshi.github.io/avardaapplication/ on GitHub Pages,
  // so assets must be requested under that sub-path.
  base: '/avardaapplication/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
