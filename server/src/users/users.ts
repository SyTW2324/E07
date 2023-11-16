/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import * as mongodb from 'mongodb';

export interface userInterface {
    name: string;
    surname: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
    address: string;
    profilePhoto?: Buffer | null; // Buffer para almacenar los datos binarios de la foto de perfil
    //nextReservations?: Array<mongodb.ObjectId>;
    //previousReservations?: Array<mongodb.ObjectId>;
    _id?: mongodb.ObjectId;
}

export class userClass {
  constructor(
    private name: string,
    private surname: string,
    private userName: string,
    private password: string,
    private email: string,
    private phoneNumber: string,
    private address: string,
    private profilePhoto: Buffer | null,
    //private nextReservations: Array<mongodb.ObjectId>,
    //private previousReservations: Array<mongodb.ObjectId>,
    private _id?: mongodb.ObjectId) {
  }

  getName() {
    return this.name;
  }

  getSurname() {
    return this.surname;
  }

  getUserName() {
    return this.userName;
  }

  getPassword() {
    return this.password;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }

  getEmail() {
    return this.email;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getAddress() {
    return this.address;
  }

  getProfilePhoto() {
    return this.profilePhoto;
  }

  setProfilePhoto(newProfilePhoto: Buffer | null) {
    this.profilePhoto = newProfilePhoto;
  }

  getId() {
    return this._id;
  }

  //getNextReservations() {
  //  return this.nextReservations;
  //}

  //addNextReservation(newReservation: mongodb.ObjectId) {
  //  this.nextReservations.push(newReservation);
  //}

  //getPreviousReservations() {
  //  return this.previousReservations;
  //}

  //addPreviousReservation(newReservation: mongodb.ObjectId) {
  //  this.previousReservations.push(newReservation);
  //}

  getJSON() {
    return {
      name: this.name,
      surname: this.surname,
      userName: this.userName,
      password: this.password,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      profilePhoto: this.profilePhoto,
      //_id: this._id,
      //nextReservations: this.nextReservations,
      //previousReservations: this.previousReservations
    };
  }

}