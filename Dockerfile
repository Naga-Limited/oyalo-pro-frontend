# Multi-stage Dockerfile for React Application

# Stage 1: Build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

# Copy all application files
COPY . .

# Build arguments for environment variables
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_X_API_KEY
ARG PUBLIC_URL
ARG REACT_APP_VERSION

# Set environment variables for build
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_X_API_KEY=${REACT_APP_X_API_KEY}
ENV PUBLIC_URL=${PUBLIC_URL}
ENV REACT_APP_VERSION=${REACT_APP_VERSION}
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Stage 2: Production with Nginx
FROM nginx:1.25-alpine AS production

# Copy custom nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy .htaccess rules to nginx (for reference)
COPY docker/nginx/.htaccess-reference.txt /usr/share/nginx/html/

# Add health check script
RUN echo '#!/bin/sh' > /healthcheck.sh && \
    echo 'curl -f http://localhost/ || exit 1' >> /healthcheck.sh && \
    chmod +x /healthcheck.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD /healthcheck.sh

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Development (for local development with hot reload)
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install --legacy-peer-deps

# Copy application files
COPY . .

# Set default port (can be overridden by environment variable)
ENV PORT=4004

# Expose port
EXPOSE ${PORT}

# Start development server
CMD ["npm", "start"]
