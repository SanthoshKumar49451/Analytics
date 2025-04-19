import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change port if needed
  },
  resolve: {
    alias: {
      '@': '/src', // Example alias for importing files
    },
  },
});