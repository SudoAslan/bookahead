// models/newRestaurant.js
import mongoose from 'mongoose';

const newRestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], // Array of image URLs
  openingHours: { type: String, required: true },
  stars: { type: Number, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  ownerName: { type: String, required: true }
});

const NewRestaurant = mongoose.model('Restaurantadded', newRestaurantSchema);

export default NewRestaurant;
