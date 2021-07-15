const express = require('express');
const router = express.Router();
const cors = require('./cors');
const authcontroller = require('../controllers/authcontroller');
const usercontroller = require('../controllers/usercontroller');

//signup, login, logout
router.post('/signup', authcontroller.signup );
router.post('/login', authcontroller.login);
router.get('/logout', authcontroller.logout);
router.get('/refresh', authcontroller.verifyToken, authcontroller.refresh);

//user verification
//router.post('/googlelogin',cors.cors, authcontroller.g_login);

//users
router.get('/:id', authcontroller.verifyToken,  usercontroller.getUser);
router.patch('/edit/:id', authcontroller.verifyToken, usercontroller.updateUser);
router.patch('/reset_password/:id', authcontroller.verifyToken, usercontroller.resetPassword);

module.exports = router;

