const mongoose = require("mongoose");
const slug = require('slug');
const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Question\'s title is required'
  },
  content: {
    type: String,
    trim: true,
    required: 'Question\'s content is required'
  },
  slug: {
    type: String,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

questionSchema.index({ slug: 1 });

questionSchema.statics.getQuestions = function() {
  return this.aggregate([
    { $lookup: { 
      from: 'answers', localField: 'slug',
      foreignField: 'question', as: 'answers' }},
    { $lookup: { 
      from: 'users', localField: 'author', 
      foreignField: '_id', as: 'author' }},
    { $lookup: {
      from: 'votes', localField: 'slug', 
      foreignField: 'question', as: 'votes' }}, 
    { $project: {
      title: '$$ROOT.title',
      content: '$$ROOT.content',
      author: '$author',
      slug: '$$ROOT.slug',
      answers: { $size: '$answers'},
      votes: { $sum: '$votes.value'},
      createdAt: '$$ROOT.createdAt',
      updatedAT: '$$ROOT.updatedAt'
    }}
  ])
}

questionSchema.pre('save', async function (next) {
  if(!this.isModified('title')) {
    return next();
  }

  this.slug = slug(this.title.toLowerCase());
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i');
  const questionWithSlug = await this.constructor.find({ slug: slugRegEx }).sort('createdAt');
  if (questionWithSlug.length) {
    const lastQuestion = questionWithSlug[questionWithSlug.length - 1];
    const lastSlug = lastQuestion.slug.match(/-([0-9]*)$/i);
    let lastNumber = null
    if (lastSlug) lastNumber = +lastSlug[1];
    this.slug = `${this.slug}-${lastNumber + 1}`;
  }
  next();
});

// questionSchema.virtual('votes', {
//   ref: 'Vote',
//   localField: '_id',
//   foreignField: 'question'
// });

// questionSchema.pre('findOne', autopopulate);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;