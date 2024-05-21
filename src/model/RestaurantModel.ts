import { Schema, model, Types} from "mongoose";

//type für das Interface weil wir es als value brauchen
type Address = {
    street: string,
    number: number,
    city: string,
    postal:number,
};

export interface IRestaurant {
    name: string;
    address: Address;
    openHours?: string;
    besitzer: Types.ObjectId;
    //menu: string; keine Ahnung ob man das Menu per interface defniert

}
// nochmal als Schema weil wir es als type brauchen
const AddressSchema = new Schema({
    street: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String, required: true },
    postal: { type: Number, required: true },
});

const restaurantSchema = new Schema <IRestaurant> ({
    name: {type: String, required: true},
    address: {type: AddressSchema, required: true},
    openHours: {type: String},
    besitzer: {type: Schema.Types.ObjectId, ref: "Besitzer",required: true},
});

export const Restaurant = model ("Restaurant", restaurantSchema);