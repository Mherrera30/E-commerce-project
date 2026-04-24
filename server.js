
'use strict';
const express = require('express');
const path = require('path'); 
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data for login
app.use(express.static(path.join(__dirname, 'public'))); 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));




/** Inventory Data 
 */
const inventory = [
  { mileage: 35000, model: 'Honda Accord', price: 24000 },
  { mileage: 15000, model: 'Tesla Model 3', price: 25000 },
  { mileage: 85000, model: 'Chevrolet Camaro', price: 15000 }
];


// --- 3. Helpers ---
function isValidVehicle(body) {
  const { mileage, model, price } = body || {};
  return (
    typeof mileage === 'number' && mileage >= 0 &&
    typeof model === 'string' && model.trim().length > 0 &&
    typeof price === 'number' && price > 0
  );
}

function findIndexByMileage(mileageParam) {
  const target = Number(mileageParam);
  return inventory.findIndex(car => car.mileage === target);
}




// --- API Routes (JSON) ---
app.get('/api/products', (req, res) => {
  res.status(200).json(inventory);
});

app.head('/api/products', (req, res) => {
  res.set('X-Vehicle-Count', String(inventory.length));
  res.sendStatus(200);
});

app.get('/api/products/:mileage', (req, res) => {
  const index = findIndexByMileage(req.params.mileage);
  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  res.status(200).json(inventory[index]);
});

app.post('/api/products/add', (req, res) => {
  if (!isValidVehicle(req.body)) {
    return res.status(400).json({ error: 'Invalid vehicle data' });
  }
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

app.delete('/api/products/:mileage', (req, res) => {
  const index = findIndexByMileage(req.params.mileage);
  if (index === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  inventory.splice(index, 1);
  res.sendStatus(204); 
});




// --- View Routes (HTML) ---
app.get('/', (req, res) => res.render('home'));

app.get('/products', (req, res) => {
  res.render('products', { inventory });
});

app.get('/products/:mileage', (req, res) => {
  const index = findIndexByMileage(req.params.mileage);
  if (index === -1) {
    return res.status(404).render('404', { id: req.params.mileage });
  }
  res.render('product-detail', { car: inventory[index] });
});

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => res.redirect('/'));

app.get('/profile', (req, res) => res.render('profile'));
app.get('/cart', (req, res) => res.render('cart'));


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});