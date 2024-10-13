const pool = require('./pool');
const { TABLE_NAME } = require('./config');

async function createTable() {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), message TEXT, date TEXT);`
    );
}

async function getUserById(id, tableName = TABLE_NAME) {
    return await pool.query(
        `
        SELECT * FROM ${tableName} WHERE id = $1
        `,
        [id]
    );
}

async function getUserByName(name, tableName = TABLE_NAME) {
    return await pool.query(
        `
        SELECT * FROM ${tableName} WHERE username = $1
        `,
        [name]
    );
}

async function getAllMessages() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE_NAME}`);

    return rows;
}

async function searchMessage(username) {
    return await pool.query(`
        SELECT *
        FROM ${TABLE_NAME}
        WHERE username = '${username}'
    `);
}

async function insertMessage(username, message, date) {
    await pool.query(
        `INSERT INTO ${TABLE_NAME} (username, message, date) VALUES ($1, $2, $3)`,
        [username, message, date]
    );
}

async function deleteMessage(id, tableName = TABLE_NAME) {
    await pool.query(`DELETE FROM ${tableName} WHERE id=${id}`);
}

async function deleteAllRows(tableName = TABLE_NAME) {
    await pool.query(`DELETE FROM ${tableName}`);
}

module.exports = {
    createTable,
    getUserById,
    getUserByName,
    getAllMessages,
    searchMessage,
    insertMessage,
    deleteMessage,
    deleteAllRows,
};
