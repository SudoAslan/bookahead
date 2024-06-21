import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './router/userRouter';
import restaurantRouter from './router/restaurantRouter';
import update from './router/update';
import login from './router/login';
import OwnerLoginRouter from './router/OwnerLoginRouter';
import NewResrouter from './router/newRest';
import bodyParser from 'body-parser';
import path from 'path';
import OwnerAddTable from './router/OwnerAddTable';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to match your frontend URL
}));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB-Verbindung
mongoose.connect('mongodb://localhost:27017/Restaurant')
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Router verwenden
app.use('/', restaurantRouter);
app.use('/register', userRouter);
app.use('/loginU', login);
app.use('/update', update);
app.use('/login', OwnerLoginRouter);
app.use('/restaurants', NewResrouter);
app.use('/tables', OwnerAddTable);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

