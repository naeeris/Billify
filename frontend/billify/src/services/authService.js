import axios from './axiosInstance'; 

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/token/', credentials);
    console.log("Respuesta del login:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};