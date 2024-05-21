import express from 'express';
import { User } from "../model/UserModel";

export const loginRouter = express.Router(); 

// Route für die Benutzeranmeldung
loginRouter.post('/login', async (req, res) => {
    console.log("Anfrage an /login Route");
    const { email, password } = req.body;
    console.log("EMAIL: " + email + "\n" + "PASSWORD:" + password)
    console.log(req.body)
    try {
        if (!email || !password) {
            // Überprüfen Sie, ob Anmeldeinformationen fehlen und geben Sie den entsprechenden Statuscode zurück
            return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
        }
        
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Benutzer nicht gefunden oder ungültige Anmeldeinformationen' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});
export default loginRouter;