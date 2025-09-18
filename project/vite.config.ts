import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
base: "/guliteratureapp/",
plugins: [react()],
optimizeDeps: { exclude: ["lucide-react"] }
})
