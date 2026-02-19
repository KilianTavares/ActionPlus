# ActionPlus Database Setup Script
# This script sets up the Docker PostgreSQL containers and environment files

Write-Host "=== ActionPlus Database Setup ===" -ForegroundColor Cyan

# Function to copy .env.example to .env if .env doesn't exist
function Copy-EnvFile {
    param($ServicePath, $ServiceName)
    
    $envExample = Join-Path $ServicePath ".env.example"
    $envFile = Join-Path $ServicePath ".env"
    
    if (Test-Path $envExample) {
        if (!(Test-Path $envFile)) {
            Copy-Item $envExample $envFile
            Write-Host "[OK] Created .env file for $ServiceName" -ForegroundColor Green
        } else {
            Write-Host "[SKIP] .env file already exists for $ServiceName" -ForegroundColor Yellow
        }
    }
}

# Copy environment files
Write-Host "`n1. Setting up environment files..." -ForegroundColor Blue
Copy-EnvFile "auth-service" "Auth Service"
Copy-EnvFile "profile-service" "Profile Service"

# Start Docker containers
Write-Host "`n2. Starting Docker containers..." -ForegroundColor Blue
try {
    docker-compose up -d
    Write-Host "[SUCCESS] Docker containers started successfully" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Failed to start Docker containers: $_" -ForegroundColor Red
    exit 1
}

# Wait for databases to be ready
Write-Host "`n3. Waiting for databases to be ready..." -ForegroundColor Blue
Start-Sleep -Seconds 10

# Install Prisma CLI globally if not installed
Write-Host "`n4. Checking Prisma CLI..." -ForegroundColor Blue
$prismaInstalled = Get-Command prisma -ErrorAction SilentlyContinue
if (!$prismaInstalled) {
    Write-Host "Installing Prisma CLI globally..." -ForegroundColor Yellow
    npm install -g prisma
}

# Generate Prisma clients for each service
$services = @("auth-service", "profile-service")

Write-Host "`n5. Generating Prisma clients..." -ForegroundColor Blue
foreach ($service in $services) {
    Write-Host "Generating Prisma client for $service..." -ForegroundColor Yellow
    Set-Location $service
    
    try {
        npx prisma generate
        Write-Host "[OK] Generated Prisma client for $service" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Failed to generate Prisma client for $service: $_" -ForegroundColor Red
    }
    
    Set-Location ..
}

# Run database migrations
Write-Host "`n6. Running database migrations..." -ForegroundColor Blue
foreach ($service in $services) {
    Write-Host "Running migrations for $service..." -ForegroundColor Yellow
    Set-Location $service
    
    try {
        npx prisma db push
        Write-Host "[OK] Database schema applied for $service" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Failed to apply schema for $service: $_" -ForegroundColor Red
    }
    
    Set-Location ..
}

Write-Host "`n=== Setup Complete ===" -ForegroundColor Cyan
Write-Host "Your databases are running on:" -ForegroundColor White
Write-Host "- Auth Service:    localhost:5432" -ForegroundColor White
Write-Host "- Profile Service: localhost:5433" -ForegroundColor White
Write-Host "- pgAdmin:         localhost:8080 (admin@actionplus.com / admin123)" -ForegroundColor White

Write-Host "`nTo stop the databases, run: docker-compose down" -ForegroundColor Yellow