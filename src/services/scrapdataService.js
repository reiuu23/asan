import axiosInstance from './axiosInstance';

export const createScrapData = data => {
  const formData = new FormData();
  formData.append('warehouse_id', data.warehouse_id);
  formData.append('scrap_category', data.scrap_category);
  formData.append('scrap_name', 'Test White Paper');
  formData.append('scrap_volume', '1 Axzx');
  formData.append('scrap_cost', '20');
  formData.append('scrap_quantity', '22');
  Object.keys(data).forEach(key => {
    if (key === 'scrap_image') {
      const uriParts = data[key].split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append(key, {
        uri: data[key],
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const submitScrapData = async (data, token) => {
  try {
    const response = await axiosInstance.post('/api/v1/scrapdata', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
