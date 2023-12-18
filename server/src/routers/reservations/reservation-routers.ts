/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { reservationModel } from '../../models/reservations/reservantions-models.js';
import { UserModel } from '../../models/users/users-model.js';
import { RestaurantModel } from '../../models/restaurants/restaurants-models.js';
 
export const reservationsRouter = express.Router();

reservationsRouter.get('/reservations/', async (req, res) => {
  console.log("GET /reservations recibido fuera del try")
  console.log(req.body);

  try {
    if (req.query.id) {
      const reservation = await reservationModel.findById(req.query.id);
      if (reservation !== null) {
        const user = await UserModel.findById(reservation.clientId);
        const restaurant = await RestaurantModel.findById(reservation.restaurantId);
        if (user !== null && restaurant !== null) {
          const reservationMessage = {
            restaurant: restaurant.restaurantName,
            client: user.userName,
            day: reservation.day
          }
          return res.status(200).send({code: 0, message: reservationMessage});
        }

      }
    }
    return res.status(404).send({code: 1, message: "No se ha encontrado la reserva indicada"});
  }
  catch(error) {
    return res.status(500).send(
      {
        error: error.message,
        stack: error.stack
      }
    );
  }
}
);



