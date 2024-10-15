const Program = require('../models/programModel');

// Create a new fitness program
exports.createProgram = async (req, res) => {
  const { name, description } = req.body;

  // Check if all required fields are provided
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required.' });
  }

  try {
    const program = new Program({
      name,
      description,
      createdBy: req.user._id, // Assuming user is authenticated
    });
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found.' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


