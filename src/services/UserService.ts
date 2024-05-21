import { IUser, User } from "../model/UserModel";

export async function createUser(userData: IUser): Promise<Pick<IUser, "name" | "address" | "email">> {
    // Überprüfen, ob die E-Mail-Adresse vorhanden ist
    if (!userData.email) {
        throw new Error("E-Mail-Adresse ist erforderlich.");
    }

    // Hier setzen Sie 'id' auf undefined, da es wahrscheinlich ist,
    // dass MongoDB das '_id'-Feld automatisch generiert und in 'userData' nicht vorhanden ist.
    userData.id = undefined;

    const user = await User.create(userData);
    return {
        name: user.name,
        address: user.address,
        email: user.email
    };
}

// Benutzerdaten aktualisieren
export async function updateUser(id: string, newData: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findById(id).exec();
    if (!user) {
        throw new Error("Benutzer nicht gefunden");
    }

    user.name = newData.name || user.name;
    user.email = newData.email || user.email;
    user.address = newData.address || user.address;
    if (newData.password) {
        user.password = newData.password;
    }

    await user.save();
    return user;
}

// Benutzer löschen
export async function deleteUser(email: string): Promise<void> {
    await User.findOneAndDelete({ email }).exec();
}
// Benutzer registrieren
export async function registerUser(userData: IUser): Promise<Pick<IUser, "name" | "address" | "email">> {
    // Überprüfen, ob die E-Mail-Adresse vorhanden ist
    if (!userData.email) {
        throw new Error("E-Mail-Adresse ist erforderlich.");
    }

    // Hier setzen Sie 'id' auf undefined, da es wahrscheinlich ist,
    // dass MongoDB das '_id'-Feld automatisch generiert und in 'userData' nicht vorhanden ist.
    userData.id = undefined;

    const user = await User.create(userData);
    return {
        name: user.name,
        address: user.address,
        email: user.email
    };
}