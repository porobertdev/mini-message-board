const db = require('../database/queries');

// Homepage Config
const title = 'Mini Messageboard';

module.exports = {
    // route handlers
    get: async (req, res) => {
        const messages = await db.getAllMessages();

        res.render('index', {
            title,
            messages,
        });
    },
};
