import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Asegúrate de que coincida con tu backend

});

// Interceptor para añadir el token JWT automáticamente a cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Asume que guardas el token al hacer login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Formato para DRF + JWT	
  }
  return config;
});

export default axiosInstance;