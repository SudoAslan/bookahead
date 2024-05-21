import { IRestaurant, Restaurant } from "../model/RestaurantModel";

export class RestaurantService {
    // Restaurant anhand des Namens finden
    static async findByName(name: string): Promise<IRestaurant | null> {
        return await Restaurant.findOne({ name }).exec();
    }

    // Neues Restaurant erstellen
    static async createRestaurant(restaurantData: IRestaurant): Promise<Pick<IRestaurant, "name" | "address">> {
        const restaurant = await Restaurant.create(restaurantData);
        return {
            name: restaurant.name,
            address: restaurant.address
        };
    }

    // Restaurantdaten aktualisieren
    static async updateRestaurant(id: string, newData: Partial<IRestaurant>): Promise<IRestaurant | null> {
        const restaurant = await Restaurant.findById(id).exec();
        if (!restaurant) {
            throw new Error("Restaurant nicht gefunden");
        }

        restaurant.name = newData.name || restaurant.name;
        restaurant.address = newData.address || restaurant.address;
        restaurant.openHours = newData.openHours || restaurant.openHours;
        restaurant.besitzer = newData.besitzer || restaurant.besitzer;

        await restaurant.save();
        return restaurant;
    }

    // Restaurant löschen
    static async deleteRestaurant(id: string): Promise<void> {
        await Restaurant.findByIdAndDelete(id).exec();
    }
}
