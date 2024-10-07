const { Router } = require('express');

const searchController = require('../controllers/searchController');
const searchRouter = Router();

searchRouter.get('/search', searchController.get);
searchRouter.get('/search/messages', searchController.getMessages);

module.exports = searchRouter;
