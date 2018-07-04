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
    { $unwind: '$author'},
    { $project: {
      title: 1,
      content: 1,
      'author': '$author.username',
      slug: 1,
      answers: { $size: '$answers'},
      votes: { $sum: '$votes.value'},
      createdAt: 1,
      updatedAT: 1
    }},
    { $sort: { createdAt: -1 }}
  ])
}

questionSchema.statics.getQuestionBySlug = function(slug) {
  return this.aggregate([
    { $match: { slug }},
    { $lookup: { 
      from: 'answers', localField: 'slug',
      foreignField: 'question', as: 'answer' }},
    { $lookup: { 
      from: 'users', localField: 'author', 
      foreignField: '_id', as: 'author' }},
    { $lookup: {
      from: 'votes', localField: 'slug', 
      foreignField: 'question', as: 'votes' }},
    { $unwind: {
      "path": "$answer",
      "preserveNullAndEmptyArrays": true
    }},
    { $lookup: {
      from: 'users', localField: 'answer.author',
      foreignField: '_id', as: 'answer.author'
    }},
    { $lookup: {
      from: 'votes', localField: '_id', 
      foreignField: 'answer', as: 'answer.votes' }},
    { $project: {
      title: 1,
      content: 1,
      'author': '$author.username',
      slug: 1,
      'answer.id': '$answer._id',
      'answer.content': '$answer.content',
      'answer.author': '$answer.author.username',
      'answer.question': '$answer.question',
      'answer.votes': '$answer.votes',
      'answer.totalVotes': { $sum: '$answer.votes.value' },
      'answer.createdAt': '$answer.createdAt',
      'answer.updatedAt': '$answer.updatedAt',
      totalVotes: { $sum: '$votes.value'},
      votes: 1,
      createdAt: 1,
      updatedAt: 1
    }},
    { $group: { 
      _id: '$_id',
      "slug": { "$first": "$slug" },
      "title": { "$first": "$title" },
      "content": { "$first": "$content" },
      "author": { "$first": "$author" },
      "createdAt": { "$first": "$createdAt" },
      "updatedAt": { "$first": "$updatedAt" },
      "votes": { "$first": "$votes" },
      "totalVotes": { "$first": "$totalVotes" },
      "answers": { "$push": "$answer" },
    }}
  ]);
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

// { $match: { slug }},
//     { $lookup: { 
//       from: 'answers', localField: 'slug',
//       foreignField: 'question', as: 'answers' }},
//     { $unwind: '$answers' },
//     { $lookup: { 
//       from: 'users', localField: 'author', 
//       foreignField: '_id', as: 'author' }},
//     { $lookup: {
//       from: 'votes', localField: 'slug', 
//       foreignField: 'question', as: 'votes' }},
//     { $unwind: '$answers'},
//     { $lookup: {
//       from: 'users', localField: 'answers.author',
//       foreignField: '_id', as: 'answers.author'
//     }},
//     { $project: {
//       title: 1,
//       content: 1,
//       'author': '$author.username',
//       slug: 1,
//       answers: '$answers',
//       votes: '$votes',
//       totalVotes: { $sum: '$votes.value'},
//       createdAt: 1,
//       updatedAt: 1
//     }}