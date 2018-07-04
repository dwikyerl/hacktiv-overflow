require('dotenv').config();
const mongoose = require('mongoose');

const options = {};
if (process.env.DB_USER === 'admin') {
  options.user = process.env.DB_USER;
  options.pass = process.env.DB_PASSWORD;
  options.auth = { authdb: 'admin' };
}

mongoose.connect(process.env.DB_URL, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.err('Could not connect to MongoDB...', err));

module.exports = mongoose;