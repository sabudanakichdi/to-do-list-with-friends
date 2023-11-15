const express = require('express');
const authController = require('../../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.users);
authRouter.get('/users/:name', authController.usersByGroup);
authRouter.post('/invite', authController.inviteByMail);
authRouter.post('/forgot', authController.forgotPwd);
authRouter.post('/reset', authController.resetPwd);
authRouter.post('/isauth', authController.isAuth);

module.exports = authRouter;