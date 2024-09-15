var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, index: true},
    password: { type: String, required: true},
    isMember: { type: Boolean, required: true},
    isAdmin: { type: Boolean, required: true }
})

const User = mongoose.model('users', userSchema )

module.exports = User;