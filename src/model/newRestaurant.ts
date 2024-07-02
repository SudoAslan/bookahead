import mongoose from 'mongoose';

const newRestaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String], // Array of image filenames
  openingHours: String,
  stars: Number,
  address: String,
  phoneNumber: String,
  ownerName: String,
});

const NewRestaurant = mongoose.model('NewRestaurant', newRestaurantSchema);

export default NewRestaurant;
