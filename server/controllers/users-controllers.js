const { User } = require('../models');

exports.signup = async (req, res) => {
  const registerData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(registerData);

  const token = await user.generateToken();

  res.status(200).json({ message: 'Registered successfully', token });
}

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
