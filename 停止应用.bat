@echo off

echo 正在停止应用...

:: 停止所有相关进程
taskkill /F /IM node.exe /T
taskkill /F /IM lab-work-calculator.exe /T

echo 应用已停止！
pause
