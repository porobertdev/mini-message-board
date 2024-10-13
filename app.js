const express = require('express');
const asyncHandler = require('express-async-handler');
const { loadEnvConfig, getDate } = require('./utils');
const WebSocket = require('ws');
const rootRouter = require('./routes/rootRouter');
const path = require('node:path');
const db = require('./database/queries');
const session = require('./authentication/session');
const passport = require('./authentication/passport');

// env config
loadEnvConfig();

const PORT = 3000;
const app = express();

// Template Engine Setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// Middleware to save payload data on req.body
app.use(express.urlencoded({ extended: true }));

// Load static files (needed for CSS)
app.use(express.static('./public'));

// Create a session
app.use(session);

// restore session when a logged client requests again
app.use(passport.session());

// Set routers: no need to specify path since it's root /
app.use(rootRouter);

const server = app.listen(PORT, () => console.log('[SERVER] is running...'));

// WebSocket Server
const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws, req, client) => {
    console.log('[WSS] - A client connected to WSS.');
    updateNumOfClients();

    ws.on('message', async (data) => {
        console.log('[WSS] - Client sent data:', data);
        const { user, msg } = JSON.parse(data);
        const date = getDate();

        // save to database
        console.log('[WSS} - Saving to Database.');
        await db.insertMessage(user, msg, date);

        // send to each client connected to WebSocket Server
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ user, msg, date }));
            }
        });
    });

    ws.on('close', () => {
        console.log('[WSS] - Client has disconnected.');
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
