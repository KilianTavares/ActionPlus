# Quick start script for ActionPlus databases
Write-Host "Starting ActionPlus databases..." -ForegroundColor Cyan

try {
    docker-compose up -d
    Write-Host "[SUCCESS] Databases started successfully!" -ForegroundColor Green
    Write-Host "- Auth Service:    localhost:5432" -ForegroundColor White
    Write-Host "- Profile Service: localhost:5433" -ForegroundColor White
    Write-Host "- pgAdmin:         localhost:8080" -ForegroundColor White
} catch {
    Write-Host "[ERROR] Failed to start databases: $_" -ForegroundColor Red
}