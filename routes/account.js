const passport = require('passport');
const express = require('express');
let router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
    res.render('login', { stuff: 'stuff'})
}); 

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login'
}))

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

router.get('/member', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.send('Not implemented')
  } else {
    res.send('You need to be logged in to do this.')
  }
})

router.get('/register', (req, res) => {
  res.render('register', { stuff: 'stuff'})
}); 

router.post('/register', async function(req, res){
  let pUsername = req.body.username;
  let pPassword = req.body.password;
  pPassword = await bcrypt.hash(pPassword, 13);


  await mongoose.connect(process.env.dbString);
  console.log('Connected to DB...')
  let newUser = new User({
      username: pUsername,
      password: pPassword,
      isAdmin: false,
      isMember: false
  });

  console.log('Attempting to save...')
  await newUser.save();
  console.log('Save success')

  res.redirect('/')

})

module.exports = router;
