const { createTable, insertMessage, getAllMessages } = require('./queries');
const { placeholderMsg } = require('./config');

async function populatedb() {
    try {
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

// populatedb();

module.exports = {
    populatedb,
};
