const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth')
const User = require('../model/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',

    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                }
            });
        })
        .normalizeEmail(),
        body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter at least 5 characters.'),
        body('fullname')
        .trim()
        .not()
        .isEmpty()
    ],
    authController.signup
);

router.post('/login', authController.login);
router.get('/userinfo', isAuth, authController.getUsername);
router.put('/updateProfile', authController.updateProfile);
router.put('/updatePassword', authController.updatePassword);

module.exports = router;