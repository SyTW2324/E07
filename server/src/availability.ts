/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */


// Con este tipo, un restaurante puede introducir un periodo de tiempo y una franja horario para cada día.
// Por ejemplo:
// 01/01/2024 hasta 31/06/2024 de 12:30 a 15:30 se permiten reservas, disponibilidad para 100 personas, dentro del horario del restaurante.

export type Availability = {
  start: Date;
  finish: Date;
  startingHour: string;
  finishingHour: string;
  numberOfPeople: number;
};

export function validateAvailability(avail: Availability): boolean {
  // Verificar si la fecha de inicio es anterior a la fecha de finalización
  return avail.start < avail.finish;
}

// comprobar que la fecha de finalización es posterior a la de inicio.
