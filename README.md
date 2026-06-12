# ⚡ AI-Powered Career Optimizer

An NLP-based resume optimizer that computes semantic similarity between resumes and job descriptions, powered by Google Gemini AI.

## 🌐 Live Demo
**Frontend:** https://career-optimizer.vercel.app/
**Backend API:** https://career-optimizer.onrender.com/

## 🚀 Features
- 📄 PDF resume ingestion using Multer + pdf-parse
- 🤖 AI-powered skill gap analysis via Google Gemini API
- 📊 ATS keyword optimization with cosine similarity scoring
- 📈 Visual skill radar chart and gap breakdown
- 🎯 Missing skills, present skills, and keyword suggestions

## 🛠 Tech Stack
**Frontend:** React, Vite, Recharts
**Backend:** Node.js, Express, Multer, pdf-parse
**AI:** Google Gemini 1.5 Flash API
**NLP:** TF-IDF Cosine Similarity
**Deployment:** Vercel (Frontend) + Render (Backend)

## ⚙️ Setup

### Clone
```bash
git clone https://github.com/Yashika28284/career-optimizer.git
cd career-optimizer
```

### Backend
```bash
cd backend
npm install
# Add GEMINI_API_KEY to .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## 🔑 Get Gemini API Key
Go to https://aistudio.google.com/app/apikey → Create API Key → paste in `backend/.env`

## 📸 Usage
1. Upload your PDF resume
2. Paste the job description
3. Click ⚡ Analyze Resume
4. Get ATS score, missing skills, keywords + AI suggestions
