const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');


exports.getUser=catchAsync(async (req,res,next) => {    
    let user=await User.findById(req.params.id);

    if(!user) {
        return next(new appError('User not found in our database!!!', 404));    
    }

    res.status(200).json(user);
});


exports.updateUser=catchAsync(async (req,res,next) => {
    console.log(req.body);

    await User.findByIdAndUpdate(req.params.id, {
        $set:
            req.body
        },
        {runValidators: true}
    );

    let user=await User.findById(req.params.id);

    res.status(200).json({
        status:'Info modified successfully',
        user
    });
});

exports.resetPassword=catchAsync(async (req,res,next) => {
    const oldpswd=req.body.old;
    const newpswd=bcrypt.hashSync(req.body.new,10);

    let user=await User.findById(req.params.id);
    let isMatched=bcrypt.compareSync(oldpswd, user.password);
    if(isMatched) {
        await User.findByIdAndUpdate(req.params.id,{
            $set: 
                {password:newpswd}
            },
            {runValidators: true}
        );
        
        res.status(200).send('password reset done!!!');
    }
    else {
        return next(new appError('Incorrect old password!!!',403));
    }
});