// First we need to import axios.js
import axios from 'axios';

// Make instance of axios
const instance = axios.create({
    baseURL: 'http://localhost:4000/'
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;