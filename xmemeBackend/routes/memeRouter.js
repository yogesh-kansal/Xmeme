var express = require('express');
const memeController = require('../controllers/memeController');
const bodyParser = require('body-parser');
const cors = require('./cors');


var memeRouter = express.Router();
memeRouter.use(bodyParser.json());
memeRouter.use(bodyParser.urlencoded({extended: false}));

// route at /meme endpoint
memeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200);})
.get(
    cors.cors,
    memeController.get_All
)
.post(
    cors.corsWithOptions,
    memeController.post
);


//route at /meme/:id endpoint
memeRouter.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200);})
.get(
    cors.cors,
    memeController.get_At_id
)
.patch(
    cors.corsWithOptions,
    memeController.patch_At_id
)
.delete(
    cors.corsWithOptions,
    memeController.delete_id
);

module.exports = memeRouter;