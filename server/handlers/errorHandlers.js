exports.catchErrors = fn =>
  function(req, res, next) {
    return fn(req, res, next).catch(next);
  };

exports.notFound = (req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
};

exports.validationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  const errors = errorKeys.map(key => err.errors[key]);
  res.status(400).json({
    message: 'Error',
    errors,
  });
};

exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
  };
  res.status(err.status || 500);
  res.json(errorDetails);
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
};