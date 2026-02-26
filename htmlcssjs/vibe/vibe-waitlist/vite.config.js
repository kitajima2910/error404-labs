import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    server: {
        proxy: {
            '/api': {
                // Thay đổi port này thành port Backend (Vercel CLI) của bạn, mặc định thường là 3000
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        }
    }
})
