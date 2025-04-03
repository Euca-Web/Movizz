import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ouvrir le port 5173 pour docker
  server: {
      port:5173,
      host: true,
  },
})
