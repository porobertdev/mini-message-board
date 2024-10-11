const express = require('express');
const asyncHandler = require('express-async-handler');
const WebSocket = require('ws');
const rootRouter = require('./routes/rootRouter');
const { format } = require('date-fns');
const path = require('node:path');
const db = require('./database/queries');
// env config
if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
    console.log(process.env.DATABASE_NAME);
}

const getDate = () => {
    return format(new Date(), 'dd-MM-yyyy / HH:mm');
};

const PORT = 3000;
const app = express();

// Template Engine Setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));

// Load static files (needed for CSS)
app.use(express.static('./public'));

// Set routers: no need to specify path since it's root /
app.use(rootRouter);

const server = app.listen(PORT, () => console.log('Server is running...'));

// WebSocket Server
const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws, req, client) => {
    console.log('[SERVER] - A client connected to the server socket.');
    updateNumOfClients();

    ws.on('message', async (data) => {
        console.log('[SERVER] - Client sent data:', data);
        const { user, msg } = JSON.parse(data);
        console.log({ user, msg });
        const date = getDate();

        console.log('[SERVER} - Saving to Database.');

        // save to database
        await db.insertMessage(user, msg, date);

        // send to each client connected
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ user, msg }));
            }
        });
    });

    ws.on('close', () => {
        console.log('[SERVER] - Client has disconnected.');
        updateNumOfClients();
    });
});

const updateNumOfClients = () => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    clients: wss.clients.size,
                })
            );
        }
    });
};
