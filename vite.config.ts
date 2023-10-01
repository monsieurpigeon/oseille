import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['**/*'],
  workbox: {
    maximumFileSizeToCacheInBytes: 6000000,
    globPatterns: ['**/*'],
  },
  manifest: {
    name: 'Oseille',
    short_name: 'Oseille',
    description: 'Oseille cool',
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
  plugins: [react(), VitePWA(manifestForPlugin)],
  define: {
    global: 'window',
  },
});
