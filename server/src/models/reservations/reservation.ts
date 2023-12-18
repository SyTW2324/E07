/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { RestaurantModel } from '../restaurants/restaurants-models.js';
import { UserModel } from '../users/users-model.js';
import { reservationModel } from './reservantions-models.js';
import { Schema } from 'mongoose';

export interface Reservation {
  restaurantId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  day: Date;
}

export function addReservation(reservation: Reservation): boolean {
  const client = UserModel.findById(reservation.clientId);
  const restaurant = RestaurantModel.findById(reservation.restaurantId);
  if (client !== null && restaurant !== null) {
    const newReservation = new reservationModel({
      restaurantId: reservation.restaurantId,
      clientId: reservation.clientId,
      day: reservation.day
    });
    newReservation.save();
    UserModel.findByIdAndUpdate(reservation.clientId, {
      $push: { nextReservations: newReservation._id }
    });
    RestaurantModel.findByIdAndUpdate(reservation.restaurantId, {
      $push: { nextReservations: newReservation._id }
    });
    
    return true;
  }
  return false;
}
