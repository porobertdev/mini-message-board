const {
    createDatabase,
    createTable,
    insertMessage,
    getAllMessages,
    getUserByName,
} = require('./queries');
const { placeholderMsg, admin } = require('./config');
const hash = require('../authentication/hash');
const pool = require('./pool');
const { loadEnvConfig } = require('../utils');

loadEnvConfig();

async function populatedb() {
    try {
        await createDatabase(process.env.DATABASE_USER);
        await getAllMessages();
    } catch (err) {
        console.log(err);

        // if error, that means the table doesn't exist
        console.log('Creating & Populating DB...');
        await createTable();

        for (const m of placeholderMsg) {
            await insertMessage(m.username, m.message, m.date);
        }

        console.log('Done...');
    }
}

async function createAdminTable(name) {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${name} (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), password VARCHAR (255));`
    );
}

async function initializeAdmin() {
    // create table
    await createAdminTable(admin.table);

    const { rows } = await getUserByName(admin.user, admin.table);

    if (rows.length === 0) {
        // admin doesn't exist, so create it
        console.log('[DATABASE] - Creating admin...');
        const hashedPassword = hash(admin.password);

        await pool.query(
            `
            INSERT INTO ${admin.table} (username, password) VALUES ($1, $2)
            `,
            [admin.user, hashedPassword]
        );
    }
}

module.exports = {
    populatedb,
    initializeAdmin,
};
