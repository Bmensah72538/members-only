const express = require('express')
const router = express.Router();
const User = require('../models/user.js')

router.get('/', (req, res) => {
    res.render('member', {
        loggedIn: req.isAuthenticated()
    });
})

router.post('/verify', async function(req, res) {
    if(req.body.password === 'secret') {
        let id = req.session.passport.user.id;
        let user = await User.findById(id);
        user.isMember = true;
        await user.save();
        res.send('You are now a member!')
    } else {
        res.send('Wrong password!')
    }
})

module.exports = router