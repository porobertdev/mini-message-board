const { Pool } = require('pg');

module.exports = new Pool({
    host: 'localhost',
    user: process.env.DATABASE_ROLE,
    database: 'user_messages',
    password: process.env.DATABASE_PASSWORD,
    port: 5432, // default
});
