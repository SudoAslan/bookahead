import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project')
  .then(() => console.log('Connected to yourDB-name database'))
  .catch(err => console.error('Error connecting to database:', err));

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('BookAheadUser', userSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("App is Working");
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, lastName, age, email, password, confirmPassword } = req.body;

    // Create a new user instance
    const user = new User({ name, lastName, age, email, password, confirmPassword });

    // Save the user to the database
    await user.save();

    // Send confirmation email

    // Respond with success message
    res.status(200).json({ message: 'Registration successful, confirmation email sent' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(5000, () => console.log("App listening at port 5000"));