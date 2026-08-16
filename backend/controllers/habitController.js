const Habit = require("../models/Habit");


// =====================================
// Helper: Calculate current streak
// =====================================

const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  const uniqueDates = [...new Set(completedDates)]
    .sort()
    .reverse();

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  let streak = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedDate = new Date(today);

    expectedDate.setDate(
      today.getDate() - i
    );

    const expectedString =
      expectedDate.toISOString().split("T")[0];

    if (uniqueDates[i] === expectedString) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};


// =====================================
// GET ALL HABITS
// =====================================

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    const today =
      new Date().toISOString().split("T")[0];

    const formattedHabits = habits.map((habit) => ({
      ...habit.toObject(),

      streak: calculateStreak(
        habit.completedDates
      ),

      completedToday:
        habit.completedDates.includes(today),
    }));

    return res.status(200).json(formattedHabits);

  } catch (error) {
    console.error("Get habits error:", error);

    return res.status(500).json({
      message: "Unable to retrieve habits.",
    });
  }
};


// =====================================
// GET SINGLE HABIT
// =====================================

const getHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    const today =
      new Date().toISOString().split("T")[0];

    return res.status(200).json({
      ...habit.toObject(),

      streak: calculateStreak(
        habit.completedDates
      ),

      completedToday:
        habit.completedDates.includes(today),
    });

  } catch (error) {
    console.error("Get habit error:", error);

    return res.status(500).json({
      message: "Unable to retrieve habit.",
    });
  }
};


// =====================================
// CREATE HABIT
// =====================================

const createHabit = async (req, res) => {
  try {
    const {
      name,
      category,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category are required.",
      });
    }

    const habit = await Habit.create({
      user: req.user.id,
      name,
      category,
      completedDates: [],
    });

    return res.status(201).json({
      message: "Habit created successfully.",
      habit,
    });

  } catch (error) {
    console.error("Create habit error:", error);

    return res.status(500).json({
      message: "Unable to create habit.",
    });
  }
};


// =====================================
// UPDATE HABIT
// =====================================

const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    const {
      name,
      category,
    } = req.body;

    if (name !== undefined) {
      habit.name = name;
    }

    if (category !== undefined) {
      habit.category = category;
    }

    await habit.save();

    return res.status(200).json({
      message: "Habit updated successfully.",
      habit,
    });

  } catch (error) {
    console.error("Update habit error:", error);

    return res.status(500).json({
      message: "Unable to update habit.",
    });
  }
};


// =====================================
// DELETE HABIT
// =====================================

const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    await Habit.deleteOne({
      _id: habit._id,
    });

    return res.status(200).json({
      message: "Habit deleted successfully.",
    });

  } catch (error) {
    console.error("Delete habit error:", error);

    return res.status(500).json({
      message: "Unable to delete habit.",
    });
  }
};


// =====================================
// TOGGLE TODAY'S COMPLETION
// =====================================

const toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    const today =
      new Date().toISOString().split("T")[0];

    const dateIndex =
      habit.completedDates.indexOf(today);

    if (dateIndex === -1) {

      // Mark completed
      habit.completedDates.push(today);

    } else {

      // Uncheck
      habit.completedDates.splice(
        dateIndex,
        1
      );
    }

    await habit.save();

    return res.status(200).json({
      message:
        dateIndex === -1
          ? "Habit completed."
          : "Habit unchecked.",

      habit: {
        ...habit.toObject(),

        streak: calculateStreak(
          habit.completedDates
        ),

        completedToday:
          habit.completedDates.includes(today),
      },
    });

  } catch (error) {
    console.error("Toggle habit error:", error);

    return res.status(500).json({
      message: "Unable to update habit.",
    });
  }
};


module.exports = {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
};