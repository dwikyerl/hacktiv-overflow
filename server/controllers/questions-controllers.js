const { Question } = require('../models');

exports.createQuestion = async (req, res) => {
  const inputData = {
    title: req.body.title,
    body: req.body.body,
    author: req.user.id,
  };

  const question = await Question.create(inputData);

  res.status(201).json({
    message: 'Question created successfully',
    question,
  });
};

exports.fetchAllQuestions = async (req, res) => {
  const questions = await Question.find().populate({
    path: 'author',
    model: 'User',
    select: '-password -createdAt -updatedAt'
  });

  res.status(200).json({
    message: 'Questions retrieved successfully',
    questions,
  });
};

exports.fetchQuestionBySlug = async (req, res) => {
  const { slug } = req.params;
  const question = await Question.findOne({ slug });

  if (question) {
    res.status(200).json({
      message: 'Article retrieved successfully',
      question,
    });
  } else {
    res.status(404).json({
      message: 'Article not found',
    });
  }
};

exports.updateQuestion = async (req, res) => {
  const { slug } = req.params;

  const updateData = {};

  if (req.body.title) updateData.title = req.body.title;
  if (req.body.body) updateData.body = req.body.body;

  // const question = await Question.findOneAndUpdate({ 
  //   slug, author: req.user.id 
  // }, updateData, { new: true, runValidators: true }).exec();
  const question = await Question.findOne({ slug, author: req.user.id });

  if (question) {
    const updateKey = Object.keys(updateData);
  
    updateKey.forEach((key) => {
      question[key] = updateData[key]
    });
    
    await question.save()

    return res.status(200).json({
      message: 'Question updated successfully',
      question,
    });
  } else {
    return res.status(404).json({
      message: 'Question not found',
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  const { slug } = req.params;

  const deletedQuestion = await Question.findOneAndRemove({ 
    slug,
    author: req.user.id 
  });

  if (deletedQuestion) {
    res.status(200).json({
      message: 'Question deleted successfully',
      deletedQuestion
    });
  } else {
    res.status(404).json({
      message: 'Question not found',
    });
  }
};