const express = require('express');
const asyncHandler = require('express-async-handler');
const rootRouter = require('./routes/rootRouter');
const dotenv = require('dotenv').config();
const path = require('node:path');

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

app.listen(PORT, () => console.log('Server is running...'));
