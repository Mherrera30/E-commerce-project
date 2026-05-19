# SFSU Dealership - E-Commerce Car Selling Website

A fully functional e-commerce website for selling pre-owned vehicles, built with Node.js, Express, Pug templates, and SQLite.

## Features

- User registration and login with secure password hashing (bcrypt)
- Browse inventory of pre-owned vehicles
- View detailed product information
- Shopping cart functionality (add/remove items)
- Checkout process with order confirmation
- User profile management
- Session-based authentication
- Responsive design for mobile and desktop
- SQLite database for persistent data storage

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
│   ├── images/                # Car images (5 vehicles)
│   └── js/
│       └── homepage.js        # Counter animations
├── views/
│   ├── layout.pug             # Base template with nav/footer
│   ├── home.pug               # Homepage
│   ├── products.pug           # Inventory listing
│   ├── product-detail.pug     # Individual car details
│   ├── login.pug              # Login page
│   ├── register.pug           # Registration page
│   ├── cart.pug               # Shopping cart
│   ├── checkout-success.pug   # Order confirmation
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
- `password` - Hashed password (bcrypt with 10 salt rounds)

### Inventory Table
- `mileage` - Primary key (unique identifier)
- `model` - Car model name
- `price` - Price in dollars
- `image_url` - Path to car image

### Cart Table
- `id` - Auto-incrementing primary key
- `user_id` - Foreign key to users
- `product_id` - Foreign key to inventory (mileage)
- Unique constraint on (user_id, product_id)

## Available Routes

### View Routes (HTML)
- `GET /` - Homepage
- `GET /products` - All vehicles
- `GET /products/:mileage` - Single vehicle details
- `GET /login` - Login page
- `GET /register` - Registration page
- `GET /profile` - User profile (requires login)
- `GET /cart` - Shopping cart (requires login)
- `GET /logout` - Logout and destroy session

### Form Actions
- `POST /register` - Create new account
- `POST /login` - Login to existing account
- `POST /cart/add` - Add vehicle to cart
- `POST /cart/remove` - Remove vehicle from cart
- `POST /checkout` - Process checkout and clear cart

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
1. View your cart
2. Click "Proceed to Checkout"
3. Order confirmation page displays
4. Cart is automatically cleared
5. Continue shopping or view profile

Note: Actual payment processing is not implemented.

## Security Features

- Password hashing using bcrypt (10 salt rounds)
- Session-based authentication
- Parameterized SQL queries to prevent injection
- Password confirmation on registration
- Session expiration (10 minutes)

## Known Limitations

This is an educational project with the following limitations:
- No CSRF protection
- Session secret is hardcoded
- No HTTPS enforcement
- No email verification
- Database resets on deployment restarts (free tier)

## Future Enhancements

Potential improvements for a production version:
- Email verification for new accounts
- Search and filter functionality for inventory
- Admin panel for inventory management
- Order history tracking
- Payment integration (Stripe/PayPal)
- Vehicle comparison feature
- Wishlist/favorites functionality
- Advanced search filters (price range, mileage, etc.)

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
