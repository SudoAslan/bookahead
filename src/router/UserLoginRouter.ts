import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/User';
import Restaurant from '../model/Restaurant';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Send the user's name in the response
    res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
