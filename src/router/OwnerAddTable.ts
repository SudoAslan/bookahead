import express from 'express';
import Table from '../model/Table';

const OwnerAddTable = express.Router();

OwnerAddTable.post('/add', async (req, res) => {
  try {
    const { tableNumber, restaurantName } = req.body;

    if (!tableNumber || !restaurantName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingTable = await Table.findOne({ tableNumber, restaurantName });
    if (existingTable) {
      return res.status(400).json({ message: 'Table number already exists for this restaurant' });
    }

    const table = new Table({ tableNumber, restaurantName });
    await table.save();
    res.status(201).json({ message: 'Table added successfully' });
  } catch (error) {
    console.error('Error adding table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

OwnerAddTable.get('/get', async (req, res) => {
  const { restaurantName } = req.query;

  try {
    if (!restaurantName) {
      return res.status(400).json({ message: 'Restaurant name parameter missing' });
    }

    const tables = await Table.find({ restaurantName });

    if (!tables || tables.length === 0) {
      return res.status(404).json({ message: 'Tables not found' });
    }

    res.status(200).json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// OwnerAddTable.post('/update', async (req, res) => {
//   const { tableNumber, assignedUser, reservationTime, restaurantName } = req.body;
//   try {
//     let table = await Table.findOne({ tableNumber, restaurantName });

//     if (!table) {
//       return res.status(404).json({ message: 'Table not found' });
//     }

//     table.assignedUser = assignedUser;
//     table.reservationTime = reservationTime;
//     table.blocked = true;

//     await table.save();

//     res.status(200).json(table); // Ensure the updated table is sent back
//   } catch (error) {
//     console.error('Error updating table:', error);
//     res.status(500).json({ message: 'Failed to update table' });
//   }
// });
OwnerAddTable.post('/update', async (req, res) => {
    const { tableNumber, assignedUser, reservationTime, restaurantName } = req.body;
    try {
      // Check if the user has already reserved a table in this restaurant
      const existingReservation = await Table.findOne({ restaurantName, assignedUser });
  
      if (existingReservation) {
        return res.status(400).json({ message: 'User has already reserved a table in this restaurant' });
      }
  
      // Update or create table reservation
      let table = await Table.findOne({ tableNumber, restaurantName });
  
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }
  
      table.assignedUser = assignedUser;
      table.reservationTime = reservationTime;
      table.blocked = true;
  
      await table.save();
  
      res.status(200).json(table); // Ensure the updated table is sent back
    } catch (error) {
      console.error('Error updating table:', error);
      res.status(500).json({ message: 'Failed to update table' });
    }
  });



export default OwnerAddTable;
