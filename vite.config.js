import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { spawn } from 'child_process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'start-backend',
      configureServer(server) {
        // 启动前端时自动启动后端
        console.log('正在启动后端服务...')
        const backendProcess = spawn('npm', ['run', 'tauri:dev'], {
          shell: true,
          stdio: 'inherit'
        })
        
        // 当前端服务器关闭时，关闭后端进程
        server.httpServer.on('close', () => {
          console.log('正在关闭后端服务...')
          backendProcess.kill()
        })
      }
    }
  ],
  server: {
    port: 3000
  }
})
