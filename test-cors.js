const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testCORS() {
  console.log('🧪 Testing CORS Configuration...\n');

  try {
    // Test 1: GET request
    console.log('1. Testing GET request...');
    const getResponse = await axios.get(`${API_BASE_URL}/api/interview`, {
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });
    console.log('✅ GET request successful:', getResponse.data);
    console.log('   CORS headers:', {
      'Access-Control-Allow-Origin': getResponse.headers['access-control-allow-origin'],
      'Access-Control-Allow-Credentials': getResponse.headers['access-control-allow-credentials']
    });

    // Test 2: POST request
    console.log('\n2. Testing POST request...');
    const postResponse = await axios.post(`${API_BASE_URL}/api/interview`, 
      { test: 'data', timestamp: new Date().toISOString() },
      {
        headers: {
          'Origin': 'http://localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ POST request successful:', postResponse.data);

    // Test 3: OPTIONS request (preflight)
    console.log('\n3. Testing OPTIONS request (preflight)...');
    const optionsResponse = await axios.options(`${API_BASE_URL}/api/interview`, {
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ OPTIONS request successful');
    console.log('   Preflight headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
      'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers']
    });

    console.log('\n🎉 All CORS tests passed! Your configuration is working correctly.');
    
  } catch (error) {
    console.error('❌ CORS test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Headers:', error.response.headers);
    }
    console.log('\n💡 Make sure the backend server is running on port 5000');
  }
}

// Run the test
testCORS();