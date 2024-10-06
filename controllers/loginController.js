const dotenv = require('dotenv').config();

module.exports = {
    get: (req, res) => {
        res.render('login', {
            title: 'Login',
        });
    },
    post: (req, res) => {
        console.log('wtf');
        // res.render('login', {
        //     title: 'Login',
        // });

        const { username, password } = req.body;
        console.log(username, password);

        if (
            username === process.env.ADMIN_USER &&
            password === process.env.ADMIN_PASS
        ) {
            console.log('access granted as admin');
            // res.send('Access granted. Redirecting...');

            setTimeout(() => res.redirect('/admin/panel'), 1000);
        } else {
            res.status(400).send('Access denied.');
        }
    },
};
