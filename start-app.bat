@echo off

:: 切换到项目目录
cd /d %~dp0

echo 正在启动应用...
echo 前端和后端将同时启动...
echo.

:: 启动前端和后端（在同一个窗口中）
start "Lab Work Calculator" cmd /k "npm run dev && npm run tauri:dev"

echo 应用已启动！
echo 访问 http://localhost:3000 查看前端
echo.
echo 提示：
echo 1. 关闭命令窗口时，前端和后端都会自动关闭
echo 2. 按 Ctrl+C 可以手动停止所有进程
echo.
