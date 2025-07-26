#!/bin/bash

echo "🚀 Starting AI Interview Project Servers..."

# Function to cleanup processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up cleanup trap
trap cleanup SIGINT SIGTERM

# Start backend server
echo "📡 Starting backend server on port 5000..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🌐 Starting frontend server on port 5173..."
cd frontend
npm install > /dev/null 2>&1 || echo "⚠️  Frontend dependencies not installed. Run 'cd frontend && npm install' first."
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers started!"
echo "📡 Backend:  http://localhost:5000"
echo "🌐 Frontend: http://localhost:5173"
echo "📋 API Endpoint: http://localhost:5000/api/interview"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for processes
wait