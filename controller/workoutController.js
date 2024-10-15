const Workout = require("../models/workoutModel");

// Create Workout (with required fields check)
exports.createWorkout = async (req, res) => {
  const { activityType, duration, caloriesBurned } = req.body;

  // Check if all required fields are provided
  if (!activityType || !duration || !caloriesBurned) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required: activityType, duration, and caloriesBurned.",
      });
  }

  try {
    const workout = new Workout({ ...req.body, user: req.user.id });
    await workout.save();

    // Print the workout object
    console.log("New Workout Created:", workout);

    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Workouts by User
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Workout (with required fields check)
exports.updateWorkout = async (req, res) => {
  const { activityType, duration, caloriesBurned } = req.body;

  // Check if all required fields are provided
  if (!activityType || !duration || !caloriesBurned) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required: activityType, duration, and caloriesBurned.",
      });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.status(200).json({ message: "Workout deleted", workout });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
