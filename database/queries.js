const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');

    return rows;
}

async function insertMessage(username, message, date) {
    await pool.query(
        'INSERT INTO messages (username, message, date) VALUES ($1, $2, $3)',
        [username, message, date]
    );
}

async function deleteMessage(id) {
    await pool.query(`DELETE FROM messages WHERE id=${id}`);
}

async function deleteAllMessages() {
    await pool.query('DELETE FROM messages');
}

module.exports = {
    getAllMessages,
    insertMessage,
    deleteMessage,
    deleteAllMessages,
};
