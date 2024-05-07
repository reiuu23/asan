import axios from 'axios';

const BASE_URL = process.env.BASE_API;

console.log(">:", BASE_URL);
//

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = '';
      if (status >= 400 && status < 500) {
        errorMessage = `Client error ${status}: ${
          data.message || 'Unknown error'
        }`;
      } else if (status >= 500 && status < 600) {
        errorMessage = `Server error ${status}: ${
          data.message || 'Unknown error'
        }`;
      }

      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Error making request');
    }
  }
);

export default axiosInstance;
