import axiosInstance from './axiosInstance';

export const index = async token => {
  try {
    const response = await axiosInstance.get('/api/v1/warehouse', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
