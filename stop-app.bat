@echo off

echo 正在停止应用...

:: 查找并关闭npm进程
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo table /nh ^| findstr "npm"') do (
    taskkill /pid %%i /f
)

:: 查找并关闭tauri进程
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq lab-work-calculator.exe" /fo table /nh') do (
    taskkill /pid %%i /f
)

echo 应用已停止！
pause