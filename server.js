
'use strict';
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


/** Inventory
 * 3 fields (mileage, model, price) & 3 seed items
 */
const inventory = [
  { mileage: 35000, model: 'Honda Accord', price: 24000 },
  { mileage: 15000, model: 'Tesla Model 3', price: 25000 },
  { mileage: 85000, model: 'Chevrolet Camaro', price: 15000 }
];




// --- Helpers ---

function isValidVehicle(body) {
  const { mileage, model, price } = body || {};
  return (
    typeof mileage === 'number' && mileage >= 0 &&
    typeof model === 'string' && model.trim().length > 0 &&
    typeof price === 'number' && price > 0
  );
}

function normalizeModel(name) {
  return String(name || '').toLowerCase().trim();
}

function findIndexByMileage(mileageParam) {
  const target = Number(mileageParam);
  return inventory.findIndex(car => car.mileage === target);
}




// --- Routes ---

// GET / : Return all cars
app.get('/', (req, res) => {
  res.status(200).json(inventory);
});

// HEAD / : Return count via Vehicle-Count header
app.head('/', (req, res) => {
  res.set('Vehicle-Count', String(inventory.length));
  res.sendStatus(200);
});

// GET /:mileage : Return single car by mileage
app.get('/:mileage', (req, res) => {
  const index = findIndexByMileage(req.params.mileage);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  res.status(200).json(inventory[index]);
});

// POST /add : Add new car
app.post('/add', (req, res) => {
  if (!isValidVehicle(req.body)) {
    return res.status(400).json({ error: 'Invalid vehicle data' });
  }

  // Check for duplicate mileage (Mileage acts as a unique ID)
  const existingIndex = findIndexByMileage(req.body.mileage);
  if (existingIndex !== -1) {
    return res.status(409).json({ error: 'Vehicle exists' });
  }

  const newVehicle = {
    mileage: req.body.mileage,
    model: req.body.model.trim(),
    price: req.body.price
  };

  inventory.push(newVehicle);
  res.status(201).json(newVehicle);
});

// DELETE /:mileage : Delete car by mileage
app.delete('/:mileage', (req, res) => {
  const index = findIndexByMileage(req.params.mileage);

  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  const deletedVehicle = inventory.splice(index, 1);
  res.status(204).json({ message: 'Vehicle deleted', vehicle: deletedVehicle[0] });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});