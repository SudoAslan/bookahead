import { IReservation, Reservation } from "../model/ReservationModel";

export function createReservation(reservationData: IReservation): Promise<IReservation> {
    if (!reservationData.date || !reservationData.time || !reservationData.guest || !reservationData.user || !reservationData.restaurant) {
        throw new Error("Ungültige Reservierungsdaten. Datum, Uhrzeit, Gästeanzahl, Benutzer und Restaurant sind erforderlich.");
    }

    return Reservation.create(reservationData);
}

export async function updateReservation(id: string, newData: Partial<IReservation>): Promise<IReservation | null> {
    const reservation = await Reservation.findById(id).exec();
    if (!reservation) {
        throw new Error("Reservierung nicht gefunden");
    }

    reservation.date = newData.date || reservation.date;
    reservation.time = newData.time || reservation.time;
    reservation.guest = newData.guest || reservation.guest;
    reservation.comment = newData.comment || reservation.comment;

    await reservation.save();
    return reservation;
}

export async function deleteReservation(id: string): Promise<void> {
    await Reservation.findByIdAndDelete(id).exec();
}
