/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 */


// Con este tipo, un restaurante puede introducir un periodo de tiempo y una franja horario para cada día.
// Por ejemplo:
// 01/01/2024 hasta 31/06/2024 de 12:30 a 15:30 se permiten reservas, disponibilidad para 100 personas, dentro del horario del restaurante.

export type availability = {
  // día de inicio
  startDay: string;
  startMonth: string;
  startYear: string;

  // día de fin
  finishDay: string;
  finishMonth: string;
  finishYear: string;

  startingHour: string;
  finishingHour: string;

  numberOfPeople: number; // capacidad de personas en el restaurante.

}

// comprobar que la fecha de finalización es posterior a la de inicio.