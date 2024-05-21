import express, { Request, Response } from 'express';
import { User } from '../model/UserModel'; 

export const registrationRouter = express.Router();

registrationRouter.post("/api/register", async (req: Request, res: Response) => {
    try {
        const { name, lastName, age, email, password, confirmPassword } = req.body;

        // Überprüfen, ob ein Benutzer mit derselben E-Mail-Adresse bereits vorhanden ist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Wenn der Benutzer bereits vorhanden ist, geben Sie den Statuscode 400 und eine Fehlermeldung zurück
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Erstellen einer neuen Benutzerinstanz
        const user = new User({ name, lastName, age, email, password, confirmPassword });

        // Benutzer in die Datenbank speichern
        await user.save();

        // Erfolgsmeldung zurückgeben
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
