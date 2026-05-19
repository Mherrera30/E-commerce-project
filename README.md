# SFSU Dealership - E-Commerce Car Selling Website

A fully functional e-commerce website for selling pre-owned vehicles, built with Node.js, Express, Pug templates, and SQLite.

## Features

### ✅ Completed Features

- **Homepage** - Welcome page with call-to-action
- **Product Listings** - Grid view of all available vehicles with images, prices, and mileage
- **Product Details** - Individual pages for each vehicle with detailed specifications
- **User Authentication** - Account creation and login system
- **Shopping Cart** - Add/remove vehicles to cart with price calculation
- **User Profile** - View account information and quick navigation
- **Session Management** - Persistent login sessions (10 minutes)
- **SQLite Database** - Persistent data storage for users, inventory, and cart items
- **Responsive Design** - Mobile-friendly layout
- **SFSU Branding** - Purple and gold color scheme

## Tech Stack

- **Backend**: Node.js + Express.js
- **Template Engine**: Pug
- **Database**: SQLite3
- **Session Management**: express-session
- **Styling**: Custom CSS with SFSU colors
- **Icons**: Google Material Symbols

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mherrera30/E-commerce-project.git
   cd E-commerce-project
   ```

2. **Switch to the correct branch**
   ```bash
   git checkout pug-templates-HW
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
E-commerce-project/
├── public/
│   ├── css/
│   │   └── style.css          # All styling
│   └── images/                # Car images
├── views/
│   ├── layout.pug             # Base template with nav/footer
│   ├── home.pug               # Homepage
│   ├── products.pug           # Inventory listing
│   ├── product-detail.pug     # Individual car details
│   ├── login.pug              # Login/Register page
│   ├── cart.pug               # Shopping cart
│   ├── profile.pug            # User profile
│   └── 404.pug                # Error page
├── server.js                  # Main application server
├── package.json               # Dependencies
└── inventory.db               # SQLite database (auto-created)
```

## Database Schema

### Users Table
- `id` - Auto-incrementing primary key
- `username` - Unique username
- `password` - Plain text password (⚠️ NOT production-ready)

### Inventory Table
- `mileage` - Primary key (unique identifier)
- `model` - Car model name
- `price` - Price in dollars
- `image_url` - Path to car image

### Cart Table
- `id` - Auto-incrementing primary key
- `user_id` - Foreign key to users
- `product_id` - Foreign key to inventory (mileage)

## Available Routes

### View Routes (HTML)
- `GET /` - Homepage
- `GET /products` - All vehicles
- `GET /products/:mileage` - Single vehicle details
- `GET /login` - Login/Register page
- `GET /profile` - User profile (requires login)
- `GET /cart` - Shopping cart (requires login)
- `GET /logout` - Logout and destroy session

### API Routes (JSON)
- `GET /api/products` - Get all vehicles as JSON
- `GET /api/products/:mileage` - Get single vehicle as JSON

### Form Actions
- `POST /register` - Create new account
- `POST /login` - Login to existing account
- `POST /cart/add` - Add vehicle to cart
- `POST /cart/remove` - Remove vehicle from cart

## Default Inventory

The database is seeded with 5 vehicles:
1. 2018 Honda Accord - $24,000 (58,000 mi)
2. 2020 Tesla Model 3 - $25,000 (15,000 mi)
3. 2017 Chevrolet Camaro - $45,000 (85,000 mi)
4. 2024 Porsche GT3 RS - $220,000 (20,000 mi)
5. 2019 Mercedes S Class - $70,000 (60,000 mi)

## Usage Guide

### Creating an Account
1. Navigate to the Login page
2. Enter a username and password
3. Click "Create Account"
4. You'll be redirected to login

### Browsing Inventory
1. Click "Inventory" in the navigation
2. Browse available vehicles
3. Click "View Details" on any car

### Adding to Cart
1. Login to your account
2. View a product detail page
3. Click "Add to Cart"
4. View your cart from the navigation

### Checking Out
- Cart displays total price and item count
- Remove items as needed
- (Note: Actual payment processing is not implemented)

## Security Notes ⚠️

**This is an educational project and NOT production-ready:**
- Passwords are stored in plain text (should use bcrypt)
- No CSRF protection
- No input validation/sanitization
- Session secret is hardcoded
- No HTTPS enforcement

## Future Enhancements

Potential improvements for a production version:
- [ ] Password hashing (bcrypt)
- [ ] Email verification
- [ ] Search and filter functionality
- [ ] Image upload for vehicles
- [ ] Admin panel for inventory management
- [ ] Order history
- [ ] Payment integration (Stripe/PayPal)
- [ ] Real car images
- [ ] Vehicle comparison feature
- [ ] Wishlist/favorites

## Development

Run with auto-reload during development:
```bash
npm run dev
```
(Requires `nodemon` to be installed)

## Credits

Created for Educational Purposes - HTML Course Project
© 2026 SFSU Dealership

## License

ISC
