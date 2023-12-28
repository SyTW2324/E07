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
import { Timetable } from '../../timeTable.js';


import { calcularPeriodosDisponibles } from '../../models/reservations/reservation.js';
import { Available } from '../../available.js';
 
export const reservationsRouter = express.Router();



// Tengo que pasarle un dia, para ese dia calcular los periodos disponibles y devolverlos, 
//pero hay que comprobar que no haya ninguna reserva para ese dia y esa hora 
reservationsRouter.get('/reservationsAvilable/', async (req, res) => {


  try {
    if (req.query.RestaurantName && req.query.day)  {
      const restaurant = await RestaurantModel.findOne({restaurantName: req.query.RestaurantName});
      
      let availableHours; //array de strings con los periodos disponibles
      
      //el day es 00/00/0000
      const day = new Date(req.query.day as string);


      if (restaurant !== null) {

        const Timetable = restaurant.timeTable as unknown as [Timetable];
        const availability = restaurant.availability as unknown as [Available];
        
        const startingHour = Timetable?.at(0)?.startingHour as string;
        const finishingHour = Timetable?.at(0)?.finishingHour as string;
        const timePeriod = availability?.at(0)?.timePeriod as number;


        const periodosDisponibles = calcularPeriodosDisponibles(startingHour , finishingHour, timePeriod);
        availableHours = periodosDisponibles;

 
        const reservations = await reservationModel.find({restaurantId: restaurant._id});

        //recorro las reservas y voy eliminando los periodos que ya esten ocupados en el mismo dia

        for (let i = 0; i < reservations.length; i++) {

          const reservation = reservations[i];
          const reservationDay = reservation.day as Date
          //si el dia de la reserva es el mismo que el que me han pasado por query

          if (reservationDay.getDate() === day.getDate() && reservationDay.getMonth() === day.getMonth() && reservationDay.getFullYear() === day.getFullYear()) {
            const reservationDayString = reservationDay.toLocaleDateString();
            //Saco la hora y los minutos de la reserva
            const reservationHour = reservationDay.getHours();
            const reservationMinutes = reservationDay.getMinutes();
            // los junto en este formato 00:00
            const reservationHourString = reservationHour + ":" + reservationMinutes;

            //recorro el array de periodos disponibles y voy eliminando los que coincidan con la reserva
            for (let i = 0; i < availableHours.length; i++) {
              const availableHour = availableHours[i];

              if (availableHour.includes(reservationHourString)) {
                availableHours.splice(i, 1);
              }
            }
          }


        
        }

        

        return res.status(200).send({code: 0, message: availableHours});

      } 

      

      
    }
    return res.status(404).send({code: 1, message: "No se ha encontrado los dias libres del restaurante indicado"});
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
reservationsRouter.get('/reservations/', async (req, res) => {

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


reservationsRouter.post('/reservations/', async (req, res) => {
  try{
    if (req.body.token && req.body.userName && req.body.restaurantName && req.body.day) {
      const verified = jsonwebtoken.verify(req.body.token as string, secretKey);
      if (verified) {
        const decodedToken = jwtDecode(req.body.token as string);
        if (Number(decodedToken.exp) > (Date.now() / 1000)) {
          const user = await UserModel.findOne({userName: req.body.userName});
          const restaurant = await RestaurantModel.findOne({restaurantName: req.body.restaurantName});
          if (user !== null && restaurant !== null) {
            const newReservation = new reservationModel({
              clientId: user._id,
              restaurantId: restaurant._id,
              day: req.body.day
            });
            const savedReservation = await newReservation.save();
            if (savedReservation !== null) {
              const updateUserReservations = await UserModel.findByIdAndUpdate(user._id, {$push: {nextReservations: savedReservation._id}});
              const updateRestaurantReservations = await RestaurantModel.findByIdAndUpdate(restaurant._id, {$push: {nextReservations: savedReservation._id}});
              if (updateRestaurantReservations !== null && updateUserReservations !== null) {
                return res.status(200).send({code: 0, message: "Reserva realizada correctamente"});
              } else {
                return res.status(500).send({code: 3, message: "Error al realizar la reserva"});
              }
            } else {
              return res.status(500).send({code: 2, message: "Error al realizar la reserva"});
            }
          } else {
            return res.status(404).send({code: 1, message: "No se ha encontrado el usuario o restaurante indicado"});
          }
        } else {
          return res.status(400).send({code: 4, message: "Token expirado"});
        }
      } else {
        return res.status(400).send({code: 5, message: "Token inválido"});
      }
    } else {
      return res.status(400).send({code: 6, message: "Falta parámetro en el body"});
    }
  }
  catch{
    return res.status(500).send();
  }
}
);

reservationsRouter.delete('/reservations/', async (req, res) => {
  try{
    if (req.query.token && req.query.userName && req.query.reservationId) {
      const verified = jsonwebtoken.verify(req.query.token as string, secretKey);
      if (verified) {
        const decodedToken = jwtDecode(req.query.token as string);
        if (Number(decodedToken.exp) > (Date.now() / 1000)) {
          const reservation = await reservationModel.findById(req.query.reservationId);
          if (reservation !== null) {
            const deleteUserReservation = await UserModel.findByIdAndUpdate(reservation.clientId, {$pull: {nextReservations: req.query.reservationId}});
            const deleteRestaurantReservation = await RestaurantModel.findByIdAndUpdate(reservation.restaurantId, {$pull: {nextReservations: req.query.reservationId}});
            const deleteReservation = await reservationModel.findByIdAndDelete(req.query.reservationId);
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
    return res.status(500).send();
  }
}
);


