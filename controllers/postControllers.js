const Post = require('../models/Post');
const Comment = require('../models/Comment');

const newPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const post = await Post.create({ title, description, user: req.user._id });
        res.status(200).json({
            id: post._id,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ $and: [{ _id: req.params.id }, { user: req.user._id }] });
        if (!post) return res.status(404).json('Post Not Found');
        await Comment.deleteMany({ post: post._id });
        res.status(200).json('Post Deleted Successfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json('Post Not Found');
        post.likes.push(req.user._id);
        await post.save();
        res.status(200).json(`You Liked post ${post.title}`);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json('Post Not Found');
        post.likes.pull(req.user._id);
        await post.save();
        res.status(200).json(`You unliked post ${post.title}`);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json('Post Not Found');
        const comment = await Comment.create({ text: req.body.comment, user: req.user._id, post: req.params.id });
        post.comments.push(comment._id);
        await post.save();
        res.status(200).json({ 'Comment-ID': comment._id });
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findOne({ $and: [{ _id: req.params.id }, { user: req.user._id }] });
        if (!post) return res.status(404).json('Post Not Found');
        res.status(200).json({
            id: post._id,
            comments: post.comments.length,
            likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('comments', ['text', 'createdAt'])
            .select('_id title desc createdAt comments likes');

        const postsWithLikes = posts.map(post => ({
            _id: post._id,
            title: post.title,
            desc: post.desc,
            createdAt: post.createdAt,
            comments: post.comments,
            likes: post.likes.length
        }));

        res.status(200).json(postsWithLikes);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


module.exports = { newPost, deletePost, likePost, unlikePost, commentPost, getSinglePost, getAllPost }