'use strict';
const sqlite3 = require('sqlite3').verbose();

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
        model TEXT PRIMARY KEY,  /* Simple Fix: Make model the primary key */
        mileage INTEGER,
        price INTEGER,
        image_url TEXT,
        engine TEXT
      )
    `, (err) => {
        if (err) return;
        const insertQuery = `INSERT OR IGNORE INTO inventory (model, mileage, price, image_url, engine) VALUES (?, ?, ?, ?, ?)`;
        
        db.run(insertQuery, ["2018 Honda Accord", 58000, 24000, "/images/2018_Accord.png", "1.5L Turbo I4"]);
        db.run(insertQuery, ["2020 Tesla Model 3", 15000, 25000, "/images/2020_Model_3.png", "Electric"]);
        db.run(insertQuery, ["2017 Chevrolet Camaro", 85000, 45000, "/images/2017_Camaro.png", "Supercharged 6.2L V8"]);
        db.run(insertQuery, ["2024 Porsche GT3 RS", 20000, 220000, "/images/2024_GT3_RS.png", "4.0L Inline-6 Cylinder"]);
        db.run(insertQuery, ["2019 Mercedes S Class", 60000, 70000, "/images/2019_Mercedes.png", "3.0L Turbo Inline-6"]);
        db.run(insertQuery, ["2010 Hyundai Elantra", 120000, 6500, "/images/2010_Elantra.png", "2.0L I4"]);
        db.run(insertQuery, ["2012 Toyota Prius", 110000, 8500, "/images/2012_Prius.png", "1.8L Hybrid I4"]);
        db.run(insertQuery, ["2016 Honda Civic", 75000, 14500, "/images/2016_Honda_Civic.png", "2.0L I4"]);
        db.run(insertQuery, ["2020 Toyota Camry", 45000, 19000, "/images/2020_Camry.png", "2.5L I4"]);
        db.run(insertQuery, ["2022 Mercedes-AMG ONE", 1200, 2700000, "/images/2022_AMG_ONE.png", "1.6L V6 Turbo Hybrid"]);
        db.run(insertQuery, ["2026 Mercedes-AMG GT", 3500, 185000, "/images/2026_AMG_GT.png", "4.0L Twin-Turbo V8"]);
        db.run(insertQuery, ["2026 Audi e-tron GT", 1500, 110000, "/images/2026_Audi_e-tron_GT.png", "Electric"]);
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

module.exports = db;