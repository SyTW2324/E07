/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { app } from './app.js';

import {port} from './env-variables.js';
import { ip_express } from './env-variables.js';

app.listen(port, ip_express, () => {
  console.log(`Server is up on ip ${ip_express} and port ${port}`);
});

