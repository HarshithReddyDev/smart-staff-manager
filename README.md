# SmartStaff Manager 🤖
AI-Powered Resource Allocation System for ProU Assessment

SmartStaff Manager is a full-stack application built to solve resource allocation inefficiencies.
It features an Intelligent Auto-Assign Agent that calculates a Suitability Score (0–100%) for every employee based on:

1. Skill Matching (50%)
2. Current Workload (30%)
3. Performance Rating (20%)

---

## 🚀 Tech Stack
Frontend: React.js (Vite), Tailwind CSS, Axios
Backend: Java (Spring Boot 3.5.8), REST API
Database: MongoDB
Tools: Maven, Lombok

---

## ✨ Key Features
- Dashboard: Real-time view of employees and active tasks
- AI Recommendation Engine: One-click “Auto-Assign” generates ranked best-fit employees
- Task Assignment: Updates employee allocation + task status in database
- Modern UI: Fast and clean interface powered by Tailwind CSS

---

## 🛠️ Setup Instructions

### 1. Backend (Spring Boot)
Prerequisites: Java 17+ and MongoDB (running on port 27017)

```bash
cd backend
./mvnw spring-boot:run
```

Server runs at: http://localhost:8080

---

### 2. Frontend (React)
Prerequisites: Node.js installed

```bash
cd frontend
npm install
npm run dev
```

Client runs at: http://localhost:5173

---

## 📸 API Endpoints
Method | Endpoint | Description
GET    | /api/employees | List all employees
GET    | /api/tasks | List all tasks
POST   | /api/tasks/recommendations | AI: Ranked recommendations for task
PUT    | /api/tasks/{id}/assign/{empId} | Assign task to employee

---

## 👤 Author
Bonkur Harshith Reddy

