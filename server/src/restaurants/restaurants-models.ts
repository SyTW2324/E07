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