const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const bookRoutes = require("./Routes/bookRoutes");
const userRoutes = require("./Routes/userRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "https://booky-swart.vercel.app", "http://localhost:5173"].filter(Boolean),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

module.exports = { app, server };