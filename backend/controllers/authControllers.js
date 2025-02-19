const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ----------------------------- Register ------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }


    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------- Login -------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log("1");

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        token: generateToken(user._id),
      });
      console.log("2");
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
