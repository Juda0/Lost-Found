// First we need to import axios.js
import axios from 'axios';

// Make instance of axios
const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

instance.interceptors.request.use(
    (config) => {
      let jwtToken = localStorage.getItem("authToken");
      const auth = jwtToken ? `Bearer ${jwtToken}` : '';
      config.headers['Authorization'] = auth;
      return config;
    },
    (error) => Promise.reject(error),
  );

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;