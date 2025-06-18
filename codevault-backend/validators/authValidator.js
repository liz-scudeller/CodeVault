const { check, body } = require('express-validator');

const registerValidation = [
    check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email'),
    check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email'),
    check('password')
    .notEmpty().withMessage('Password is required')
];

const updateUserValidation = [
    body().custom((value, {req}) => {
        if(!req.body.name && !req.body.email){
            throw new Error("At least name or email must be provided");
        }
        return true;
    }),

    check('name')
    .optional()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    check('email')
    .optional()
    .isEmail().withMessage('Must be a valid email')
];

const changePasswordValidation = [
    check('currentPassword')
    .notEmpty().withMessage('Current password required'),

    check('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    
    check('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

module.exports = {
    registerValidation,
    loginValidation,
    updateUserValidation,
    changePasswordValidation
};