import axiosInstance from './axiosInstance';

export const updateSubscriptionStatus = async (userId, data, token) => {
  try {
    const response = await axiosInstance.post(
      `api/v1/users/subscription/update/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
