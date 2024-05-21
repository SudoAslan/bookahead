import express, { Express, Request, Response, NextFunction } from 'express';
import "express-async-errors"; 
import loginRouter from './routes/login'; 
import { registrationRouter } from './routes/registration'; 

const app: Express = express();

app.use(express.json()); 
app.use("/api", loginRouter); 
app.use("/", registrationRouter); 

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;