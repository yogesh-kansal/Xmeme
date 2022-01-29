const express = require('express');
const router = express.Router();
const commentcontroller = require('../controllers/commentcontroller');
const authcontroller = require('../controllers/authcontroller');




router.get('/:blogId', authcontroller.verifyToken, commentcontroller.getAllComments);
router.post('/new', authcontroller.verifyToken, commentcontroller.newComment);


module.exports = router;
