import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves from /portfolio/, Vercel from the domain root.
  base: process.env.VERCEL ? '/' : command === 'build' ? '/portfolio/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react')) {
            return 'vendor-ui';
          }
          if (id.includes('node_modules/qrcode') || id.includes('node_modules/canvas-confetti')) {
            return 'vendor-utils';
          }
        },
      },
    },
  },
}));
