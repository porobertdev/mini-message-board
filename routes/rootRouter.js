const { Router } = require('express');
const rootController = require('../controllers/rootController');
const { loginRouter } = require('../routes/loginRouter');
const { populatedb } = require('../database/populatedb');

populatedb();

const rootRouter = Router();

rootRouter.use(loginRouter);

rootRouter.get('/', rootController.get);
rootRouter.post('/new', rootController.post);

module.exports = rootRouter;
