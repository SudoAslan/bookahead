import express, { Request, Response } from 'express';
import Image from '../model/Images'; // Adjust import based on your model location
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

// AddImagerouter.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { restaurantName } = req.body;

//     // Find existing image record by custom id
//     const existingImage = await Image.findOne({ id, restaurantName });

//     if (!existingImage) {
//       return res.status(404).json({ message: 'Image not found' });
//     }

//     // Handle file upload and update logic
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Example: Update image data in MongoDB
//     const updatedImage = await Image.findOneAndUpdate(
//       { id, restaurantName },
//       { $set: { imageUrl: `uploads/${file.filename}` } }, // Update imageUrl field with new file path
//       { returnOriginal: false }
//     );

//     // Check if updatedImage exists and return updated imageUrl
//     if (updatedImage) {
//       res.json({ imageUrl: updatedImage.imageUrl });
//     } else {
//       throw new Error('Failed to update image');
//     }

//   } catch (error) {
//     console.error('Error updating image:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

export default AddImagerouter;
