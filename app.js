var dotEnv = require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const accountRouter = require('./routes/account');
const chatRouter = require('./routes/chat')
const memberRouter = require('./routes/member')
const User = require('./models/user');

var app = express();

const sess = {
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.dbString, dbName: 'members-only'}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1000 MS * 60 seconds * 60 Minutes * 24 hours * 1 day 
  }
}





const port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);
app.use('/member', memberRouter)
app.use('/chat', chatRouter)



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

mongoose.connect(process.env.dbString, {dbName: 'members-only' }).then(app.listen(port, (err) => {
  if(err) {
    console.log('Failed to listen.')
  }
  console.log(`Listening on ${port}...`)
}))


module.exports = app;
