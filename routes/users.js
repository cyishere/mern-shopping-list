const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APP_SECRET = require("../utils/config").APP_SECRET;

/**
 * @route   POST /api/users
 * @desc    Register New User
 * @access  Pulic
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
      const error = new Error("All fields are required.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("User already exists.");
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate Token
    const token = jwt.sign({ userId: savedUser.id }, APP_SECRET, {
      expiresIn: 3600,
    });

    res.json({
      user: {
        id: savedUser.id,
        email: savedUser.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
