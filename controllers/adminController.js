const db = require('../database/queries');

module.exports = {
    adminPanelGet: async (req, res) => {
        if (req.isAuthenticated()) {
            const messages = await db.getAllMessages();

            res.render('adminPanel', {
                title: 'Admin Panel',
                messages,
            });
        } else {
            res.status(400).send('Access denied.');
        }
    },
    deletePost: async (req, res) => {
        if (req.isAuthenticated()) {
            const { postID } = req.params;
            await db.deleteMessage(postID);

            res.redirect('/admin/panel');
        } else {
            res.status(400).send('Access denied.');
        }
    },
    deleteAllPosts: async (req, res) => {
        if (req.isAuthenticated()) {
            await db.deleteAllRows();
            res.redirect('/admin/panel');
        } else {
            res.status(400).send('Access denied.');
        }
    },
};
