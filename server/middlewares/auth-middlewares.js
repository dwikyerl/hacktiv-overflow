const jwt = require('jsonwebtoken');
const util = require('util');

jwt.verify = util.promisify(jwt.verify);

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  // If there is token continue
  // else user is forbidden
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Authorize if token is valid or not
    try {
      const user = await jwt.verify(req.token, process.env.SECRET_KEY);
      if (!user) return res.status(400).json({ message: 'Invalid Token' });
      req.user = user;
      next();
    } catch (e) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

exports.authorizeAdmin = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
};