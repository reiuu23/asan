import axiosInstance from './axiosInstance';

export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/api/login', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await axiosInstance.post('/api/register', data);
    return response;
  } catch (error) {
    throw error;
  }
}
