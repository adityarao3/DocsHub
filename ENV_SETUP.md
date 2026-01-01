# 🔧 Environment Configuration Guide

This guide helps you set up the `.env` files for both backend and frontend.

---

## 📋 Backend Environment (.env)

### Location
`backend/.env`

### Required Variables

#### 1. PORT
```env
PORT=5000
```
- **Description**: Port number for the backend server
- **Default**: 5000
- **Production**: Usually set by hosting platform
- **Notes**: Make sure this port is not in use

#### 2. MONGO_URI
```env
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/docassign

# MongoDB Atlas (Production)
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/docassign?retryWrites=true&w=majority
```
- **Description**: MongoDB connection string
- **Local**: `mongodb://localhost:27017/docassign`
- **Atlas**: Get from MongoDB Atlas dashboard
- **Notes**: 
  - Replace `username` and `password` with your MongoDB user credentials
  - Replace `cluster0.xxxxx` with your actual cluster URL
  - Database name is `docassign`

#### 3. JWT_SECRET
```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```
- **Description**: Secret key for JWT token signing
- **Requirements**: 
  - Minimum 32 characters
  - Use random, unpredictable string
  - Different for dev and production
- **Generate**: 
  ```bash
  # Node.js
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  
  # Online
  # Visit: https://www.uuidgenerator.net/
  ```
- **Example**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

#### 4. GEMINI_API_KEY
```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
- **Description**: Google Gemini AI API key
- **Get Key**: 
  1. Visit https://makersuite.google.com/app/apikey
  2. Sign in with Google account
  3. Click "Create API Key"
  4. Copy the key
- **Format**: Starts with `AIzaSy`
- **Notes**: Keep this secret, don't commit to Git

#### 5. MAX_FILE_SIZE (Optional)
```env
MAX_FILE_SIZE=10485760
```
- **Description**: Maximum file upload size in bytes
- **Default**: 10485760 (10MB)
- **Calculation**: 
  - 1MB = 1024 * 1024 = 1,048,576 bytes
  - 10MB = 10 * 1,048,576 = 10,485,760 bytes
- **Notes**: Adjust based on your needs

#### 6. NODE_ENV (Production Only)
```env
NODE_ENV=production
```
- **Description**: Environment mode
- **Values**: `development` or `production`
- **Notes**: Set to `production` when deploying

### Complete Backend .env Example

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/docassign

# JWT Secret (CHANGE THIS!)
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

# AI Configuration
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# File Upload
MAX_FILE_SIZE=10485760

# Environment (for production)
# NODE_ENV=production
```

---

## 🎨 Frontend Environment (.env)

### Location
`frontend/.env`

### Required Variables

