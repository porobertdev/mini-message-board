const { Router } = require('express');
const rootController = require('../controllers/rootController');

const rootRouter = Router();

rootRouter.get('/', rootController.get);
rootRouter.post('/new', rootController.post);

module.exports = rootRouter;
