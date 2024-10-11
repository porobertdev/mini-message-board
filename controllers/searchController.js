const { searchMessage } = require('../database/queries');

const title = 'Search for messages';

module.exports = {
    get: (req, res) => {
        res.render('search', { title, results: [] });
    },

    getMessages: async (req, res) => {
        const { username } = req.query;
        const results = await searchMessage(username);

        res.render('search', { title, results: results.rows || [] });
    },
};
