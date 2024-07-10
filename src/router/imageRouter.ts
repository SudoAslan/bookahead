import express, { Request, Response } from 'express';
import Image from '../model/Images'; // Adjust import based on your model location
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const AddImagerouter = express.Router();

// Configure multer storage to save with unique name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

AddImagerouter.post('/', upload.single('image'), async (req: Request, res: Response) => {
  const { restaurantName } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  const newImage = new Image({ restaurantName, imageUrl });
  try {
    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});
AddImagerouter.get('/:restaurantName', async (req: Request, res: Response) => {
  const { restaurantName } = req.params;
  try {
    const image = await Image.findOne({ restaurantName });
    if (image) {
      res.set('Cache-Control', 'no-store');
      res.status(200).json({ imageUrl: image.imageUrl });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve image', error });
  }
});
// const upload = multer({ dest: 'uploads/' });

// AddImagerouter.post('/', upload.single('image'), async (req: Request, res: Response) => {
//   const { restaurantName } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded.' });
//   }

//   const imageUrl = `/uploads/${path.basename(req.file.path)}`;

//   const newImage = new Image({ restaurantName, imageUrl });
//   try {
//     await newImage.save();
//     res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to upload image', error });
//   }
// });

// AddImagerouter.get('/:restaurantName', async (req: Request, res: Response) => {
//   const { restaurantName } = req.params;
//   try {
//     const image = await Image.findOne({ restaurantName });
//     if (image) {
//       res.set('Cache-Control', 'no-store');
//       res.status(200).json({ imageUrl: image.imageUrl });
//     } else {
//       res.status(404).json({ message: 'Image not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve image', error });
//   }
// });


AddImagerouter.delete('/:restaurantName', async (req, res) => {
  const { restaurantName } = req.params;


  try {
    if(restaurantName){
      await Image.findOneAndDelete({ restaurantName });

      res.status(200).json({ message: 'Image and database entry deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});


export default AddImagerouter;
