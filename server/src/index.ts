/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { app } from './app.js';

import {port} from './env-variables.js';
import { ip_express_despliegue } from './env-variables.js';
import { ip_express_dev } from './env-variables.js';

let ip_express = ip_express_despliegue;
let portNumber = port;
if (process.argv[2] === 'dev') {
  ip_express = ip_express_dev;
} else if (process.argv[2] === 'test') {
  ip_express = ip_express_dev
} else if (process.argv[2] === 'deploy') {
  portNumber = 3000;
}

// Resto de la configuración del servidor

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Reemplaza con tu origen permitido
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});


app.listen(portNumber, () => {
  console.info(`Server is up on port ${portNumber}`);
});

while (true) {const a = 1;}
//
