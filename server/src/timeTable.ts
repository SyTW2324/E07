export interface Timetable {
  selectedDays: string[]; // Array de días seleccionados (por ejemplo, ['Lunes', 'Miércoles'])
  startingHour: string | null; // Hora de inicio en formato de cadena (por ejemplo, '10:00')
  finishingHour: string | null; // Hora de finalización en formato de cadena (por ejemplo, '14:00')
}