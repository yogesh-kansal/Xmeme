var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var http=require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memeRouter = require('./routes/memeRouter');

//connecting to database 
const url = "mongodb://localhost:27017/Xmeme";
mongoose.connect(url, {
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/memes', memeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports =app;


//swagger
//importing swagger depandencies
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Swagger for Xmeme",
      description:"This is documententaion for xmeme web App using Swagger API, presented by Yogesh kansal",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8081",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpecs = swaggerJsdoc(options);
var swaggerApp = express();
var swaggerserver = http.createServer(swaggerApp);
swaggerserver.listen(8080);
swaggerApp.use(logger('dev'));
swaggerApp.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
