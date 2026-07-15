# Oyalo Pro - Frontend

React 18 frontend application for Oyalo Pro with Docker support.

## 🚀 Technology Stack

- **Framework**: React 18.2
- **UI Libraries**: Material-UI 5, Ant Design 5, React Bootstrap
- **State Management**: Redux Toolkit
- **Routing**: React Router 6
- **Charts**: Highcharts
- **API Client**: Apisauce (Axios wrapper)
- **Web Server**: Nginx (Production)
- **Container**: Docker & Docker Compose

## 📋 Prerequisites

- Docker (20.10+)
- Docker Compose (2.0+)
- Node.js 18+ (for local development without Docker)
- Git

## 🛠️ Installation & Setup

### Method 1: Docker (Recommended)

#### Development Mode

```bash
# Clone the repository
git clone <your-repo-url>
cd oyalo-pro-frontend

# Copy environment file
cp .env.example .env

# Edit .env file with your backend API URL
nano .env

# Build and start development server
docker-compose up -d

# View logs
docker-compose logs -f frontend
```

Access the app at: http://localhost:4004

#### Production Mode

```bash
# Build production image
docker-compose --profile production up -d frontend-prod

# Or build manually
docker build --target production -t oyalo-pro-frontend:latest .
```

Access the app at: http://localhost:80

### Method 2: Local Development (Without Docker)

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

## 🐳 Docker Services

| Service | Container Name | Port | Mode | Description |
|---------|---------------|------|------|-------------|
| frontend | oyalo_pro_frontend | 4004 | Development | React dev server with hot reload |
| frontend-prod | oyalo_pro_frontend_prod | 80 | Production | Nginx serving optimized build |

## 🔧 Environment Variables

Create a `.env` file from `.env.example`:

```env
# Project Configuration
REACT_APP_PROJECT_ID=oyaloPro
REACT_APP_VERSION=1.0.0

# Environment
NODE_ENV=development

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:4003/api/

# API Security
REACT_APP_X_API_KEY=your-api-key-here

# Public URL
PUBLIC_URL=/

# Port
PORT=4004
```

### Production Environment

For production deployment:

```env
NODE_ENV=production
REACT_APP_API_BASE_URL=https://api.oyalopro.nagamills.com/api/
PUBLIC_URL=https://oyalopro.nagamills.com/
```

## 📦 Docker Commands

### Development

```bash
# Start development server
docker-compose up -d frontend

# Stop development server
docker-compose down

# Restart with fresh build
docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d frontend

# View logs
docker-compose logs -f frontend

# Enter container shell
docker-compose exec frontend sh
```

### Production

```bash
# Build production image
docker-compose --profile production build frontend-prod

# Start production server
docker-compose --profile production up -d frontend-prod

# Stop production server
docker-compose --profile production down
```

## 🏗️ Project Structure

```
oyalo-pro-frontend/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── favicon.ico        # App icon
├── src/                    # Source code
│   ├── @app/              # App configuration
│   ├── api/               # API client and endpoints
│   │   ├── baseURL.js    # API base URL
│   │   ├── client.js     # Apisauce client
│   │   ├── entryApis.js  # Entry-related APIs
│   │   ├── masterApi.js  # Master data APIs
│   │   ├── serviceAPIs.js # Service APIs
│   │   └── stateAPI.js   # State management APIs
│   ├── asset/             # Images, fonts, icons
│   ├── components/        # Reusable components
│   ├── customHooks/       # Custom React hooks
│   ├── screens/           # Page components (610+ files)
│   ├── util/              # Utility functions
│   ├── App.jsx            # Main app component
│   └── index.js           # App entry point
├── docker/                # Docker configurations
│   └── nginx/            # Nginx configs for production
│       ├── nginx.conf    # Main Nginx config
│       └── default.conf  # Virtual host config
├── .dockerignore         # Docker ignore file
├── .env.example          # Environment template
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Docker services
└── package.json          # Dependencies
```

