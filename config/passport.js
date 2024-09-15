var passport = require('passport');
var LocalStrategy = require('passport-local');
var util = require('../lib/passwordUtils.js')
var User = require('../models/user');



const strategy = new LocalStrategy(async function verify(username, password, cb){
    await User.findOne({username : username})
      .then((user) => {
        if(!user) {
          return cb(null, false, {message: 'Incorrect username or password'});
        }      
        const isValid = util.validPassword(password, user);
        if(isValid) {
          return cb(null, user)
        } else {
          return cb(null, false, {messagPassworde: 'Incorrect username or password'})
        }
      })
      .catch((err) => {
        cb(err);
      })
  })
  
passport.use(strategy)
  
passport.serializeUser(function(user, cb) {
cb(null, {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    isMember: user.isMember
})
});

passport.deserializeUser(async function(session, cb) {
await User.findById(session.id)
    .then((user) => {
    cb(null, user)
    })
    .catch((err) => {
    cb(err);
    })
});