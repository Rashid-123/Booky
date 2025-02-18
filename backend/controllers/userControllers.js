const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  console.log("Reached getMe function"); // ✅ This should appear
  console.log("User ID from request:", req.user._id); // ✅ This should appear

  try {
    const user = await User.findById(req.user._id).select("-password");

    console.log("User fetched from DB:", user); // ✅ This should show user data or `null`

    if (!user) {
      console.log("User not found, sending 404 response");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Sending user data in response");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
