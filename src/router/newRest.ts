import express from 'express';
import NewRestaurant from '../model/newRestaurant';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const NewResrouter = express.Router();
NewResrouter.use(bodyParser.json({ limit: '10mb' }));
NewResrouter.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
NewResrouter.use(cors());

interface RestaurantRequest {
  name: string;
  description: string;
  imageBase64: string;
  openingHours: string;
  stars: number;
  address: string;
  phoneNumber: string;
  ownerName: string;
}

// Function to save base64 image
const saveBase64Image = (base64Image: string, filePath: string) => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filePath, buffer);
};

// Add new restaurant with base64 image
NewResrouter.post('/add', async (req, res) => {
  try {
    console.log('Request body:', req.body);  // Log the request body

    const { name, description, imageBase64, openingHours, stars, address, phoneNumber, ownerName }: RestaurantRequest = req.body;

    // Ensure all required fields are present
    if (!name || !description || !imageBase64 || !openingHours || stars === 0 || !address || !phoneNumber || !ownerName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Save base64 image
    const imageName = `${Date.now()}.png`;
    const uploadPath = path.join(__dirname, '../uploads/', imageName);

    // Ensure the upload directory exists
    const uploadDir = path.join(__dirname, '../uploads/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    saveBase64Image(imageBase64, uploadPath);

    // Save restaurant data along with image path
    const restaurant = new NewRestaurant({
      name,
      description,
      imageUrl: `/uploads/${imageName}`,
      openingHours,
      stars,
      address,
      phoneNumber,
      ownerName
    });

    await restaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully' });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get restaurants by owner
NewResrouter.get('/get', async (req, res) => {
  const { ownerName } = req.query;

  try {
    if (!ownerName) {
      return res.status(400).json({ message: 'Owner name parameter missing' });
    }

    const restaurants = await NewRestaurant.find({ ownerName });

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: 'Restaurants not found' });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default NewResrouter;
