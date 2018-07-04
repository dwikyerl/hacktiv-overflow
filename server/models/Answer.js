const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: 'Answer\'s content is required'
  },
  question: {
    type: Schema.Types.String,
    ref: 'Question'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true,  });

answerSchema.virtual('votes', {
  ref: 'Vote', // what model to link?
  localField: '_id', // which field on the store?
  foreignField: 'answer' // which field on the review?
});

function autopopulate(next) {
  this.populate('votes')
    .populate({
      path: 'author',
      model: 'User',
      select: '-password -createdAt -updatedAt'
    })
  next();
}

answerSchema.pre('find', autopopulate);
answerSchema.pre('findOne', autopopulate);

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;