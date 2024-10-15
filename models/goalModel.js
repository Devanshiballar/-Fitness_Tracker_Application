const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    type: { 
        type: String, 
        enum: ['weekly', 'monthly'], 
        required: true 
    },
    targetDuration: { 
        type: Number, 
        required: true 
    }, 
    targetCalories: { 
        type: Number, 
        required: true 
    }, 
    startDate: { 
        type: Date, 
        required: true 
    }, 
    endDate: { 
        type: Date, 
        required: true 
    }, 
    progressDuration: { 
        type: Number, 
        default: 0 
    }, 
    progressCalories: { 
        type: Number, 
        default: 0 
    }, 
  });
  
module.exports = mongoose.model('Goal', goalSchema);
  