const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);
module.exports = Post