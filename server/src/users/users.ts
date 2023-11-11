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

  getId() {
    return this._id;
  }

}