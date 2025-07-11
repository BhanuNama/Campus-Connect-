# Deployment Guide

## Environment Variables Setup

### For Local Development:
1. Copy `env.template` to `.env`
2. Fill in your actual MongoDB Atlas credentials
3. Generate a strong JWT secret

### For GitHub/Vercel Deployment:

#### Required Environment Variables:
- `MONGO_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - A strong secret key for JWT tokens
- `NODE_ENV` - Set to `production`

#### Vercel Setup:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   ```
   MONGO_URI = mongodb+srv://bhanunama08:Bhanu%400803@campusconnect.6gmitv2.mongodb.net/campusconnect?retryWrites=true&w=majority&appName=CampusConnect
   JWT_SECRET = your_super_secret_jwt_key_here
   NODE_ENV = production
   ```

#### GitHub Secrets (for CI/CD):
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add the same environment variables as secrets

## Security Notes:
- Never commit `.env` files to GitHub
- Always use environment variables in production
- Generate strong, unique JWT secrets
- Regularly rotate your secrets 