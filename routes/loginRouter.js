const { Router } = require('express');
const loginController = require('../controllers/loginController');
const { adminRouter } = require('../routes/adminRouter');

const loginRouter = Router();

loginRouter.use(adminRouter);

// route paths are joined, so it's actually /login/admin
loginRouter.get('/login', loginController.get);
loginRouter.post('/login/admin', loginController.post);

module.exports = {
    loginRouter,
};
