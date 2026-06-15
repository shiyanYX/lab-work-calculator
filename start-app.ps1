Write-Host "正在启动应用..." -ForegroundColor Green
Write-Host "前端和后端将同时启动..." -ForegroundColor Green

# 启动前端开发服务器
Start-Process -FilePath "npm" -ArgumentList "run dev" -NoNewWindow -PassThru

# 等待前端服务器启动
Start-Sleep -Seconds 3

# 启动Tauri后端
Start-Process -FilePath "npm" -ArgumentList "run tauri:dev" -NoNewWindow -PassThru

Write-Host "应用已启动！" -ForegroundColor Green
Write-Host "访问 http://localhost:3000 查看前端" -ForegroundColor Cyan

Write-Host "`n提示：" -ForegroundColor Yellow
Write-Host "1. 关闭此窗口时，前端和后端都会自动关闭" -ForegroundColor Yellow
Write-Host "2. 按 Ctrl+C 可以手动停止所有进程" -ForegroundColor Yellow

# 等待用户输入，保持窗口打开
Read-Host "`n按 Enter 键停止应用..."

# 停止所有相关进程
Write-Host "`n正在停止应用..." -ForegroundColor Yellow
Get-Process | Where-Object { $_.ProcessName -like "node*" -or $_.ProcessName -like "lab-work-calculator*" } | Stop-Process -Force

Write-Host "应用已停止！" -ForegroundColor Green
