# FinCopilot Mega-Start Script

Write-Host "🚀 Starting FinCopilot Multi-Tier Environment..." -ForegroundColor Cyan

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -Title "FinCopilot Backend"

# Start AI Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ai-server; .\venv\Scripts\python main.py" -Title "FinCopilot AI Server"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -Title "FinCopilot Frontend"

Write-Host "✅ All systems initiated!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend: http://localhost:5000" -ForegroundColor White
Write-Host "AI Server: http://localhost:8000" -ForegroundColor White
