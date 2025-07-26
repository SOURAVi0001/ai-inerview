import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const Interview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleUpload = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Making API request to:', `${API_BASE_URL}/api/interview`);
      
      const config = {
        method: 'POST',
        url: `${API_BASE_URL}/api/interview`,
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        timeout: 10000, // 10 second timeout
      };

      const result = await axios(config);
      console.log('Upload successful:', result.data);
      setResponse(result.data);
      
    } catch (err) {
      console.error('Upload failed:', err);
      
      if (err.code === 'ERR_NETWORK') {
        setError('Network error: Unable to connect to the server. Please check if the backend is running on port 5000.');
      } else if (err.response?.status === 403) {
        setError('CORS error: The server is not allowing requests from this origin. Please check the backend CORS configuration.');
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please check if the /api/interview route exists.');
      } else {
        setError(`Upload failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await axios.get(`${API_BASE_URL}/api/interview`);
      console.log('Connection test successful:', result.data);
      setResponse(result.data);
    } catch (err) {
      console.error('Connection test failed:', err);
      setError(`Connection test failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-component">
      <h2>AI Interview</h2>
      
      <div className="controls">
        <button 
          onClick={testConnection} 
          disabled={loading}
          className="test-btn"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
        
        <button 
          onClick={() => handleUpload({ test: 'data', timestamp: new Date().toISOString() })} 
          disabled={loading}
          className="upload-btn"
        >
          {loading ? 'Uploading...' : 'Test Upload'}
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div className="response-message" style={{ color: 'green', margin: '10px 0' }}>
          <strong>Success:</strong>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div className="debug-info">
        <h3>Debug Information:</h3>
        <p><strong>Frontend URL:</strong> {window.location.origin}</p>
        <p><strong>Backend URL:</strong> {API_BASE_URL}</p>
        <p><strong>API Endpoint:</strong> {API_BASE_URL}/api/interview</p>
      </div>
    </div>
  );
};

export default Interview;