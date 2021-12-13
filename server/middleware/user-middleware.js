const { body, validationResult } = require('express-validator');
const ApiError = require('./api-error');

const userValidationRules = () => {
  return [
    //firstName, lastName, username, email, password, admin
    body('firstName')
        .exists({checkFalsy: true})
        .withMessage("Null is not allowed"),
    body('lastName')
        .exists({checkFalsy: true})
        .withMessage("Null is not allowed"),
    body('username')
        .exists({checkFalsy: true})
        .withMessage("Null is not allowed"),
    body('email')
        .isEmail()
        .withMessage("Invalid email"),
    body('password')
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters"),
  ]
}

const userValidate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(ApiError.badRequest({ errors: errors.array() }));
    return;
  }
  next();
}

module.exports = { userValidationRules, userValidate }