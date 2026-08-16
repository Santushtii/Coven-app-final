const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();


// ==========================================
// CORS
// ==========================================

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


// ==========================================
// JSON
// ==========================================

app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Coven backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);


// ==========================================
// MONGODB ATLAS
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Coven backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  });