## 🎨 Available Scripts

### npm scripts (local development)

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (⚠️ irreversible)
npm run eject
```

### Docker scripts

```bash
# Development
npm run docker:dev

# Production build
npm run docker:prod

# Clean and rebuild
npm run docker:clean
```

## 📡 API Integration

The app connects to the backend API using Apisauce (Axios wrapper).

### Configuration

API client is configured in [src/api/client.js](src/api/client.js):

```javascript
import { create } from 'apisauce';
import { baseURL } from './baseURL';

const apiClient = create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.REACT_APP_X_API_KEY
  }
});
```

### API Modules

- **entryApis.js**: Entry management
- **masterApi.js**: Master data (users, roles, etc.)
- **serviceAPIs.js**: Business services
- **stateAPI.js**: State management APIs

## 🎨 UI Components

The app uses multiple UI libraries:

- **Material-UI 5**: Primary UI framework
- **Ant Design 5**: Additional components
- **React Bootstrap**: Grid and utilities
- **React Icons**: Icon library
- **Highcharts**: Data visualization

## 🚀 Production Build

### Build Optimization

The production build includes:

- ✅ Code minification
- ✅ Tree shaking (unused code removal)
- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Source map generation
- ✅ Environment variable injection

### Build Process

```bash
# Build with npm
npm run build

# Build with Docker
docker build --target production -t oyalo-frontend:latest .
```

Build output goes to `build/` directory.

## 🔒 Security

### Environment Variables

- Never commit `.env` files
- Use `.env.example` as template
- Rotate API keys regularly
- Use different keys for dev/staging/production

### CORS

Ensure backend API allows requests from frontend domain:

```javascript
// Backend CORS config
'allowed_origins' => ['https://oyalopro.nagamills.com']
```

## 🚀 AWS Deployment

### Option 1: S3 + CloudFront

```bash
# Build the app
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Option 2: ECS/EC2 with Docker

```bash
# Build and tag image
docker build --target production -t oyalo-frontend:latest .

# Tag for ECR
docker tag oyalo-frontend:latest \
  your-account.dkr.ecr.region.amazonaws.com/oyalo-frontend:latest

# Push to ECR
docker push your-account.dkr.ecr.region.amazonaws.com/oyalo-frontend:latest

# Deploy to ECS
aws ecs update-service \
  --cluster oyalo-cluster \
  --service frontend-service \
  --force-new-deployment
```

### AWS Deployment Checklist

1. ✅ Build production Docker image
2. ✅ Push to ECR or use S3
3. ✅ Configure ALB/CloudFront
4. ✅ Set up Route 53 DNS
5. ✅ Configure SSL certificate
6. ✅ Set environment variables
7. ✅ Enable CloudWatch logs
8. ✅ Set up auto-scaling

## 🐛 Troubleshooting

### Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Clear Docker cache
docker-compose down -v
docker-compose build --no-cache
```

### API connection issues

Check:
1. Backend API is running
2. CORS is configured correctly
3. API URL in `.env` is correct
4. X-API-KEY is valid

```bash
# Test API connection
curl -H "X-API-KEY: your-key" http://localhost:4003/api/health
```

### Docker container won't start

```bash
# Check logs
docker-compose logs frontend

# Check if port 4004 is in use
netstat -ano | findstr :4004

# Restart with clean state
docker-compose down -v
docker-compose up -d --force-recreate
```

### Module not found errors

```bash
# Install with legacy peer deps flag
npm install --legacy-peer-deps
```

## 📊 Performance Optimization

### Production Build Size

- Bundle size: ~2-5 MB (gzipped)
- Use code splitting for large routes
- Lazy load components when needed

### Optimization Tips

1. Use React.memo for expensive components
2. Implement virtualization for long lists
3. Lazy load routes with React.lazy()
4. Optimize images (WebP format)
5. Enable service workers for caching

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Contact: admin@oyalopro.nagamills.com

## 📄 License

Proprietary - All rights reserved
