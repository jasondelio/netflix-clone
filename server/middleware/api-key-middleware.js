const { header, validationResult } = require('express-validator');
const ApiError = require('./api-error');

const authorizationValidationRules = () => {
  return [
    header('x-api-key')
      .exists()
      .custom(value => value === process.env.API_KEY)
      .withMessage("Invalid Api Key")
  ]
}

const authorizationValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(ApiError.unauthorized({ errors: errors.array() }));
    return;
  }
  next();
}

module.exports = { authorizationValidationRules, authorizationValidate }