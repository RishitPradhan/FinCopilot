@echo off
echo ===================================================
echo Starting FinCopilot Servers...
echo ===================================================

echo [1/2] Starting Backend Server (Port 5000)
start "FinCopilot Backend" cmd /c "cd C:\Users\KIIT0001\Desktop\codenexus\FinCopilot\backend && npm run dev"

echo [2/2] Starting Frontend Server (Port 3000)
start "FinCopilot Frontend" cmd /c "cd C:\Users\KIIT0001\Desktop\codenexus\FinCopilot\frontend && npm run dev"

echo.
echo ===================================================
echo Servers are launching in separate windows!
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Note: The AI Server has been integrated into the frontend.
echo ===================================================
pause
