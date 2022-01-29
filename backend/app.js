require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors=require('cors');
const appError=require('./utils/appError');
const config = require('./utils/config');
const socket = require('./utils/socket');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memeRouter = require('./routes/memes');
const commentRouter = require('./routes/comments');

//connecting to database 
const url =config.dburl;
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
app.use(cors({
  origin: config.clientUrl, credentials:true
}));

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
app.use('/comments', commentRouter);


// catch 404 and forward to error handler
app.all('*', (req,res,next) => {
  next(new appError(`Can't reach ${req.originalUrl} on this server!!`, 404));
});


// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const port=config.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});

socket.setUp(server);

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
