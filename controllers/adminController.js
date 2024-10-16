const db = require('../database/queries');

module.exports = {
    adminPanelGet: async (req, res) => {
        const messages = await db.getAllMessages();

        res.render('adminPanel', {
            title: 'Admin Panel',
            messages,
        });
    },
    deletePost: async (req, res) => {
        const { postID } = req.params;
        await db.deleteMessage(postID);

        res.redirect('/admin/panel');
    },
    deleteAllPosts: async (req, res) => {
        await db.deleteAllRows();
        res.redirect('/admin/panel');
    },
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(403).send('Access denied');
        }
    },
};
