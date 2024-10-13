const { Router } = require('express');
const rootController = require('../controllers/rootController');
const { populatedb, initializeAdmin } = require('../database/populatedb');
const loginRouter = require('../routes/loginRouter');
const searchRouter = require('./searchRouter');

populatedb();
initializeAdmin();

const rootRouter = Router();

rootRouter.use(loginRouter);
rootRouter.use(searchRouter);
rootRouter.get('/', rootController.get);

module.exports = rootRouter;
