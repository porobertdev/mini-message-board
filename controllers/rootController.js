const { format } = require('date-fns');

const getDate = () => {
    return format(new Date(), 'dd-MM-yyyy / HH:mm');
};

// Homepage Config
const title = 'Mini Messageboard';
const messages = [
    {
        msg: 'Hi there!',
        user: 'Amando',
        added: getDate(),
    },
    {
        msg: 'Hello World!',
        user: 'Charles',
        added: getDate(),
    },
];

module.exports = {
    get: (req, res) => {
        res.render('index', {
            title,
            messages,
        });
    },
    post: (req, res) => {
        // payload data: req.body; needs urlencoded middleware at app-level
        console.log(req.body);
        const { user, msg } = req.body;
        const date = getDate();

        messages.push({ user, msg, added: date });

        // res.render('index', { title, messages });

        // Give some time to the confetti to render
        setTimeout(() => res.redirect('/'), 1000);
    },
};
