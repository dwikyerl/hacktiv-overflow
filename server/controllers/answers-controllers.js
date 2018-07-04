const { Answer, Vote } = require('./../models');

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
  const answer = await Answer.findById(answerId);

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

exports.upvote = async (req, res) => {
  const { answerId } = req.params;
  const vote = await Vote.findOne({ answer: answerId, voter: req.user.id });
  if (vote && vote.value === -1) {
    vote.value = 1;
    await vote.save()
    return res.status(200).json({
      message: 'Upvote answer',
      updatedVote: vote
    });
  }

  if (vote) {
    const deletedVote = await Vote.findByIdAndRemove(vote._id);
    return res.status(200).json({
      message: 'Vote deleted',
      deletedVote
    })
  }
  const answer = await Answer.findOne({ _id: answerId, author: req.user.id });

  if (!answer) {
    const newVote = await Vote.create({ answer: answerId, voter: req.user.id, value: 1 });
    return res.status(201).json({
      message: 'Upvote added',
      newVote
    });
  }
  return res.status(403).json({
    message: 'You cannot upvote your own question'
  })
}

exports.downvote = async (req, res) => {
  const { answerId } = req.params;

  const vote = await Vote.findOne({ answer: answerId, voter: req.user.id });

  if (vote && vote.value === 1) {
    vote.value = -1;
    await vote.save()
    return res.status(200).json({
      message: 'Downvote answer',
      updatedVote: vote
    });
  }

  if (vote) {
    const deletedVote = await Vote.findByIdAndRemove(vote._id);
    return res.status(200).json({
      message: 'Vote deleted',
      deletedVote
    });
  }

  const answer = await Answer.findOne({ _id: answerId, author: req.user.id, });
  console.log(answer)

  if (!answer) {
    const newVote = await Vote.create({ answer: answerId, voter: req.user.id, value: -1 });
    return res.status(201).json({
      message: 'Downvote added',
      newVote
    });
  }
  return res.status(403).json({
    message: 'You cannot upvote your own answer'
  })
}