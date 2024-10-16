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
import path from 'path';
import OwnerAddTable from './router/OwnerAddTable';
import AddImagerouter from './router/imageRouter';
import bodyParser from 'body-parser';
import  Cookies  from 'universal-cookie-express';
import cookieParser from "cookie-parser";





// Load environment variables
dotenv.config();


const app = express();

app.use(Cookies());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.json());
app.use(cors({
  origin: 'https://bookahead-sand.vercel.app',
  optionsSuccessStatus: 200 
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads')); // Serve the uploads directory



app.get('/', (req, res) => {
  res.send('Hello, Render!');
});



// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB Atlas');
  return mongoose.connection;
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
  throw err;
});



// Use routers
app.use("/api/users", userRouter);
app.use('/', restaurantRouter);
app.use('/update', update);
app.use('/login', OwnerLoginRouter);
app.use('/restaurants', NewResrouter);
app.use('/tables', OwnerAddTable);
app.use('/addGrundriss', AddImagerouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

export default mongoose;