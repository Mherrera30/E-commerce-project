# Deployment Guide - SFSU Dealership

## Quick Deploy to Render (FREE)

### Step 1: Push to GitHub

1. Make sure all changes are committed:
```bash
cd /Users/rohitv/CascadeProjects/E-commerce-project
git add .
git commit -m "Ready for deployment"
git push origin pug-templates-HW
```

### Step 2: Deploy on Render

1. Go to https://render.com
2. Sign up/Login (use your GitHub account)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `Mherrera30/E-commerce-project`
5. Select the `pug-templates-HW` branch

### Step 3: Configure Settings

**Build & Deploy Settings:**
- **Name**: `sfsu-dealership` (or whatever you want)
- **Region**: Oregon (US West) - closest to SF
- **Branch**: `pug-templates-HW`
- **Root Directory**: (leave blank)
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select: **Free** (0$/month)

### Step 4: Click "Create Web Service"

Render will:
1. Clone your repo
2. Install dependencies
3. Start your server
4. Give you a URL like: `https://sfsu-dealership.onrender.com`

**Deploy time: 2-3 minutes**

---

## Alternative: Deploy to Railway (Also FREE)

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy on Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js and deploys!

**You'll get a URL like:** `https://sfsu-dealership.up.railway.app`

---

## Important Notes

### Database Persistence
- SQLite database will reset on free tier restarts
- This is fine for a school project demo
- Users can still create accounts and shop (just might reset occasionally)

### Free Tier Limitations
**Render Free:**
- Spins down after 15 min of inactivity
- First load after sleep takes 30-60 seconds
- Perfect for demos and assignments

**Railway Free:**
- $5 credit per month (plenty for school project)
- Faster than Render
- No sleep time

---

## Testing Your Deployed Site

Once deployed, test:
1. Visit your URL
2. Create an account
3. Browse products
4. Add to cart
5. Checkout
6. Share URL with classmates/professor!

---

## Sharing Your Project

**Your deployed URL will be:**
- Render: `https://[your-app-name].onrender.com`
- Railway: `https://[your-app-name].up.railway.app`

**Share this URL in:**
- Assignment submission
- Project presentation
- README.md

---

## Troubleshooting

### "Application failed to start"
- Check Render/Railway logs
- Make sure `npm install` completed
- Verify `package.json` has all dependencies

### "Cannot find module"
- Missing dependency in package.json
- Run `npm install` locally first to test

### "Database errors"
- Normal on first deploy
- Database creates automatically on first run

---

## Quick Deploy Checklist

- [ ] All code committed to GitHub
- [ ] Pushed to `pug-templates-HW` branch
- [ ] Signed up for Render or Railway
- [ ] Connected GitHub repository
- [ ] Configured build settings
- [ ] Clicked "Deploy"
- [ ] Tested deployed URL
- [ ] Shared URL with professor

---

## Recommended: Use Render

**Why Render:**
- Completely free forever
- Easy setup
- Good for student projects
- No credit card required

**Your site will be live and accessible to anyone with the URL!**

Good luck! 🚀
