import axios from 'axios';

export const axiosBase = 'http://localhost:3001';
// Set the base URL for all requests
axios.defaults.baseURL = axiosBase; // Replace with your actual base URL

export default axios;
