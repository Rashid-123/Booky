const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/db');

const JWT_SECRET = process.env.JWT_SECRET;

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ------------------------------------------------------- Register user ---------------------------------------------------
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Name, email, and password are required"  
      });
    }

    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ 
        message: "Name must be at least 2 characters long" 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long" 
      });
    }

    if (role && !['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ 
        message: "Role must be either USER or ADMIN" 
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role || "USER",
      },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ------------------------------------------------------- Login user ---------------------------------------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Data validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//------------------------------------------------------- Get user profile ---------------------------------------------------
exports.getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------------------------------------- Update user profile ---------------------------------------------------
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

   
    if (!name && !email) {
      return res.status(400).json({ 
        message: "At least one field (name or email) is required to update" 
      });
    }

    const updateData = {};

    if (name) {
      if (typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ 
          message: "Name must be at least 2 characters long" 
        });
      }
      updateData.name = name.trim();
    }

    if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

    
      const existingUser = await prisma.user.findUnique({ 
        where: { email: email.toLowerCase().trim() } 
      });
      
      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(400).json({ message: "Email already exists" });
      }

      updateData.email = email.toLowerCase().trim();
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    });

    res.json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};