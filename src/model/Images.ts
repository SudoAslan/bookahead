import mongoose, { Document, Schema } from 'mongoose';

interface IImage extends Document {
  restaurantName: string;
  imageUrl: string;
}

const imageSchema: Schema = new Schema({
  restaurantName: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;
