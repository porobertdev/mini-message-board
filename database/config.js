const { loadEnvConfig } = require('../utils');

loadEnvConfig();

const TABLE_NAME = 'messages';
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
const admin = {
    table: process.env.ADMIN_TABLE,
    user: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD,
};

module.exports = { TABLE_NAME, placeholderMsg, admin };
