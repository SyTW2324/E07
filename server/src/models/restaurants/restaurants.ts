import { RestaurantModel } from "./restaurants-models.js"
import { reservationModel } from "../reservations/reservantions-models.js";

export async function addHistoricReservations(userName: string): Promise<boolean> {
  try {

    console.log("addHistoricReservations");
    const user = await RestaurantModel.findOne({ userName: userName });
    if (user === null) return false;
    const nextReservations = user.nextReservations;
    for (let i = 0; i < nextReservations.length; i++) {
      const reservationId = nextReservations[i];
      const reservation = await reservationModel.findById(reservationId);
      console.log("reservation ", reservation);
      if (reservation === null) return false;
      const reservationDate = new Date(reservation.day);
      const currentDate = new Date();
      console.log("reservation date ", reservationDate);
      console.log("current date ", currentDate);
      if (reservationDate < currentDate) {
        console.log("actualizando reserva")
        await RestaurantModel.findOneAndUpdate({ userName: userName }, {
          $push: { historicReservations: reservationId }
        });
        await RestaurantModel.findOneAndUpdate({ userName: userName }, {
          $pull: { nextReservations: reservationId }
        });
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}