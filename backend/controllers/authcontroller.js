const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config = require('../utils/config');
// const {OAuth2Client}=require('google-auth-library');
// const clientId='dcd';
// const client=new OAuth2Client(clientId);

exports.signup=catchAsync(async (req,res,next) => {

    //console.log(req.body);
    const user=await User.findOne({emailId: req.body.email});

    if(user) {
        return next(new appError(`User with Email id ${req.body.email} already exists!!!`,403));
    }

    let newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        emailId: req.body.email,
    });
    await newUser.save();

    res.status(200).send('You have been successfully registered!!!');
});


exports.login=catchAsync(async (req,res,next) => {
    console.log(req.body);

    const email=req.body.email;
    const pass=req.body.password;

    const user=await User.findOne({emailId: email});

    if(!user) {
        return next(new appError('User not found!!!!',404));
    }

    const isMatched=bcrypt.compareSync(pass, user.password);

    if(!isMatched) {
        return next(new appError('Incorrect password!!!',403));
    }

    const accesstoken = jwt.sign(
        {userId:user._id},
        config.secretKey,
        {expiresIn:60*60*1000} //expires in 1 hour
    );
    res.status(200).json({
        message:'logged in successfully!!!',
        accesstoken,
        user
    });
});


exports.verifyToken = (req,res,next) => {
    var token= req.headers.authorization;
    
    if(!token) {
        const err=new Error('Authorization falied: token is not there or invalid!!!');
        err.status=403;
        return next(err);
    }

    token=token.split(' ')[1];

    jwt.verify(token,config.secretKey,(err, decoded) => {
        if(err) {
            console.log( err.message)
            err.status=401;
            return next(err);
        }
        else {
            //console.log(decoded);
            req.userId=decoded.userId;
            return next();
        }
    })
};


exports.refresh=catchAsync(async (req,res,next) => {
    //console.log(req.userId)
    let user=await User.findById(req.userId);
    res.status(200).json(user);
})
/* 
exports.g_login=catchAsync(async (req,res,next) => {
    const token=trq.body;

    client.verifyIdToken({idToken:token, audience:clientId})
    .then(async (res)=> {
        let {email}=res.payload;
        console.log(res.payload);

        const user=await User.findOne({emailId: req.body.emailId});

        if(user) {
            const accesstoken = jwt.sign(
                {userId:user._id},
                process.env.SECRET_KEY,
                {expiresIn:60*60*1000} //expires in 1 hour
            );
            res.status(200).json({
                message:'logged in successfully!!!',
                accesstoken,
                user
            });
        }
        else {
            let newUser = new User({
                username: email,
                password: bcrypt.hashSync(email,10),
                emailId: email,
            });
            await newUser.save();

            const accesstoken = jwt.sign(
                {userId:newUser._id},
                process.env.SECRET_KEY,
                {expiresIn:60*60*1000} //expires in 1 hour
            );
            res.status(200).json({
                message:'logged in successfully!!!',
                accesstoken,
                newUser
            });
        }
    })
});
 */

exports.logout=catchAsync(async (req,res,next) => {
    console.log("you are at /user/logout");

});
