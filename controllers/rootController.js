const { format } = require('date-fns');
const validator = require('express-validator');
const db = require('../database/queries');

const getDate = () => {
    return format(new Date(), 'dd-MM-yyyy / HH:mm');
};

// Homepage Config
const title = 'Mini Messageboard';

const validateUser = [
    validator
        .body('user')
        .trim()
        .notEmpty()
        .withMessage("The name can't be empty"),
    validator
        .body('msg')
        .trim()
        .notEmpty()
        .withMessage("Please write something if you're going to chat"),
];

module.exports = {
    // route handlers
    get: async (req, res) => {
        const messages = await db.getAllMessages();
        console.log('🚀 ~ get: ~ msgs:', messages);

        res.render('index', {
            title,
            messages,
        });
    },
    post: [
        validateUser,
        async (req, res) => {
            // payload data: req.body; needs urlencoded middleware at app-level
            console.log(req.body);
            const { user, msg } = req.body;

            // validate and sanitize user's input
            const errors = validator.validationResult(req);
            console.log('🚀 ~ errors:', errors);

            // if there are errors
            if (!errors.isEmpty()) {
                res.status(400).render('index', {
                    title: 'Errors occured',
                    errors: errors.array(),
                });
                // res.redirect('/');

                return;
            }

            const date = getDate();

            // messages.push({ user, msg, added: date });
            await db.insertMessage(user, msg);

            // res.render('index', { title, messages });
            // Give some time to the confetti to render
            setTimeout(() => res.redirect('/'), 1000);
        },
    ],
};
