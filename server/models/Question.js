const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Question\'s title is required'
  },
  body: {
    type: String,
    trim: true,
    required: 'Question\'s body is required'
  },
  slug: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]

}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;