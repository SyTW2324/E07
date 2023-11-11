
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import express from 'express';
import { usersRouter } from './routers/users/users-routes.js';




export const app = express();
app.use(express.json());

app.use(usersRouter);