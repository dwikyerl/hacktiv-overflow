const { Question, Vote } = require('../models');

exports.createQuestion = async (req, res) => {
  const inputData = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
  };

  const question = await Question.create(inputData);

  res.status(201).json({
    message: 'Question created successfully',
    question,
  });
};

exports.fetchQuestions = async (req, res) => {
  // const questions = await Question.find();
  const questions = await Question.getQuestions();
  
  res.status(200).json({
    message: 'Questions retrieved successfully',
    questions,
  });
};

exports.fetchQuestionBySlug = async (req, res) => {
  const { slug } = req.params;
  // const question = await Question.findOne({ slug });
  const questions = await Question.getQuestionBySlug(slug);
  console.log(questions)
  if (questions.length > 0) {
    res.status(200).json({
      message: 'Question retrieved successfully',
      question: questions[0],
    });
  } else {
    res.status(404).json({
      message: 'Question not found',
    });
  }
};

exports.updateQuestion = async (req, res) => {
  const { slug } = req.params;

  const updateData = {};

  if (req.body.title) updateData.title = req.body.title;
  if (req.body.content) updateData.content = req.body.content;

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

exports.upvote = async (req, res) => {
  const { slug } = req.params;
  const vote = await Vote.findOne({ question: slug, voter: req.user.id });
  if (vote && vote.value === -1) {
    vote.value = 1;
    await vote.save()
    return res.status(200).json({
      message: 'Upvote question',
      vote
    });
  }

  if (vote) {
    const deletedVote = await Vote.findByIdAndRemove(vote._id);
    return res.status(200).json({
      message: 'Vote deleted',
      deletedVote
    })
  }
  const question = await Question.findOne({ slug, author: req.user.id });

  if (!question) {
    const newVote = await Vote.create({ question: slug, voter: req.user.id, value: 1 });
    return res.status(201).json({
      message: 'Upvote added',
      upvote: newVote
    });
  }
  return res.status(403).json({
    message: 'You cannot upvote your own question'
  })
}

exports.downvote = async (req, res) => {
  const { slug } = req.params;
  const vote = await Vote.findOne({ question: slug, voter: req.user.id });
  if (vote && vote.value === 1) {
    vote.value = -1;
    await vote.save()
    return res.status(200).json({
      message: 'Downvote question',
      vote
    });
  }

  if (vote) {
    const deletedVote = await Vote.findByIdAndRemove(vote._id);
    return res.status(200).json({
      message: 'Vote deleted',
      deletedVote
    });
  }

  const question = await Question.findOne({ slug, author: req.user.id, });

  if (!question) {
    const newVote = await Vote.create({ question: slug, voter: req.user.id, value: -1 });
    return res.status(201).json({
      message: 'Downvote added',
      upvote: newVote
    });
  }
  return res.status(403).json({
    message: 'You cannot upvote your own question'
  })
}