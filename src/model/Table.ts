import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  assignedUser: { type: String, default: '' },
  blocked: { type: Boolean, default: false },
  restaurantName: { type: String, required: true }, // Change to restaurantName field
  reservationTime: { type: String, default: '' } // New field for reservation time

});

const Table = mongoose.model('Table', tableSchema);

export default Table;
