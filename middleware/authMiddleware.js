const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password");
            if (!user) return res.status(404).json('User Not found');
            req.user = user

            next();
        } catch (error) {
            res.status(401).json("Not authorized, token failed");
        }
    }

    if (!token) {
        return res.status(401).json("Not authorized, no token");
    }


}


module.exports = protect