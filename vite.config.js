import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Vendor splitting only applies to the browser bundle. In the SSR
        // build react & friends are external, and naming them in
        // manualChunks makes Rollup fail.
        ...(isSsrBuild
          ? {}
          : {
              manualChunks: {
                react: ['react', 'react-dom', 'react-router-dom'],
                motion: ['framer-motion'],
                icons: ['react-icons'],
              },
            }),
      },
    },
  },
}));
