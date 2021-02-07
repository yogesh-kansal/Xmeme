var express = require('express');
const memeController = require('../controllers/memeController');
const bodyParser = require('body-parser');

var memeRouter = express.Router();
memeRouter.use(bodyParser.json());
memeRouter.use(bodyParser.urlencoded({extended: false}));

memeRouter.route('/')
.get(
    memeController.get_All
)
.post(
    memeController.post
);

memeRouter.route('/:id')
.get(
    memeController.get_At_id
)
.put(
    memeController.put_At_id
)
.delete(
    memeController.delete_id
);

module.exports = memeRouter;