const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('todo', TodoSchema);