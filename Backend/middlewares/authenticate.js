const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

const isAuth = (req, res, next) => {
  const token = req.header("x-access-token");

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

const ownsProduct = (model) => async (req, res, next) => {
  try {
    const item = await model.findById(req.params.id);
    if (!item) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }

    if (item.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Middleware to check if user is super admin
const isSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.type !== "superadmin") {
        return res.status(403).json({ success: false, message: "You are not a super admin" });
    }
    next();
};

module.exports = {
    isAuth,
    ownsProduct,
    isSuperAdmin
};
