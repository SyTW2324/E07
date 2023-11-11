/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { app } from './app.js';

import {port} from './env-variables.js';

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

