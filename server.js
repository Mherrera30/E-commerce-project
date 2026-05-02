
'use strict';
const express = require('express');
const path = require('path'); 
const sqlite3 = require("sqlite3").verbose(); 
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));





// --- Database Setup ---
const db = new sqlite3.Database("inventory.db", (err) => {
    if (err) return console.error("Error opening database:", err.message);
    console.log("Connected to the SFSU Dealership database.");

    db.run(`
      CREATE TABLE IF NOT EXISTS inventory (
        mileage INTEGER PRIMARY KEY,
        model TEXT NOT NULL,
        price INTEGER
      )
    `, (err) => {
        if (err) return console.error("Table creation error:", err.message);
        
        const insertQuery = `INSERT OR IGNORE INTO inventory (mileage, model, price) VALUES (?, ?, ?)`;
        db.run(insertQuery, [35000, "2018 Honda Accord", 24000]);
        db.run(insertQuery, [15000, "2020 Tesla Model 3", 25000]);
        db.run(insertQuery, [85000, "2017 Chevrolet Camaro", 15000]);
        db.run(insertQuery, [60000, "2015 Mercedes S Class", 70000]);
    });
});





// --- API Routes (JSON) ---

// Uses db.all 
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM inventory", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// Uses db.get 
app.get('/api/products/:mileage', (req, res) => {
  db.get("SELECT * FROM inventory WHERE mileage = ?", [req.params.mileage], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(200).json(row);
  });
});

// Uses INSERT INTO 
app.post('/api/products/add', (req, res) => {
  const { mileage, model, price } = req.body;
  db.run("INSERT INTO inventory (mileage, model, price) VALUES (?, ?, ?)", 
    [mileage, model, price], 
    function(err) {
      if (err) return res.status(409).json({ error: 'Vehicle already exists' });
      res.status(201).json({ mileage, model, price });
  });
});

// Uses DELETE FROM using mileage
app.delete('/api/products/:mileage', (req, res) => {
  db.run("DELETE FROM inventory WHERE mileage = ?", [req.params.mileage], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(204);
  });
});





// --- View Routes (HTML) ---

app.get('/', (req, res) => res.render('home'));

// Uses db.all to pass rows to Pug 
app.get('/products', (req, res) => {
  db.all("SELECT * FROM inventory", (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.render('products', { inventory: rows });
  });
});

// Uses db.get to find one car 
app.get('/products/:mileage', (req, res) => {
  db.get("SELECT * FROM inventory WHERE mileage = ?", [req.params.mileage], (err, row) => {
    if (err) return res.status(500).send("Database error");
    if (!row) return res.status(404).render('404', { id: req.params.mileage });
    res.render('product-detail', { car: row });
  });
});

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => res.redirect('/'));
app.get('/profile', (req, res) => res.render('profile'));
app.get('/cart', (req, res) => res.render('cart'));


// 404 catcher
app.use((req, res) => {
  res.status(404).render('404', { id: req.originalUrl });
});




app.listen(PORT, () => {
  console.log(`SFSU Dealership Server running at http://localhost:${PORT}`);
});