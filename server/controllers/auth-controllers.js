const { User } = require('./../models');
const util = require('util');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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

exports.oauth = async (req, res) => {
  console.log('hit')
  const { data } = await axios.get('https://graph.facebook.com/me?fields=id,name,email,first_name, last_name', {
    headers: {
      'Authorization': `Bearer ${req.body.accessToken}`
    }
  });
  
  let user = await User.findOne({ email: data.email });

  if (!user) {
    const username = `${data['first_name']}-${data['last_name']}`.toLowerCase();
    const signUpData = {
      username,
      email: data.email
    };

    user = User.create(signUpData);
  }

  const token = await user.generateToken();

  res.status(200).json({
    message: 'Signed In Successfully',
    token,
  });
}

exports.verifyAdmin = (req, res) => {
  if (req.user.role === 'admin') {
    return res.status(200).json({ message: 'Admin verified'})
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
}