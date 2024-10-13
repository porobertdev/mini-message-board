const session = require('express-session');
const pool = require('../database/pool');
const { loadEnvConfig } = require('../utils');
const pgStoreSession = require('connect-pg-simple')(session);

loadEnvConfig();

module.exports = session({
    secret: process.env.SESSION_SECRET,
    store: new pgStoreSession({
        pool: pool,
        tableName: 'user_sessions',
        createTableIfMissing: true,
    }),
    resave: false,
    saveUninitialized: true,
});
