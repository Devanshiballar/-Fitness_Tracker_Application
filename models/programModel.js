const mongoose = require('mongoose');

// Define Program Schema
const ProgramSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
}, 
}, { timestamps: true });

module.exports = mongoose.model('Program', ProgramSchema);
