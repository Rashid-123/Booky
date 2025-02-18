const jwt = require("jsonwebtoken");
const User = require("../models/User");

// /---------------------------------------------------------
exports.protect = async (req, res, next) => {
  console.log('in protect');
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });
  console.log("protect 2");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("protect 3");
    req.user = await User.findById(decoded.id).select("-password");
    console.log("protect 4", req.user);
    console.log(req.user.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

//------------------------------------------------------
exports.admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
