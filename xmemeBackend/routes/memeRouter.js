var express = require('express');
const memeController = require('../controllers/memeController');
const cors = require('./cors');
var memeRouter = express.Router();
var upload=require('../utils/multerSetup');

// route at /meme endpoint
memeRouter.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200);})
.get(
    cors.cors,
    memeController.get_All
)
.post(cors.cors,upload.single('imageFile'), memeController.post);


//route at /meme/:id endpoint
memeRouter.route('/:id')
.options(cors.cors, (req, res) => { res.sendStatus(200);})
.get(
    cors.cors,
    memeController.get_At_id
)
.patch(
    cors.cors,
    memeController.patch_At_id
)
.delete(
    cors.cors,
    memeController.delete_id
);

module.exports = memeRouter;

 /**
 * @swagger
 * tags:
 *  name: /memes
 *  description: Methods available at /memes endpoint
 * /memes:
 *  get:
 *     tags: [/memes]
 *     summary: Returns all memes.
 *     responses: 
 *          '200':
 *              description: OK
 *  post:
 *      tags: [/memes]
 *      summary: to post a new meme 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          author:
 *                              type: string
 *                              default: Yogesh kansal
 *                          url:
 *                              type: string
 *                              default: http://xyz
 *                          caption:
 *                              type: string
 *                              default: hey!!! this is my first meme
 *      responses:
 *          '200':
 *              description: OK
 */


 /**
 * @swagger
 * tags:
 *  name: /memes/:Id
 *  description: Methods available at /memes/{Id} endpoint
 * /memes/{Id}:
 *  get:
 *     tags: [/memes/:Id]
 *     summary: Returns a user by ID.
 *     parameters:
 *         - name: Id
 *           in: path
 *           required: true
 *           description: _id.
 *           schema:
 *                type : string
 *     responses: 
 *          '200':
 *              description: OK
 *  patch:
 *      tags: [/memes/:Id]
 *      summary: to modify existing meme at /{id}
 *      parameters:
 *         - name: Id
 *           in: path
 *           required: true
 *           description: _id
 *           schema:
 *                type: string 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              default: http://xyz
 *                          caption:
 *                              type: string
 *                              default: hey!!! this is my first meme
 *      responses:
 *          '200':
 *              description: OK
 *  delete:
 *     tags: [/memes/:Id]
 *     summary: Deletes meme at ID.
 *     parameters:
 *         - name: Id
 *           in: path
 *           required: true
 *           description: Parameter description in CommonMark or HTML.
 *           schema:
 *                type : string
 *     responses: 
 *          '200':
 *              description: OK
 
 */

