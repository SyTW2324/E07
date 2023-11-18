/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import * as mongodb from 'mongodb';

export interface loginInterface {
    userName: string;
    password: string;
}

export class loginClass {
  constructor(
    private userName: string,
    private password: string) {
  }

  getUserName() {
    return this.userName;
  }

  getPassword() {
    return this.password;
  }

  getJSON() {
    return {
      userName: this.userName,
      password: this.password
    };
  }

}