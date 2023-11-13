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
    private passwdd: string,
    private email: string,

    private restaurantName: string,
    private restaurantAddress: string,
    private description:string,
    private timeTable: string,
    private category: string,

    private phoneNumber: string,
    private pictures: [Buffer | null],
    
    private menu: Buffer | null,
  // private availability: [available];
  // private nextReservations: [reservation];
  // private historicReservations: [reservation];
    private _id?: mongodb.ObjectId
  ) {}
}