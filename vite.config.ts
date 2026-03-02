import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Core React libraries - must be first to avoid circular dependencies
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Router - depends on React
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Radix UI components - depends on React
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            // Charts - depends on React
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            // Form libraries - depends on React
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'vendor-forms';
            }
            // Don't create a catch-all vendor-misc to avoid circular dependencies
            // Let Vite automatically handle other dependencies
          }
        },
      },
    },
    // Enable minification with esbuild (faster than terser)
    minify: 'esbuild',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
}));
