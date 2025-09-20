#!/bin/bash

# Finexar Deployment Script
echo "🚀 Starting Finexar deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

# Type checking
echo "🔧 Running type checking..."
npm run type-check

# Build for production
echo "🏗️ Building for production..."
npm run build:web

# Check if build was successful
if [ ! -d "web/dist" ]; then
    echo "❌ Error: Build failed. web/dist directory not found."
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf finexar-deployment.tar.gz -C web dist

echo "✅ Deployment package created: finexar-deployment.tar.gz"
echo "📊 Build size:"
du -sh web/dist/*

echo "🎉 Deployment ready!"
echo "📁 Files to deploy: web/dist/"
echo "🌐 Upload the contents of web/dist/ to your web server"
