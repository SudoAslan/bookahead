import express from 'express';
import cors, { CorsOptions } from 'cors';

/**
 * In app.ts aufrufen:
 * ```
 * configureCORS(app);
 * ```
 * (am besten gleich nach dem Erzeugen der app).
 * Das Paket 'cors' ist bereits installiert.
 */
export function configureCORS(app: express.Express) {

    const corsOptions: CorsOptions = {
        origin: process.env.CORS_ORIGIN ?? "http://localhost:3000", // Angepasster Standardwert
        methods: ["GET", "PUT", "POST", "DELETE"], // Methoden als Array
        allowedHeaders: ["Origin", "Content-Type"], // Headers als Array
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true
    };
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions)); // enable pre-flight (request method "options") everywhere
}
