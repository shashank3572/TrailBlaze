# 🚀 TrailBlaze – AI-Driven Career Roadmap & Guidance Platform

TrailBlaze is a full-stack career guidance system that helps students and professionals discover their ideal career path through **AI recommendations, interactive roadmaps, personalized insights, and skill analysis**.

This project is designed as part of the Mini Project (5th Semester) and meets all review requirements including system design, implementation, testing, and demonstration.

---

## ✅ **Key Features**

### 🔹 1. User Authentication (Register/Login)
- Secure user accounts using JWT Authentication.
- Password hashing for safety.
- Personalized dashboard after login.

### 🔹 2. AI-Based Career Recommendation  
- Suggests a career path based on user-entered skills.
- Uses a custom AI-like rule engine on the backend.
- Dashboard displays recommended career dynamically.

### 🔹 3. Interactive Career Roadmaps  
- Multiple detailed roadmaps including:
  - Full Stack Developer  
  - Data Scientist  
  - AI/ML Engineer  
  - UI/UX Designer  
  - 2 Non-Technical Careers  
- Flowchart-style visualization using cards & arrows.
- Quiz result influences default roadmap selection.

### 🔹 4. Career Affinity Quiz (12-Question ML-Styled Quiz)
- Determines the user's natural strengths.
- Saves recommended career to local storage.
- Personalizes roadmap suggestions.

### 🔹 5. Career Health Score (AI-Based)
- Predicts career stability (0–100).
- Considers experience, skills & industry.
- Dynamic circular progress bar and recommendations.

### 🔹 6. Trends & Insights Dashboard  
- Displays industry demand, risks, salaries & future scope.
- Clean UI similar to real dashboards.

### 🔹 7. User Profile  
- Add/remove skills dynamically.  
- Profile used for AI recommendations.  
- Fully editable & saved to backend.

---

## ✅ **Tech Stack**

### **Frontend**
- React.js  
- Tailwind CSS  
- Axios  
- React Router  
- Vite / Create React App (depending on your setup)

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- bcrypt password hashing  
- Custom AI Logic Engine  

### **Other Tools**
- GitHub for version control   
- VS Code  

---

## ✅ **System Architecture**

**Frontend ⟷ Backend ⟷ MongoDB**

- Users interact with React UI  
- React sends API requests with Axios  
- Express backend processes logic  
- MongoDB stores user profiles, skills & data  
- AI layer generates recommendations  

---

## ✅ **Folder Structure**

TrailBlaze/
│
├── backend/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
└── frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── api/
│ └── App.jsx

yaml
Copy code

---

## ✅ **Setup Instructions**

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/shashank3572/TrailBlaze.git
cd TrailBlaze