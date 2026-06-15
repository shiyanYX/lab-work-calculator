@echo off

:: 切换到项目目录
cd /d %~dp0

:: 创建一个后台脚本来监控前端进程
echo @echo off > run-app.vbs
echo Set objShell = CreateObject("WScript.Shell") >> run-app.vbs
echo objShell.Run "cmd /c start-frontend.bat", 0, False >> run-app.vbs
echo WScript.Sleep 5000 >> run-app.vbs
echo objShell.Run "cmd /c start-backend.bat", 0, False >> run-app.vbs
echo WScript.Sleep 10000 >> run-app.vbs
echo objShell.Run "cmd /c monitor-processes.bat", 0, False >> run-app.vbs

:: 创建前端启动脚本
echo @echo off > start-frontend.bat
echo npm run dev >> start-frontend.bat

:: 创建后端启动脚本
echo @echo off > start-backend.bat
echo npm run tauri:dev >> start-backend.bat

:: 创建进程监控脚本
echo @echo off > monitor-processes.bat
echo :monitor >> monitor-processes.bat
echo tasklist /FI "IMAGENAME eq node.exe" | find /I "node.exe" > nul >> monitor-processes.bat
echo if %errorlevel% neq 0 ( >> monitor-processes.bat
echo     taskkill /F /IM lab-work-calculator.exe /T > nul >> monitor-processes.bat
echo     exit >> monitor-processes.bat
echo ) >> monitor-processes.bat
echo timeout /t 5 /nobreak > nul >> monitor-processes.bat
echo goto monitor >> monitor-processes.bat

:: 运行后台脚本
cscript run-app.vbs

echo 应用已启动！
echo 前端运行在 http://localhost:3000
echo 当关闭前端时，后端会自动关闭。
echo.
echo 按任意键退出...
pause >nul

:: 清理临时文件
del run-app.vbs start-frontend.bat start-backend.bat monitor-processes.bat
