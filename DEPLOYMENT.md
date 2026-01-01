# Vercel Deployment Guide

Your application is now configured for Vercel deployment!

## Prerequisites

1. Install Vercel CLI (optional for local testing):
   ```bash
   npm install -g vercel
   ```

2. Have a Vercel account at https://vercel.com

## Environment Variables

You need to set these environment variables in your Vercel project settings:

### Backend Environment Variables:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Set to "production"

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Navigate to your project root:
   ```bash
   cd c:\Users\adity\OneDrive\Desktop\DocAssign
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to https://vercel.com/new

3. Import your GitHub repository

4. Vercel will auto-detect the configuration from `vercel.json`

5. Add environment variables in the Vercel dashboard

6. Click "Deploy"

## Important Notes

- The backend will run as serverless functions on Vercel
- File uploads are stored in `/tmp` directory in serverless functions (ephemeral)
- For persistent file storage, consider using:
  - Vercel Blob Storage
  - AWS S3
  - Cloudinary
  - MongoDB GridFS

## Post-Deployment

After deployment, your app will be available at:
- Frontend: https://your-project-name.vercel.app
- Backend API: https://your-project-name.vercel.app/api

Make sure to update any CORS settings if needed.
