const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// REGISTER VALIDATOR
const registerValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('username')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  handleValidation,
];

// LOGIN VALIDATOR — accepts email OR username
const loginValidator = [
  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new Error('Either email or username is required');
    }
    return true;
  }),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('username')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('password').exists().withMessage('Password is required'),
  handleValidation,
];

// PRODUCT VALIDATOR
const productValidator = [
  body('name').exists().isString().withMessage('Product name is required'),
  body('price')
    .exists()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),
  body('description').optional().isString(),
  body('category').optional().isString(),
  handleValidation,
];

module.exports = { registerValidator, loginValidator, productValidator };
