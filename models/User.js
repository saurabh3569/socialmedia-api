const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User