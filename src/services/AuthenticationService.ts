import bcryptjs from 'bcryptjs';
import { User } from '../model/UserModel';



/**
 
Prüft Name und Passwort, bei Erfolg ist success true 
und es wird die id und role ("u" oder "a") des Pflegers zurückgegeben
Falls kein Pfleger mit gegebener Name existiert oder das Passwort falsch ist, wird nur
false zurückgegeben. Aus Sicherheitsgründen wird kein weiterer Hinweis gegeben.
*/
export async function login(username: string, password: string): Promise<{ id: string, role: "a" | "u" } | false> {
    const user = await User.findOne({ username }).exec();
    if (user?.password) {
        const pass = await bcryptjs.compare(password, user.password);
        if (pass) {
            return { id: user.id, role: user.admin ? "a" : "u" };
        }
    }
    return false;
}