import { User } from './model/UserModel'; // Import des User-Modells aus dem entsprechenden Pfad

class Login {
    async loginUser(username: string, password: string) {
        try {
            //den Benutzer anhand seiner E-Mail-Adresse zu finden
            const user = await User.findOne({ email: username });
            // Wenn kein Benutzer gefunden wurde, wirf einen Fehler
            if (!user) {
                throw new Error('Benutzer nicht gefunden');
            }
            
            // Überprüft, ob das eingegebene Passwort mit dem im Benutzerobjekt gespeicherten Passwort übereinstimmt
            if (user.password !== password) {
                throw new Error('Ungültiges Passwort');
            }
            // Wenn alles erfolgreich ist, gib den gefundenen Benutzer zurück
            return user;
        } catch (error) {
            // Falls ein Fehler auftritt, wirf ihn weiter
            throw error;
        }
    }
}

export default Login; // Exportiere die Login-Klasse für die Verwendung in anderen Dateien
