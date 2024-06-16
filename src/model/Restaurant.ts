import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const RestaurantOwner = mongoose.model('RestaurantOwner', restaurantSchema);

export default RestaurantOwner;
