# Campus Connect - Vercel Deployment Guide

## 📋 Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository (GitHub/GitLab/Bitbucket) with your code
- MongoDB Atlas database (already configured)

## 🚀 Deployment Steps

### 1. Prepare Your Repository
```bash
# Ensure all changes are committed and pushed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: Will be auto-detected
   - **Output Directory**: Will be auto-detected

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# Set up and deploy "~/campusconnect"? [Y/n] Y
# Which scope do you want to deploy to? [Select your account]
# Link to existing project? [Y/n] N
# What's your project's name? campusconnect
# In which directory is your code located? ./
```

### 3. Configure Environment Variables

In your Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add the following variables:

**Required Environment Variables:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&appName=YourApp
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=production
PORT=5000
```

**Important:** 
- Use your actual MongoDB Atlas connection string
- Generate a strong JWT secret (use tools like: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### 4. Update CORS Configuration (Already Done)

Your backend already includes the correct CORS configuration:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://campus-connect-rouge.vercel.app' // Production
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));
```

**Update the production URL** in `backend/server.js` to match your actual Vercel deployment URL.

### 5. Frontend API Configuration

Your frontend now uses the configuration from `frontend/src/config.js`:
```javascript
// In your React components, import and use:
import config from './config';

// Use config.API_URL for API calls
axios.get(`${config.API_URL}/students`)
```

### 6. Test Your Deployment

After deployment:
1. Visit your Vercel URL
2. Test login functionality
3. Test API endpoints: `https://your-app.vercel.app/api/health`
4. Check browser console for any errors

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Fix any TypeScript/lint errors

2. **API Routes Not Working**
   - Verify vercel.json configuration
   - Check environment variables are set
   - Ensure MongoDB connection string is correct

3. **CORS Errors**
   - Update CORS origin in backend/server.js
   - Use your actual Vercel domain

4. **Frontend Can't Connect to API**
   - Update API URL in frontend configuration
   - Check network tab in browser dev tools

### Logs and Debugging:
- View function logs: Vercel Dashboard → Functions tab
- Real-time logs: `vercel logs` (CLI)
- Build logs: Available in deployment details

## 📦 Project Structure After Deployment

```
campusconnect/
├── vercel.json (Deployment configuration)
├── frontend/
│   ├── src/config.js (API configuration)
│   └── package.json (Updated)
├── backend/
│   ├── server.js (Main API)
│   └── package.json
└── VERCEL_DEPLOYMENT_GUIDE.md (This file)
```

## 🎉 Post-Deployment

1. **Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Monitoring**:
   - Check Analytics tab for usage stats
   - Set up error tracking if needed

3. **Updates**:
   - Push to your git repository
   - Vercel auto-deploys on every push to main branch

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (auto-set by Vercel) | `5000` |

## 🚨 Security Notes

- Never commit `.env` files to git
- Use strong JWT secrets in production
- Regularly rotate your database credentials
- Enable MongoDB Atlas IP whitelist (0.0.0.0/0 for Vercel)

## ✅ Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] MongoDB Atlas database accessible
- [ ] Environment variables configured in Vercel
- [ ] CORS origins updated with production URL
- [ ] Frontend API configuration updated
- [ ] Test deployment works end-to-end
- [ ] Error handling tested
- [ ] Performance monitored

Your Campus Connect application should now be live on Vercel! 🎉 