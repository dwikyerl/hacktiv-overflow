const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  body: {
    type: String,
    trim: true,
    required: 'Answer\'s body is required'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]

}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;