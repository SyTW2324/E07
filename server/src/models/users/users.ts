import { UserModel } from "./users-model.js"
import { reservationModel } from "../reservations/reservantions-models.js";

export async function addHistoricReservations(userName: string): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ userName: userName });
    if (user === null) return false;
    const nextReservations = user.nextReservations;
    for (let i = 0; i < nextReservations.length; i++) {
      const reservationId = nextReservations[i];
      const reservation = await reservationModel.findById(reservationId);
      if (reservation === null) return false;
      const reservationDate = new Date(reservation.day);
      const currentDate = new Date();
      if (reservationDate < currentDate) {
        await UserModel.findOneAndUpdate({ userName: userName }, {
          $push: { historicReservations: reservationId }
        });
        await UserModel.findOneAndUpdate({ userName: userName }, {
          $pull: { nextReservations: reservationId }
        });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}