const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (!allowed.includes(userRole)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  requireRole,
};
