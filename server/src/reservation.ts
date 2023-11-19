/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { Available } from "./available.js";

export type Reservation = {
  restaurant: string; // Nombre del establecimiento
  clientUserName: string; // Nombre de usuario del cliente
  numberOfPeople: number; // Número de personas para la reserva
  date: Date; // Día y hora de la reserva
};
