const db = require('../database/queries');
const validator = require('express-validator');

module.exports = {
    adminPanelGet: async (req, res) => {
        const messages = await db.getAllMessages();

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
    deletePost: async (req, res) => {
        const { postID } = req.params;
        await db.deleteMessage(postID);

        res.redirect('/admin/panel');
    },
    deleteAllPosts: async (req, res) => {
        await db.deleteAllMessages();
        res.redirect('/admin/panel');
    },
};
