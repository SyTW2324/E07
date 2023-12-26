/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import {Document, Schema, model} from 'mongoose';
import { Available } from '../../available.js';
import { Timetable } from '../../timeTable.js';
import { UserModel } from '../users/users-model.js';
import { reservationsDocumentInterface } from '../reservations/reservantions-models.js';

export interface restaurantsDocumentInterface extends Document {
  userName: string;
  passwd: string;
  email: string;

  restaurantName: string;
  restaurantAddress: string;
  description:string;
  timeTable: Timetable;
  category: string;

  phoneNumber: string;
  profilePicture: string;
  pictures: string[];

  menu: string;
  availability: Available[];
  nextReservations: reservationsDocumentInterface[];
  historicReservations: reservationsDocumentInterface[];
}


const RestaurantSchema = new Schema<restaurantsDocumentInterface>({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  passwd: {
    type: String,
    minlength: 8,
    required: true,
    match: [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one lowercase letter, one uppercase letter and one number' ],
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address' ]
  },
  restaurantName: {
    type: String,
    required: true,
    trim: true
  },
  restaurantAddress: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  timeTable: {
    type: [Object],
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [ /^\d{9}$/, 'Invalid phone number' ]
  },
  profilePicture: {
    type: String,
    required: false,
    trim: true
  },
  pictures: {
    type: [String],
    required: false,
    trim: true
  },
  menu: {
    type: String,
    required: false,
    trim: true
  },
  availability: {
    type: [Object],
    required: true,
    trim: true

  },
  nextReservations: {
    type: [Schema.Types.ObjectId],
    ref: 'Reservation',
    required: false,
    trim: true
  },
  historicReservations: {
    type: [Schema.Types.ObjectId],
    ref: 'Reservation',
    required: false,
    trim: true
  }

});

export const RestaurantModel = model<restaurantsDocumentInterface>('Restaurant', RestaurantSchema);

export async function validateRestaurantSchema(restaurant: restaurantsDocumentInterface): Promise<{ code: number, errors: string }> {
  const existingRestaurant = await RestaurantModel.findOne({
    $or: [
      { userName: restaurant.userName },
      { email: restaurant.email },
      { phoneNumber: restaurant.phoneNumber }
    ]
  });

  // Necesario para comprobar en la base de datos contraria para la unicidad de los datos en toda la app
  const existingUserDatas = await UserModel.findOne({
    $or: [
      { userName: restaurant.userName },
      { email: restaurant.email },
      { phoneNumber: restaurant.phoneNumber }
    ]
  });

  if (existingRestaurant || existingUserDatas) {
    if (existingRestaurant?.userName === restaurant.userName || existingUserDatas?.userName === restaurant.userName) {
      return { code: 2, errors: 'Ya existe ese nombre de usuario' };
    }
    else if (existingRestaurant?.email === restaurant.email || existingUserDatas?.email === restaurant.email) {
      return { code: 3, errors: 'Ya existe ese correo electrónico' };
    }
    else if (existingRestaurant?.phoneNumber === restaurant.phoneNumber || existingUserDatas?.phoneNumber === restaurant.phoneNumber) {
      return { code: 4, errors: 'Ya existe ese número de teléfono' };
    }
  }
  return { code: 0, errors: '' };

}