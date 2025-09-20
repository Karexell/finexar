# Finexar Deployment Guide

This guide covers different deployment options for the Finexar application.

## Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- Docker (optional)
- Web server (nginx, Apache, etc.)

## Deployment Options

### 1. Static File Deployment

The simplest deployment method is to build the application and serve the static files.

#### Build the Application

```bash
# Install dependencies
npm ci

# Build for production
npm run build:web
```

#### Deploy to Web Server

1. Copy the contents of `web/dist/` to your web server's document root
2. Configure your web server to serve the files
3. Ensure client-side routing is handled (see nginx configuration below)

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/web/dist;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 2. Docker Deployment

#### Build Docker Image

```bash
docker build -t finexar .
```

#### Run Container

```bash
docker run -d -p 80:80 --name finexar-app finexar
```

#### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### 3. Cloud Deployment

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

#### Netlify

1. Build the application: `npm run build:web`
2. Drag and drop the `web/dist` folder to Netlify
3. Configure redirects for client-side routing

#### AWS S3 + CloudFront

1. Build the application: `npm run build:web`
2. Upload `web/dist` contents to S3 bucket
3. Configure CloudFront distribution
4. Set up custom error pages for client-side routing

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to `production` for production builds
- `PUBLIC_URL`: Base URL for the application (optional)

## Performance Optimization

### Build Analysis

```bash
# Analyze bundle size
npm run build:analyze
```

### Performance Monitoring

The application includes built-in performance monitoring:

- Initial load time tracking
- Language switching performance
- Calculation performance
- Web Vitals monitoring

## Security Considerations

### HTTPS

Always use HTTPS in production:

1. Obtain SSL certificates
2. Configure your web server for HTTPS
3. Redirect HTTP to HTTPS

### Security Headers

The nginx configuration includes security headers:

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

### Content Security Policy

Consider adding a Content Security Policy:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

## Monitoring

### Health Checks

The Docker configuration includes health checks:

```bash
# Check container health
docker ps
```

### Logs

Monitor application logs:

```bash
# Docker logs
docker logs finexar-app

# Docker Compose logs
docker-compose logs -f
```

## Troubleshooting

### Common Issues

1. **404 errors on refresh**: Ensure client-side routing is configured
2. **Slow loading**: Check bundle size and enable compression
3. **CORS errors**: Configure CORS headers if needed

### Debug Mode

Enable debug mode by setting `NODE_ENV=development`:

```bash
NODE_ENV=development npm run build:dev
```

## Backup and Recovery

### Data Backup

The application stores data in browser localStorage. Consider:

1. Implementing server-side backup
2. Export/import functionality
3. Cloud storage integration

### Application Backup

```bash
# Backup build files
tar -czf finexar-backup-$(date +%Y%m%d).tar.gz web/dist/

# Backup source code
git archive --format=tar.gz --output=finexar-source-$(date +%Y%m%d).tar.gz HEAD
```

## Updates

### Rolling Updates

For zero-downtime updates:

1. Build new version
2. Deploy to staging
3. Test thoroughly
4. Deploy to production
5. Monitor for issues

### Version Management

Use semantic versioning:

```bash
# Update version
npm version patch  # or minor, major

# Tag release
git tag v1.0.0
git push origin v1.0.0
```

## Support

For deployment issues:

1. Check the logs
2. Verify configuration
3. Test locally first
4. Contact support team
