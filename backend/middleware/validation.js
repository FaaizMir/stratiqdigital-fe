const { body, validationResult } = require('express-validator');

// Validation rules for quote submission
const validateQuoteSubmission = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
    .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ min: 2 }).withMessage('Company name must be at least 2 characters')
    .isLength({ max: 150 }).withMessage('Company name must not exceed 150 characters'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Project details are required')
    .isLength({ min: 10 }).withMessage('Please provide at least 10 characters for project details')
    .isLength({ max: 2000 }).withMessage('Project details must not exceed 2000 characters')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  validateQuoteSubmission,
  handleValidationErrors
};
