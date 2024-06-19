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

OwnerAddTable.post('/update', async (req, res) => {
  try {
    const { tableNumber, assignedUser, blocked, reservationTime, restaurantName } = req.body;
    const table = await Table.findOneAndUpdate(
      { tableNumber, restaurantName },
      {
        assignedUser,
        blocked,
        reservationTime
      },
      { new: true }
    );

    if (!table) {
      return res.status(404).send('Table not found');
    }

    res.json(table);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

OwnerAddTable.get('/blocked-tables', async (req, res) => {
  try {
    const { userName } = req.query;
    const blockedTables = await Table.find({ assignedUser: userName, blocked: true });
    res.json(blockedTables);
  } catch (error) {
    console.error('Error fetching blocked tables:', error);
    res.status(500).send('Server error');
  }
});




export default OwnerAddTable;
