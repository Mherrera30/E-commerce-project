# Testing Guide - SFSU Dealership

## Quick Test Checklist

Use this guide to verify all features are working correctly before submission.

### 1. Homepage ✓
- [ ] Navigate to `http://localhost:3000`
- [ ] Verify SFSU branding (purple/gold colors)
- [ ] Click "Browse Current Inventory" button
- [ ] Verify "Create Account" button appears when not logged in

### 2. User Registration ✓
- [ ] Click "Login" in navigation
- [ ] Enter a unique username (e.g., "testuser1")
- [ ] Enter a password (e.g., "password123")
- [ ] Click "Create Account"
- [ ] Verify success message appears
- [ ] Verify you can now login with those credentials

### 3. User Login ✓
- [ ] Enter your username
- [ ] Enter your password
- [ ] Click "Login"
- [ ] Verify you're redirected to products page
- [ ] Verify welcome message appears
- [ ] Verify navigation shows Profile and Logout icons (not Login)

### 4. Product Browsing ✓
- [ ] Navigate to Products/Inventory page
- [ ] Verify 5 cars are displayed in grid layout
- [ ] Verify each card shows:
  - Car image
  - Model name
  - Price
  - Mileage
  - "View Details" button
- [ ] Verify cards have hover effect

### 5. Product Details ✓
- [ ] Click "View Details" on any car
- [ ] Verify product detail page shows:
  - Large car image
  - Model name
  - Price
  - Mileage
  - Condition (Certified Pre-Owned)
  - Location (San Francisco, CA)
  - "Add to Cart" button
- [ ] Click "← Back to Inventory" link
- [ ] Verify you return to products page

### 6. Shopping Cart - Add Items ✓
- [ ] Make sure you're logged in
- [ ] Go to any product detail page
- [ ] Click "Add to Cart"
- [ ] Verify you're redirected to cart page
- [ ] Verify the car appears in your cart
- [ ] Add 2-3 more cars to cart
- [ ] Verify cart shows:
  - All added items
  - Item count
  - Total price (sum of all items)

### 7. Shopping Cart - Remove Items ✓
- [ ] In cart page, click "Remove" on any item
- [ ] Verify item is removed
- [ ] Verify total price updates
- [ ] Remove all items
- [ ] Verify "Your cart is empty" message appears
- [ ] Verify "Browse Inventory" button appears

### 8. User Profile ✓
- [ ] Click Profile icon in navigation
- [ ] Verify profile shows:
  - Your username
  - User ID
  - Member Since: 2026
  - "Browse Inventory" button
  - "View Cart" button
  - "Logout" button

### 9. Logout ✓
- [ ] Click "Logout" button (in profile or navigation)
- [ ] Verify you're redirected to homepage
- [ ] Verify navigation shows "Login" icon (not Profile/Logout)
- [ ] Try to access `/cart` directly
- [ ] Verify you're redirected to login page

### 10. Session Persistence ✓
- [ ] Login to your account
- [ ] Navigate to different pages
- [ ] Refresh the page
- [ ] Verify you remain logged in
- [ ] Wait 10+ minutes
- [ ] Refresh page
- [ ] Verify session expires and you're logged out

### 11. Navigation ✓
- [ ] Test all navigation links:
  - Home icon → Homepage
  - Car icon → Products page
  - Cart icon → Shopping cart
  - Login/Profile icon → Login or Profile
  - Logout icon → Logout (when logged in)
- [ ] Verify navigation is fixed at top
- [ ] Verify hover effects work

### 12. 404 Error Page ✓
- [ ] Navigate to a non-existent page (e.g., `/invalid-page`)
- [ ] Verify 404 page appears
- [ ] Click "Return to Inventory"
- [ ] Verify you're redirected to products page

### 13. Mobile Responsiveness ✓
- [ ] Resize browser window to mobile size (< 768px)
- [ ] Verify:
  - Navigation icons still visible
  - Product grid shows 1 column
  - Cards stack vertically
  - All buttons are accessible
  - Text is readable

### 14. API Endpoints (Optional) ✓
Test these in browser or with curl:
- [ ] `GET http://localhost:3000/api/products` → Returns JSON array
- [ ] `GET http://localhost:3000/api/products/15000` → Returns single car JSON

### 15. Edge Cases ✓
- [ ] Try registering with an existing username → Should show error
- [ ] Try logging in with wrong password → Should show error
- [ ] Try adding same car to cart twice → Should only add once
- [ ] Try accessing cart without login → Should redirect to login

## Test User Accounts

Create these test accounts for demonstration:

| Username | Password | Purpose |
|----------|----------|---------|
| demo1 | password | Basic user with items in cart |
| demo2 | password | User with empty cart |
| admin | admin123 | Admin demonstration |

## Common Issues & Solutions

### Server won't start
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9
npm start
```

### Database issues
```bash
# Delete and recreate database
rm inventory.db
npm start
```

### Missing dependencies
```bash
npm install
```

### Images not showing
- Check that `/public/images/` folder exists
- Verify all 5 car images are present
- Check browser console for 404 errors

## Performance Checklist

- [ ] Pages load in < 2 seconds
- [ ] No console errors in browser
- [ ] Images load properly
- [ ] Forms submit without errors
- [ ] Database operations complete successfully

## Presentation Demo Flow

1. **Start** - Show homepage, explain project
2. **Register** - Create new account live
3. **Browse** - Show product grid and details
4. **Cart** - Add items, show total calculation
5. **Profile** - Show user information
6. **Logout** - Demonstrate session management

## Final Checklist Before Submission

- [ ] All features working
- [ ] No console errors
- [ ] Code is clean and commented
- [ ] README.md is complete
- [ ] Git repository is up to date
- [ ] Screenshots/demo ready (if required)
- [ ] All group members credited

---

**Good luck with your presentation! 🎓**
