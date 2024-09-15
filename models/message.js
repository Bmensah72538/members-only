var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const msgSchema = new Schema({
    messageText: { type: String, required: true},
    author: { type: String, required: true},
    authorID: { type: String, required: true },
    date: {type: Date, default: Date.now}
})

const Message = mongoose.model('messages', msgSchema )

module.exports = Message;