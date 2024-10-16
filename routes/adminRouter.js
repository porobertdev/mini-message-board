const { Router } = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = Router();

adminRouter.use('/admin', adminController.isAuthenticated);
adminRouter.get('/admin/panel', adminController.adminPanelGet);
adminRouter.get('/admin/delete/all', adminController.deleteAllPosts);
adminRouter.post('/admin/delete/:postID', adminController.deletePost);

module.exports = adminRouter;
