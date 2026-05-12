
'use strict';
const express = require('express');
const path = require('path'); 
const sqlite3 = require("sqlite3").verbose(); 
const session = require('express-session');
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session({
  secret: 'sfsu-dealership-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 } // Session lasts 10 minutes
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user; 
  next();
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));




// --- Database Setup ---
const db = new sqlite3.Database("inventory.db", (err) => {
    if (err) return console.error("Error opening database:", err.message);
    console.log("Connected to the SFSU Dealership database.");

    db.run("PRAGMA foreign_keys = ON");

    // Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    // Inventory Table 
    db.run(`
      CREATE TABLE IF NOT EXISTS inventory (
        mileage INTEGER PRIMARY KEY,
        model TEXT NOT NULL,
        price INTEGER,
        image_url TEXT
      )
    `, (err) => {
        if (err) return;
        const insertQuery = `INSERT OR IGNORE INTO inventory (mileage, model, price, image_url) VALUES (?, ?, ?, ?)`;
        db.run(insertQuery, [58000, "2018 Honda Accord", 24000, "/images/2018_Accord.png"]);
        db.run(insertQuery, [15000, "2020 Tesla Model 3", 25000, "/images/2020_Model_3.png"]);
        db.run(insertQuery, [85000, "2017 Chevrolet Camaro", 45000, "/images/2017_Camaro.png"]);
        db.run(insertQuery, [20000, "2024 Porsche GT3 RS", 220000, "/images/2024_GT3_RS.png"]);
        db.run(insertQuery, [60000, "2019 Mercedes S Class", 70000, "/images/2019_Mercedes.png"]);
    });

    // Cart Table
    db.run(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES inventory(mileage) ON DELETE CASCADE,
        UNIQUE(user_id, product_id)
      )
    `);
});




// --- Auth Routes ---

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) return res.render('login', { error: "Username taken or database error." });
    res.render('login', { success: "Account created! You can now log in." });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
    if (user) {
      req.session.user = user;
      // Get inventory to render the products page with a welcome message
      db.all("SELECT * FROM inventory", (err, rows) => {
        res.render('products', { 
          inventory: rows, 
          welcomeMsg: `Welcome back, ${user.username}!` 
        });
      });
    } else {
      res.render('login', { error: "Invalid username or password." });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});




// --- API Routes (JSON) ---

app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM inventory", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

app.get('/api/products/:mileage', (req, res) => {
  db.get("SELECT * FROM inventory WHERE mileage = ?", [req.params.mileage], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(200).json(row);
  });
});




// --- View Routes (HTML) ---

app.get('/', (req, res) => res.render('home'));

app.get('/products', (req, res) => {
  db.all("SELECT * FROM inventory", (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.render('products', { inventory: rows });
  });
});

app.get('/products/:mileage', (req, res) => {
  db.get("SELECT * FROM inventory WHERE mileage = ?", [req.params.mileage], (err, row) => {
    if (err) return res.status(500).send("Database error");
    if (!row) return res.status(404).render('404', { id: req.params.mileage });
    res.render('product-detail', { car: row });
  });
});




// --- Cart Functionality ---

app.post('/cart/add', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId = req.session.user.id;
  const productId = req.body.mileage;

  // Uses INSERT OR IGNORE to respect the UNIQUE constraint in the DB
  db.run("INSERT OR IGNORE INTO cart (user_id, product_id) VALUES (?, ?)", [userId, productId], (err) => {
    if (err) return res.status(500).send("Error adding to cart");
    res.redirect('/cart');
  });
});

app.get('/cart', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId = req.session.user.id;

  const query = `
    SELECT inventory.* FROM inventory 
    JOIN cart ON inventory.mileage = cart.product_id 
    WHERE cart.user_id = ?
  `;

  db.all(query, [userId], (err, items) => {
    if (err) return res.status(500).send("Error fetching cart");
    res.render('cart', { cartItems: items });
  });
});

app.post('/cart/remove', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId = req.session.user.id;
  const productId = req.body.mileage;

  db.run("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId], (err) => {
    res.redirect('/cart');
  });
});

app.get('/login', (req, res) => res.render('login'));

app.get('/profile', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('profile');
});


// 404 Catcher
app.use((req, res) => {
  res.status(404).render('404', { id: req.originalUrl });
});


app.listen(PORT, () => {
  console.log(`SFSU Dealership Server running at http://localhost:${PORT}`);
});