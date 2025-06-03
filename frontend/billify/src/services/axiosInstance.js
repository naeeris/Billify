import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 

});

// Interceptor para añadir el token JWT automáticamente a cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Guardas el token al hacer login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Formato para DRF + JWT	
  }
  return config;
});

// Interceptor para manejar expiración de token y redirección
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Mostrar aviso al usuario
      toast.warning("Your session has expired. Please log in again.");

      // Eliminar tokens y redirigir
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;