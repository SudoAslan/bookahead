import { Schema, model, Types} from "mongoose";

export interface IBesitzer {
    name: string;
    password: string;
    email: string;
    /*ich weiß nicht ob wir restaurant hier nennen oder wie es funktionieren soll, 
    aber halt nennen von welchem Laden er ist, Im restaurantmodel ist halt auch besitzer aufgeführt
    weiß nicht ob man dann besitzer nennen muss
    restaurant: Types.ObjectId;*/
}

const besitzerSchema = new Schema <IBesitzer> ({
    name:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
})

export const Besitzer = model ("Besitzer", besitzerSchema);