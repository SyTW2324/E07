/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */
import express from 'express';

import { reservationModel } from '../../models/reservations/reservantions-models.js';
import { UserModel } from '../../models/users/users-model.js';
import { RestaurantModel } from '../../models/restaurants/restaurants-models.js';

import jsonwebtoken from 'jsonwebtoken';
import { secretKey } from '../../env-variables.js';
import { jwtDecode } from 'jwt-decode';
import { Schema } from 'mongoose';
 
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

reservationsRouter.delete('/reservations/', async (req, res) => {
  try{
    console.log("DELETE /reservations recibido fuera del try")
    if (req.query.token && req.query.userName && req.query.reservationId) {
      const verified = jsonwebtoken.verify(req.query.token as string, secretKey);
      if (verified) {
        const decodedToken = jwtDecode(req.query.token as string);
        console.log(decodedToken);
        if (Number(decodedToken.exp) > (Date.now() / 1000)) {
          const reservation = await reservationModel.findById(req.query.reservationId);
          if (reservation !== null) {
            const deleteUserReservation = await UserModel.findByIdAndUpdate(reservation.clientId, {$pull: {nextReservations: req.query.reservationId}});
            const deleteRestaurantReservation = await RestaurantModel.findByIdAndUpdate(reservation.restaurantId, {$pull: {nextReservations: req.query.reservationId}});
            if (deleteRestaurantReservation !== null && deleteUserReservation !== null) {
              return res.status(200).send({code: 0, message: "Reserva cancelada correctamente"});
            } else {
              return res.status(500).send({code: 3, message: "Error al cancelar la reserva el usuario o restaurante no tienen dicha reserva"});
            }
          } else {
            return res.status(404).send({code: 1, message: "No se ha encontrado la reserva indicada"});
          }

        } else {
          return res.status(400).send({code: 2, message: "Token expirado"});
        }
      } else {
        return res.status(400).send({code: 4, message: "Token inválido"});
      }
      
    } else {
      return res.status(400).send({code: 5, message: "Falta parámetro en la query"});
    }

  }  
  catch{
    console.log("DELETE /reservations recibido dentro del catch")
    return res.status(500).send();
  }
}
);


