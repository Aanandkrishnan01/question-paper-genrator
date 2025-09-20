const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    enum: ['maths', 'physics', 'chemistry']
  },
  marks: {
    type: Number,
    required: true,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Explicitly set the collection name to 'questions'
const Question = mongoose.model('Question', questionSchema, 'questions');

module.exports = Question;
