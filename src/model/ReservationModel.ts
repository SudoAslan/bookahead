import { Schema, model, Types} from "mongoose";

export interface IReservation{
    // Datum, Zeit, anzahl der Gäste wichtig für eine Reservierung
    date: Date
    time: number
    guest: number
    //createdAt wichtig für den Restaurant inhaber? damit er sieht wann die Reservierung gemacht wurde
    createdAt?: Date
    //kommentar wichtig für extra anmerkung (Kinderwagen/Rollstuhl)
    comment?: string
    //wer hat Reservierung gemacht und wo
    user: Types.ObjectId
    restaurant: Types.ObjectId;

}

const reservationSchema = new Schema<IReservation>({
    date: {type: Date, required: true},
    time: {type: Number, required: true},
    guest: {type: Number, required: true},
    createdAt: {type: Date}, 
    comment: {type: String},
    user: {type: Schema.Types.ObjectId, ref:"User" ,required: true},
    restaurant: {type: Schema.Types.ObjectId, ref:"Restaurant" , required: true},

}, {timestamps:true});

export const Reservation = model ("Reservation", reservationSchema);