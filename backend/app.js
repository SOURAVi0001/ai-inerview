const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow requests from frontend
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// API routes
app.get('/api/interview', (req, res) => {
  res.json({ 
    message: 'Interview API endpoint working',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/interview', (req, res) => {
  console.log('Received interview data:', req.body);
  res.json({ 
    success: true, 
    message: 'Interview data received successfully',
    data: req.body
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('CORS enabled for:', corsOptions.origin);
});