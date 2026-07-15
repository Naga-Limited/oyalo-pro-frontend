# Docker Troubleshooting Guide - Frontend

## Issue: npm SIGTERM Error

### Problem Description
The frontend container was failing with the following error:

```
npm error signal SIGTERM
npm error command sh -c set PORT=3000 && react-scripts start
npm error command failed
```

### Root Cause
The `package.json` start script was using Windows-specific syntax:
```json
"start": "set PORT=3000 && react-scripts start"
```

The `set` command is a Windows cmd/PowerShell command and doesn't work in Linux/Unix shells (sh/bash) used in Docker containers.

### Solution Applied

#### 1. Updated `package.json`

**Before:**
```json
"scripts": {
  "start": "set PORT=3000 && react-scripts start",
  ...
}
```

**After:**
```json
"scripts": {
  "start": "react-scripts start",
  ...
}
```

#### 2. Set PORT via Environment Variable in `docker-compose.yml`

```yaml
environment:
  - NODE_ENV=development
  - PORT=3000  # ← Added this
  - REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
  ...
```

#### 3. Updated `Dockerfile` Development Stage

```dockerfile
# Set default port (can be overridden by environment variable)
ENV PORT=4004

# Expose port
EXPOSE ${PORT}
```

### How It Works Now

1. **Docker Compose** sets `PORT=3000` as an environment variable
2. **React Scripts** reads the `PORT` environment variable automatically
3. The app runs on port 3000 inside the container
4. Port 4004 on host maps to port 3000 in container: `4004:3000`

### Testing the Fix

```bash
# Stop existing containers
docker-compose down

# Rebuild and start
docker-compose up -d --build frontend

# Check logs
docker-compose logs -f frontend

# Verify it's running
curl http://localhost:4004
```

### Expected Output

You should see:
```
Compiled successfully!

You can now view oyalopro in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.18.0.3:3000

webpack compiled with 0 warnings
```

## Other Common Issues

### Issue: caniuse-lite is outdated

**Warning:**
```
Browserslist: caniuse-lite is outdated. Please run:
npx update-browserslist-db@latest
```

**Solution:**
```bash
# Enter container
docker-compose exec frontend sh

# Update browserslist database
npx update-browserslist-db@latest

# Or rebuild the image
docker-compose build --no-cache frontend
```

### Issue: Deprecation Warnings

**Warning:**
```
[DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning
[DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning
```

**Status:** These are warnings from `react-scripts 5.0.1` and webpack-dev-server. They don't affect functionality but can be ignored or suppressed.

**Solution (optional):**
Add to `docker-compose.yml`:
```yaml
environment:
  - NODE_OPTIONS=--no-deprecation
```

### Issue: Container keeps restarting

**Check logs:**
```bash
docker-compose logs frontend
```

**Common causes:**
1. Port already in use
2. Missing environment variables
3. Build errors

**Solution:**
```bash
# Check if port is in use
netstat -ano | findstr :4004

# Rebuild clean
docker-compose down -v
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### Issue: Changes not reflecting (Hot Reload not working)

**Solution:**
The `docker-compose.yml` already has polling enabled:
```yaml
environment:
  - WATCHPACK_POLLING=true
  - CHOKIDAR_USEPOLLING=true
```

If still not working:
```bash
# Restart the container
docker-compose restart frontend
```

## Environment Variables Reference

### Required for Development

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:4003/api/
REACT_APP_X_API_KEY=your-api-key-here

# Project Info
REACT_APP_PROJECT_ID=oyaloPro
REACT_APP_VERSION=1.0.0

# Port (set in docker-compose.yml)
PORT=3000  # Internal container port
```

### Port Mapping

```
Host Port 4004 → Container Port 3000
```

Access the app at: http://localhost:4004

## Complete Restart Procedure

If you encounter any issues, follow these steps:

```bash
# 1. Stop and remove containers
docker-compose down -v

# 2. Remove old images (optional)
docker rmi prod-oyalo-pro-frontend

# 3. Pull latest code
git pull origin main

# 4. Rebuild from scratch
docker-compose build --no-cache frontend

# 5. Start the container
docker-compose up -d frontend

# 6. Watch logs
docker-compose logs -f frontend

# 7. Verify it's running
curl http://localhost:4004
```

## Debugging Commands

```bash
# Check container status
docker-compose ps

# View real-time logs
docker-compose logs -f frontend

# Enter container shell
docker-compose exec frontend sh

# Check environment variables inside container
docker-compose exec frontend env | grep REACT_APP

# Check if React is running
docker-compose exec frontend ps aux | grep node

# Inspect container
docker inspect prod-oyalo-pro-frontend
```

## Network Troubleshooting

### Check if container can reach backend

```bash
# Enter frontend container
docker-compose exec frontend sh

# Try to ping backend (if on same network)
ping prod-oyalo-pro-backend

# Test API connectivity
wget -O- http://prod-oyalo-pro-backend/api/health
```

### Check Docker network

```bash
# List networks
docker network ls

# Inspect network
docker network inspect oyalo_network

# Check if both containers are on same network
docker network inspect oyalo_network | grep -A 3 "prod-oyalo-pro"
```

## Production Build Issues

If production build fails:

```bash
# Build production image
docker-compose --profile production build frontend-prod

# Check for errors
docker-compose --profile production up frontend-prod

# If successful, access at
curl http://localhost:4004
```

## Performance Issues

### Container using too much memory

```bash
# Check container stats
docker stats prod-oyalo-pro-frontend

# Limit memory in docker-compose.yml
services:
  frontend:
    deploy:
      resources:
        limits:
          memory: 2G
```

### Slow build times

```bash
# Use npm cache
docker-compose build --build-arg BUILDKIT_INLINE_CACHE=1 frontend

# Or use BuildKit
DOCKER_BUILDKIT=1 docker-compose build frontend
```

## Commit Details

**Commit**: 75abd3b  
**Message**: "fix: Resolve npm start script error in Docker"  
**Repository**: https://github.com/sakthibalaji-naga/oyalo-pro-frontend

**Files Changed**:
- `package.json` - Removed Windows-specific PORT setting
- `Dockerfile` - Added PORT environment variable
- `docker-compose.yml` - Added PORT to environment variables

## Status

✅ **Issue Resolved**

The frontend container now starts successfully without SIGTERM errors.

---

**Last Updated**: 2026-07-15  
**Version**: 1.0.2  
**Status**: ✅ Fixed and Deployed
