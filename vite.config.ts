// Vite configuration file for build tool settings
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React development
// https://vitejs.dev/config/
export default defineConfig({
  // Plugins to extend Vite functionality
  plugins: [react()],
  
  // Optimization settings for dependencies
  optimizeDeps: {
    // Exclude lucide-react from pre-bundling to avoid issues
    exclude: ['lucide-react'],
  },
});
