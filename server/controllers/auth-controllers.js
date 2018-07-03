const { User } = require('./../models');
const util = require('util');
const jwt = require('jsonwebtoken');

jwt.sign = util.promisify(jwt.sign);

exports.login = async (req, res) => {
  const user = await User.isValidUser(req.body.username);
  if (!user) {
    return res.status(400).json({
      message: 'Invalid username or password',
    });
  }
  
  const match = await user.matchPassword(req.body.password);
  if (match) {
    const token = await user.generateToken();

    res.status(200).json({
      message: 'Signed In Successfully',
      token,
    });
  } else {
    res.status(400).json({
      message: 'Invalid username or password',
    });
  }
};

exports.verifyAdmin = (req, res) => {
  if (req.user.role === 'admin') {
    return res.status(200).json({ message: 'Admin verified'})
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
}