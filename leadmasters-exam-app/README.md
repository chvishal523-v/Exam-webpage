# LeadMasters Exam (Student Module)

Teck stack: **React.js + Node.js/Express + MongoDB**

## ✨ Features
- JWT auth (register/login)
- Start Exam → randomized questions from backend
- MCQ display + selection
- Timer (30 min) with auto-submit
- Submit → server calculates score
- Result page shows score + details

## 🧱 Project Structure
```
exam-app/
  backend/
  frontend/
  package,json
```

## 🚀 Getting Started
### 1)LEADMASTERS-EXAM_APP
```bash
  npm install #install all dependencies modules 
  # Edit .env with your Mongo URI and JWT_SECRET
  npm run dev
```


Open the URL printed by Vite (default `http://localhost:5173`).

### 1) Backend
```bash
cd backend

npm run seed   # load sample questions
    # or: npm start
```

- Health: `GET http://localhost:5000/api/health`
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Start: `GET /api/exam/start?limit=5`  (Bearer token)
- Submit: `POST /api/exam/submit` (Bearer token)
- Postman: `backend/postman_collection.json`


> The frontend reads `VITE_API_BASE` to call the backend (defaults to `http://localhost:5000`).

## 🛡 Notes
- Password hashing with bcrypt
- Token expiry 8h
- Options shuffled per question; correct answers not sent to client
- Score computed server-side

## 📦 Deploy
- Backend: Render/railway/VPS with environment vars
- Frontend: Netlify/Vercel; set `VITE_API_BASE` to your backend URL

## 📄 License
MIT


# achived exam page

## Author
**ChingitamVishal**
- GitHub:[https://github.com/chvishal523-v]
- linkdin:[http://linkedin.com/in/vishal-chingitam]
- email:[ch.vishal523@gmail.com]
