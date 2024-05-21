import { Schema, model, Types } from "mongoose";

// Brauchen es für das Interface als Wert
type Address = {
    street: string,
    number: number,
    city: string,
    postal: number,
};

export interface IUser {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string; // Jetzt optional
    age?: number;
    lastName?: string;
    address?: Address;
    id?: string;
}

// Nochmal als Schema, weil wir es als Typ für unser Schema brauchen
const AddressSchema = new Schema({
    street: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String, required: true },
    postal: { type: Number, required: true }
});

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }, // Für die Registrierung erforderlich
    age: { type: Number },
    lastName: { type: String },
    address: { type: AddressSchema },
    id: { type: String },
}, { strict: false }); // Erlaubt das Speichern von Dokumenten mit fehlenden Feldern

export const User = model("User", userSchema);
