const axios = require('axios');

// Create an Axios instance with your default configuration
const instance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY', // Add custom headers if needed
  },
});

module.exports = instance;
