/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import * as mongodb from 'mongodb';


export interface restaurantInterface {
  userName: string;
  passwd: string;
  email: string;

  _id?: mongodb.ObjectId;
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



export class restaurantClass {
  constructor(
    private userName: string,
    
  )
}