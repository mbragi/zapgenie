#!/bin/bash

# Build Frontend Script for ZapGenie
# This script builds the React frontend (served from frontend/dist)

set -e

echo "🚀 Building ZapGenie Frontend..."

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found. Please clone the frontend repository first."
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Build the frontend
echo "🔨 Building frontend..."
npm run build

# Go back to root directory
cd ..

echo "✅ Frontend build completed successfully!"
echo "📂 Built files are in frontend/dist (served directly by the server)"