// Homepage Config
const title = 'Mini Messageboard';
const messages = [
    {
        msg: 'Hi there!',
        user: 'Amando',
        added: new Date(),
    },
    {
        msg: 'Hello World!',
        user: 'Charles',
        added: new Date(),
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

        messages.push({ user, msg });

        // res.render('index', { title, messages });
        res.redirect('/');
    },
};
