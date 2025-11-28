
````markdown
# SmartStaff Manager 🤖
> AI-Powered Resource Allocation System for ProU Assessment.

**SmartStaff Manager** is a Full-stack application designed to solve resource allocation inefficiencies. It features an **Intelligent Auto-Assign Agent** that calculates a "Suitability Score" (0-100%) for every employee against a specific task based on:

1.  **Skill Matching** (Weighted 50%)
2.  **Current Workload** (Weighted 30%)
3.  **Performance Rating** (Weighted 20%)

---

## 🚀 Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Axios
* **Backend:** Java (Spring Boot 3.5.8), REST API
* **Database:** MongoDB
* **Tools:** Maven, Lombok

---

## ✨ Key Features

* **Dashboard:** Real-time view of Employees and Active Tasks.
* **AI Recommendation Engine:** Click "Auto-Assign" to see a ranked list of best-fit candidates with calculated scores.
* **Task Assignment:** One-click assignment that updates the database and task status.
* **Reactive UI:** Clean, modern interface using Tailwind CSS.

---

## 🛠️ Setup Instructions

### 1. Backend (Spring Boot)
Prerequisites: Java 17+ and MongoDB running locally on port 27017.

```bash
cd backend
./mvnw spring-boot:run
````

*Server starts at: `http://localhost:8080`*

### 2\. Frontend (React)

Prerequisites: Node.js installed.

```bash
cd frontend
npm install
npm run dev
```

*Client starts at: `http://localhost:5173`*

-----

## 📸 API Endpoints

| Method | Endpoint                        | Description                                |
| :----- | :------------------------------ | :----------------------------------------- |
| `GET`  | `/api/employees`                | List all employees                         |
| `GET`  | `/api/tasks`                    | List all tasks                             |
| `POST` | `/api/tasks/recommendations`    | **(AI)** Get ranked suggestions for a task |
| `PUT`  | `/api/tasks/{id}/assign/{empId}`| Assign task to employee                    |

-----

**Author:** Bonkur Harshith Reddy

````