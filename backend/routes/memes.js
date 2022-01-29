var express = require('express');
const memeController = require('../controllers/memeController');
const authController = require('../controllers/authcontroller');
var memeRouter = express.Router();
var upload=require('../utils/multerSetup');

// route at /meme endpoint
memeRouter.route('/')
.get(memeController.get_All)
.post(upload.single('imageFile'), memeController.post);

//route at /meme/:id endpoint
memeRouter.route('/:id')
.get(memeController.get_At_id)
.patch(authController.verifyToken, upload.single('imageFile'), memeController.patch_At_id)
.delete(authController.verifyToken, memeController.delete_id);

module.exports = memeRouter;