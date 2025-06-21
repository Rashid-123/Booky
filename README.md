# 📚 Booky - Online Book Review Platform

A full-stack Book Review platform built using React, Node.js, Express, PostgreSQL, Prisma, and Tailwind CSS.

---

## 🔗 Live Demo

🌐 [Visit Live Site](https://booky-chi.vercel.app/)

---

## 📁 Project Structure

```
Booky/
├── server/       # Backend (Node.js + Express + Prisma)
├── frontend/       # Frontend (React + Vite + Tailwind)
└── README.md
```

---

## 🚀 Getting Started

### ➞ Clone the Repository

```bash
git clone https://github.com/Rashid-123/Booky.git
cd Booky
```

---

## 💽 Frontend Setup (Client)

### Navigate to the client folder:

```bash
cd client
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables:

Create a `.env` file in the `server/` directory with the following:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Start the development server:

```bash
npm run dev
```

> React app will run at: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Backend Setup (Server)

### Navigate to the server folder:

```bash
cd ../server
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables:

Create a `.env` file in the `server/` directory with the following:

```
PORT=5000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your_jwt_secret>
```

### Generate Prisma Client:

```bash
npx prisma generate
```

### Start the server:

```bash
npm start
```

> Backend API will run at: [http://localhost:5000](http://localhost:5000)

---

## 💪 Author

Made with ❤️ by [Shadan Rashid](https://github.com/Rashid-123)

---

## 📖 License

This project is licensed under the MIT License.
