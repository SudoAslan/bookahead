import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  restaurantName: { type: String, required: true },
  assignedUser: { type: String, default: null },
  blocked: { type: Boolean, default: false },
  reservationTime: { type: String, default: '' },
  reservationDate: { type: String, default: '' }, // Add reservationDate field
});

const Table = mongoose.model('Table', tableSchema);
export default Table;
