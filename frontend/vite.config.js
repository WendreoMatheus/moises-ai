import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsConfigPaths(), svgr()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendors': ['react', 'react-dom', 'react-router'],
                    'state-management': ['jotai', 'swr'],
                    'ui-libraries': ['bulma', 'daisyui'],
                    utils: ['axios', 'zod'],
                },
            },
        },
        chunkSizeWarningLimit: 700, // Aumenta o limite para 700 kB
    },
});
