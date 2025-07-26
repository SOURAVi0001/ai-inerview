# AI Interview Project - CORS Fix

This project contains the solution for the CORS (Cross-Origin Resource Sharing) error you're experiencing between your frontend (localhost:5173) and backend (localhost:5000).

## Problem Description

You were getting these errors:
- `Origin http://localhost:5173 is not allowed by Access-Control-Allow-Origin. Status code: 403`
- `XMLHttpRequest cannot load http://localhost:5000/api/interview due to access control checks`
- `Upload failed: AxiosError - Network Error`

## Solution

The CORS issue has been fixed with a comprehensive approach:

### Backend Changes (`backend/app.js`)

1. **Proper CORS Configuration**: Added explicit CORS middleware with:
   - Allowed origins: `localhost:5173`, `127.0.0.1:5173`, and backup ports
   - Credentials support enabled
   - All necessary HTTP methods allowed
   - Required headers configured

2. **Preflight Request Handling**: Added explicit OPTIONS handler for preflight requests

3. **Error Handling**: Added proper error handling middleware

### Frontend Changes (`frontend/src/components/interview.jsx`)

1. **Axios Configuration**: Properly configured axios with:
   - `withCredentials: true`
   - Proper headers
   - Timeout settings

2. **Better Error Handling**: Added specific error messages for different failure scenarios

3. **Debug Information**: Added debug panel to help troubleshoot issues

### Alternative Solution: Vite Proxy (`frontend/vite.config.js`)

As an alternative to direct CORS configuration, you can use Vite's proxy feature which will forward API requests through the Vite dev server, eliminating CORS issues entirely.

## How to Run

### Option 1: Direct API Calls (with CORS fix)

1. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Option 2: Using Vite Proxy (recommended for development)

1. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the Frontend with Proxy**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Then in your frontend code, change API calls from:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000';
   ```
   to:
   ```javascript
   const API_BASE_URL = ''; // Use relative URLs, proxy will handle it
   ```

## Testing the Fix

1. Open your browser to `http://localhost:5173`
2. Open the browser's developer console
3. Click "Test Connection" to verify the API is reachable
4. Click "Test Upload" to verify POST requests work
5. Check the console for detailed logs

## Key CORS Configuration Explained

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',    // Your Vite dev server
    'http://127.0.0.1:5173',   // Alternative localhost
    'http://localhost:3000',   // Backup port
    'http://127.0.0.1:3000'    // Alternative backup
  ],
  credentials: true,           // Allow cookies/auth headers
  optionsSuccessStatus: 200,   // For legacy browser support
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
```

## Troubleshooting

If you're still experiencing issues:

1. **Check if both servers are running**:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

2. **Verify the backend CORS configuration** by checking the console output when starting the server

3. **Use the browser's Network tab** to inspect the actual HTTP requests and responses

4. **Try the Vite proxy approach** if direct CORS configuration doesn't work

5. **Check for any firewall or antivirus software** that might be blocking local connections

## Additional Notes

- The backend now logs all CORS-related information on startup
- The frontend includes detailed error messages to help identify specific issues
- Both approaches (direct CORS + proxy) are provided for maximum compatibility