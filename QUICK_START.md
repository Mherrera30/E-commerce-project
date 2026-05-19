# Quick Start Guide

## 🚀 Get Running in 30 Seconds

```bash
# 1. Make sure you're in the project directory
cd /Users/rohitv/CascadeProjects/E-commerce-project

# 2. Make sure you're on the right branch
git checkout pug-templates-HW

# 3. Install dependencies (if not already done)
npm install

# 4. Start the server
npm start
```

## 🌐 Open in Browser

Navigate to: **http://localhost:3000**

## 🧪 Quick Test

1. **Create Account**
   - Click "Login" → Enter username/password → "Create Account"
   
2. **Browse Cars**
   - Click car icon in nav → View 5 available cars
   
3. **Add to Cart**
   - Click any car → "View Details" → "Add to Cart"
   
4. **View Cart**
   - Click cart icon → See your items and total

## 📋 Demo Credentials

Create these for your presentation:

| Username | Password |
|----------|----------|
| demo     | demo123  |
| student  | sfsu2026 |

## 🛑 Stop Server

Press `Ctrl + C` in the terminal

## 📚 Full Documentation

- `README.md` - Complete project documentation
- `TESTING_GUIDE.md` - Full testing checklist
- `COMPLETION_SUMMARY.md` - What was built and fixed

## ⚡ Troubleshooting

**Port already in use?**
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

**Database issues?**
```bash
rm inventory.db
npm start
```

**Missing packages?**
```bash
npm install
```

---

**You're all set! The site is fully functional and ready to demo. 🎉**
