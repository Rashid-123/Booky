# Booky  ( a book review platform )

---
## 🚀 Docker Images

- **Frontend Image :**  https://hub.docker.com/r/rashid29/book-frontend
- **Backend Image :**   https://hub.docker.com/r/rashid29/book-backend

---

## 📥 Clone & Install

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/rashid-123/Booky.git
cd Booky
```

### 2️⃣ Frontend Setup
```sh
cd frontend
npm install
npm run dev  # Runs the frontend on http://localhost:3000
```

### 3️⃣ Backend Setup
```sh
cd backend
npm install
npm run dev  # Runs the backend on http://localhost:5000
```

---

## 👅 Environment Variables

### Frontend (`frontend/.env`)

```
VITE_API_URL = http://localhost:5000/api

```

### Backend (`backend/.env`)

```
MONGO_URI = [ YOUR MONGO URI ]
JWT_SECRET = [ YOU JWT SECRET ]
FRONTEND_URL = "http://localhost:3000"
```


## 🐳 Running with Docker

### 1️⃣ Pull the Docker Images
#### Backend
```sh
docker pull rashid29/book-backend
```
#### Frontend
```sh
docker pull rashid29/book-frontend
```

### 2️⃣ Run the Containers
#### Backend
```sh
docker run -d -p 5000:5000 rashid29/book-backend
```
#### Frontend
```sh
docker run -d -p 3000:80 rashid29/book-frontend
```
Now, access:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 🔌 API Endpoints (Backend)

### 📝 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### 🎯 Books Endpoints
- `GET /api/books/` - Fetch all books by user
- `GET /api/quizzes/quiz/:id` - Get a specific quiz
- `POST /api/quizzes` - Create a new quiz
- `PUT /api/quizzes/:id` - Update a quiz 
- `DELETE /api/quizzes/:id` - Delete a quiz 

---

## 📜 License
This project is licensed under the MIT License.

---

## 📧 Contact
For issues or suggestions, please open an issue or contact me at [shadanrashid786@gmail.com].
