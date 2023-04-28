const generateToken = require('../config/generateToken');
const User = require('../models/User');


const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ $and: [{ email }, { password }] });
        if (!user) return res.status(404).json('User Not Found');
        const token = await generateToken(user._id);
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const follow = async (req, res) => {
    try {
        const me = await User.findById(req.user._id);
        const user = await User.findById(req.params.id);
        if (me.followings.includes(user._id)) return res.status(409).json(`You Already Followed ${user.username}`);
        user.followers.push(me._id);
        me.followings.push(user._id);
        await user.save();
        await me.save();
        res.status(200).json(`You Followed ${user.username}`);
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const unfollow = async (req, res) => {
    try {
        const me = await User.findById(req.user._id);
        const user = await User.findById(req.params.id);
        if (!me.followings.includes(user._id)) return res.status(409).json(`You Did Not Follow ${user.username}`);
        user.followers.pull(me._id);
        me.followings.pull(user._id);
        await user.save();
        await me.save();
        res.status(200).json(`You Unfollowed ${user.username}`)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json('User Not Found');
        res.status(200).json({
            username: user.username,
            followers: user.followers.length,
            followings: user.followings.length
        });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { authenticate, follow, unfollow, profile }
