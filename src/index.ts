// import express, { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB-Verbindung
// mongoose.connect('mongodb://localhost:27017/Restaurant')
//   .then(() => console.log('Connected to the database'))
//   .catch(err => console.error('Error connecting to the database:', err));

// // Define the Restaurant schema and model
// const restaurantSchema = new mongoose.Schema({
//   restaurantName: { type: String, required: true },
//   address: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   city: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// // Define the User schema and model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   lastName: { type: String, required: true },
//   age: { type: Number, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const User = mongoose.model('BookAheadUser', userSchema);

// // Define the Table schema and model
// const tableSchema = new mongoose.Schema({
//   number: { type: Number, required: true },
//   reserved: { type: Boolean, default: false },
//   lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // Add lockedBy field
// });

// const Table = mongoose.model('Table', tableSchema);

// // Add seed data
// const addSeedData = async () => {
//   const seedTables = [
//     { number: 1, reserved: false },
//     { number: 2, reserved: false },
//     { number: 3, reserved: false },
//   ];

//   try {
//     await Table.insertMany(seedTables);
//     console.log('Seed data added successfully.');
//   } catch (error) {
//     console.error('Error adding seed data:', error);
//   }
// };

// // Call addSeedData only once to populate the database with initial data
// addSeedData();

// // Restaurant registration
// app.post('/registerOwner', async (req: Request, res: Response) => {
//   try {
//     const { restaurantName, address, postalCode, city, phoneNumber, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const restaurant = new Restaurant({
//       restaurantName,
//       address,
//       postalCode,
//       city,
//       phoneNumber,
//       email,
//       password: hashedPassword,
//     });
//     await restaurant.save();
//     res.status(200).json({ message: 'Registration successful' });
//   } catch (error) {
//     console.error('Error registering restaurant:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // User registration
// app.post('/register', async (req: Request, res: Response) => {
//   try {
//     const { name, lastName, age, email, password, confirmPassword } = req.body;
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       lastName,
//       age,
//       email,
//       password: hashedPassword,
//     });
//     await user.save();
//     res.status(200).json({ message: 'Registration successful, confirmation email sent' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Table reservation
// app.post('/reserveTable/:id', async (req, res) => {
//   try {
//     const tableId = req.params.id;
//     const userId = req.body.userId; // Assuming userId is sent in the request body

//     const table = await Table.findById(tableId);
//     if (!table) {
//       return res.status(404).json({ success: false, message: 'Table not found' });
//     }
//     if (table.reserved && table.lockedBy !== userId) {
//       return res.status(400).json({ success: false, message: 'Table already reserved by another user' });
//     }
//     if (!table.reserved) {
//       // If the table is not reserved, lock it for the current user
//       table.reserved = true;
//       table.lockedBy = userId;
//       await table.save();
//     }

//     return res.status(200).json({ success: true, message: 'Table reserved successfully' });
//   } catch (error) {
//     console.error('Error reserving table:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });


// // Fetch all tables
// app.get('/tables', async (req: Request, res: Response) => {
//   try {
//     const tables = await Table.find();
//     res.json(tables);
//   } catch (error) {
//     console.error('Error fetching tables:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`App listening at port ${PORT}`));


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './router/userRouter';
import restaurantRouter from './router/restaurantRouter';
import update from './router/update';
import login from './router/login';
import OwnerLoginRouter from './router/OwnerLoginRouter';
import tableRouter from './router/table';
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
 app.use('/update',update);
 app.use('/login', OwnerLoginRouter);
 app.use('/tablesUser', tableRouter);
app.use('/restaurants', NewResrouter);
app.use('/tables', OwnerAddTable);










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

