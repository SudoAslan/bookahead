import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Restaurant from '../model/Restaurant';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { restaurantName, address, postalCode, city, phoneNumber, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const restaurant = new Restaurant({
      restaurantName,
      address,
      postalCode,
      city,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    await restaurant.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering restaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
