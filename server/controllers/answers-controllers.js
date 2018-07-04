const { Answer } = require('./../models');

exports.createAnswer = async (req, res) => {
  const { slug } = req.params;
  const inputData = {
    content: req.body.content,
    author: req.user.id,
    question: slug
  };

  const answer = await Answer.create(inputData);

  res.status(201).json({
    message: 'Answer created successfully',
    answer,
  });
};

exports.fetchAnswers = async (req, res) => {
  const answers = await Answer.find();

  res.status(200).json({
    message: 'Answers retrieved successfully',
    answers,
  });
};

exports.fetchAnswerById = async (req, res) => {
  const { answerId } = req.params;
  const answer = Answer.findOne({ _id: asnwerId });

  if (answer) {
    res.status(200).json({
      message: 'Answer retrieved successfully',
      answer,
    });
  } else {
    res.status(404).json({
      message: 'Answer not found',
    });
  }
};

exports.updateAnswer = async (req, res) => {
  const { answerId } = req.params;
  const updateData = {};
  if (req.body.content) updateData.content = req.body.content;

  const answer = await Answer.findOneAndUpdate({ 
    _id: answerId, author: req.user.id 
  }, updateData, { new: true });

  if (answer) {
    res.status(200).json({
      message: 'Answer updated successfully',
      answer,
    });
  } else {
    res.status(404).json({
      message: 'Answer not found',
    });
  }
};

exports.deleteAnswer = async (req, res) => {
  const { answerId } = req.params;

  const deletedAnswer = await Answer.findOneAndRemove({ 
    _id: answerId,
    author: req.user.id 
  });

  if (deletedAnswer) {
    res.status(200).json({
      message: 'Answer deleted successfully',
      deletedAnswer
    });
  } else {
    res.status(404).json({
      message: 'Answer not found',
    });
  }
};
