import axiosInstance from './axiosInstance';
import RNFetchBlob from 'rn-fetch-blob'; // Import RNFetchBlob for file handling

export const createScrapData = async data => {
  const formData = new FormData();
  formData.append('warehouse_id', data.warehouse_id);
  formData.append('scrap_category', data.scrap_category);
  formData.append('scrap_name', data.scrap_name);
  formData.append('scrap_volume', data?.scrap_volume);
  formData.append('scrap_price_per_kg', data.scrap_price_per_kg);
  formData.append('scrap_total_weight', data.scrap_total_weight);
  switch (data.scrap_category) {
    case 'Plastic':
      formData.append('scrap_bar_color', '#E9D985');
      break;
    case 'White Paper':
      formData.append('scrap_bar_color', '#FF7961');
      break;
    case 'Selected Paper':
      formData.append('scrap_bar_color', '#FFC7C7');
      break;
    case 'Karton Paper':
      formData.append('scrap_bar_color', '#A486E2');
      break;
    case 'Mixed Paper':
      formData.append('scrap_bar_color', '#9DE9D7');
      break;
    case 'Solid Metal':
      formData.append('scrap_bar_color', '#57B8FF');
      break;
    case 'Assorted Metal':
      formData.append('scrap_bar_color', '#3E5A47');
      break;
    default:
      console.log('Invalid Scrap Category');
  }

  if (data.scrap_image) {
    try {
      const image = data.scrap_image;

      console.log('image uri: ', image.path);
      console.log('image mime: ', image.mime);

      const filename = image.path.split('/').pop();

      console.log('image filename: ', filename);

      formData.append('scrap_image', {
        uri: image.path,
        type: image.mime,
        name: filename
      });
    } catch (error) {
      console.error('Error reading image file:', error);
    }
  }

  formData.append('scrap_stock_count', data.scrap_stock_count);

  return formData;
};


export const submitScrapData = async (data, token) => {
  try {
    const response = await axiosInstance.post('/api/v1/scrapdata/create', data, {
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

export const updateScrapData = async (scrapId, data, token) => {
  try {
    const response = await axiosInstance.post(`/api/v1/scrapdata/update/${scrapId}`, data, {
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

export const getScrapData = async (warehouseId, token) => {
  try {
    const response = await axiosInstance.get(`/api/v1/scrapdata/warehouse/${warehouseId}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const getWarehouseSummary = async (warehouseId, token) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/scrapdata/summary/${warehouseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteScrapData = async (scrapId, token) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/scrapdata/delete/${scrapId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}