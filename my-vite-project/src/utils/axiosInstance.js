import axios from 'axios';


const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: {
            'Content-Type': 'application/json',
      },

});


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


axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response.status === 401) {

                  console.error('Unauthorized, redirecting to login...');
            }
            return Promise.reject(error);
      }
);

export default axiosInstance;
