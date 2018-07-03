const mongoose = require("mongoose");
const slug = require('slug');
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
  slug: {
    type: String,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'answer'
  }]

}, { timestamps: true });

questionSchema.index({ slug: 1 });

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

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;