const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
} = require("../controllers/habitController");

const router = express.Router();


// All habit routes require authentication
router.use(protect);


// GET /api/habits
router.get("/", getHabits);


// GET /api/habits/:id
router.get("/:id", getHabit);


// POST /api/habits
router.post("/", createHabit);


// PUT /api/habits/:id
router.put("/:id", updateHabit);


// DELETE /api/habits/:id
router.delete("/:id", deleteHabit);


// PATCH /api/habits/:id/toggle
router.patch("/:id/toggle", toggleHabit);


module.exports = router;