import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico'],
  manifest: {
    name: 'Oseille',
    short_name: 'Oseille',
    icons: [{ src: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' }],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), VitePWA(pwaOptions)],
  define: {
    global: 'window',
  },
});
