const dotenv = require('dotenv').config();
const validator = require('express-validator');

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
        (req, res) => {
            const errors = validator.validationResult(req);
            console.log('🚀 ~ errors:', errors);

            if (!errors.isEmpty()) {
                res.status(400).render('index', {
                    title: 'Errors occured',
                    errors: errors.array(),
                });

                return;
            }

            // else continue
            const { username, password } = req.body;
            console.log(username, password);

            if (
                username === process.env.ADMIN_USER &&
                password === process.env.ADMIN_PASS
            ) {
                console.log('access granted as admin');

                setTimeout(() => res.redirect('/admin/panel'), 1000);
            } else {
                res.status(400).send('Access denied.');
            }
        },
    ],
};
