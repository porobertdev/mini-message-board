const pool = require('./pool');
const { TABLE_NAME } = require('./config');

async function createTable() {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), message TEXT, date TEXT);`
    );
}

async function getAllMessages() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);

    return rows;
}

async function searchMessage(username) {
    await pool.query(`
        SELECT *
        FROM messages
        WHERE username = '${username}'
    `);
}

async function insertMessage(username, message, date) {
    await pool.query(
        `INSERT INTO ${TABLE_NAME} (username, message, date) VALUES ($1, $2, $3)`,
        [username, message, date]
    );
}

async function deleteMessage(id) {
    await pool.query(`DELETE FROM ${TABLE_NAME} WHERE id=${id}`);
}

async function deleteAllMessages() {
    await pool.query(`DELETE FROM ${TABLE_NAME}`);
}

module.exports = {
    createTable,
    getAllMessages,
    searchMessage,
    insertMessage,
    deleteMessage,
    deleteAllMessages,
};