#### 1. VITE_API_URL
```env
# Development
VITE_API_URL=http://localhost:5000

# Production
VITE_API_URL=https://your-backend-domain.com
```
- **Description**: Backend API base URL
- **Development**: `http://localhost:5000`
- **Production**: Your deployed backend URL
- **Notes**: 
  - Must start with `VITE_` to be accessible in React
  - No trailing slash
  - Include protocol (http:// or https://)

### Complete Frontend .env Example

```env
# Development
VITE_API_URL=http://localhost:5000

# Production (comment out dev, uncomment this)
# VITE_API_URL=https://docassign-backend.onrender.com
```

---

## 🔐 Security Best Practices

### DO ✅
- ✅ Use strong, random JWT secrets
- ✅ Keep API keys secret
- ✅ Use different secrets for dev/prod
- ✅ Add `.env` to `.gitignore`
- ✅ Use environment variables in hosting platforms
- ✅ Rotate keys periodically
- ✅ Use MongoDB Atlas for production
- ✅ Enable MongoDB authentication

### DON'T ❌
- ❌ Commit `.env` files to Git
- ❌ Share API keys publicly
- ❌ Use simple/predictable secrets
- ❌ Hardcode secrets in code
- ❌ Use same secrets for dev/prod
- ❌ Leave default values in production

---

## 📝 Setup Checklist

### Backend
- [ ] Create `backend/.env` file
- [ ] Set PORT (default: 5000)
- [ ] Configure MONGO_URI
  - [ ] Local: `mongodb://localhost:27017/docassign`
  - [ ] Or Atlas: Get connection string
- [ ] Generate strong JWT_SECRET
- [ ] Get GEMINI_API_KEY from Google
- [ ] Set MAX_FILE_SIZE (optional)
- [ ] Verify all values are correct
- [ ] Test connection: `npm run dev`

### Frontend
- [ ] Create `frontend/.env` file
- [ ] Set VITE_API_URL
  - [ ] Dev: `http://localhost:5000`
  - [ ] Prod: Your backend URL
- [ ] Verify URL is correct
- [ ] Test connection: `npm run dev`

---

## 🧪 Testing Configuration

### Test Backend Connection
```bash
cd backend
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 Environment: development
```

Visit: http://localhost:5000/api/health

Expected response:
```json
{
  "status": "OK",
  "message": "Document Intelligence Hub API is running",
  "timestamp": "2025-12-31T..."
}
```

### Test Frontend Connection
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

Visit: http://localhost:5173

Should load the home page without errors.

---

## 🚨 Troubleshooting

### Backend Issues

#### "Cannot connect to MongoDB"
- **Check**: MongoDB is running
- **Check**: MONGO_URI is correct
- **Fix**: Start MongoDB or verify Atlas connection string

#### "JWT malformed" or "Invalid token"
- **Check**: JWT_SECRET is set
- **Check**: JWT_SECRET matches between requests
- **Fix**: Verify JWT_SECRET in .env

#### "AI generation failed"
- **Check**: GEMINI_API_KEY is correct
- **Check**: API key has quota remaining
- **Fix**: Verify API key, check Google Cloud console

### Frontend Issues

#### "Network Error" or "Failed to fetch"
- **Check**: Backend is running
- **Check**: VITE_API_URL is correct
- **Fix**: Verify backend URL, check CORS settings

#### "Environment variable not defined"
- **Check**: Variable starts with `VITE_`
- **Check**: .env file exists in frontend folder
- **Fix**: Restart dev server after changing .env

---

## 🌍 Environment-Specific Configs

### Development
```env
# Backend
PORT=5000
MONGO_URI=mongodb://localhost:27017/docassign
JWT_SECRET=dev_secret_key_not_for_production
GEMINI_API_KEY=your_dev_api_key

# Frontend
VITE_API_URL=http://localhost:5000
```

### Production
```env
# Backend
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/docassign
JWT_SECRET=super_strong_random_production_secret_32_chars_min
GEMINI_API_KEY=your_production_api_key
NODE_ENV=production

# Frontend
VITE_API_URL=https://your-backend-domain.com
```

---

## 📦 Alternative: OpenAI Configuration

If using OpenAI instead of Gemini:

### Backend .env
```env
# Comment out Gemini
# GEMINI_API_KEY=...

# Add OpenAI
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Code Changes
In `backend/utils/aiService.js`:
1. Comment out Gemini code
2. Uncomment OpenAI code
3. Update import statements

---

## 🎯 Quick Reference

### Get API Keys

| Service | URL | Key Format |
|---------|-----|------------|
| Google Gemini | https://makersuite.google.com/app/apikey | `AIzaSy...` |
| OpenAI | https://platform.openai.com/api-keys | `sk-...` |
| MongoDB Atlas | https://cloud.mongodb.com | `mongodb+srv://...` |

### Generate Secrets

```bash
# JWT Secret (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# JWT Secret (OpenSSL)
openssl rand -hex 32

# JWT Secret (Online)
# Visit: https://www.uuidgenerator.net/
```

---

## ✅ Verification

### Backend
```bash
cd backend
cat .env
# Should show all required variables
```

### Frontend
```bash
cd frontend
cat .env
# Should show VITE_API_URL
```

### Test
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Browser
# Visit http://localhost:5173
# Try to register and login
```

---

**Remember**: Never commit `.env` files to version control! 🔒
