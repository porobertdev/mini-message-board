const { Router } = require('express');
const rootController = require('../controllers/rootController');

const rootRouter = Router();

rootRouter.get('/', rootController.get);

module.exports = rootRouter;
