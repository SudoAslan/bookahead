import express, {Request ,Response } from 'express';
import { User } from "../model/UserModel";

export const loginRouter = express.Router(); 

// Route für die Benutzeranmeldung
loginRouter.post('/', async (req: Request, res: Response) => {
/*     console.log("Anfrage an /login Route");
    const { email, password } = req.body;
    console.log("Name: " + name + "\n" + "Password:" + password)
    console.log(req.body)
    try {
        if (!email  !password) {
            // Überprüfen Sie, ob Anmeldeinformationen fehlen und geben Sie den entsprechenden Statuscode zurück
            return res.status(400).json({ message: 'Name und Passwort sind erforderlich' });
        }

        const user = await User.findOne({  });
        if (!user  user.password !== password) {
            return res.status(401).json({ message: 'Benutzer nicht gefunden oder ungültige Anmeldeinformationen' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    } */
        // Hier können Sie nach Bedarf weitere Authentifizierungslogik implementieren
        // Wenn die Authentifizierung erfolgreich ist, senden Sie den Statuscode 200 zurück
        res.status(200).json({ message: 'Erfolgreich eingeloggt' });

});
export default loginRouter;