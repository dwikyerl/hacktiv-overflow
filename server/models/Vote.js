const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema({
  voter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }

}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;