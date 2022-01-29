const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const Comment = require('../models/comment');


exports.getAllComments=catchAsync(async (req,res,next) => {
    let comments = await Comment.find({memeId:req.params.memeId});
    res.status(200).json(comments);
});


exports.newComment=catchAsync(async (req,res,next) => {
    let newComment = new Comment({
        ...req.body
    });
    
    await newComment.save();

    res.status(200).send('comment added successfully!!!');
});
