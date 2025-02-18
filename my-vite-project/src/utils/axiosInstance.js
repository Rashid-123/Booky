import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api', // Your base URL
      headers: {
            'Content-Type': 'application/json',
      },
      // timeout: 5000, // Optional timeout setting
});

// Optional: Add an interceptor for requests (e.g., attach an auth token)
axiosInstance.interceptors.request.use(
      (config) => {
            // Add auth token from localStorage or context if available
            const token = localStorage.getItem('token'); // Replace with your token storage method
            if (token) {
                  config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

// Optional: Add an interceptor for responses
axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response.status === 401) {
                  // Handle unauthorized error (e.g., redirect to login)
                  console.error('Unauthorized, redirecting to login...');
            }
            return Promise.reject(error);
      }
);

export default axiosInstance;
