const validator = require('express-validator');
const passport = require('../authentication/passport');

const validateLogin = [
    validator
        .body('username')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage("Username can't be empty!"),
    validator
        .body('password')
        .trim()
        .notEmpty()
        .isLength({ min: 8, max: 32 })
        .withMessage('Password must have between 8 and 32 chars!'),
];

module.exports = {
    get: (req, res) => {
        res.render('login', {
            title: 'Login',
        });
    },
    post: [
        validateLogin,
        /*         (req, res, next) => {
            const errors = validator.validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).render('index', {
                    title: 'Errors occured',
                    errors: errors.array(),
                });
            }

            // move to passport middleware
            next();
        }, */
        passport.authenticate('local', {
            successRedirect: '/admin/panel',
            failureRedirect: '/',
        }),
    ],
};
