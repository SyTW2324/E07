/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import {Document, Schema, model} from 'mongoose';

interface restaurantsDocumentInterface {
  userName: string;
  passwd: string;
  email: string;

  restaurantName: string;
  restaurantAddress: string;
  description:string;
  timeTable: string;
  category: string;

  phoneNumber: string;
  pictures: [Buffer | null];

  menu: Buffer | null;
  // availability: [available];
  // nextReservations: [reservation];
  // historicReservations: [reservation];
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
    required: true,
    trim: true
  },
  timeTable: {
    type: String,
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
  pictures: {
    type: [Buffer],
    required: false,
    trim: true
  },
  menu: {
    type: Buffer,
    required: false,
    trim: true
  }
  // ,
  // availability: { // cambiar interior
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // nextReservations: { // cambiar interior
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  // historicReservations: { // cambiar interior
  //   type: String,
  //   required: true,
  //   trim: true
  // }

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

  if (existingRestaurant) {
    if (existingRestaurant.userName === existingRestaurant.userName) {
      return { code: 2, errors: 'Ya existe un restaurante con ese nombre de usuario' };
    }
    else if (existingRestaurant.email === existingRestaurant.email) {
      return { code: 3, errors: 'Ya existe un restaurante con ese correo electrónico' };
    }
    else if (existingRestaurant.phoneNumber === existingRestaurant.phoneNumber) {
      return { code: 4, errors: 'Ya existe un restaurante con ese número de teléfono' };
    }
  }

  return { code: 0, errors: '' };


}