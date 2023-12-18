/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import {Document, Schema, model, mongo} from 'mongoose';
import { restaurantsDocumentInterface } from '../restaurants/restaurants-models.js';
import { userDocumentInterface } from '../users/users-model.js';


export interface reservationsDocumentInterface extends Document{
  restaurantId: restaurantsDocumentInterface;
  clientId: userDocumentInterface;
  day: Date;
}


const ReservationSchema = new Schema<reservationsDocumentInterface>({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: Date,
    required: true
  }
});

export const reservationModel = model<reservationsDocumentInterface>('Reservation', ReservationSchema);
