require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const http=require('http');
const cors=require('cors');
const appError=require('./utils/appError');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memeRouter = require('./routes/memeRouter');

//connecting to database 
console.log(process.env.MONGODB_URL, process.env.FRONTEND_URL)
const url =process.env.MONGODB_URL || "mongodb://localhost:27017/Xmeme";
mongoose.connect( url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
});
mongoose.connection.on('error', (err) => {
    console.log("Mongoose Connection error " + err.message);
  });
mongoose.connection.once('open', () => {
    console.log("MongoDB connected on "+url);
});


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/memes', memeRouter);


// catch 404 and forward to error handler
app.all('*', (req,res,next) => {
  next(new appError(`Can't reach ${req.originalUrl} on this server!!`, 404));
});


// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports =app;