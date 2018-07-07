const queue = require('kue').createQueue();
const crypto = require('crypto');
const { User, Token } = require('../models');

exports.signup = async (req, res) => {
  const registerData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const user = new User(registerData);

  user.save();

  const confirmationToken = new Token({
    userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });

  await confirmationToken.save();

  const confirmationText = 
  `Hello,

  Please verify your account by clicking the link:
  http://${req.headers.host}/api/users/confirmation/${confirmationToken.token}.

  `;

  const emailJob = queue.create('email', {
    from: `no-reply@dwikyerl.me`,
    to: user.email,
    subject: 'Account Verification Token',
    text: confirmationText
  })
    .attempts(5)  
    .removeOnComplete(true)
    .backoff(true)
    .save()

  res.status(200).json({ 
    message: `A verification email has been sent to ${user.email}.`
  });
}

exports.confirmationPost = async (req, res) => {

  const token = await Token.findOne({ token: req.params.token });

  if (!token) return res.status(400).json({
    type: 'not-verified',
    message: 'We were unable to find a valid token. Your token may have expired.'
  });
  
  const user = await User.findOne({ _id: token.userId });

  if (!user) return res.status(400).json({
    message: 'We were unable to find a user for this token'
  });

  if (user.isVerified) return res.status(400).json({
    type: 'already-verified',
    message: 'This user has already been verified.'
  });

  user.isVerified = true;
  await user.save();

  return res.status(200).json({
    message: 'The account has been verified. Please log in.'
  });
};

exports.resendTokenPost = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({
    message: 'We were unable to find a user for this token'
  });

  if (user.isVerified) return res.status(400).json({
    type: 'already-verified',
    message: 'This user has already been verified.'
  });

  const confirmationToken = new Token({
    userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });

  await confirmationToken.save();

  const confirmationText = 
  `Hello,

  Please verify your account by clicking the link:
  http://${req.headers.host}/api/users/confirmation/${confirmationToken.token}.

  `;

  const emailJob = queue.create('email', {
    from: `no-reply@dwikyerl.me`,
    to: user.email,
    subject: 'Account Verification Token',
    text: confirmationText
  })
    .attempts(5)  
    .removeOnComplete(true)
    .backoff(true)
    .save()

  res.status(200).json({ 
    message: `A verification email has been sent to ${user.email}.`
  });
};

exports.getUserInfo = async (req, res) => {
  const user = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json({ 
    message: 'User info retrieved successfully', 
    user
  });
}
