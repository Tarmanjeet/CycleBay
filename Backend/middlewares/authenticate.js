const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

// middleware to verify token 
const isAuth = (req, res, next) => {
    const token = req.header("Authorization") || req.header("x-access-token");

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, tokenSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.type !== "A") {
        return res.status(403).json({ success: false, message: "You are not an admin" });
    }
    next();
};

// Middleware to check if user is super admin
const isSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.type !== "S") {
        return res.status(403).json({ success: false, message: "You are not a super admin" });
    }
    next();
};

module.exports = {
    isAuth,
    isAdmin,
    isSuperAdmin
};
