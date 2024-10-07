const db = require('../database/pool');

const title = 'Search for messages';

module.exports = {
    get: (req, res) => {
        res.render('search', { title, results: [] });
    },

    getMessages: async (req, res) => {
        const { username } = req.query;

        const SQL = `
            SELECT *
            FROM messages
            WHERE username = '${username}'
        `;

        const results = await db.query(SQL);
        console.log(results.rows);

        res.render('search', { title, results: results.rows || [] });
    },
};
