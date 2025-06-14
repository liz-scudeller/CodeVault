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

module.exports = {
    registerValidation,
    loginValidation,
    updateUserValidation
};