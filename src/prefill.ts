// Importe
import { User } from "./model/UserModel";
import { createUser } from "./services/UserService";
import { logger } from "./logger";

// Interface für Reservierungsressourcen
interface ReservationResource {
    // Definition der Eigenschaften
}

// Funktion zum Vorabfüllen der Datenbank
export async function prefillDB(): Promise<{ user: typeof User; reservations: ReservationResource[] }> {
    try {
        // Synchronisierung der Indizes, falls erforderlich
        await User.syncIndexes();
        
        // Erstellen eines Beispielbenutzers, falls nicht vorhanden
        const existingUser = await User.findOne({ email: "test@example.com" });
        if (!existingUser) {
            const user = await createUser({
                name: "Test User",
                email: "test@example.com",
                password: "testPassword123",
                confirmPassword: "testPassword123", // Hinzugefügt für Registrierung
                age: 25, // Beispielwert für das Alter
                lastName: "Test", // Beispielwert für den Nachnamen
            });
            logger.info(`Prefill DB with test data, user: ${user.name}, email: ${user.email}`);
        } else {
            logger.info("User already exists in the database");
        }

        // Erstellen von Beispielreservierungen
        const reservations: ReservationResource[] = [];
        // Hier den Code für die Erstellung von Reservierungen einfügen

        // Rückgabe der erstellten Ressourcen
        return { user: User, reservations };
    } catch (error) {
        // Fehlerbehandlung
        logger.error(`Error prefilling database: ${error}`);
        throw error;
    }
}
