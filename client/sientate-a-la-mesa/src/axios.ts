// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',  // Reemplaza con tu URL de servidor
  timeout: 5000,  // Tiempo de espera en milisegundos
  withCredentials: true,  // Incluye las cookies en la solicitud (si es necesario)
});

// Configuración de interceptores para manejar las cabeceras CORS
instance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = 'Bearer tu-token'; // Incluye esto si es necesario
  return config;
});

export default instance;
