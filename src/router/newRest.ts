import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import NewRestaurant from '../model/newRestaurant';
import Table from '../model/Table';

const NewResrouter = express.Router();
NewResrouter.use(bodyParser.json({ limit: '50mb' }));
NewResrouter.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
NewResrouter.use(cors());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create directory recursively if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Route for adding a new restaurant with image upload
NewResrouter.post('/add', upload.array('images'), async (req, res) => {
  try {
    const { name, description, openingHours, stars, address, phoneNumber, ownerName } = req.body;

    // Ensure all required fields are present
    if (!name || !description || !req.files || !openingHours || stars === 0 || !address || !phoneNumber || !ownerName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Map uploaded files to image URLs with complete file paths
    const images = (req.files as Express.Multer.File[]).map(file => ({
      imageUrl: `/uploads/${file.filename}`
    }));

    // Save restaurant data along with complete image paths
    const restaurant = new NewRestaurant({
      name,
      description,
      images: images.map(img => img.imageUrl), // Save only the URLs
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

  console.log('Owner name:', ownerName);

  try {
    if (!ownerName) {
      return res.status(400).json({ message: 'Owner name parameter missing' });
    }

    const restaurants = await NewRestaurant.find({ ownerName });

    console.log('Fetched restaurants:', restaurants);

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: 'Restaurants not found' });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all restaurants
NewResrouter.get('/all', async (req, res) => {
  try {
    const restaurants = await NewRestaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

NewResrouter.delete('/delete/:name', async (req, res) => {
  try {
    const restaurantName = req.params.name;

    // Find the restaurant by name
    const restaurant = await NewRestaurant.findOne({ name: restaurantName });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Delete the restaurant
    await NewRestaurant.deleteOne({ name: restaurantName });

    // Delete all tables associated with the restaurant
    await Table.deleteMany({ restaurantName });

    res.status(200).json({ message: 'Restaurant and associated tables deleted successfully.' });
  } catch (error) {
    console.error('Error deleting restaurant and tables:', error);
    res.status(500).json({ message: 'Error deleting restaurant and tables.' });
  }
});

interface UpdatedData {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  openingHours: string;
  stars: number;
  imageUrl?: string; // Optional property
}

// Update restaurant with optional new image
NewResrouter.put('/update/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, address, phoneNumber, openingHours, stars } = req.body;

  try {
    const updatedData: UpdatedData = {
      name,
      description,
      address,
      phoneNumber,
      openingHours,
      stars,
    };

    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedRestaurant = await NewRestaurant.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ error: 'Error updating restaurant' });
  }
});



export default NewResrouter;
