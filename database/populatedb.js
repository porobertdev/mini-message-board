const pool = require('./pool');

const CREATE_SQL = `
    CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), message TEXT);
`;

const INSERT_SQL = (username, message) =>
    `INSERT INTO messages (username, message) VALUES ('${username}', '${message}')`;

const placeholderMsg = [
    {
        username: 'porobertdev',
        message: 'Hello there, just practicing nodejs and databases',
    },

    {
        username: 'Robert',
        message:
            'I hate deadlifts, but love them at the same time. Does it make sense?',
    },
    {
        username: 'random-dude',
        message: 'Chuck Norris is cool',
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
            const sql = INSERT_SQL(m.username, m.message);
            await pool.query(sql);
        }

        console.log('Done...');
    }

    await pool.end();
}

// populatedb();

module.exports = {
    populatedb,
};
