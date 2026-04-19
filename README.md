# PYQ Vault 📚

A platform for college students to upload and access 
previous year question papers.

## 🔗 Live Demo
[Coming soon]

## ✨ Features
- Browse papers by Branch, Year, Semester & Subject
- Upload PDFs (Google login required)
- Delete your own uploaded papers
- Mobile responsive dark UI

## 🛠️ Tech Stack
**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas, Supabase   
**Auth:** Google OAuth + JWT

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Cloud OAuth credentials

### Installation

# Clone the repo
git clone https://github.com/789deepa/college-pyq-platform.git

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

### Environment Variables

**Backend `.env`:**
MONGO_URI=your_mongodb_uri
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret

**Frontend `.env`:**
VITE_API_PREFIX=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_client_id

### Run Locally
# Backend
cd backend && npm run dev

# Frontend  
cd frontend && npm run dev

## 📁 Project Structure
college-pyq-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
└── frontend/
    └── src/
        ├── components/
        ├── lib/
        └── pages/

## 🤝 Contributing
Pull requests welcome! 
