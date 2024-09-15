const express = require('express')
const router = express.Router()
const Message = require('../models/message')

router.get('/', async function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log(req.session)
    let messages = await Message.find();
    res.render('messages', { 
      messages: messages,
      isMember: req.session.passport.user.isMember,
    })
  } else {
    res.send('You need to be logged in to do this.')
  }
})
router.post('/post', async function(req, res) {
  let messageText = req.body.messageText;
  let author = req.session.passport.user.username;
  let authorID = req.session.passport.user.id;
  let toBeSaved = new Message({
    messageText: messageText,
    author: author,
    authorID: authorID,
  })
  await toBeSaved.save();
  res.redirect('/chat')
})

module.exports = router;