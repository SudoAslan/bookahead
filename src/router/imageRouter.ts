import express, { Request, Response } from 'express';
import Image from '../model/Images';
import multer from 'multer';
import path from 'path';

const AddImagerouter = express.Router();
const upload = multer({ dest: 'uploads/' });

AddImagerouter.post('/', upload.single('image'), async (req: Request, res: Response) => {
  const { restaurantName } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const imageUrl = `/uploads/${path.basename(req.file.path)}`;

  const newImage = new Image({ restaurantName, imageUrl });
  try {
    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

// New route to get image by restaurant name
AddImagerouter.get('/:restaurantName', async (req: Request, res: Response) => {
  const { restaurantName } = req.params;
  try {
    const image = await Image.findOne({ restaurantName });
    if (image) {
      res.status(200).json({ imageUrl: image.imageUrl });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve image', error });
  }
});

export default AddImagerouter;
