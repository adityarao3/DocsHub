# 📚 Document Intelligence & Knowledge Search Hub

A production-ready MERN stack application that enables users to upload documents (PDF/TXT), extract text content, and ask AI-powered questions with answers strictly grounded in their uploaded documents.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-blue)
![React](https://img.shields.io/badge/React-v18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔐 Authentication
- **Secure Signup & Login** with email and password
- **JWT-based authentication** with token expiration
- **Password hashing** using bcrypt
- **Protected routes** - users can only access their own data

### 📄 Document Management
- **Upload PDF and TXT files** (max 10MB)
- **Automatic text extraction** from documents
- **Real-time processing status** (processing, completed, failed)
- **Document metadata tracking** (name, size, upload date)
- **Delete documents** with file cleanup
- **Drag-and-drop upload** interface

### 🤖 AI-Powered Q&A
- **Ask questions** about uploaded documents
- **AI answers strictly from document content** - no hallucinations
- **Source references** for every answer
- **Chat-style interface** with conversation history
- **Automatic context building** from all user documents
- **Fallback responses** when information is not found

### 💬 Query History
- **View past questions and answers**
- **Pagination support** for large histories
- **Delete individual queries** or clear all history
- **Timestamp tracking** for all interactions

### 🎨 Modern UI/UX
- **Responsive design** - works on all devices
- **Clean, intuitive interface** with smooth animations
- **Real-time updates** for document processing
- **Loading states** and error handling
- **Premium gradient designs** and glassmorphism effects

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **pdf-parse** - PDF text extraction
- **Google Gemini AI** - Answer generation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling with custom design system

## 📁 Project Structure

```
DocAssign/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   └── queryController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Document.js
│   │   └── QueryHistory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── document.js
│   │   └── query.js
│   ├── utils/
│   │   ├── upload.js
│   │   ├── textExtractor.js
│   │   └── aiService.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatInput.jsx
    │   │   ├── ChatMessage.jsx
    │   │   ├── DocumentList.jsx
    │   │   ├── DocumentUpload.jsx
    │   │   ├── Navigation.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Chat.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── Chat.css
    │   │   └── Home.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key (or OpenAI API Key)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DocAssign
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Required variables:
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: A strong random string
# - GEMINI_API_KEY: Your Google Gemini API key
```

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/docassign
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/docassign

# JWT Secret (Use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
# Alternative: OPENAI_API_KEY=your_openai_api_key_here

# File Upload Configuration
MAX_FILE_SIZE=10485760
```

#### Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Getting API Keys

### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

### Alternative: OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key and add it to your `.env` file
5. Uncomment the OpenAI code in `backend/utils/aiService.js`

## 📖 How It Works

### Document Processing Flow

1. **Upload**: User uploads a PDF or TXT file
2. **Storage**: File is saved to the `uploads/` directory
3. **Database Entry**: Document metadata is stored in MongoDB with status "processing"
4. **Text Extraction**: 
   - PDF files: Extracted using `pdf-parse` library
   - TXT files: Read directly from filesystem
5. **Update**: Document status updated to "completed" or "failed"
6. **Ready**: Document text is now available for AI queries

### AI Question Answering Flow

1. **User Question**: User asks a question in the chat interface
2. **Context Building**: System retrieves all completed documents for the user
3. **Prompt Construction**: Creates a prompt with:
   - System instructions (answer only from documents)
   - All document texts with metadata
   - User's question
4. **AI Generation**: Sends to Google Gemini (or OpenAI)
5. **Reference Extraction**: Identifies relevant document excerpts
6. **Response**: Returns answer with source references
7. **History**: Saves question, answer, and references to database

### AI Limitations & Constraints

#### ✅ What the AI Does
- Answers questions **strictly** based on uploaded document content
- Provides source references for every answer
- Indicates when information is not found in documents

#### ❌ What the AI Does NOT Do
- Generate answers from general knowledge
- Make assumptions beyond document content
- Process scanned PDFs (OCR not implemented)
- Understand images or charts in PDFs

#### 🔍 Known Constraints
- **No OCR**: Scanned PDFs without text layer won't be processed
- **Basic Matching**: Uses simple keyword matching for references (no vector DB)
- **Context Limit**: Very large documents may exceed AI context window
- **English-focused**: Best results with English text
- **No Multi-modal**: Cannot process images, tables, or charts

## 🎯 Usage Guide

### 1. Create an Account
- Navigate to the home page
- Click "Get Started" or "Sign Up"
- Enter your email and password (min 6 characters)
- Click "Create Account"

### 2. Upload Documents
- Go to the Dashboard
- Drag and drop a PDF or TXT file, or click "Choose File"
- Click "Upload Document"
- Wait for processing to complete (status will update automatically)

### 3. Ask Questions
- Navigate to the Chat page
- Type your question in the input field
- Press Enter or click the send button
- View the AI's answer with source references

### 4. Manage Documents
- View all documents in the Dashboard
- Check processing status
- Delete documents you no longer need

### 5. View History
- All questions and answers are saved automatically
- Scroll through chat history
- Clear history if needed

## 🔒 Security Features

- **Password Hashing**: All passwords hashed with bcrypt (10 salt rounds)
- **JWT Authentication**: Secure token-based auth with 7-day expiration
- **Protected Routes**: Backend validates JWT on all protected endpoints
- **User Isolation**: Users can only access their own documents and queries
- **File Validation**: Only PDF and TXT files allowed, max 10MB
- **Error Handling**: Comprehensive error handling without exposing sensitive data

## 🧪 Testing the Application

### Test Document Upload
1. Create a simple TXT file with some content
2. Upload it via the Dashboard
3. Wait for "Completed" status

### Test AI Q&A
1. Upload a document with known content
2. Ask a specific question about that content
3. Verify the answer matches the document
4. Check that references are provided

### Test AI Limitations
1. Ask a question about content NOT in your documents
2. Verify you get: "The uploaded documents do not contain enough information to answer this."

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Ensure port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Document processing fails
- Check file is valid PDF or TXT
- Verify file size is under 10MB
- Check backend logs for errors

### AI answers are generic
- Verify your API key is correct
- Check document was processed successfully
- Review backend logs for AI service errors

## 📝 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/profile`
Get current user profile (requires auth)

### Document Endpoints

#### POST `/api/documents/upload`
Upload a document (requires auth, multipart/form-data)

#### GET `/api/documents`
Get all user documents (requires auth)

#### GET `/api/documents/:id`
Get single document (requires auth)

#### DELETE `/api/documents/:id`
Delete document (requires auth)

### Query Endpoints

#### POST `/api/queries/ask`
Ask a question (requires auth)
```json
{
  "question": "What is the main topic?"
}
```

#### GET `/api/queries`
Get query history (requires auth)

#### DELETE `/api/queries/:id`
Delete single query (requires auth)

#### DELETE `/api/queries/clear`
Clear all history (requires auth)

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<your-backend-url>`
6. Deploy

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create database user
4. Whitelist IP addresses (or allow all for development)
5. Get connection string
6. Update `MONGO_URI` in backend `.env`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 🙏 Acknowledgments

- Google Gemini AI for intelligent answer generation
- pdf-parse library for PDF text extraction
- MongoDB for flexible document storage
- React and Vite for modern frontend development

---

**Note**: This is a demonstration project. For production use, consider adding:
- Rate limiting
- File virus scanning
- Vector database for better semantic search
- OCR for scanned PDFs
- Multi-language support
- User email verification
- Password reset functionality
- Document sharing features
- Advanced analytics
