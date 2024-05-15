import axiosInstance from './axiosInstance';

export const login = async data => {
  try {
    const response = await axiosInstance.post('/api/login', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async data => {
  try {
    const response = await axiosInstance.post('/api/register', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestVerification = async (data, userId, token) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/users/verification/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data, userId, token) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/users/update/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
