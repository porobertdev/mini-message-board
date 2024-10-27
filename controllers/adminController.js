const { isJWTValid, extractJWT } = require('../authentication/jwt');
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
    isTokenValid: (req, res, next) => {
        console.log('[JWT] - Checking Token...');
        const token = extractJWT(req.headers.cookie);
        const result = isJWTValid(token);

        if (result) {
            next();
        } else {
            res.status(403).send('Invalid token!');
        }
    },
};
