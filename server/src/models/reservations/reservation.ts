/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */

import { RestaurantModel } from '../restaurants/restaurants-models.js';
import { UserModel } from '../users/users-model.js';
import { reservationModel } from './reservantions-models.js';
import { Schema } from 'mongoose';

export interface Reservation {
  restaurantId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  day: Date;
}

export function calcularPeriodosDisponibles(startingHour: string, finishingHour: string, timePeriod: number): string[] {
  // Convertir las horas de apertura y cierre a objetos Date para facilitar la manipulación
  const startTime = new Date(`2000-01-01T${startingHour}:00`);
  if (finishingHour === '00:00') finishingHour = '24:00';
  const endTime = new Date(`2000-01-01T${finishingHour}:00`);

  // Calcular la cantidad total de minutos disponibles durante el horario de apertura
  const totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

  // Calcular la cantidad de periodos disponibles
  const numberOfPeriods = Math.floor(totalMinutes / timePeriod);

  // Calcular los periodos disponibles y almacenarlos en un array de strings
  const availablePeriods: string[] = [];
  let currentPeriodTime = startTime;

  for (let i = 0; i < numberOfPeriods; i++) {
      const periodEndTime = new Date(currentPeriodTime.getTime() + timePeriod * 60 * 1000);
      //quitarle un minuto para que no se solapen los periodos
      periodEndTime.setMinutes(periodEndTime.getMinutes() - 1);
      availablePeriods.push(`${formatTime(currentPeriodTime)} - ${formatTime(periodEndTime)}`);
      periodEndTime.setMinutes(periodEndTime.getMinutes() + 1);
      currentPeriodTime = periodEndTime;
  }
  return availablePeriods;
  
}

// Función auxiliar para formatear la hora en formato HH:mm
function formatTime(time: Date): string {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
