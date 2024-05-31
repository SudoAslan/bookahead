import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/User';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, lastName, age, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      lastName,
      age,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: 'Registration successful, confirmation email sent' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
