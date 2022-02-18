require('dotenv').config()

let createError = require('http-errors');
let express = require('express');

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');
let authRouter = require('./routes/auth');
let meetingRouter = require('./routes/meeting');


let app = express();

// Functional curling style of loading configuration
require('./config/db')
require('./config/global')(app)


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/meetings', meetingRouter);

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

module.exports = app;

// Hey hey hey