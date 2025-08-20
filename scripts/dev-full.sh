#!/bin/bash

# Full Stack Development Script for ZapGenie
# This script runs both frontend and backend in development mode

set -e

echo "🚀 Starting ZapGenie Full Stack Development..."

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found. Please clone the frontend repository first."
    exit 1
fi

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend in development mode
echo "🔧 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in development mode
echo "⚛️  Starting frontend development server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Development servers started!"
echo "🌐 Backend: http://localhost:3000"
echo "⚛️  Frontend: http://localhost:8080"
echo "📝 Press Ctrl+C to stop all servers"

# Wait for background processes
wait 