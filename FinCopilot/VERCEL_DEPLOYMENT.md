# 🚀 Vercel Deployment Guide for FinCopilot

## 📋 Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- MongoDB Atlas account for production database

## 🎯 Deployment Strategy

This app has two parts that need separate deployments:
1. **Frontend** (Next.js) - Main Vercel deployment
2. **Backend** (Express API) - Separate Vercel deployment

## 📦 Step 1: Prepare Your Repository

### Push to Git (if not already done)
```bash
cd c:\Users\KIIT0001\Desktop\codenexus\FinCopilot
git init
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 🔧 Step 2: Deploy Backend

### 2.1 Create MongoDB Atlas Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/fincopilot`)
4. **IMPORTANT**: Whitelist all IPs (0.0.0.0/0) in Network Access

### 2.2 Deploy Backend to Vercel
1. Go to https://vercel.com/new
2. Import your repository
3. **Root Directory**: Set to `FinCopilot/backend`
4. **Framework Preset**: Other
5. **Build Command**: Leave empty
6. **Output Directory**: Leave empty
7. **Install Command**: `npm install`

### 2.3 Add Backend Environment Variables
In Vercel project settings, add:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### 2.4 Note Your Backend URL
After deployment, you'll get a URL like: `https://your-backend.vercel.app`

## 🎨 Step 3: Deploy Frontend

### 3.1 Update Frontend API URL
Before deploying frontend, update the API endpoint:

In `frontend/src/` files, replace `http://localhost:5000` with your backend Vercel URL.

Or create `frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

### 3.2 Deploy Frontend to Vercel
1. Go to https://vercel.com/new
2. Import the same repository
3. **Root Directory**: Set to `FinCopilot/frontend`
4. **Framework Preset**: Next.js (auto-detected)
5. **Build Command**: `npm run build`
6. **Output Directory**: `.next`
7. **Install Command**: `npm install`

### 3.3 Add Frontend Environment Variables
In Vercel project settings, add:
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
```

## ✅ Step 4: Verify Deployment

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Test the health endpoint: `https://your-backend.vercel.app/health`
3. Try logging in and using features

## 🔒 Step 5: Configure CORS (Backend)

Update backend CORS to allow your frontend domain:

The backend already has CORS enabled, but for production, you may want to restrict it:
```javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

## 📝 Important Notes

### Files Created for Deployment:
- ✅ `backend/vercel.json` - Backend Vercel config
- ✅ `backend/api/index.js` - Serverless function wrapper
- ✅ `frontend/vercel.json` - Frontend Vercel config
- ✅ `VERCEL_DEPLOYMENT.md` - This guide

### Original Code Unchanged:
- ✅ `backend/src/index.js` - Original server file intact
- ✅ All frontend files unchanged
- ✅ Local development still works with `npm run dev`

## 🔄 Continuous Deployment

Once connected to Git:
- Push to `main` branch → Auto-deploys to production
- Push to other branches → Creates preview deployments

## 🐛 Troubleshooting

### Backend Issues:
- Check Vercel logs in dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend Issues:
- Check browser console for API errors
- Verify NEXT_PUBLIC_API_URL is correct
- Check Vercel build logs

### Database Connection:
- MongoDB Atlas: Whitelist Vercel IPs (0.0.0.0/0 for all)
- Check database user permissions

## 🚀 Quick Deploy Commands

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy backend
cd backend
vercel

# Deploy frontend
cd ../frontend
vercel
```

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Your original code remains untouched! All deployment files are separate.**
