import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Restaurant from '../model/Restaurant';

const router = express.Router();

router.post('/owner', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const owner = await Restaurant.findOne({ email });

    if (!owner) {
      return res.status(400).json({ message: 'Owner not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, owner.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Send the user's name in the response
    res.status(200).json({ message: 'Login successful', name: owner.restaurantName });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
