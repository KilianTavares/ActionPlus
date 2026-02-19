# ActionPlus Database Setup with Docker & Prisma

This setup provides individual PostgreSQL databases for each microservice using Docker containers and Prisma ORM.

## 🏗 Architecture

Each service has its own dedicated PostgreSQL database:

- **auth-service**: `localhost:5432` - User authentication & JWT management
- **profile-service**: `localhost:5433` - User profiles & preferences
- **client-app**: API Gateway (stateless, no database required)

## 🚀 Quick Start

### 1. First Time Setup

```powershell
# Navigate to nest-server directory
cd nest-server

# Run the complete setup script
.\setup-databases.ps1
```

This script will:

- Copy .env.example files to .env files
- Start all PostgreSQL containers
- Generate Prisma clients
- Apply database schemas

### 2. Daily Development

```powershell
# Start databases only
.\start-databases.ps1

# Stop databases
docker-compose down
```

## 📋 Manual Setup (Alternative)

If you prefer manual setup:

### 1. Environment Files

Copy `.env.example` to `.env` in each service directory:

```powershell
cp auth-service\.env.example auth-service\.env
cp profile-service\.env.example profile-service\.env
# client-app uses API gateway config (no database)
cp client-app\.env.example client-app\.env
```

### 2. Start Containers

```powershell
docker-compose up -d
```

### 3. Setup Each Service

For each service directory:

```powershell
cd auth-service  # (or profile-service, client-app)

# Generate Prisma client
npm run db:generate

# Apply database schema
npm run db:push
```

## 🛠 Database Management

### Per-Service Commands

In each service directory, you can run:

```powershell
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database (CAUTION: deletes all data)
npm run db:reset
```

## 🎯 Database Access

### Connection Details

- **Auth DB**: `postgresql://postgres:password@localhost:5432/actionplus_auth`
- **Profile DB**: `postgresql://postgres:password@localhost:5433/actionplus_profile`
- **Client-App**: API Gateway (no database required)

### pgAdmin Web Interface

- URL: http://localhost:8080
- Email: admin@actionplus.com
- Password: admin123

## 🔧 Docker Commands

```powershell
# View running containers
docker-compose ps

# View container logs
docker-compose logs auth-postgres    # or profile-postgres, client-postgres

# Restart a specific database
docker-compose restart auth-postgres

# Remove all containers and volumes (CAUTION: deletes all data)
docker-compose down -v
```

## 📊 Service Ports

- **auth-service**: 3000
- **profile-service**: 3001
- **client-app**: 3002
- **pgAdmin**: 8080
- **auth-postgres**: 5432
- **profile-postgres**: 5433
- **client-postgres**: 5434

## 🔐 Security Notes

For production:

1. Change default passwords in docker-compose.yml
2. Update JWT_SECRET in .env files
3. Use environment-specific secrets
4. Enable SSL for PostgreSQL connections
5. Restrict network access

## 🐛 Troubleshooting

### Port Already in Use

```powershell
# Find process using port
netstat -ano | findstr :5432

# Kill process by PID
taskkill /PID <PID> /F
```

### Database Connection Issues

```powershell
# Check if containers are running
docker-compose ps

# Check container logs
docker-compose logs <service-name>

# Restart containers
docker-compose restart
```

### Prisma Schema Changes

After modifying a Prisma schema:

```powershell
cd <service-directory>
npm run db:generate
npm run db:push
```
