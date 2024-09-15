var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const renderObj = { 
    title: 'Express', 
    isMember: null
  }
  if(req.isAuthenticated()) {
    renderObj.isMember = req.session.passport.user.isMember;
  }
  res.render('index', renderObj);
});

module.exports = router;
