var Memes = require('../models/meme');
var catchAsync = require('../utils/catchAsync');
var appError = require('../utils/appError');


//controller for GET requests on /memes endpoint
exports.get_All = catchAsync(async (req, res, next) => {

    var data = await Memes.find(req.query).sort({'timestamp': -1});
    res.statusCode =200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status: "success",
        message: 'successfully fetched data',
        data: data
    })
});

//controller for POST requests on /memes endpoint
exports.post = catchAsync(async (req, res, next) => {

    var pre = await Memes.findOne(req.body);
    console.log(req.body);

    if(!pre) {
        var meme = await Memes.create(req.body);
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            status: "success",
            message: "meme posted successfully",
            data: meme
        })
    }
    else {
        return next(new appError('Same data already exists',403));
    }  
});


//controller for GET requests on /memes/:id endpoint
exports.get_At_id = catchAsync(async (req, res, next) => {
    console.log("params are", req.params);

    var data = await Memes.findOne({_id:req.params.id});

    if(data) {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            status: "success",
            message:`meme at endpoint /memes/${req.params.id} fetched successfully`,
            data: data
        })
    }
    else {
        return next(new appError('Not found',404));
    }
    
});

//controller for PUT(modification of meme) requests on /memes endpoint
exports.patch_At_id = catchAsync(async (req, res, next) => {

    if(req.body.author) {
        return next(new appError('author of meme can\'t be changed', 403));
    }
    console.log(req.body);

    var modified = await Memes.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true});
    res.statusCode =200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status: "success", 
        message: `meme modified successfully`,
        data: modified
    })
});

//controller for DELETE requests on /memes endpoint
exports.delete_id = catchAsync(async (req, res, next) => {
    
    await Memes.findByIdAndRemove(req.params.id);
    
    res.statusCode =200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status: "success", 
        message: `meme at id ${req.params.id} deleted successfully`
    })
});