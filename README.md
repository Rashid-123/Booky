# Booky  ( a book review platform ) 

## 🌍 Live App URL (https://booky-swart.vercel.app/)

 ## 🔑 Admin Login for Exploration  
To explore all features, use the following credentials:  
- **Email:** `shadanrashid786@gmail.com`  
- **Password:** `Shadan@1505`  

Enjoy exploring the platform! 🚀  

---

## Tech Stack  
**Frontend :**  React , Vite  
**Backend :**  Node.js , Express.js , MongoDB  
**Authentication :** JWT , bcrypt  
**Deployment :** Render (Backend) , Vercel (Frontend) 


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
- `GET /api/books/` -  Fetch all books by user
- `GET /api/books/featured`  -  Fetch all featuredBooks
- `GET /api/books:id`  -  Fetch individual book details
- `POST /api/books`  -  Upload a book ( only admin ) 
- `POST /api/boooks/featured/:id` -  set a book featured (only admin ) 

###  🎯 Review Endpoints
- `GET /api/reviews/:bookId`  -  Fetch all the reviews of a book
- `POST api/reviews`  -  add review to a book

###  🎯 User Endpoints
- `GET /api/users/:id`, -  fetch user data
- `PUT /api/users/:id` , -   Update user data 
---



## 📧 Contact
For issues or suggestions, please open an issue or contact me at [shadanrashid786@gmail.com].
