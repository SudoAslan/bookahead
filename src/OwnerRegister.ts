import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Restaurant')
  .then(() => console.log('Connected to yourDB-name database'))
  .catch(err => console.error('Error connecting to database:', err));

// Define the Restaurant schema and model
const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Restaurant = mongoose.model('Owner', restaurantSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("App is Working");
});

app.post("/registerOwner", async (req: Request, res: Response) => {
  try {
    const { restaurantName, address, postalCode, city, phoneNumber, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new restaurant instance
    const restaurant = new Restaurant({
      restaurantName,
      address,
      postalCode,
      city,
      phoneNumber,
      email,
      password: hashedPassword
    });

    // Save the restaurant to the database
    await restaurant.save();

    // Respond with success message
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
