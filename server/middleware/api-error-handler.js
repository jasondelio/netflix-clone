const ApiError = require('./api-error');

function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).send('Unhandled Error');
}

module.exports = apiErrorHandler;