const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");


// Load environment variables
dotenv.config();


// Connect MongoDB
connectDB();


// Create Express app
const app = express();


// ==============================
// Middleware
// ==============================

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://coven-app-final-backend.onrender.com",
    ]
  })
);

app.use(express.json());


// ==============================
// Health Check
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Coven API is running.",
  });
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://coven-app-final-frontend.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/habits", habitRoutes);


// ==============================
// Error Handling
// ==============================

app.use(notFound);

app.use(errorHandler);


// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});