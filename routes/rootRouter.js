const { Router } = require('express');
const rootController = require('../controllers/rootController');
const { populatedb, initializeAdmin } = require('../database/populatedb');
const loginRouter = require('../routes/loginRouter');
const searchRouter = require('./searchRouter');

populatedb();
initializeAdmin();

const rootRouter = Router();

/*
middleware to dynamically change navbar
based on authentication status
*/
rootRouter.use((req, res, next) => {
    res.locals.authenticated = req.isAuthenticated() ? true : false;

    next();
});

rootRouter.use(loginRouter);
rootRouter.use(searchRouter);
rootRouter.get('/', rootController.get);

module.exports = rootRouter;
