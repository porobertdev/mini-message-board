const pool = require('./pool');

const CREATE_SQL = `
    CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), message TEXT, date TEXT);
`;

const INSERT_SQL = (username, message, date) =>
    `INSERT INTO messages (username, message, date) VALUES ('${username}', '${message}', '${date}')`;

const placeholderMsg = [
    {
        username: 'porobertdev',
        message: 'Hello there, just practicing nodejs and databases',
        date: '11-09-2024',
    },

    {
        username: 'Robert',
        message:
            'I hate deadlifts, but love them at the same time. Does it make sense?',
        date: '11-09-2024',
    },
    {
        username: 'random-dude',
        message: 'Chuck Norris is cool',
        date: '11-09-2024',
    },
];

async function populatedb() {
    try {
        await pool.query('SELECT * FROM messages');
    } catch (err) {
        console.log(err);

        // if error, that means the table doesn't exist
        console.log('Populating DB...');
        await pool.query(CREATE_SQL);

        for (const m of placeholderMsg) {
            const sql = INSERT_SQL(m.username, m.message, m.date);
            await pool.query(sql);
        }

        console.log('Done...');
    }
}

// populatedb();

module.exports = {
    populatedb,
};
