/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import * as mongodb from 'mongodb';


export interface restaurantInterface {
  name: string;
  _id?: mongodb.ObjectId;
}