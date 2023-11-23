
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import express from 'express';
import { usersRouter } from './routers/users/users-routes.js';
import { restaurantsRouter } from './routers/restaurants/restaurants-routes.js';
import './database/mongoose.js';




export const app = express();
app.use(express.json());





app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Reemplaza con tu origen permitido
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(usersRouter);
app.use(restaurantsRouter)