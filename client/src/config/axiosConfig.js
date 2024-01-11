// First we need to import axios.js
import axios from 'axios';

// Make instance of axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'REACT_APP_API_BASE_URL_NOT_SET',
});

// Interceptor for adding a jwt token to each request
instance.interceptors.request.use(
    (config) => {
      let jwtToken = localStorage.getItem("authToken");
      const auth = jwtToken ? `Bearer ${jwtToken}` : '';
      config.headers['Authorization'] = auth;
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Interceptor for unauthorized requests
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Check if the error status is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Redirect to the login page
        window.location.href = '/login'; // Use window.location.href for a full page reload
      }
      return Promise.reject(error);
    }
  );

  // Interceptor for unauthorized requests
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Check if the error status is 401 (Unauthorized)
      if (error.response && error.response.status === 403) {
        // Redirect to the login page
        window.location.href = '/login'; // Use window.location.href for a full page reload
      }
      return Promise.reject(error);
    }
  );
  

export default instance;