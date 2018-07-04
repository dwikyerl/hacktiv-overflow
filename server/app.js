require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Import routes
const routes = require('./routes');

// Import error handlers
const errorHandlers = require('./handlers/errorHandlers');

// Initiate App
const app = express();

require('./database/mongoose');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.validationErrors);
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port --> ${server.address().port}`);
});