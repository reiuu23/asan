import axios from 'axios';
import { BASE_API } from '../../env';

const BASE_URL = BASE_API;

console.log("BASE_URL: ", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json' // Add this line to parse response as JSON
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    console.error('Axios error:', error); // Log the entire error object
    if (error.response) {
      const { status, data } = error.response;
      console.log('Error response:', data); // Log the error response
      let errorMessages = [];

      if (data.errors) {
        Object.keys(data.errors).forEach(key => {
          const errorArray = data.errors[key];
          errorMessages = errorMessages.concat(errorArray);
        });
      }

      throw new Error(errorMessages);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Error making request');
    }
  }
);


export default axiosInstance;
