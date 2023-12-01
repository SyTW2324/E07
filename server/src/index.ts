/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { app } from './app.js';
import cors from 'cors';

import {port} from './env-variables.js';
import { ip_express_despliegue } from './env-variables.js';
import { ip_express_dev } from './env-variables.js';

let ip_express = "";

if (process.argv[3] === 'despliegue') {
  ip_express = ip_express_despliegue;
} else {
  ip_express = ip_express_dev;
}

// Resto de la configuración del servidor


app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Reemplaza con tu origen permitido
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});


app.listen(port, () => {
  console.log(`Server is up on ip ${ip_express} and port ${port}`);
});

