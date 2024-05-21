import { connect, Types } from 'mongoose';
import { RestaurantService } from '../services/RestaurantService';

async function seedRestaurants() {
    // Verbindung zur MongoDB-Datenbank herstellen
    await connect('mongodb://localhost:27017/your-database-name', {
        
    });

    // Array von Beispieldaten für Restaurants
    const restaurantsData = [
        {
            name: 'Restaurant A',
            address: { street: '123 Main St', number: 1, city: 'City A', postal: 12345 },
            openHours: '10:00 AM - 8:00 PM',
            besitzer: new Types.ObjectId('605e4b08d0e12f5bbf6e70a1'), // Beispiel-Besitzer-ID als ObjectId
        },
        {
            name: 'Restaurant B',
            address: { street: '456 Elm St', number: 2, city: 'City B', postal: 23456 },
            openHours: '9:00 AM - 9:00 PM',
            besitzer: new Types.ObjectId('605e4b08d0e12f5bbf6e70a2'), // Beispiel-Besitzer-ID als ObjectId
        },
        // Weitere Restaurants hier hinzufügen
    ];

    // Restaurants in die Datenbank einfügen
    for (const restaurantData of restaurantsData) {
        await RestaurantService.createRestaurant(restaurantData);
    }

    console.log('Restaurants seeded successfully.');
}

export async function connectToDatabase() {
    await connect('mongodb://localhost:27017/your-database-name', {
        
    });

    console.log('Connected to MongoDB.');

    // Beispieldaten hinzufügen
    await seedRestaurants();
}
