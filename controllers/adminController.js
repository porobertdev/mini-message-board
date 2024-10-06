const { messages } = require('../controllers/rootController');
const validator = require('express-validator');

module.exports = {
    adminPanelGet: (req, res) => {
        // TODO: find a way to pass a key-value pair for the redirect request
        // if (req.login === 'granted') {
        if (res) {
            res.render('adminPanel', {
                title: 'Admin Panel',
                messages,
            });
        } else {
            res.status(400).send('Access denied.');
        }
    },
    deletePost: (req, res) => {
        const { postID } = req.params;
        messages.splice(postID, 1);

        res.redirect('/admin/panel');
    },
};
